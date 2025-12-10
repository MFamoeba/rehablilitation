package pl.wk.rehabilitation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import pl.wk.rehabilitation.utill.AbstractEntity;
import pl.wk.rehabilitation.utill._enum.AppointmentStatus;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Table(name = "appointment")
public class Appointment extends AbstractEntity {
    @ManyToOne
    Account patient;
    @ManyToOne
    Therapist therapist;
    LocalDateTime startTime;

    @Enumerated(EnumType.STRING)
    AppointmentStatus appointmentStatus;

}
