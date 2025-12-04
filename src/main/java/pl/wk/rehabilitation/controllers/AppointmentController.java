package pl.wk.rehabilitation.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.model.Appointment;
import pl.wk.rehabilitation.service.AppointmentService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAll(){
        return appointmentService.getAll();
    }

    @GetMapping("/{id}")
    public Appointment getById(@PathVariable int id){
        return appointmentService.get(id);
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment){
        return ResponseEntity.ok(appointmentService.create(appointment));
    }

    @PatchMapping("/{id}")
    public Appointment update(@PathVariable int id, @RequestBody Appointment appointment){
        return appointmentService.update(id, appointment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        appointmentService.delete(id);
    }
}
