package pl.wk.rehabilitation.ams.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.ams.entity.Procedure;
import pl.wk.rehabilitation.ams.service.ProcedureService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/procedures")
@RequiredArgsConstructor
public class ProcedureController {
    private final ProcedureService procedureService;

    @GetMapping
    public List<Procedure> getAllProcedures() {
        return procedureService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Procedure> getProcedureById(@PathVariable UUID id) {
        return ResponseEntity.ok(procedureService.getById(id));
    }

    @PostMapping
    @PreAuthorize( "hasRole('ROLE_ADMIN')")
    public ResponseEntity<Procedure> createProcedure(@RequestBody Procedure procedure) {
        return ResponseEntity.ok(procedureService.create(procedure));
    }

    @PatchMapping("/{id}")
    @PreAuthorize( "hasRole('ROLE_ADMIN')")
    public ResponseEntity<Procedure> updateProcedure(@PathVariable UUID id, @RequestBody Procedure procedure) {
        return ResponseEntity.ok(procedureService.update(id, procedure));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize( "hasRole('ROLE_ADMIN')")
    public void deleteProcedure(@PathVariable UUID id) {
        procedureService.delete(id);
    }

}
