/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月22日-下午3:27:17  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.dao;

import java.util.List;

import com.alice.application.subscriber.model.FeeInfo;

/**  
 *   
 * IFeeInfoDao  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月22日-下午3:27:17, based on @version 1.0.0     
 *  
 */
public interface IFeeInfoDao {
	public void add(FeeInfo feeInfo);
	public List<FeeInfo> list();

}