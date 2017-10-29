/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月4日-下午8:30:23  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alice.application.subscriber.model.FeeInfo;
import com.alice.application.subscriber.service.IFeeInfoService;

/**
 * 
 * FeeController 说明内容
 * 
 * TODO 现有问题及需完善的方向
 * 
 * author: Alice, 2017年10月4日-下午8:30:23, based on @version 1.0.0
 * 
 */
@Controller
@RequestMapping("/basic")
public class FeeController {
	private static Logger logger = Logger.getLogger(FeeController.class);

	@Resource
	IFeeInfoService feeInfoService;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String get(HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse, Model model) {
		logger.info("begin to get the feeinfo");
		List<FeeInfo> feeInfo = feeInfoService.list();
		logger.info("*********feeInfo**********:"+feeInfo);
		model.addAttribute("FeeDemo",feeInfo);
		return "basicfee";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse, Model model, String theme,
			String feeName, String num, String direction, String fromName,
			String notice) {
		try {
			logger.info("/basic/add:post paramaters theme:"+theme+", feeName:"+feeName+", num:"+num+", direction:"+direction+", fromName:"+fromName+", notice:"+notice);
			feeInfoService.add(theme,feeName,num,direction,fromName,notice);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/basic/list";
	}
}
