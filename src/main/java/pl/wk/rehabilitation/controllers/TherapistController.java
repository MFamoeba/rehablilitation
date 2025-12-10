package pl.wk.rehabilitation.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.entity.Therapist;
import pl.wk.rehabilitation.service.TherapistService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/therapist")
@RequiredArgsConstructor
public class TherapistController {

    private final TherapistService therapistService;

    @GetMapping
    public List<Therapist> getAll() {
        return therapistService.getAll();
    }

    @GetMapping("/{id}")
    public Therapist getById(@PathVariable UUID id) {
        return therapistService.getById(id);
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
