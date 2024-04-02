package com.com.aparteone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class AparteoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(AparteoneApplication.class, args);
	}

}
