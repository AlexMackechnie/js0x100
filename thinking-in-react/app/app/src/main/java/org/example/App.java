package org.example;

import org.example.config.Config;
import org.example.resource.GroceryResource;

import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Environment;

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
    }
}
