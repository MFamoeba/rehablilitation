package pl.wk.rehabilitation.auth.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.auth.model.AuthenticationRequest;
import pl.wk.rehabilitation.auth.model.AuthenticationResponse;
import pl.wk.rehabilitation.auth.model.RegisterRequest;
import pl.wk.rehabilitation.entity.Account;
import pl.wk.rehabilitation.repository.AccountRepository;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = Account.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .roles(List.of(AccountRoleEnum.ROLE_USER))
                .build();

        accountRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        var user = accountRepository.findByEmail(request.email())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);


        return new AuthenticationResponse(jwtToken);
    }
}