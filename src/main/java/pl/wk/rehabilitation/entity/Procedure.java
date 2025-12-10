package pl.wk.rehabilitation.entity;

import jakarta.persistence.Column;
import pl.wk.rehabilitation.utill.AbstractEntity;

public class Procedure extends AbstractEntity {
    private String name;
    @Column(length = 1024)
    private String description;
    private Integer durationMinutes;
    private Double price;
}
