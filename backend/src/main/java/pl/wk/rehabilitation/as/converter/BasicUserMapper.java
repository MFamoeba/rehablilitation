package pl.wk.rehabilitation.as.converter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.as.dto.BasicUserDto;
@Mapper(componentModel = "spring")
public interface BasicUserMapper {
    BasicUserDto accountToBasicUserDto(Account account);

    @Mapping(source = "account.id", target = "id")
    @Mapping(source = "account.firstName", target = "firstName")
    @Mapping(source = "account.lastName", target = "lastName")
    @Mapping(source = "account.email", target = "email")
    @Mapping(source = "account.phoneNumber", target = "phoneNumber")
    BasicUserDto therapistToBasicUserDto(Therapist therapist);
}