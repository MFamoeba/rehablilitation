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

    List<AppointmentSlot> findByTherapistIdAndStartTimeBetween(UUID therapistId, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<AppointmentSlot> findByPatientId(UUID PatientId);
    List<AppointmentSlot> findAllByPatientIdAndStartTimeBeforeOrderByStartTimeDesc(UUID patientId, LocalDateTime date);
    List<AppointmentSlot> findAllByPatientIdAndStartTimeGreaterThanEqualOrderByStartTimeAsc(UUID patientId, LocalDateTime date);

    boolean existsByPatientIdAndTherapistId(UUID patientId, UUID id);
}
