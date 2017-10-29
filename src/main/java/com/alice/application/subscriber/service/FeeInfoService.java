/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月22日-下午3:26:05  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.service;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.alice.application.subscriber.dao.IFeeInfoDao;
import com.alice.application.subscriber.model.FeeInfo;

/**  
 *   
 * FeeInfoService  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月22日-下午3:26:05, based on @version 1.0.0     
 *  
 */
@Service("feeInfoService")
@Transactional
@EnableTransactionManagement 
public class FeeInfoService implements IFeeInfoService {
	@Resource
	IFeeInfoDao feeInfoDao;


	/* (non-Javadoc)  
	 * @see com.alice.application.subscriber.service.IFeeInfoService#list()  
	 */
	@Override
	public List<FeeInfo> list() {
		List<FeeInfo> feeInfo = feeInfoDao.list();// TODO Auto-generated method stub
		return feeInfo;
	}

	/* (non-Javadoc)  
	 * @see com.alice.application.subscriber.service.IFeeInfoService#add(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)  
	 */
	@Override
	public void add(String theme, String feeName, String num, String direction,
			String fromName, String notice) {
		FeeInfo feeInfo = new FeeInfo();
		feeInfo.setNotice(notice);
		feeInfo.setFeeName(feeName);
		feeInfo.setDirection(Integer.parseInt(direction));
		feeInfo.setNum(Integer.parseInt(num));
		feeInfo.setTheme(Integer.parseInt(theme));
		feeInfo.setFromName(fromName);
		feeInfo.setCreateTime(new Date());
		feeInfoDao.add(feeInfo);
		
	}

	/* (non-Javadoc)  
	 * @see com.alice.application.subscriber.service.IFeeInfoService#sum()  
	 */
	@Override
	public int sum() {
		int sum = 0;
		List<FeeInfo> feeInfo = feeInfoDao.list();
		for(FeeInfo eachFeeInfo:feeInfo){
			int num = eachFeeInfo.getNum();
		sum = num+sum;
	  }
		return sum;
	}

}
