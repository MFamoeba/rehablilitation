package pl.wk.rehabilitation.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.wk.rehabilitation.utill.AbstractEntity;

@Entity
@AllArgsConstructor
@Getter
@Setter
@Table(name = "room")
public class Room extends AbstractEntity {
    private String name;
    private int floor;

}
