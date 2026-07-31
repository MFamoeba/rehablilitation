package pl.wk.rehabilitation.ams.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.ams.dto.GetDetailedAppointmentSlotResponse;
import pl.wk.rehabilitation.ams.dto.UpdateAppointmentDetailsRequest;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.entity.AppointmentSlot;
import pl.wk.rehabilitation.ams.service.AppointmentSlotService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentSlotController {

    private final AppointmentSlotService appointmentSlotService;


    @GetMapping("/available")
    public ResponseEntity<List<AppointmentSlot>> getAppointmentSlotsForDate(
            @RequestParam UUID therapistId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate localDate){

        return ResponseEntity.ok(appointmentSlotService.getAvailableAppointmentSlotsForDate(therapistId, localDate));
    }


    @PreAuthorize("hasRole('ROLE_PATIENT')")
    @PostMapping("/{slotId}/book")
    public ResponseEntity<AppointmentSlot> bookAppointmentSlot(
            @PathVariable UUID slotId,
            Authentication authentication){
        String username = authentication.getName();
        return ResponseEntity.ok(appointmentSlotService.book(slotId, username));
    }

    @PreAuthorize("hasRole('ROLE_USER'")
    @GetMapping("/me/history")
    public ResponseEntity<List<GetDetailedAppointmentSlotResponse>> getAppointmentHistory(Authentication authentication){
        String username = authentication.getName();
        return ResponseEntity.ok(appointmentSlotService.getMyAppointmentHistory(username));
    }
    @PreAuthorize("hasRole('ROLE_USER'")
    @GetMapping("/me/planned")
    public ResponseEntity<List<GetDetailedAppointmentSlotResponse>> getAppointmentPlanned(Authentication authentication){
        String username = authentication.getName();
        return ResponseEntity.ok(appointmentSlotService.getMyAppointmentPlanned(username));
    }

    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    @GetMapping("/patient/{patient_id}/history")
    public ResponseEntity<List<GetDetailedAppointmentSlotResponse>> getAppointmentHistoryForPatient(Authentication authentication, @PathVariable UUID patient_id){
        String username = authentication.getName();
        return ResponseEntity.ok(appointmentSlotService.getPatientAppointmentHistory(username, patient_id));
    }

    @GetMapping("/me/scheduled")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<List<GetDetailedAppointmentSlotResponse>> getScheduledAppointmentsForDate(
            Authentication authentication,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate){
        String username = authentication.getName();
        return ResponseEntity.ok(appointmentSlotService.getAllAppointmentSlotsForDate(username, startDate));
    }


    @PostMapping("/me/generate")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<Void> generateSlots(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Authentication authentication) {
        String username = authentication.getName();
        appointmentSlotService.generateSlotsForRange(startDate, endDate, username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{slotId}")
    @PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_PATIENT')")
    public ResponseEntity<GetDetailedAppointmentSlotResponse> getSlotDetails(
            Authentication authentication,
            @PathVariable UUID slotId) {
        String username = authentication.getName();
        return ResponseEntity.ok(appointmentSlotService.getAppointmentDetails(username, slotId));
    }

    @PatchMapping("/{slotId}")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<AppointmentSlot> updateSlotDetails(
            Authentication authentication,
            @PathVariable UUID slotId,
            @RequestBody UpdateAppointmentDetailsRequest updateAppointmentDetailsRequest) {
        String username = authentication.getName();
        return ResponseEntity.ok(appointmentSlotService.updateAppointmentDetails(username, slotId, updateAppointmentDetailsRequest));
    }

    @DeleteMapping("/{slotId}")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<Void> deleteSlot(@PathVariable UUID slotId,
                                           Authentication authentication) {
        Account account = (Account) authentication.getPrincipal();
        appointmentSlotService.deleteSlot(slotId, account.getId());
        return ResponseEntity.ok().build();
    }

}
