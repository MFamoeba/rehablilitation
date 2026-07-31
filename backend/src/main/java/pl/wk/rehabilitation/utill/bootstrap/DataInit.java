package pl.wk.rehabilitation.utill.bootstrap;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.wk.rehabilitation.ams.entity.*;
import pl.wk.rehabilitation.ams.repository.*;
import pl.wk.rehabilitation.ams.service.AppointmentSlotService;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;
import pl.wk.rehabilitation.utill._enum.AppointmentStatusEnum;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInit implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final TherapistRepository therapistRepository;
    private final PasswordEncoder passwordEncoder;
    private final WorkScheduleRepository workScheduleRepository;
    private final AppointmentSlotService appointmentSlotService;
    private final AppointmentSlotRepository appointmentSlotRepository;
    private final ProcedureRepository procedureRepository;

    @Override
    public void run(String... args) throws Exception {
        if (accountRepository.count() == 0) {
            Procedure p1 = new Procedure();
            p1.setName("Konsultacja fizjoterapeutyczna");
            p1.setDescription("Pierwsza wizyta obejmująca wywiad, badanie układu ruchu oraz wstępną diagnozę. Ustalenie planu terapii.");
            p1.setPrice(150.0);
            Procedure p2 = new Procedure();
            p2.setName("Terapia manualna");
            p2.setDescription("Zindywidualizowany zabieg z użyciem technik manualnych, mający na celu poprawę ruchomości stawów, elastyczności tkanek i redukcję bólu.");
            p2.setPrice(180.0);
            Procedure p3 = new Procedure();
            p3.setName("Masaż leczniczy");
            p3.setDescription("Masaż skupiający się na rozluźnieniu napiętych partii mięśniowych, powięzi, redukcji bólu i poprawie krążenia.");
            p3.setPrice(120.0);
            Procedure p4 = new Procedure();
            p4.setName("Terapia falą uderzeniową");
            p4.setDescription("Nowoczesna terapia stosowana przy przewlekłym bólu układu mięśniowo-szkieletowego (m.in. ostrogi piętowe, łokieć tenisisty).");
            p4.setPrice(100.0);
            Procedure p5 = new Procedure();
            p5.setName("Kinesiotaping (plastrowanie)");
            p5.setDescription("Aplikacja specjalnych taśm terapeutycznych wspomagających pracę mięśni i stawów oraz redukujących obrzęki.");
            p5.setPrice(40.0);
            procedureRepository.saveAll(List.of(p1, p2, p3, p4, p5));
            Account admin = Account.builder()
                    .email("admin@wk.pl")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("Jan")
                    .lastName("Kowalski")
                    .phoneNumber("123456789")
                    .role(AccountRoleEnum.ROLE_ADMIN)
                    .build();

            Account user = Account.builder()
                    .email("user@wk.pl")
                    .password(passwordEncoder.encode("haslo123"))
                    .firstName("Anna")
                    .lastName("Nowak")
                    .phoneNumber("987654321")
                    .role(AccountRoleEnum.ROLE_USER)
                    .build();

            Account therapistAccount1 = Account.builder()
                    .email("terapeuta@wk.pl")
                    .password(passwordEncoder.encode("haslo123"))
                    .firstName("Tomasz")
                    .lastName("Nowak")
                    .phoneNumber("555666777")
                    .role(AccountRoleEnum.ROLE_DOCTOR)
                    .build();
            Account therapistAccount2 = Account.builder()
                    .email("m.wisniewska@wk.pl")
                    .password(passwordEncoder.encode("haslo123"))
                    .firstName("Marta")
                    .lastName("Wiśniewska")
                    .phoneNumber("444555666")
                    .role(AccountRoleEnum.ROLE_DOCTOR)
                    .build();


            accountRepository.saveAll(List.of(admin, user, therapistAccount1, therapistAccount2));

            Therapist therapist1 = Therapist.builder()
                    .account(therapistAccount1)
                    .briefBio("Doświadczony fizjoterapeuta sportowy.")
                    .specialization("Fizjoterapia")
                    .procedures(List.of(p1, p2, p3, p4, p5))
                    .build();
            Therapist therapist2 = Therapist.builder()
                    .account(therapistAccount2)
                    .briefBio("Specjalistka ds. masażu głębokiego.")
                    .specialization("Masaż")
                    .procedures(List.of(p1, p2, p3, p4, p5))
                    .build();

            therapistRepository.saveAll(List.of(therapist1, therapist2));
            LocalDate today = LocalDate.now();

            WorkSchedule dws1Monday = WorkSchedule.builder()
                    .therapist(therapist1)
                    .dayOfWeek(DayOfWeek.MONDAY)
                    .startTime(LocalTime.of(8, 0))
                    .endTime(LocalTime.of(16, 0))
                    .build();
            WorkSchedule dws1Tuesday = WorkSchedule.builder()
                    .therapist(therapist1)
                    .dayOfWeek(DayOfWeek.TUESDAY)
                    .startTime(LocalTime.of(8, 0))
                    .endTime(LocalTime.of(16, 0))
                    .build();
            WorkSchedule dws1Wednesday = WorkSchedule.builder()
                    .therapist(therapist1)
                    .dayOfWeek(DayOfWeek.WEDNESDAY)
                    .startTime(LocalTime.of(8, 0))
                    .endTime(LocalTime.of(16, 0))
                    .build();
            WorkSchedule dws1Thursday = WorkSchedule.builder()
                    .therapist(therapist1)
                    .dayOfWeek(DayOfWeek.THURSDAY)
                    .startTime(LocalTime.of(10, 0))
                    .endTime(LocalTime.of(18, 0))
                    .build();
            WorkSchedule dws1Friday = WorkSchedule.builder()
                    .therapist(therapist1)
                    .dayOfWeek(DayOfWeek.FRIDAY)
                    .startTime(LocalTime.of(8, 0))
                    .endTime(LocalTime.of(15, 0))
                    .build();

            WorkSchedule dws2Monday = WorkSchedule.builder()
                    .therapist(therapist2)
                    .dayOfWeek(DayOfWeek.MONDAY)
                    .startTime(LocalTime.of(9, 0))
                    .endTime(LocalTime.of(17, 0))
                    .build();
            WorkSchedule dws2Tuesday = WorkSchedule.builder()
                    .therapist(therapist2)
                    .dayOfWeek(DayOfWeek.TUESDAY)
                    .startTime(LocalTime.of(9, 0))
                    .endTime(LocalTime.of(17, 0))
                    .build();
            WorkSchedule dws2Wednesday = WorkSchedule.builder()
                    .therapist(therapist2)
                    .dayOfWeek(DayOfWeek.WEDNESDAY)
                    .startTime(LocalTime.of(9, 0))
                    .endTime(LocalTime.of(17, 0))
                    .build();
            WorkSchedule dws2Thursday = WorkSchedule.builder()
                    .therapist(therapist2)
                    .dayOfWeek(DayOfWeek.THURSDAY)
                    .startTime(LocalTime.of(9, 0))
                    .endTime(LocalTime.of(17, 0))
                    .build();
            WorkSchedule dws2Friday = WorkSchedule.builder()
                    .therapist(therapist2)
                    .dayOfWeek(DayOfWeek.FRIDAY)
                    .startTime(LocalTime.of(9, 0))
                    .endTime(LocalTime.of(16, 0))
                    .build();

            workScheduleRepository.saveAll(List.of(
                    dws1Monday, dws1Tuesday, dws1Wednesday, dws1Thursday, dws1Friday,
                    dws2Monday, dws2Tuesday, dws2Wednesday, dws2Thursday, dws2Friday
            ));

            LocalDate threeWeeksLater = today.plusWeeks(3);
            appointmentSlotService.generateSlotsForRange(today, threeWeeksLater, therapistAccount1.getEmail());
            appointmentSlotService.generateSlotsForRange(today, threeWeeksLater, therapistAccount2.getEmail());
            List<AppointmentSlot> allSlots = appointmentSlotRepository.findAll();


            if (allSlots.size() > 5) {
                AppointmentSlot scheduledSlot = allSlots.get(0);
                scheduledSlot.setPatient(user);
                scheduledSlot.setStatus(AppointmentStatusEnum.SCHEDULED);
                scheduledSlot.setNotes("Pacjent skarży się na ostry ból karku.");
                AppointmentSlot pendingSlot = allSlots.get(1);
                pendingSlot.setPatient(user);
                pendingSlot.setStatus(AppointmentStatusEnum.PENDING);
                AppointmentSlot historySlot1 = allSlots.get(2);
                historySlot1.setPatient(user);
                historySlot1.setStatus(AppointmentStatusEnum.COMPLETED);
                historySlot1.setStartTime(LocalDateTime.now().minusDays(5));
                historySlot1.setEndTime(LocalDateTime.now().minusDays(5).plusMinutes(30));
                AppointmentSlot historySlot2 = allSlots.get(3);
                historySlot2.setPatient(user);
                historySlot2.setStatus(AppointmentStatusEnum.COMPLETED);
                historySlot2.setStartTime(LocalDateTime.now().minusDays(14));
                historySlot2.setEndTime(LocalDateTime.now().minusDays(14).plusMinutes(30));
                historySlot2.setNotes("Pierwsza diagnoza. Założono kartę pacjenta.");
                appointmentSlotRepository.saveAll(List.of(scheduledSlot, pendingSlot, historySlot1, historySlot2));
            }
        }
    }
}