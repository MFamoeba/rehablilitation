package pl.wk.rehabilitation.as.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.as.dto.GetAccountDetailedResponse;
import pl.wk.rehabilitation.as.dto.GetAccountResponse;
import pl.wk.rehabilitation.as.service.AccountService;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<GetAccountDetailedResponse>> getAllAccounts(){
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/{account_id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GetAccountDetailedResponse> getAccount(@PathVariable UUID account_id){
        return ResponseEntity.ok(accountService.getAccount(account_id));
    }

    @PatchMapping("/{account_id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GetAccountDetailedResponse> changeRole(@PathVariable UUID account_id, @RequestBody AccountRoleEnum role){
        return ResponseEntity.ok(accountService.changeRole(account_id, role));

    }


}
