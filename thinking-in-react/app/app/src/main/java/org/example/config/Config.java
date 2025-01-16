package org.example.config;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.dropwizard.core.Configuration;
import io.dropwizard.db.DataSourceFactory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

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

    @Valid
    @NotNull
    private DataSourceFactory database = new DataSourceFactory();

    @JsonProperty("database")
    public DataSourceFactory getDatabase() {
            return database;
        }

    @JsonProperty("database")
    public void setDatabase(DataSourceFactory database) {
            this.database = database;
        }


}
