package pl.wk.rehabilitation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wk.rehabilitation.entity.Appointment;

import java.util.UUID;

public interface TherapistRepository extends JpaRepository<Appointment, UUID> {
}
