package pl.wk.rehabilitation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.wk.rehabilitation.entity.Appointment;

import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository <Appointment, UUID> {

}
