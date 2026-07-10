package pl.wk.rehabilitation.ams.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.wk.rehabilitation.ams.dto.WorkScheduleItemDto;
import pl.wk.rehabilitation.ams.dto.WorkScheduleRequest;
import pl.wk.rehabilitation.ams.entity.WorkSchedule;
import pl.wk.rehabilitation.ams.entity.Therapist;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring")
public interface WorkScheduleMapper {
    WorkScheduleItemDto toDto(WorkSchedule entity);

    @Mapping(target = "therapistId", source = "therapistId")
    @Mapping(target = "workScheduleItems", source = "entities")
    WorkScheduleRequest toRequest(List<WorkSchedule> entities, UUID therapistId);

    @Mapping(target = "therapist", source = "therapist")
    WorkSchedule toEntity(WorkScheduleItemDto dto, Therapist therapist);
}

