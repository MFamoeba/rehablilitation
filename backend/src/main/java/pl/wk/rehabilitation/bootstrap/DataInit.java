package pl.wk.rehabilitation.bootstrap;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.repository.AccountRepository; // Zakładam, że masz takie repozytorium
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInit implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (accountRepository.count() == 0) {

            Account admin = Account.builder()
                    .email("admin@wk.pl")
                    .password(passwordEncoder.encode("admin123"))
                    .firstname("Jan")
                    .lastname("Kowalski")
                    .phoneNumber("123456789")
                    .roles(List.of(AccountRoleEnum.ROLE_ADMIN))
                    .build();

            Account user = Account.builder()
                    .email("user@wk.pl")
                    .password(passwordEncoder.encode("haslo123"))
                    .firstname("Anna")
                    .lastname("Nowak")
                    .phoneNumber("987654321")
                    .roles(List.of(AccountRoleEnum.ROLE_USER))
                    .build();

            accountRepository.saveAll(List.of(admin, user));
        }
    }
}