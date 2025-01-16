package org.example.dao;

import java.util.List;

import org.example.entity.ProductEntity;
import org.hibernate.SessionFactory;

import io.dropwizard.hibernate.AbstractDAO;

public class ProductDao extends AbstractDAO<ProductEntity> {

	public ProductDao(SessionFactory sessionFactory) {
		super(sessionFactory);
	}

	public List<ProductEntity> getAllProducts() {
		return currentSession().createQuery("FROM ProductEntity", ProductEntity.class).getResultList();
	}
}
