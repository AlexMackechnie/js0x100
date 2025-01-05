package org.example.config;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.dropwizard.core.Configuration;
import jakarta.validation.constraints.NotEmpty;

public class Config extends Configuration {
    @NotEmpty
    private List<String> allowedOrigins;

    @JsonProperty
    public List<String> getAllowedOrigins() {
        return allowedOrigins;
    }

    @JsonProperty
    public void setAllowedOrigins(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

}
