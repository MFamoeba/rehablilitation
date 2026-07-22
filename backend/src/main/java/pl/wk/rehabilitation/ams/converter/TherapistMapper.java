package pl.wk.rehabilitation.ams.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.wk.rehabilitation.ams.dto.GetTherapistsResponse;
import pl.wk.rehabilitation.ams.dto.WorkScheduleItemDto;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.entity.WorkSchedule;

@Mapper(componentModel = "spring")
public interface TherapistMapper {
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "account.firstName")
    @Mapping(target = "lastName", source = "account.lastName")
    GetTherapistsResponse toGetTherapistsResponse(Therapist entity);
}
