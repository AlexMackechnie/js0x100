package org.example.config;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.dropwizard.core.Configuration;
import jakarta.validation.constraints.NotEmpty;

public class Config extends Configuration {
    @NotEmpty
    private String test;

    @JsonProperty
    public String getTest() {
        return test;
    }

    @JsonProperty
    public void setTest(String test) {
        this.test = test;
    }
}
