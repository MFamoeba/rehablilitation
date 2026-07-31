package pl.wk.rehabilitation.ams.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.converter.WorkScheduleMapper;
import pl.wk.rehabilitation.ams.dto.WorkScheduleItemDto;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.entity.WorkSchedule;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.repository.AccountRepository;
import pl.wk.rehabilitation.ams.repository.WorkScheduleRepository;
import pl.wk.rehabilitation.ams.repository.TherapistRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkScheduleService {
    private final WorkScheduleRepository workScheduleRepository;
    private final TherapistRepository therapistRepository;
    private final WorkScheduleMapper workScheduleMapper;
    private final AccountRepository accountRepository;

    @Transactional
    public List<WorkScheduleItemDto> updateWorkSchedule(List<WorkScheduleItemDto> workScheduleItemDtos, String username) {
        if (workScheduleItemDtos == null) {
            throw new IllegalArgumentException("Lista harmonogramu nie może być pusta");
        }
        Account account = accountRepository.findByEmail(username).orElseThrow();
        Therapist therapist = therapistRepository.findByAccountId(account.getId()).orElseThrow();

        List<WorkSchedule> workScheduleRequests = workScheduleRepository.getAllByTherapistId(therapist.getId());
        workScheduleRepository.deleteAll(workScheduleRequests);

        List<WorkSchedule> workScheduleToCreate = workScheduleItemDtos.stream()
                .map(scd -> workScheduleMapper.toEntity(scd, therapist))
                .toList();

        return workScheduleRepository.saveAll(workScheduleToCreate).stream().map(workScheduleMapper::toDto).toList();
    }

    public List<WorkScheduleItemDto> getWorkSchedule(String username) {
        Account account = accountRepository.findByEmail(username).orElseThrow();
        Therapist therapist = therapistRepository.findByAccountId(account.getId()).orElseThrow(() -> new IllegalArgumentException("Zalogowane konto nie jest powiązane z żadnym terapeutą."));


        return workScheduleRepository.getAllByTherapistId(therapist.getId()).stream().map(workScheduleMapper::toDto).toList();
    }
}
