package pl.wk.rehabilitation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.wk.rehabilitation.utill.AbstractEntity;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "workschedule",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"therapist_id", "day_of_week"})
        }
)
public class WorkSchedule extends AbstractEntity {

    @Column(name = "day_of_week")
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    private LocalTime startTime;
    private LocalTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

}
