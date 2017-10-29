/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月22日-上午10:59:08  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


/**  
 *   
 * fee  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月22日-上午10:59:08, based on @version 1.0.0     
 *  
 */
@Entity(name="fee_info")
@Table(name="fee_info")
public class FeeInfo {
	int id;
	int theme;
	String feeName;
	int num;
	int direction;
	String fromName;
	String notice;
	Date createTime;
	
	
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name="feeName")
	public String getFeeName() {
		return feeName;
	}
	public void setFeeName(String feeName) {
		this.feeName = feeName;
	}
	@Column(name="num")
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	@Column(name="direction")
	public int getDirection() {
		return direction;
	}
	public void setDirection(int direction) {
		this.direction = direction;
	}
	@Column(name="fromName")
	public String getFromName() {
		return fromName;
	}
	public void setFromName(String fromName) {
		this.fromName = fromName;
	}
	@Column(name="notice")
	public String getNotice() {
		return notice;
	}
	public void setNotice(String notice) {
		this.notice = notice;
	}
	@Column(name="theme")
	public int getTheme() {
		return theme;
	}
	public void setTheme(int theme) {
		this.theme = theme;
	}
	@Column(name="createTime")
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
