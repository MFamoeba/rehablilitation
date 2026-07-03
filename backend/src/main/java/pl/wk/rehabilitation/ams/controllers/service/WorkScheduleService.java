package pl.wk.rehabilitation.ams.controllers.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wk.rehabilitation.ams.controllers.entity.Therapist;
import pl.wk.rehabilitation.ams.controllers.entity.WorkSchedule;
import pl.wk.rehabilitation.ams.controllers.model.WorkScheduleDto;
import pl.wk.rehabilitation.ams.controllers.repository.TherapistRepository;
import pl.wk.rehabilitation.ams.controllers.repository.WorkScheduleRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkScheduleService {
    TherapistRepository therapistRepository;
    WorkScheduleRepository workScheduleRepository;

    @Transactional
    public WorkSchedule create(WorkScheduleDto workScheduleDto) {
        Therapist therapist = therapistRepository.findById(workScheduleDto.therapistId()).orElseThrow();
        WorkSchedule workScheduleToCreate = new WorkSchedule();
        workScheduleToCreate.setTherapist(therapist);
        workScheduleToCreate.setDayOfWeek(workScheduleDto.dayOfWeek());
        workScheduleToCreate.setStartTime(workScheduleDto.startTime());
        workScheduleToCreate.setEndTime(workScheduleDto.endTime());
        return workScheduleRepository.saveAndFlush(workScheduleToCreate);
    }

    @Transactional
    public void delete(UUID uuid) {
        workScheduleRepository.deleteById(uuid);
    }

    public List<WorkSchedule> getAllByTherapistId(UUID id) {
        therapistRepository.findById(id).orElseThrow();
        return workScheduleRepository.getAllByTherapistId(id);
    }
}
