package pl.wk.rehabilitation.as.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.repository.AccountRepository;
import pl.wk.rehabilitation.ams.repository.TherapistRepository;
import pl.wk.rehabilitation.as.dto.GetAccountDetailedResponse;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final TherapistRepository therapistRepository;

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public List<GetAccountDetailedResponse> getAllAccounts() {
        return accountRepository.findAll().stream().map(GetAccountDetailedResponse::from).toList();
    }

    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public GetAccountDetailedResponse getAccount(UUID accountId) {
        return GetAccountDetailedResponse.from(
                accountRepository.findById(accountId).orElseThrow(() -> new IllegalArgumentException("Nie znaleziono konta.")));
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public GetAccountDetailedResponse changeRole(UUID accountId, AccountRoleEnum role) {
        if (role == null) {
            throw new IllegalArgumentException("Nowa rola nie może być pusta.");
        }
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono konta."));

        AccountRoleEnum oldRole = account.getRole();
        if (oldRole == role) {
            return GetAccountDetailedResponse.from(account);
        }
        account.setRole(role);
        accountRepository.save(account);
        if (role == AccountRoleEnum.ROLE_DOCTOR) {
            Therapist therapist = Therapist.builder()
                    .account(account)
                    .briefBio("Lorem ipsum")
                    .specialization("dolor sit amet")
                    .build();
            therapistRepository.save(therapist);
        }

        if (oldRole == AccountRoleEnum.ROLE_DOCTOR) {
            Therapist therapist = therapistRepository.findByAccountId(accountId).orElseThrow(() -> new IllegalArgumentException("Nie znaleziono lekarza."));
            therapistRepository.delete(therapist);
        }

        return GetAccountDetailedResponse.from(account);
    }
}
