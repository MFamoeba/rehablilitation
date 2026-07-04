package pl.wk.rehabilitation.ams.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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


    @GetMapping
    public ResponseEntity<List<AppointmentSlot>> getAppointmentSlotsForWeek(
            @RequestParam UUID therapistId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate localDate){

        return ResponseEntity.ok(appointmentSlotService.getAppointmentSlotsForWeek(therapistId, localDate));
    }

    @PostMapping("/{slotId}/book")
    public ResponseEntity<AppointmentSlot> bookAppointmentSlot(
            @PathVariable UUID slotId,
            Authentication authentication){
        if (authentication == null || !authentication.isAuthenticated())
            return ResponseEntity.status(401).build();
        String userEmail = authentication.getName();
        return ResponseEntity.ok(appointmentSlotService.book(slotId, userEmail));
    }

    @GetMapping("/temp") ResponseEntity<List<AppointmentSlot>> getAllSlots(){
        return ResponseEntity.ok(appointmentSlotService.getAllAppointements());
    }





}
