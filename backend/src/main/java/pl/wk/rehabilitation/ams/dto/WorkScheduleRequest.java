package pl.wk.rehabilitation.ams.dto;

import java.util.List;
import java.util.UUID;

public record WorkScheduleRequest(
        UUID therapistId,
        List<WorkScheduleItemDto> workScheduleItems) {
}
