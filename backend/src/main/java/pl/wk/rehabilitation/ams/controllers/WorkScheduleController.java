package pl.wk.rehabilitation.ams.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.ams.dto.WorkScheduleItemDto;
import pl.wk.rehabilitation.ams.service.WorkScheduleService;

import java.util.List;

@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class WorkScheduleController {

    private final WorkScheduleService workScheduleService;

    @PutMapping("/default")
    public ResponseEntity<List<WorkScheduleItemDto>> setDefaultWorkSchedule(@RequestBody List<WorkScheduleItemDto> workScheduleItemDtos, Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(workScheduleService.updateWorkSchedule(workScheduleItemDtos, username));
    }

    @GetMapping("/default")
    public ResponseEntity<List<WorkScheduleItemDto>> getDefaultWorkSchedule(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(workScheduleService.getWorkSchedule(username));
    }

}
