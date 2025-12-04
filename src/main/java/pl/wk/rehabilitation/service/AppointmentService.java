package pl.wk.rehabilitation.service;

import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.model.Appointment;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {
    private List<Appointment> appointmentList = new ArrayList<>();

    public List<Appointment> getAll(){
        return appointmentList;
    }

    public Appointment get(int id){
        return appointmentList.get(id);
    }

    public Appointment update(int id, Appointment appointment){
        appointmentList.set(id, appointment);
        return appointmentList.get(id);
    }

    public Appointment create(Appointment appointment){
        appointmentList.add(appointment);
        return appointment;
    }

    public void delete(int id){
        appointmentList.remove(id);
    }
}
