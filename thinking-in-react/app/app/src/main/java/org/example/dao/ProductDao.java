package org.example.dao;

import org.example.entity.ProductEntity;
import org.hibernate.SessionFactory;

import io.dropwizard.hibernate.AbstractDAO;

class ProductDao extends AbstractDAO<ProductEntity> {

	public ProductDao(SessionFactory sessionFactory) {
		super(sessionFactory);
	}
}
