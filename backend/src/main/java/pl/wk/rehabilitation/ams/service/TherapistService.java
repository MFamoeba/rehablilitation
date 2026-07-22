package pl.wk.rehabilitation.ams.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.converter.TherapistMapper;
import pl.wk.rehabilitation.ams.dto.GetTherapistsResponse;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.repository.TherapistRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TherapistService {

    private final TherapistRepository therapistRepository;
    private final TherapistMapper therapistMapper;

    public List<GetTherapistsResponse> getAll() {
        return therapistRepository.findAll().stream().map(therapistMapper::toGetTherapistsResponse).toList();
    }

    public GetTherapistsResponse getById(UUID id) {
        return therapistMapper.toGetTherapistsResponse(therapistRepository.findById(id).orElseThrow());
    }

}
