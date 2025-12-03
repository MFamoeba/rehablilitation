package pl.wk.rehabilitation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    private String doctorName;
    private LocalDateTime timeStarts;
    
}
