/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月4日-下午8:49:53  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alice.application.subscriber.service.IFeeInfoService;

/**  
 *   
 * AnalysisController  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月4日-下午8:49:53, based on @version 1.0.0     
 *  
 */
@Controller
@RequestMapping("/analysis")
public class AnalysisController {
private static Logger logger = Logger.getLogger(AnalysisController.class);
@Resource
IFeeInfoService feeInfoService;

@RequestMapping(value = "/list",method = RequestMethod.GET)
public String analysis(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse,Model model){
	logger.info("begin analysis interface");
	int sum = feeInfoService.sum();
	model.addAttribute("all", sum);
	logger.info("sum:"+sum);
	return "analysis";
	
}
}
