package pl.wk.rehabilitation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.wk.rehabilitation.utill.AbstractEntity;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

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

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<AccountRoleEnum> roles;


}
