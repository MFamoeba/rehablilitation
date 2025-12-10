package pl.wk.rehabilitation.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.wk.rehabilitation.utill.AbstractEntity;

@Entity
@AllArgsConstructor
@Getter
@Setter
public class Therapist extends AbstractEntity {

    private String email;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String brief;
    private String specialization;
}
