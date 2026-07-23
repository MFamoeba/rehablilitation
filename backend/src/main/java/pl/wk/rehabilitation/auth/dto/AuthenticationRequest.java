package pl.wk.rehabilitation.auth.dto;

public record AuthenticationRequest(
        String email,
        String password
) {
}