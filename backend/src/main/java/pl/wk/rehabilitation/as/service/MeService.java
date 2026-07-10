package pl.wk.rehabilitation.as.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.repository.AccountRepository;
import pl.wk.rehabilitation.as.dto.GetAccountResponse;
import pl.wk.rehabilitation.as.dto.UpdateAccountRequest;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MeService {
    private final AccountRepository accountRepository;

    @Transactional
    public GetAccountResponse updateAccount(UpdateAccountRequest updateAccountRequest, UUID id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Account not found"));
        account.setFirstName(updateAccountRequest.firstName());
        account.setLastName(updateAccountRequest.lastName());
        account.setPhoneNumber(updateAccountRequest.phoneNumber());
        return GetAccountResponse.from(accountRepository.save(account));
    }


}
