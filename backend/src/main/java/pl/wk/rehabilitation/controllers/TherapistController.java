package pl.wk.rehabilitation.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.entity.Therapist;
import pl.wk.rehabilitation.entity.WorkSchedule;
import pl.wk.rehabilitation.service.TherapistService;
import pl.wk.rehabilitation.service.WorkScheduleService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/therapist")
@RequiredArgsConstructor
public class TherapistController {

    private final TherapistService therapistService;
    private final WorkScheduleService workScheduleService;

    @GetMapping
    public List<Therapist> getAll() {
        return therapistService.getAll();
    }

    @GetMapping("/{id}")
    public Therapist getById(@PathVariable UUID id) {
        return therapistService.getById(id);
    }

    @GetMapping("/{id}/schedule")
    public List<WorkSchedule> getScheduleById(@PathVariable UUID id) {
        return workScheduleService.getAllByTherapistId(id);
    }

    @PostMapping
    public ResponseEntity<Therapist> create(@RequestBody Therapist therapist) {
        return ResponseEntity.ok(therapistService.create(therapist));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        therapistService.delete(id);
    }


}
