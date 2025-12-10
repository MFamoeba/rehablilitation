package pl.wk.rehabilitation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.entity.Account;
import pl.wk.rehabilitation.entity.Appointment;
import pl.wk.rehabilitation.entity.Procedure;
import pl.wk.rehabilitation.entity.Therapist;
import pl.wk.rehabilitation.model.AppointmentDto;
import pl.wk.rehabilitation.repository.AccountRepository;
import pl.wk.rehabilitation.repository.AppointmentRepository;
import pl.wk.rehabilitation.repository.ProcedureRepository;
import pl.wk.rehabilitation.repository.TherapistRepository;
import pl.wk.rehabilitation.utill._enum.AppointmentStatus;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AccountRepository accountRepository;
    private final TherapistRepository therapistRepository;
    private final ProcedureRepository procedureRepository;

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

        Appointment appointmentToCreate = new Appointment();
        appointmentToCreate.setTherapist(therapist);
        appointmentToCreate.setPatient(patient);
        appointmentToCreate.setStartTime(appointmentDto.getStartTime());
        appointmentToCreate.setProcedure(procedure);
        appointmentToCreate.setRoom(appointmentDto.getRoom());
        appointmentToCreate.setAppointmentStatus(AppointmentStatus.SCHEDULED);
        return appointmentRepository.saveAndFlush(appointmentToCreate);

    }

    public void delete(UUID id){
        appointmentRepository.deleteById(id);
    }
}
