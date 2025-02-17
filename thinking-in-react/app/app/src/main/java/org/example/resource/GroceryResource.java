package org.example.resource;

import java.util.ArrayList;
import java.util.List;

import org.example.dao.ProductDao;
import org.example.dto.ProductDto;
import org.example.entity.ProductEntity;

import io.dropwizard.hibernate.UnitOfWork;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/grocery")
@Produces(MediaType.APPLICATION_JSON)
public class GroceryResource {

    private final ProductDao productDao;

    public GroceryResource(ProductDao productDao) {
        this.productDao = productDao;
    }

    @GET
    @UnitOfWork
    public Response getGroceries() {
        List<ProductDto> productDtos = new ArrayList<>();

        List<ProductEntity> productEntities = productDao.getAllProducts();
        productEntities.forEach(
            entity -> productDtos.add(new ProductDto(
                entity.getCategoryName(),
                entity.getPrice(),
                entity.isInStock(),
                entity.getProductName()
            ))
        );

        // products.add(new ProductDto("Fruits", "$1", true, "Apple"));
        // products.add(new ProductDto("Fruits", "$1", true, "Banana"));
        // products.add(new ProductDto("Fruits", "$2", false, "Orange"));
        // products.add(new ProductDto("Vegetables", "$2", true, "Spinach"));
        // products.add(new ProductDto("Vegetables", "$4", false, "Kale"));
        // products.add(new ProductDto("Vegetables", "$1", true, "Tomato"));
        // products.add(new ProductDto("Meat", "$4", false, "Chicken"));
        // products.add(new ProductDto("Meat", "$5", true, "Steak"));
        // products.add(new ProductDto("Meat", "$5", true, "Salmon"));

        return Response.ok(productDtos).build();
    }
}
