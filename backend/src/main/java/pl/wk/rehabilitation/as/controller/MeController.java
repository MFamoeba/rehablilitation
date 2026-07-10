package pl.wk.rehabilitation.as.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.as.service.MeService;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MeController {

    private final MeService meService;

    @GetMapping
    public ResponseEntity<Account> getMyAccount() throws Exception {
        return ResponseEntity.ok(meService.getAccount());
    }
    //todo add update

}
