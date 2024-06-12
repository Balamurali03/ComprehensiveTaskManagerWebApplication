package com.project.personal.comprehensive.task.manager.web.application.JwtService;



import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.personal.comprehensive.task.manager.web.application.Entity.SignupData;
import com.project.personal.comprehensive.task.manager.web.application.Repo.SignupRepo;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private SignupRepo signupRepo;
    

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("hiiiiii");
       SignupData userData = signupRepo.getByEmail(email);
        if (userData == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
//
//        //return new User(userData.getEmail(),userData.getPassword(),userData.getRole(),new ArrayList<>());
//        
        return org.springframework.security.core.userdetails.User.builder()
                .username(userData.getEmail())
                .password(userData.getPassword())
                .authorities(new SimpleGrantedAuthority(userData.getRole()))       
                .build();
        //return new UserInfoDetails(userData); 
    }
}
