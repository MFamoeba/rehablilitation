package pl.wk.rehabilitation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.entity.*;
import pl.wk.rehabilitation.model.AppointmentDto;
import pl.wk.rehabilitation.repository.*;
import pl.wk.rehabilitation.utill._enum.AppointmentStatus;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AccountRepository accountRepository;
    private final TherapistRepository therapistRepository;
    private final ProcedureRepository procedureRepository;
    private final WorkScheduleRepository workScheduleRepository;

    public List<Appointment> getAll(){
        return appointmentRepository.findAll();
    }

    public Appointment getById(UUID id){
        return appointmentRepository.findById(id).orElseThrow();
    }

    public Appointment updateStatus(UUID id, AppointmentStatus appointmentStatus) {
        Appointment appointmentToUpdate = appointmentRepository.findById(id).orElseThrow();
        appointmentToUpdate.setAppointmentStatus(appointmentStatus);
        return appointmentRepository.saveAndFlush(appointmentToUpdate);
    }

    public Appointment update(UUID id, Appointment appointment){
        Appointment appointmentToUpdate = appointmentRepository.findById(id).orElseThrow();
        appointmentToUpdate.setTherapist(appointment.getTherapist());
        appointmentToUpdate.setPatient(appointment.getPatient());
        appointmentToUpdate.setStartTime(appointment.getStartTime());
        return appointmentRepository.saveAndFlush(appointmentToUpdate);
    }

    public Appointment create(AppointmentDto appointmentDto) {
        Account patient = accountRepository.findById(appointmentDto.getPatient()).orElseThrow();
        Therapist therapist = therapistRepository.findById(appointmentDto.getTherapist()).orElseThrow();
        Procedure procedure = procedureRepository.findById(appointmentDto.getProcedure()).orElseThrow();

        LocalDateTime startTime = appointmentDto.getStartTime();
        int durationInMinutes = procedure.getDurationMinutes();
        LocalDateTime endTime = startTime.plusMinutes(durationInMinutes);

        validateInWorkingHours(therapist, startTime, endTime);

        validateOverlaps(therapist.getId(), startTime, endTime);

        Appointment appointmentToCreate = new Appointment();
        appointmentToCreate.setTherapist(therapist);
        appointmentToCreate.setPatient(patient);
        appointmentToCreate.setStartTime(appointmentDto.getStartTime());
        appointmentToCreate.setProcedure(procedure);
        return appointmentRepository.saveAndFlush(appointmentToCreate);

    }

    private void validateOverlaps(UUID therapistId, LocalDateTime startTime, LocalDateTime endTime) {
        LocalDateTime startOfDay = startTime.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = endTime.toLocalDate().atTime(java.time.LocalTime.MAX);

        List<Appointment> existingAppointments = appointmentRepository
                .findAllActiveByTherapistAndDate(therapistId, startOfDay, endOfDay);

        for (Appointment existing : existingAppointments) {
            LocalDateTime existingStart = existing.getStartTime();
            int duration = existing.getProcedure().getDurationMinutes();
            LocalDateTime existingEnd = existingStart.plusMinutes(duration);

            if (startTime.isBefore(existingEnd) && endTime.isAfter(existingStart)) {
                throw new RuntimeException("Termin jest już zajęty! Kolizja z wizytą o: " + existingStart);
            }
        }
    }

    private void validateInWorkingHours(Therapist therapist, LocalDateTime startTime, LocalDateTime endTime) {
        DayOfWeek day = startTime.getDayOfWeek();
        WorkSchedule workSchedule = therapist.getSchedules().stream()
                .filter(s -> s.getDayOfWeek() == day).findFirst().orElseThrow(
                        () -> new RuntimeException("Terapeuta nie przyjmuje w" + day.toString())
                );
        if (startTime.toLocalTime().isBefore(workSchedule.getStartTime()) ||
                endTime.toLocalTime().isAfter(workSchedule.getEndTime()))
            throw new RuntimeException("Wizyta poza granicami ");
    }

    public void delete(UUID id){
        appointmentRepository.deleteById(id);
    }
}
