package pl.wk.rehabilitation.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.boot.internal.Abstract;
import pl.wk.rehabilitation.utill.AbstractEntity;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "account")
public class Account extends AbstractEntity {

    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String phoneNumber;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;


}
