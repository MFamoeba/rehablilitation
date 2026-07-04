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

@Service
@RequiredArgsConstructor
public class AppointmentSlotService {
    private final AppointmentSlotRepository appointmentSlotRepository;

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
}
