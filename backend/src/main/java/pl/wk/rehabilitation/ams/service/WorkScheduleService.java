package pl.wk.rehabilitation.ams.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.converter.DefaultWorkScheduleMapper;
import pl.wk.rehabilitation.ams.dto.DefaultWorkScheduleRequest;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.entity.DefaultWorkSchedule;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.repository.DefaultWorkScheduleRepository;
import pl.wk.rehabilitation.ams.repository.TherapistRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DefaultWorkScheduleService {
    private final DefaultWorkScheduleRepository defaultWorkScheduleRepository;
    private final TherapistRepository therapistRepository;
    private final DefaultWorkScheduleMapper defaultWorkScheduleMapper;

    @Transactional
    public void updateDefaultWorkSchedule(DefaultWorkScheduleRequest defaultWorkScheduleRequestDto) {
        if (defaultWorkScheduleRequestDto.defaultWorkScheduleItemDtos() == null) {
            throw new IllegalArgumentException("Lista harmonogramu nie może być pusta");
        }

        Therapist therapist = therapistRepository.findById(defaultWorkScheduleRequestDto.therapistId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono terapeuty o podanym ID"));

        List<DefaultWorkSchedule> defaultWorkScheduleRequests = defaultWorkScheduleRepository.getAllByTherapistId(therapist.getId());
        defaultWorkScheduleRepository.deleteAll(defaultWorkScheduleRequests);

        List<DefaultWorkSchedule> defaultWorkScheduleToCreate = defaultWorkScheduleRequestDto.defaultWorkScheduleItemDtos().stream()
                .map(scd -> defaultWorkScheduleMapper.toEntity(scd, therapist))
                .toList();

        defaultWorkScheduleRepository.saveAll(defaultWorkScheduleToCreate);
    }

    public DefaultWorkScheduleRequest getDefaultWorkSchedule() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof Account account)) {
            throw new IllegalStateException("Użytkownik nie jest zalogowany");
        }
        Therapist therapist = therapistRepository.findByAccountId(account.getId())
                .orElseThrow(() -> new IllegalArgumentException("Zalogowane konto nie jest powiązane z żadnym terapeutą."));

        List<DefaultWorkSchedule> entities = defaultWorkScheduleRepository.getAllByTherapistId(therapist.getId());

        return defaultWorkScheduleMapper.toRequest(entities, therapist.getId());
    }

    public void updateDefaultWorkScheduleForTherapist(DefaultWorkScheduleRequest defaultWorkScheduleRequestDto, UUID therapistId) {
        if (defaultWorkScheduleRequestDto.defaultWorkScheduleItemDtos() == null) {
            throw new IllegalArgumentException("Lista harmonogramu nie może być pusta");
        }

        Therapist therapist = therapistRepository.findById(therapistId).orElseThrow();

        List<DefaultWorkSchedule> defaultWorkScheduleRequests = defaultWorkScheduleRepository.getAllByTherapistId(therapist.getId());
        defaultWorkScheduleRepository.deleteAll(defaultWorkScheduleRequests);

        List<DefaultWorkSchedule> defaultWorkScheduleToCreate = defaultWorkScheduleRequestDto.defaultWorkScheduleItemDtos().stream()
                .map(scd -> defaultWorkScheduleMapper.toEntity(scd, therapist))
                .toList();

        defaultWorkScheduleRepository.saveAll(defaultWorkScheduleToCreate);
    }

    public DefaultWorkScheduleRequest getDefaultWorkScheduleForTherapist(UUID therapistId) {
        Therapist therapist = therapistRepository.findById(therapistId).orElseThrow();
        List<DefaultWorkSchedule> entities = defaultWorkScheduleRepository.getAllByTherapistId(therapist.getId());
        return defaultWorkScheduleMapper.toRequest(entities, therapist.getId());
    }
}
