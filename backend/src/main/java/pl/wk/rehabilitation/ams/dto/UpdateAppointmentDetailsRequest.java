package pl.wk.rehabilitation.ams.dto;

import pl.wk.rehabilitation.utill._enum.AppointmentStatusEnum;

public record UpdateAppointmentDetailsRequest(
        String room,
        String notes,
        AppointmentStatusEnum status
) {
}
