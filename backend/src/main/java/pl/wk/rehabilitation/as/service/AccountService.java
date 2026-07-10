package pl.wk.rehabilitation.as.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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

    public List<GetAccountDetailedResponse> getAllAccounts() {
        return accountRepository.findAll().stream().map(GetAccountDetailedResponse::from).toList();
    }

    public GetAccountDetailedResponse getAccount(UUID accountId) {
        return GetAccountDetailedResponse.from(
                accountRepository.findById(accountId).orElseThrow(() -> new IllegalArgumentException("Nie znaleziono konta.")));
    }

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
            Therapist therapist = new Therapist(account, "Lorem ipsum", "dolor sit amet");
            therapistRepository.save(therapist);
        }

        if (oldRole == AccountRoleEnum.ROLE_DOCTOR) {
            Therapist therapist = therapistRepository.findByAccountId(accountId).orElseThrow(() -> new IllegalArgumentException("Nie znaleziono lekarza."));
            therapistRepository.delete(therapist);
        }

        return GetAccountDetailedResponse.from(account);
    }
}
