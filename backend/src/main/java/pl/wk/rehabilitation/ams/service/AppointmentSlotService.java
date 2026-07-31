package pl.wk.rehabilitation.ams.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.wk.rehabilitation.ams.converter.AppointmentSlotMapper;
import pl.wk.rehabilitation.ams.dto.GetDetailedAppointmentSlotResponse;
import pl.wk.rehabilitation.ams.dto.UpdateAppointmentDetailsRequest;
import pl.wk.rehabilitation.ams.entity.*;
import pl.wk.rehabilitation.ams.repository.*;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;
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
    private final AppointmentSlotMapper appointmentMapper;
    private final static Integer LENGTH_OF_SLOT_IN_MINUTES = 30;

    private Therapist getTherapistByUsername(String username) {
        Account account = accountRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono konta."));
        return therapistRepository.findByAccountId(account.getId())
                .orElseThrow(() -> new IllegalArgumentException("Konto nie ma przypisanego profilu terapeuty."));
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public AppointmentSlot book(UUID slotId, String username) {
        Account account = accountRepository.findByEmail(username).orElseThrow(() -> new IllegalArgumentException("Nie znaleziono konta."));
        AppointmentSlot appointmentSlot = appointmentSlotRepository.findById(slotId)
                        .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono terminu."));

        if (appointmentSlot.getStatus() != AppointmentStatusEnum.OPEN) {
            throw new IllegalStateException("Slot is not open");
        }
        appointmentSlot.setPatient(account);
        appointmentSlot.setStatus(AppointmentStatusEnum.PENDING);
        return appointmentSlotRepository.saveAndFlush(appointmentSlot);
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public void generateSlotsForRange(LocalDate startDate, LocalDate endDate, String username) {
        Therapist therapist = getTherapistByUsername(username);
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

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public List<GetDetailedAppointmentSlotResponse> getAllAppointmentSlotsForDate(String username, LocalDate localDate) {
        Account account = accountRepository.findByEmail(username).orElseThrow(() -> new IllegalArgumentException("Nie znaleziono konta."));
        if (account.getRole() != AccountRoleEnum.ROLE_DOCTOR) {
            throw new AccessDeniedException("Brak uprawnień!");
        }
        Therapist therapist = therapistRepository.findByAccountId(account.getId()).orElseThrow();
        LocalDateTime startDateTime = localDate.atStartOfDay();
        LocalDateTime endDateTime = localDate.atTime(LocalTime.MAX);
        return appointmentSlotRepository.findByTherapistIdAndStartTimeBetween(
                    therapist.getId(),
                    startDateTime,
                    endDateTime
            ).stream().map(appointmentMapper::toDetailedResponse).toList();
        }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public AppointmentSlot updateAppointmentDetails(String therapist_username, UUID slotId, UpdateAppointmentDetailsRequest updateAppointmentDetailsRequest) {
        Therapist therapist = getTherapistByUsername(therapist_username);
        AppointmentSlot appointmentSlotToUpdate = appointmentSlotRepository.findById(slotId).orElseThrow();
        if (!appointmentSlotToUpdate.getTherapist().getId().equals(therapist.getId())) throw new AccessDeniedException("Nie masz dostępu do danych tego terminu.");
        appointmentSlotToUpdate.setStatus(updateAppointmentDetailsRequest.status());
        appointmentSlotToUpdate.setRoom(updateAppointmentDetailsRequest.room());
        appointmentSlotToUpdate.setNotes(updateAppointmentDetailsRequest.notes());

        return appointmentSlotRepository.save(appointmentSlotToUpdate);
    }

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public GetDetailedAppointmentSlotResponse getAppointmentDetails(String username, UUID slotId) {
        Account account = accountRepository.findByEmail(username).orElseThrow();
        AppointmentSlot appointmentSlot = appointmentSlotRepository.findById(slotId).orElseThrow();
        if (appointmentSlot.getPatient() != null && account.getId().equals(appointmentSlot.getPatient().getId())){
            return appointmentMapper.toDetailedResponse(appointmentSlot);
        }
        if (account.getRole() == AccountRoleEnum.ROLE_DOCTOR){
            Therapist therapist = therapistRepository.findByAccountId(account.getId()).orElseThrow();
            if (appointmentSlot.getTherapist().getId().equals(therapist.getId())) {
                return appointmentMapper.toDetailedResponse(appointmentSlot);
            }
        } throw new AccessDeniedException("Nie masz dostępu do danych tego terminu.");
    }

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public List<AppointmentSlot> getAvailableAppointmentSlotsForDate(UUID therapistId, LocalDate localDate) {
        LocalDateTime startDateTime = localDate.atStartOfDay();
        LocalDateTime endDateTime = localDate.atTime(LocalTime.MAX);

        return appointmentSlotRepository.findByStatusAndTherapistIdAndStartTimeBetween(
                AppointmentStatusEnum.OPEN,
                therapistId,
                startDateTime,
                endDateTime
        );
    }
    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public List<GetDetailedAppointmentSlotResponse> getMyAppointmentHistory(String username) {
    Account account = accountRepository.findByEmail(username).orElseThrow();
    LocalDateTime today = LocalDateTime.now();
    return appointmentSlotRepository.findAllByPatientIdAndStartTimeBeforeOrderByStartTimeDesc(account.getId(), today).stream().map(appointmentMapper::toDetailedResponse).toList();
    }

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public List<GetDetailedAppointmentSlotResponse> getPatientAppointmentHistory(String username, UUID patientId) {
        Therapist therapist = getTherapistByUsername(username);
        if (!appointmentSlotRepository.existsByPatientIdAndTherapistId(patientId, therapist.getId())) {
            throw new AccessDeniedException("Nie masz uprawnień, to nie jest Twój pacjent.");
        }
        LocalDateTime today = LocalDateTime.now();
    return appointmentSlotRepository.findAllByPatientIdAndStartTimeBeforeOrderByStartTimeDesc(patientId, today).stream().map(appointmentMapper::toDetailedResponse).toList();
    }

    public List<GetDetailedAppointmentSlotResponse> getMyAppointmentPlanned(String username) {
        Account account = accountRepository.findByEmail(username).orElseThrow();
        LocalDateTime today = LocalDateTime.now();
        return appointmentSlotRepository.findAllByPatientIdAndStartTimeGreaterThanEqualOrderByStartTimeAsc(account.getId(), today).stream().map(appointmentMapper::toDetailedResponse).toList();
    }
}
