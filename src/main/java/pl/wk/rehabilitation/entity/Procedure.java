package pl.wk.rehabilitation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import pl.wk.rehabilitation.utill.AbstractEntity;

@Entity
public class Procedure extends AbstractEntity {
    private String name;
    @Column(length = 1024)
    private String description;
    private Integer durationMinutes;
    private Double price;
}
