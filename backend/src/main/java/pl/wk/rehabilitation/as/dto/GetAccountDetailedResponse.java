package pl.wk.rehabilitation.as.dto;

import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

import java.util.UUID;

public record GetAccountDetailedResponse(UUID id,
                                         String email,
                                         String firstName,
                                         String lastName,
                                         String phoneNumber,
                                         AccountRoleEnum role) {
    public static GetAccountDetailedResponse from(Account account) {
        return new GetAccountDetailedResponse(
                account.getId(),
                account.getEmail(),
                account.getFirstName(),
                account.getLastName(),
                account.getPhoneNumber(),
                account.getRole()
        );
    }
}
