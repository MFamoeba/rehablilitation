package pl.wk.rehabilitation.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wk.rehabilitation.entity.Account;
import pl.wk.rehabilitation.service.AccountService;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AccountControler {
    private final AccountService accountService;

    @PostMapping("register")
    public Account register(@RequestBody Account account){
        return accountService.create(account);
    }

}
