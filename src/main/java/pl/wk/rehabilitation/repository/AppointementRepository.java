package pl.wk.rehabilitation.repository;

import org.springframework.stereotype.Repository;
import pl.wk.rehabilitation.model.Appointment;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AppointementRepository {
    List<Appointment> appointmentList = new ArrayList<>();

    public void getById(int id){
        return;
    }

}
