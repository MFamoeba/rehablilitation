package pl.wk.rehabilitation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.wk.rehabilitation.entity.Appointment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository <Appointment, UUID> {
    @Query("SELECT a FROM Appointment a " +
            "WHERE a.therapist.id = :therapistId " +
            "AND a.startTime >= :startOfDay " +
            "AND a.startTime < :endOfDay " +
            "AND a.appointmentStatus != 'CANCELLED'")
    List<Appointment> findAllActiveByTherapistAndDate(UUID therapistId, LocalDateTime startOfDay, LocalDateTime endOfDay);
}
