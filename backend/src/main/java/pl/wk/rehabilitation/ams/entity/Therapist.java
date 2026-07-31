package pl.wk.rehabilitation.ams.entity;

import jakarta.persistence.*;
import lombok.*;
import pl.wk.rehabilitation.utill.AbstractEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "therapist")
public class Therapist extends AbstractEntity {
    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;

    private String briefBio;
    private String fullBio;
    private String specialization;

    @ManyToMany
    @JoinTable(
            name = "therapist_procedures",
            joinColumns = @JoinColumn(name = "therapist_id"),
            inverseJoinColumns = @JoinColumn(name = "procedure_id")
    )
    private List<Procedure> procedures;

}
