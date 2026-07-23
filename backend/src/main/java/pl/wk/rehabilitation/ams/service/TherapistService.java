package pl.wk.rehabilitation.ams.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.wk.rehabilitation.ams.converter.TherapistMapper;
import pl.wk.rehabilitation.ams.dto.GetTherapistsResponse;
import pl.wk.rehabilitation.ams.dto.UpdateTherapistRequest;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.repository.AccountRepository;
import pl.wk.rehabilitation.ams.repository.TherapistRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TherapistService {

    private final TherapistRepository therapistRepository;
    private final TherapistMapper therapistMapper;
    private final AccountRepository accountRepository;

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public List<GetTherapistsResponse> getAll() {
        return therapistRepository.findAll().stream().map(therapistMapper::toGetTherapistsResponse).toList();
    }

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public GetTherapistsResponse getById(UUID id) {
        return therapistMapper.toGetTherapistsResponse(therapistRepository.findById(id).orElseThrow());
    }

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public GetTherapistsResponse getMyTherapistDetails(String username) {
    Account account = accountRepository.findByEmail(username).orElseThrow();
    return therapistMapper.toGetTherapistsResponse(therapistRepository.findByAccountId(account.getId()).orElseThrow());
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public GetTherapistsResponse updateTherapistDetails(String username, UpdateTherapistRequest therapistDetails) {
        Account account = accountRepository.findByEmail(username).orElseThrow();
        Therapist therapist = therapistRepository.findByAccountId(account.getId()).orElseThrow();
        therapist.setBrief(therapistDetails.brief());
        therapist.setSpecialization(therapistDetails.specialization());
        return therapistMapper.toGetTherapistsResponse(therapistRepository.save(therapist));
    }
}
