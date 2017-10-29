package com.alice.application.subscriber.dao;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.alice.application.subscriber.model.Admin;


@Repository("LoginDao")
public class LoginDao extends HibernateDaoSupport implements ILoginDao {

	@Resource
	public void setSuperSessionFactory(SessionFactory sessionFactory) {
		this.setSessionFactory(sessionFactory);
	}
	
	public boolean checkAccount(String username, String password) {
		String sql = "from Admin where username = ? and password = ?";
		Admin admin= (Admin) this.getSessionFactory().getCurrentSession().createQuery(sql).setParameter(0, username).setParameter(1, password).uniqueResult();
//		Admin admin= (Admin) this.getHibernateTemplate().getSessionFactory().getCurrentSession().createQuery(sql).uniqueResult();
		if(admin!=null){
			return true;
		}
		return false;
		
	}

}
