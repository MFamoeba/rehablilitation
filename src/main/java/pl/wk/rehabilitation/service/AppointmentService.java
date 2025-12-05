package pl.wk.rehabilitation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.entity.Appointment;
import pl.wk.rehabilitation.repository.AppointmentRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public List<Appointment> getAll(){
        return appointmentRepository.findAll();
    }

    public Appointment getById(UUID id){
        return appointmentRepository.findById(id).orElseThrow();
    }

    public Appointment update(UUID id, Appointment appointment){
        Appointment appointmentToUpdate = appointmentRepository.findById(id).orElseThrow();
        appointmentToUpdate.setDoctor(appointment.getDoctor());
        appointmentToUpdate.setPatient(appointment.getPatient());
        appointmentToUpdate.setStartTime(appointment.getStartTime());
        return appointmentRepository.saveAndFlush(appointmentToUpdate);
    }

    public Appointment create(Appointment appointment){
        return appointmentRepository.saveAndFlush(appointment);
    }

    public void delete(UUID id){
        appointmentRepository.deleteById(id);
    }
}
