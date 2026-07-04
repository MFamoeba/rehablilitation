package pl.wk.rehabilitation.bootstrap;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.wk.rehabilitation.ams.entity.Account;
import pl.wk.rehabilitation.ams.entity.AppointmentSlot;
import pl.wk.rehabilitation.ams.entity.Therapist;
import pl.wk.rehabilitation.ams.repository.AccountRepository; // Zakładam, że masz takie repozytorium
import pl.wk.rehabilitation.ams.repository.AppointmentSlotRepository;
import pl.wk.rehabilitation.ams.repository.TherapistRepository;
import pl.wk.rehabilitation.utill._enum.AccountRoleEnum;
import pl.wk.rehabilitation.utill._enum.AppointmentStatusEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInit implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final TherapistRepository therapistRepository;
    private final AppointmentSlotRepository appointmentSlotRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (accountRepository.count() == 0) {

            Account admin = Account.builder()
                    .email("admin@wk.pl")
                    .password(passwordEncoder.encode("admin123"))
                    .firstname("Jan")
                    .lastname("Kowalski")
                    .phoneNumber("123456789")
                    .roles(List.of(AccountRoleEnum.ROLE_ADMIN))
                    .build();

            Account user = Account.builder()
                    .email("user@wk.pl")
                    .password(passwordEncoder.encode("haslo123"))
                    .firstname("Anna")
                    .lastname("Nowak")
                    .phoneNumber("987654321")
                    .roles(List.of(AccountRoleEnum.ROLE_USER))
                    .build();

            accountRepository.saveAll(List.of(admin, user));

            Therapist therapist1 = Therapist.builder()
                    .email("t.nowak@wk.pl")
                    .firstname("Tomasz")
                    .lastname("Nowak")
                    .phoneNumber("555666777")
                    .brief("Doświadczony fizjoterapeuta sportowy.")
                    .specialization("Fizjoterapia")
                    .build();

            Therapist therapist2 = Therapist.builder()
                    .email("m.wisniewska@wk.pl")
                    .firstname("Marta")
                    .lastname("Wiśniewska")
                    .phoneNumber("444555666")
                    .brief("Specjalistka ds. masażu głębokiego.")
                    .specialization("Masaż")
                    .build();

            therapistRepository.saveAll(List.of(therapist1, therapist2));
            LocalDate today = LocalDate.now();

            AppointmentSlot slotTodayOpen = AppointmentSlot.builder()
                    .therapist(therapist1)
                    .startTime(LocalDateTime.of(today, LocalTime.of(10, 0)))
                    .endTime(LocalDateTime.of(today, LocalTime.of(11, 0)))
                    .status(AppointmentStatusEnum.OPEN)
                    .room("Gabinet 101")
                    .notes("Standardowa wizyta diagnostyczna.")
                    .build();

            AppointmentSlot slotTodayOpen2 = AppointmentSlot.builder()
                    .therapist(therapist1)
                    .startTime(LocalDateTime.of(today, LocalTime.of(12, 0)))
                    .endTime(LocalDateTime.of(today, LocalTime.of(13, 0)))
                    .status(AppointmentStatusEnum.OPEN)
                    .room("Gabinet 101")
                    .build();

            AppointmentSlot slotYesterday = AppointmentSlot.builder()
                    .therapist(therapist1)
                    .startTime(LocalDateTime.of(today.minusDays(1), LocalTime.of(14, 0)))
                    .endTime(LocalDateTime.of(today.minusDays(1), LocalTime.of(15, 0)))
                    .status(AppointmentStatusEnum.OPEN)
                    .room("Gabinet 102")
                    .build();

            AppointmentSlot slotNextWeek = AppointmentSlot.builder()
                    .therapist(therapist1)
                    .startTime(LocalDateTime.of(today.plusDays(8), LocalTime.of(9, 0)))
                    .endTime(LocalDateTime.of(today.plusDays(8), LocalTime.of(10, 0)))
                    .status(AppointmentStatusEnum.OPEN)
                    .room("Gabinet 101")
                    .build();

            AppointmentSlot slotOccupied = AppointmentSlot.builder()
                    .patient(user)
                    .therapist(therapist1)
                    .startTime(LocalDateTime.of(today, LocalTime.of(16, 0)))
                    .endTime(LocalDateTime.of(today, LocalTime.of(17, 0)))
                    .status(AppointmentStatusEnum.PENDING)
                    .room("Gabinet 101")
                    .build();

            appointmentSlotRepository.saveAll(List.of(
                    slotTodayOpen,
                    slotTodayOpen2,
                    slotYesterday,
                    slotNextWeek,
                    slotOccupied
            ));
        }
    }
}