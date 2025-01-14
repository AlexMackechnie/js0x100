package org.example.filter;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.GenericFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CorsFilter extends GenericFilter {

    public List<String> allowedOrigins;

    public CorsFilter(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        if (response instanceof HttpServletResponse && request instanceof HttpServletRequest) {

            HttpServletRequest httpRequest = (HttpServletRequest) request; 
            HttpServletResponse httpResponse = (HttpServletResponse) response;

            String origin = httpRequest.getHeader("Origin");

            if (allowedOrigins.contains(origin)) {
                httpResponse.addHeader("Access-Control-Allow-Origin", origin);
            }

            chain.doFilter(request, response);
        }
    }
}
