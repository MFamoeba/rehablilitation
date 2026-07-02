package pl.wk.rehabilitation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wk.rehabilitation.entity.WorkSchedule;

import java.util.List;
import java.util.UUID;

public interface WorkScheduleRepository extends JpaRepository<WorkSchedule, UUID> {
    List<WorkSchedule> getAllByTherapistId(UUID therapistId);

}
