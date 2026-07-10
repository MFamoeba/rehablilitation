package pl.wk.rehabilitation.as.dto;

import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

import java.util.UUID;

public record GetAccountResponse (
        UUID id,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        AccountRoleEnum role
){
    public static GetAccountResponse from(Account account) {
        return new GetAccountResponse(
                account.getId(),
                account.getEmail(),
                account.getFirstName(),
                account.getLastName(),
                account.getPhoneNumber(),
                account.getRole()
        );
    }
}