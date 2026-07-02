package pl.wk.rehabilitation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wk.rehabilitation.entity.Procedure;

import java.util.UUID;

public interface ProcedureRepository extends JpaRepository<Procedure, UUID> {
}
