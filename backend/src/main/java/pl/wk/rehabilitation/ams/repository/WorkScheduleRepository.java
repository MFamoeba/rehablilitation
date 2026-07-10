package pl.wk.rehabilitation.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.wk.rehabilitation.ams.entity.DefaultWorkSchedule;
import pl.wk.rehabilitation.ams.entity.WorkSchedule;

import java.util.List;
import java.util.UUID;

@Repository
public interface DefaultWorkScheduleRepository extends JpaRepository<DefaultWorkSchedule, UUID> {
    List<DefaultWorkSchedule> getAllByTherapistId(UUID therapistId);
}
