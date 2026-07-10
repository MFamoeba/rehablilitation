package pl.wk.rehabilitation.as.dto;

import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

import java.util.UUID;

public record UpdateAccountRequest(
        String firstName,
        String lastName,
        String phoneNumber
) {
}
