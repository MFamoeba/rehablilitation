package pl.wk.rehabilitation.ams.dto;

import pl.wk.rehabilitation.ams.entity.Procedure;

import java.util.List;
import java.util.UUID;

public record GetTherapistsResponse(
        UUID id,
        String firstName,
        String lastName,
        String briefBio,
        String specialization,
        List<Procedure> procedures
) {}
