package pl.wk.rehabilitation.ams.dto;

import java.util.UUID;

public record GetTherapistsResponse(
        UUID id,
        String firstName,
        String lastName,
        String brief,
        String specialization
) {}
