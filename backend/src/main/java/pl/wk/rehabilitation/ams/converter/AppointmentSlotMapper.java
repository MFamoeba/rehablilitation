package pl.wk.rehabilitation.ams.converter;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import pl.wk.rehabilitation.ams.dto.UpdateAppointmentDetailsRequest;
import pl.wk.rehabilitation.ams.entity.AppointmentSlot;

@Mapper(componentModel = "spring")
public interface AppointmentSlotMapper {

}
