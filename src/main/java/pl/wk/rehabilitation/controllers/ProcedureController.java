package pl.wk.rehabilitation.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.entity.Procedure;
import pl.wk.rehabilitation.service.ProcedureService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/procedures")
@RequiredArgsConstructor
public class ProcedureController {
    private final ProcedureService procedureService;

    @GetMapping
    public List<Procedure> getAll() {
        return procedureService.getAll();
    }

    @GetMapping("/{id}")
    public Procedure getById(@PathVariable UUID id) {
        return procedureService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Procedure> create(@RequestBody Procedure procedure) {
        return ResponseEntity.ok(procedureService.create(procedure));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        procedureService.delete(id);
    }

}
