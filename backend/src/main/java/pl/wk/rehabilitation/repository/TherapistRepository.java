package pl.wk.rehabilitation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wk.rehabilitation.entity.Therapist;

import java.util.UUID;

public interface TherapistRepository extends JpaRepository<Therapist, UUID> {
}
