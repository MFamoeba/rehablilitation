package pl.wk.rehabilitation.ams.dto;

import pl.wk.rehabilitation.utill._enum.AppointmentStatusEnum;

public record UpdateAppointmentDetailsRequest(

        String notes,
        AppointmentStatusEnum status
) {
}
