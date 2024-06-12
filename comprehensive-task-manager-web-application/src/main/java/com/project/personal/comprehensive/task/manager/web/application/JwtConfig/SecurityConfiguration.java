package com.project.personal.comprehensive.task.manager.web.application.JwtConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.project.personal.comprehensive.task.manager.web.application.JwtFilter.JwtFilter;
import com.project.personal.comprehensive.task.manager.web.application.JwtService.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	
	@Autowired
	private UserService userService;
	
	 @Autowired
	    private JwtFilter jwtFilter;
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception
//	{
//		auth.userDetailsService(userService);
//	}
	 @Bean
	 AuthenticationProvider authenticationProvider() {
		 DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		 provider.setUserDetailsService(userService);
		 provider.setPasswordEncoder(new BCryptPasswordEncoder());
		 return provider;
	 }
	 
	 @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
	        return config.getAuthenticationManager();
	    }

//	 @Bean
//	 public SecurityFilterChain  filterChain(HttpSecurity http) throws Exception {
//		 
//		 http
//	        .csrf(csrf -> csrf.disable())
//	        .authorizeHttpRequests(auth -> auth 
//	            .requestMatchers("/show-all-signup-data").authenticated()
//                .requestMatchers("/show-my-work").authenticated()
//                .requestMatchers("/show-all-creator-work").authenticated()
//                .requestMatchers("/login","/signup").permitAll()
//	            .anyRequest().authenticated()   
//	        )
//	        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//	      http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);//validating jwttoken
//	      return http.build();
//	 }
	 
	 @Bean
		public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
			http.csrf(csrf -> csrf.disable())
					.authorizeHttpRequests(
							auth -> auth.requestMatchers("/login","/signup").permitAll()
							.anyRequest().authenticated())
					.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).apply(new CorsConfigurer<HttpSecurity>());
			http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
			return http.build();
		}
	 
	 
	 

}
