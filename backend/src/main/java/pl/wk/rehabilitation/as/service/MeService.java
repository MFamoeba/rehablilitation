package pl.wk.rehabilitation.as.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.repository.AccountRepository;

@Service
@RequiredArgsConstructor
public class MeService {
    private final AccountRepository accountRepository;

    public Account getAccount() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = (Account) authentication.getPrincipal();
        return accountRepository.findById(account.getId()).orElseThrow(() -> new Exception("Account not found"));
    }
}
