package pl.wk.rehabilitation.ams.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.ams.dto.GetTherapistsResponse;
import pl.wk.rehabilitation.ams.dto.UpdateTherapistRequest;
import pl.wk.rehabilitation.ams.service.TherapistService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/therapist")
@RequiredArgsConstructor
public class TherapistController {

    private final TherapistService therapistService;

    @GetMapping
    public ResponseEntity<List<GetTherapistsResponse>> getAll( @RequestParam(required = false) UUID procedureId) {
        if (procedureId != null) {
            return ResponseEntity.ok(therapistService.getAllByProcedureId(procedureId));
        }
        return ResponseEntity.ok(therapistService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetTherapistsResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(therapistService.getById(id));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<GetTherapistsResponse> getMyTherapistDetails(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(therapistService.getMyTherapistDetails(username));
    }

    @PatchMapping("/me")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<GetTherapistsResponse> updateMyTherapistDetails(Authentication authentication, @RequestBody UpdateTherapistRequest therapistDetails) {
        String username = authentication.getName();
        return ResponseEntity.ok(therapistService.updateTherapistDetails(username, therapistDetails));
    }

}
