package pl.wk.rehabilitation.auth.model;

public record AuthenticationRequest(
        String email,
        String password
) {
}