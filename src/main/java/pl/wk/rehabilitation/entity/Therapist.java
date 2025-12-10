package pl.wk.rehabilitation.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.wk.rehabilitation.utill.AbstractEntity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "therapist")
public class Therapist extends AbstractEntity {

    private String email;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String brief;
    private String specialization;
}
