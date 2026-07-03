package pl.wk.rehabilitation.ams.controllers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wk.rehabilitation.ams.controllers.entity.Therapist;

import java.util.UUID;

public interface TherapistRepository extends JpaRepository<Therapist, UUID> {
}
