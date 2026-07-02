package pl.wk.rehabilitation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.entity.Therapist;
import pl.wk.rehabilitation.repository.TherapistRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TherapistService {

    private final TherapistRepository therapistRepository;

    public List<Therapist> getAll() {
        return therapistRepository.findAll();
    }

    public Therapist getById(UUID id) {
        return therapistRepository.findById(id).orElseThrow();
    }

    public Therapist create(Therapist therapist) {
        return therapistRepository.saveAndFlush(therapist);
    }

    public void delete(UUID id) {
        therapistRepository.deleteById(id);
    }
}
