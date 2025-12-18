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
    private Account patient;
    @ManyToOne
    private Therapist therapist;
    private LocalDateTime startTime;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus appointmentStatus;

    @ManyToOne
    private Procedure procedure;

    private String room;
    @Column(length = 1024)
    private String notes;



}
