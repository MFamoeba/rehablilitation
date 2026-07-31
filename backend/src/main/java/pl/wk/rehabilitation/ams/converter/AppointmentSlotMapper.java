package pl.wk.rehabilitation.ams.converter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.wk.rehabilitation.ams.dto.GetDetailedAppointmentSlotResponse;
import pl.wk.rehabilitation.ams.entity.AppointmentSlot;
import pl.wk.rehabilitation.as.converter.BasicUserMapper;

@Mapper(componentModel = "spring", uses = {BasicUserMapper.class})
public interface AppointmentSlotMapper {
    @Mapping(source = "procedure.name", target = "procedureName")
    GetDetailedAppointmentSlotResponse toDetailedResponse(AppointmentSlot appointmentSlot);
}
