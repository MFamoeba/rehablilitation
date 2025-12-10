package pl.wk.rehabilitation.model;

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
    private LocalDateTime timeStarts;
    
}
