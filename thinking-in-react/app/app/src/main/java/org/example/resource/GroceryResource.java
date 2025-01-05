package org.example.resource;

import java.util.ArrayList;
import java.util.List;

import org.example.dto.ProductDto;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/grocery")
@Produces(MediaType.APPLICATION_JSON)
public class GroceryResource {

    public GroceryResource() {}

    @GET
    public Response getGroceries() {
        List<ProductDto> products = new ArrayList<>();

        products.add(new ProductDto("Fruits", "$1", true, "Apple"));
        products.add(new ProductDto("Fruits", "$1", true, "Banana"));
        products.add(new ProductDto("Fruits", "$2", false, "Orange"));
        products.add(new ProductDto("Vegetables", "$2", true, "Spinach"));
        products.add(new ProductDto("Vegetables", "$4", false, "Kale"));
        products.add(new ProductDto("Vegetables", "$1", true, "Tomato"));
        products.add(new ProductDto("Meat", "$4", false, "Chicken"));
        products.add(new ProductDto("Meat", "$5", true, "Steak"));
        products.add(new ProductDto("Meat", "$5", true, "Salmon"));

        return Response.ok(products).build();
    }
}
