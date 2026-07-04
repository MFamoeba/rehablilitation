package pl.wk.rehabilitation.ams.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.entity.*;
import pl.wk.rehabilitation.ams.repository.*;
import pl.wk.rehabilitation.utill._enum.AppointmentStatusEnum;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadPoolExecutor;

@Service
@RequiredArgsConstructor
public class AppointmentSlotService {
    private final AppointmentSlotRepository appointmentSlotRepository;
    private final AccountRepository accountRepository;
    private final TherapistRepository therapistRepository;

    public List<AppointmentSlot> getAppointmentSlotsForWeek(UUID therapistId, LocalDate localDate) {
        LocalDate startOfWeek = localDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = localDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        LocalDateTime startDateTime = startOfWeek.atStartOfDay();
        LocalDateTime endDateTime = endOfWeek.atTime(LocalTime.MAX);

    return appointmentSlotRepository.findByStatusAndTherapistIdAndStartTimeBetween(
            AppointmentStatusEnum.OPEN,
            therapistId,
            startDateTime,
            endDateTime
    );
    }

    public AppointmentSlot book(UUID slotId, String userEmail) {
        AppointmentSlot appointmentSlot = appointmentSlotRepository.findById(slotId)
                        .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono terminu."));

        if (appointmentSlot.getStatus() != AppointmentStatusEnum.OPEN) {
            throw new IllegalStateException("Slot is not open");
        }

        Account user = accountRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono użytkownika."));
        appointmentSlot.setPatient(user);
        appointmentSlot.setStatus(AppointmentStatusEnum.PENDING);
        return appointmentSlotRepository.saveAndFlush(appointmentSlot);
    }

    public List<AppointmentSlot> getAllAppointements() {
        return appointmentSlotRepository.findAll();
    }
}
