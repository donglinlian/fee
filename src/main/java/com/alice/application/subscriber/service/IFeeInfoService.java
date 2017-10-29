/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月22日-下午3:26:28  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.service;

import java.util.List;

import com.alice.application.subscriber.model.FeeInfo;

/**  
 *   
 * IFeeInfoService  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月22日-下午3:26:28, based on @version 1.0.0     
 *  
 */
public interface IFeeInfoService {
 public List<FeeInfo> list();
/**  
 * add(这里用一句话描述这个方法的作用)  
 * (这里描述这个方法适用条件 – 可选)  
 * @param theme
 * @param feeName
 * @param num
 * @param direction
 * @param fromName
 * @param notice    
 * 
 * @return void  返回值说明  
 *
 * @since  1.0.0  (从xx版本开始实现，可选)
*/
public void add(String theme, String feeName, String num, String direction,
		String fromName, String notice);
/**  
 * sum(总计)  
 * (这里描述这个方法适用条件 – 可选)      
 * 
 * @return void  返回值说明  
 *
 * @since  1.0.0  (从xx版本开始实现，可选)
*/
public int sum();
}