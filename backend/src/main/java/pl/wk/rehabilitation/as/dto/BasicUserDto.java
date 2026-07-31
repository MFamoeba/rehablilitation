package pl.wk.rehabilitation.as.dto;

import java.util.UUID;

public record BasicUserDto(
        UUID id,
        String email,
        String firstName,
        String lastName,
        String phoneNumber
) {
}
