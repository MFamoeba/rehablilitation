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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentSlotService {
    private final AppointmentSlotRepository appointmentSlotRepository;
    private final AccountRepository accountRepository;
    private final TherapistRepository therapistRepository;
    private final WorkScheduleRepository workScheduleRepository;
    private final static Integer LENGTH_OF_SLOT_IN_MINUTES = 30;

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

    public List<AppointmentSlot> getAllAppointmentSlots() {
        return appointmentSlotRepository.findAll();
    }

    public void generateSlotsForRange(LocalDate startDate, LocalDate endDate, UUID account_id) {
        Therapist therapist = therapistRepository.findByAccountId(account_id).orElseThrow(() -> new IllegalArgumentException("Nie znaleziono lekarza."));
        List<WorkSchedule> workSchedule = workScheduleRepository.getAllByTherapistId(therapist.getId());

        Map<DayOfWeek, List<WorkSchedule>> templateMap = workSchedule.stream()
                .collect(Collectors.groupingBy(WorkSchedule::getDayOfWeek));

        List<AppointmentSlot> appointmentSlotsToSave = new ArrayList<>();

        for (LocalDate date = startDate; date.isBefore(endDate) || date.isEqual(endDate); date = date.plusDays(1)) {
            DayOfWeek dayOfWeek = date.getDayOfWeek();
            List<WorkSchedule> workScheduleForDay = templateMap.getOrDefault(dayOfWeek, List.of());
            for (WorkSchedule schedule : workScheduleForDay) {
                LocalDateTime startTime = date.atTime(schedule.getStartTime());
                LocalDateTime endTime = date.atTime(schedule.getEndTime());
                while (!startTime.plusMinutes(LENGTH_OF_SLOT_IN_MINUTES).isAfter(endTime)) {
                    AppointmentSlot appointmentSlot = AppointmentSlot.builder()
                            .therapist(therapist)
                            .startTime(startTime)
                            .endTime(startTime.plusMinutes(LENGTH_OF_SLOT_IN_MINUTES))
                            .status(AppointmentStatusEnum.OPEN)
                            .build();
                    appointmentSlotsToSave.add(appointmentSlot);
                    startTime = startTime.plusMinutes(LENGTH_OF_SLOT_IN_MINUTES);
                }
            }
        }
        appointmentSlotRepository.saveAll(appointmentSlotsToSave);
        appointmentSlotsToSave.clear();
    }

    public void deleteSlot(UUID slotId, UUID account_id) {
        Therapist therapist = therapistRepository.findByAccountId(account_id).orElseThrow(() -> new IllegalArgumentException("Nie znaleziono lekarza."));
        AppointmentSlot appointmentSlot = appointmentSlotRepository.findById(slotId).orElseThrow();

        if (!appointmentSlot.getTherapist().getId().equals(therapist.getId())) {
            throw new IllegalStateException("Nie masz uprawnień do usunięcia tego terminu.");
        }

        if (!appointmentSlot.getStatus().equals(AppointmentStatusEnum.OPEN)) {
            throw new IllegalStateException("Nie można usunąć terminu, który został już zarezerwowany.");
        }
        appointmentSlotRepository.delete(appointmentSlot);
    }
}
