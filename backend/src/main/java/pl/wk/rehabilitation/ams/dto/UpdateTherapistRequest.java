package pl.wk.rehabilitation.ams.dto;

import pl.wk.rehabilitation.ams.entity.Procedure;

import java.util.List;

public record UpdateTherapistRequest(
        String briefBio,
        String fullBio,
        String specialization,
        List<Procedure> procedures
)
{ }
