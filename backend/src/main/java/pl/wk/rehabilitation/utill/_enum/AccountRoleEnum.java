package pl.wk.rehabilitation.utill._enum;

import org.springframework.security.core.GrantedAuthority;

public enum AccountRoleEnum implements GrantedAuthority {
    ROLE_ADMIN,
    ROLE_USER,
    ROLE_MANAGER,
    ROLE_DOCTOR;

    @Override
    public String getAuthority() {
        return name();
    }
}
