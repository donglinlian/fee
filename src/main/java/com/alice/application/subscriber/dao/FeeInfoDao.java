/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月22日-下午3:26:54  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.dao;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.alice.application.subscriber.model.FeeInfo;

/**  
 *   
 * FeeInfoDao  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月22日-下午3:26:54, based on @version 1.0.0     
 *  
 */
@Repository("feeInfoDao")
public class FeeInfoDao extends HibernateDaoSupport implements IFeeInfoDao {

	/* (non-Javadoc)  
	 * @see com.alice.application.subscriber.dao.IFeeInfoDao#add(com.alice.application.subscriber.model.FeeInfo)  
	 */
	@Resource
	public void setSuperSessionFactory(SessionFactory sessionFactory){
		this.setSessionFactory(sessionFactory);
	}
	@Override
	public void add(FeeInfo feeInfo) {
		this.getSessionFactory().getCurrentSession().save(feeInfo);
	}

	/* (non-Javadoc)  
	 * @see com.alice.application.subscriber.dao.IFeeInfoDao#list()  
	 */
	@Override
	public List<FeeInfo> list() {
		String sql = "from fee_info";
		@SuppressWarnings("unchecked")
		List<FeeInfo> feeInfoList = this.getSessionFactory().getCurrentSession().createQuery(sql).list();
		return feeInfoList;
	}

}
