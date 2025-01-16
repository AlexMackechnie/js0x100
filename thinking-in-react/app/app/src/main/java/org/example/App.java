package org.example;

import java.util.EnumSet;

import org.example.config.Config;
import org.example.dao.ProductDao;
import org.example.entity.ProductEntity;
import org.example.filter.CorsFilter;
import org.example.resource.GroceryResource;

import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import jakarta.servlet.DispatcherType;

public class App extends Application<Config> {
    private final HibernateBundle<Config> hibernate = new HibernateBundle<Config>(ProductEntity.class) {
		@Override
		public DataSourceFactory getDataSourceFactory(Config configuration) {
            return configuration.getDatabase();
		}
    };

    public static void main(String[] args) throws Exception {
        new App().run(args);
    }

    @Override
    public void initialize(Bootstrap<Config> bootstrap) {
        bootstrap.addBundle(hibernate);
    }

    @Override
    public void run(Config config, Environment env) {
        final ProductDao productDao = new ProductDao(hibernate.getSessionFactory());

        GroceryResource groceryResource = new GroceryResource(productDao);
        env.jersey().register(groceryResource);
        env.servlets()
            .addFilter("CorsFilter", new CorsFilter(config.getAllowedOrigins()))
            .addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
    }
}
