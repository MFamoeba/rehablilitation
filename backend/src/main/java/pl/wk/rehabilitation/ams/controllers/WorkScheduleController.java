package pl.wk.rehabilitation.ams.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.ams.dto.WorkScheduleRequest;
import pl.wk.rehabilitation.ams.service.WorkScheduleService;

import java.util.UUID;

@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class WorkScheduleController {

    private final WorkScheduleService workScheduleService;

    @PostMapping("/default")
    public ResponseEntity<Void> setDefaultWorkSchedule(@RequestBody WorkScheduleRequest workScheduleRequestDto) {
        workScheduleService.updateWorkSchedule(workScheduleRequestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/default")
    public ResponseEntity<WorkScheduleRequest> getDefaultWorkSchedule() {
        return ResponseEntity.ok(workScheduleService.getWorkSchedule());
    }

    //temporary todo remove
    @PostMapping("/{therapist_id}/default")
    public ResponseEntity<Void> setDefaultWorkSchedule(@RequestBody WorkScheduleRequest workScheduleRequestDto, @PathVariable UUID therapist_id) {
        workScheduleService.updateWorkScheduleForTherapist(workScheduleRequestDto, therapist_id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{therapist_id}/default")
    public ResponseEntity<WorkScheduleRequest> getDefaultWorkSchedule(@PathVariable UUID therapist_id) {
        return ResponseEntity.ok(workScheduleService.getWorkScheduleForTherapist(therapist_id));
    }


}
