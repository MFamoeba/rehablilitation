package pl.wk.rehabilitation.ams.entity;

import jakarta.persistence.*;
import lombok.*;
import pl.wk.rehabilitation.utill.AbstractEntity;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "defaultworkschedule")
public class DefaultWorkSchedule extends AbstractEntity {

    @Column(name = "day_of_week")
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    private LocalTime startTime;
    private LocalTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

}
