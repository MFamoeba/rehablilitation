package pl.wk.rehabilitation.auth.model;

public record RegisterRequest(
        String firstname,
        String lastname,
        String email,
        String password
) {
}