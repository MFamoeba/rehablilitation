package pl.wk.rehabilitation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import pl.wk.rehabilitation.utill.AbstractEntity;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Procedure extends AbstractEntity {
    private String name;
    @Column(length = 1024)
    private String description;
    private Integer durationMinutes;
    private Double price;
}
