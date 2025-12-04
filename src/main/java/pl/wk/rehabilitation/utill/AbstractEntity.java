package pl.wk.rehabilitation.utill;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@MappedSuperclass
@Getter
@ToString
public abstract class AbstractEntity {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    @Column(name = "id", columnDefinition = "UUID", updatable = false)
    private UUID id;
}
