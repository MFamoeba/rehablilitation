package pl.wk.rehabilitation.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wk.rehabilitation.ams.entity.Procedure;

import java.util.UUID;

public interface ProcedureRepository extends JpaRepository<Procedure, UUID> {
}
