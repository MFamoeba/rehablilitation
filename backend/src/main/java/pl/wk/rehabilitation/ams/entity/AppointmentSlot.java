package pl.wk.rehabilitation.ams.entity;

import jakarta.persistence.*;
import lombok.*;
import pl.wk.rehabilitation.utill.AbstractEntity;
import pl.wk.rehabilitation.utill._enum.AppointmentStatusEnum;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Table(name = "appointment")
public class AppointmentSlot extends AbstractEntity {

    @ManyToOne
    private Account patient;
    @ManyToOne
    private Therapist therapist;

    private LocalDateTime startTime;
    private LocalDateTime endTime;


    @Enumerated(EnumType.STRING)
    private AppointmentStatusEnum status;


    @ManyToOne
    private Procedure procedure;

    boolean isPaid;

    private String room;
    @Column(length = 1024)
    private String notes;

    private String medicalAdvice;




}
