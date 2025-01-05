package org.example;

import java.util.EnumSet;

import org.example.config.Config;
import org.example.filter.CorsFilter;
import org.example.resource.GroceryResource;

import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Environment;
import jakarta.servlet.DispatcherType;

public class App extends Application<Config> {
    public String getGreeting() {
        return "Hello World!";
    }

    public static void main(String[] args) throws Exception {
        new App().run(args);
    }

    @Override
    public void run(Config config, Environment env) {
        GroceryResource groceryResource = new GroceryResource();
        env.jersey().register(groceryResource);
        env.servlets()
            .addFilter("CorsFilter", new CorsFilter(config.getAllowedOrigins()))
            .addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
    }
}
