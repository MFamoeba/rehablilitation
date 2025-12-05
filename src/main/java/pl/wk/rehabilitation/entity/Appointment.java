package pl.wk.rehabilitation.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.wk.rehabilitation.utill.AbstractEntity;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@Getter
@Setter
@Table(name = "appointment")
public class Appointment extends AbstractEntity {
    @ManyToOne
    Account patient;
    @ManyToOne
    Account doctor;
    LocalDateTime startTime;
}
