package pl.wk.rehabilitation.ams.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.wk.rehabilitation.ams.dto.WorkScheduleItemDto;
import pl.wk.rehabilitation.ams.entity.WorkSchedule;
import pl.wk.rehabilitation.ams.entity.Therapist;

@Mapper(componentModel = "spring")
public interface WorkScheduleMapper {
    WorkScheduleItemDto toDto(WorkSchedule entity);

    @Mapping(target = "therapist", source = "therapist")
    WorkSchedule toEntity(WorkScheduleItemDto dto, Therapist therapist);
}

