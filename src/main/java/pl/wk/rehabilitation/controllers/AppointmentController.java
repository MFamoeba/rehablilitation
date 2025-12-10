package pl.wk.rehabilitation.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.entity.Appointment;
import pl.wk.rehabilitation.model.AppointmentDto;
import pl.wk.rehabilitation.service.AppointmentService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAll(){
        return appointmentService.getAll();
    }

    @GetMapping("/{id}")
    public Appointment getById(@PathVariable UUID id){
        return appointmentService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDto appointment) {
        return ResponseEntity.ok(appointmentService.create(appointment));
    }

    @PatchMapping("/{id}")
    public Appointment update(@PathVariable UUID id, @RequestBody Appointment appointment){
        return appointmentService.update(id, appointment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id){
        appointmentService.delete(id);
    }
}
