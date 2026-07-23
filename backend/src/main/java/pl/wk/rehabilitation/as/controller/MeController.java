package pl.wk.rehabilitation.as.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.as.dto.GetAccountResponse;
import pl.wk.rehabilitation.as.dto.UpdateAccountRequest;
import pl.wk.rehabilitation.as.service.MeService;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MeController {

    private final MeService meService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_DOCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<GetAccountResponse> getMyAccount(Authentication authentication){
        Account account = (Account) authentication.getPrincipal();
        return ResponseEntity.ok(GetAccountResponse.from(account));
    }

    @PatchMapping
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_DOCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<GetAccountResponse> updateMyData(@RequestBody UpdateAccountRequest updateAccountRequest, Authentication authentication){
        Account account = (Account) authentication.getPrincipal();
        return ResponseEntity.ok(meService.updateAccount(updateAccountRequest, account.getId()));
    }

}
