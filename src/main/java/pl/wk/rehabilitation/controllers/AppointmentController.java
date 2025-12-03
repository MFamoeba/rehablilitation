package pl.wk.rehabilitation.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.model.Appointment;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    List<Appointment> appointments = new ArrayList<>();

    @GetMapping
    public List<Appointment> getAll(){
        return appointments;
    }

    @GetMapping("/{id}")
    public Appointment getById(@PathVariable int id){
        return appointments.get(id);
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment){
        appointments.add(appointment);
        return ResponseEntity.ok(appointment);
    }

    @PatchMapping("/{id}")
    public Appointment update(@PathVariable int id, @RequestBody Appointment appointment){
        appointments.set(id, appointment);
        return appointments.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        appointments.remove(id);
    }
}
