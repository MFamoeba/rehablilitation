package pl.wk.rehabilitation.ams.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.converter.WorkScheduleMapper;
import pl.wk.rehabilitation.ams.dto.WorkScheduleRequest;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.entity.WorkSchedule;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.repository.WorkScheduleRepository;
import pl.wk.rehabilitation.ams.repository.TherapistRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkScheduleService {
    private final WorkScheduleRepository workScheduleRepository;
    private final TherapistRepository therapistRepository;
    private final WorkScheduleMapper workScheduleMapper;

    @Transactional
    public void updateWorkSchedule(WorkScheduleRequest workScheduleRequestDto) {
        if (workScheduleRequestDto.workScheduleItems() == null) {
            throw new IllegalArgumentException("Lista harmonogramu nie może być pusta");
        }

        Therapist therapist = therapistRepository.findById(workScheduleRequestDto.therapistId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono terapeuty o podanym ID"));

        List<WorkSchedule> workScheduleRequests = workScheduleRepository.getAllByTherapistId(therapist.getId());
        workScheduleRepository.deleteAll(workScheduleRequests);

        List<WorkSchedule> workScheduleToCreate = workScheduleRequestDto.workScheduleItems().stream()
                .map(scd -> workScheduleMapper.toEntity(scd, therapist))
                .toList();

        workScheduleRepository.saveAll(workScheduleToCreate);
    }

    public WorkScheduleRequest getWorkSchedule() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof Account account)) {
            throw new IllegalStateException("Użytkownik nie jest zalogowany");
        }
        Therapist therapist = therapistRepository.findByAccountId(account.getId())
                .orElseThrow(() -> new IllegalArgumentException("Zalogowane konto nie jest powiązane z żadnym terapeutą."));

        List<WorkSchedule> entities = workScheduleRepository.getAllByTherapistId(therapist.getId());

        return workScheduleMapper.toRequest(entities, therapist.getId());
    }

    public void updateWorkScheduleForTherapist(WorkScheduleRequest workScheduleRequestDto, UUID therapistId) {
        if (workScheduleRequestDto.workScheduleItems() == null) {
            throw new IllegalArgumentException("Lista harmonogramu nie może być pusta");
        }

        Therapist therapist = therapistRepository.findById(therapistId).orElseThrow();

        List<WorkSchedule> workScheduleRequests = workScheduleRepository.getAllByTherapistId(therapist.getId());
        workScheduleRepository.deleteAll(workScheduleRequests);

        List<WorkSchedule> workScheduleToCreate = workScheduleRequestDto.workScheduleItems().stream()
                .map(scd -> workScheduleMapper.toEntity(scd, therapist))
                .toList();

        workScheduleRepository.saveAll(workScheduleToCreate);
    }

    public WorkScheduleRequest getWorkScheduleForTherapist(UUID therapistId) {
        Therapist therapist = therapistRepository.findById(therapistId).orElseThrow();
        List<WorkSchedule> entities = workScheduleRepository.getAllByTherapistId(therapist.getId());
        return workScheduleMapper.toRequest(entities, therapist.getId());
    }
}
