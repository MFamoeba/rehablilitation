package pl.wk.rehabilitation.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.wk.rehabilitation.ams.entity.AppointmentSlot;
import pl.wk.rehabilitation.utill._enum.AppointmentStatusEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentSlotRepository extends JpaRepository <AppointmentSlot, UUID> {

    List<AppointmentSlot> findByStatusAndTherapistIdAndStartTimeBetween(AppointmentStatusEnum appointmentStatusEnum, UUID therapistId, LocalDateTime startOfWeek, LocalDateTime endOfWeek);
}
