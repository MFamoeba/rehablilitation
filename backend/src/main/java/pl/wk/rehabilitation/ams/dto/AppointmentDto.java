package pl.wk.rehabilitation.ams.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {

    private UUID therapist;
    private UUID patient;
    private LocalDateTime startTime;
    private UUID procedure;
    private String room;
    
}
