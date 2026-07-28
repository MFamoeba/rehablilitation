package pl.wk.rehabilitation.ams.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.entity.Procedure;
import pl.wk.rehabilitation.ams.repository.ProcedureRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProcedureService {
    private final ProcedureRepository procedureRepository;

    public List<Procedure> getAll() {
        return procedureRepository.findAll();
    }

    public Procedure getById(UUID id) {
        return procedureRepository.findById(id).orElseThrow();
    }

    public Procedure create(Procedure procedure) {
        return procedureRepository.saveAndFlush(procedure);
    }

    public void delete(UUID id) {
        procedureRepository.deleteById(id);
    }

    public Procedure update(UUID id, Procedure procedure) {
        procedureRepository.findById(id).orElseThrow();
        return procedureRepository.saveAndFlush(procedure);
    }
}
