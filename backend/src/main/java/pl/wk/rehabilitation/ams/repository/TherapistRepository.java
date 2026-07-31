package pl.wk.rehabilitation.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wk.rehabilitation.ams.entity.Therapist;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TherapistRepository extends JpaRepository<Therapist, UUID> {
    Optional<Therapist> findByAccountId(UUID id);

    List<Therapist> findAllByProceduresId(UUID procedureId);
}
