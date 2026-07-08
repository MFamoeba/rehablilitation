package pl.wk.rehabilitation.auth.model;

public record RegisterRequest(
        String email,
        String password,
        String firstName,
        String lastName,
        String phoneNumber
) {
}