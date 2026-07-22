package pl.wk.rehabilitation.auth.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.wk.rehabilitation.auth.model.AuthenticationRequest;
import pl.wk.rehabilitation.auth.model.AuthenticationResponse;
import pl.wk.rehabilitation.auth.model.RegisterRequest;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.repository.AccountRepository;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class}, timeoutString = "${transaction.timeout}")
    public AuthenticationResponse register(RegisterRequest request) {
        var user = Account.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .phoneNumber(request.phoneNumber())
                .role(AccountRoleEnum.ROLE_USER)
                .build();

        user = accountRepository.saveAndFlush(user);

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