package pl.wk.rehabilitation.ams.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.wk.rehabilitation.ams.dto.GetTherapistsResponse;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.service.TherapistService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/therapist")
@RequiredArgsConstructor
public class TherapistController {

    private final TherapistService therapistService;

    @GetMapping
    public List<GetTherapistsResponse> getAll() {
        return therapistService.getAll();
    }

    @GetMapping("/{id}")
    public GetTherapistsResponse getById(@PathVariable UUID id) {
        return therapistService.getById(id);
    }

}
