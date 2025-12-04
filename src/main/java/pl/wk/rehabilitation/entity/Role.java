package pl.wk.rehabilitation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import pl.wk.rehabilitation.utill.AbstractEntity;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;

@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Role extends AbstractEntity {

    @Column(nullable = false, unique = true, updatable = false, length = 32)
    @Enumerated(EnumType.STRING)
    private AccountRoleEnum name;

}
