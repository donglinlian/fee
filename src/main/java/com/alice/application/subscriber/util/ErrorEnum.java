/*
 * 
 * Cloud AC 
 * 
 */
package com.alice.application.subscriber.util;

/**
 * The Enum ErrorEnum.
 */
public enum ErrorEnum {

	/** The err none. */
	errNone(0, "执行成功"), // /

	/** The ER r_ sy s_8009. */
 ERR_SYS_8009(8009, "服务器异常"), /** The ER r_ sy s_8010. */
 //
	ERR_SYS_8010(8010, "请求超时"), 
 /** The ER r_ sy s_8011. */
 //
	ERR_SYS_8011(8011, "请求的命令不存在"), 
 /** The ER r_ sy s_8012. */
 //
	ERR_SYS_8012(8012, "访问Stun Server异常"), 
 /** The ER r_ sy s_8013. */
 //
	ERR_SYS_8013(8013, "访问的资源不存在"), 
 /** The ER r_ sy s_8014. */
 ERR_SYS_8014(8014, "许可证已过期"), 
 /** The ER r_ sy s_8015. */
 ERR_SYS_8015(8015, "访问长连接服务异常"), 
 /** The ER r_ sy s_8016. */
 //
	ERR_SYS_8016(8016, "SSL证书不存在"), //
	
	ERR_SYS_8017(8017,"部分操作失败"),

	/** The ER r_ st d_1010. */
 ERR_STD_1010(1010, "参数错误"), /** The ER r_ st d_1020. */
 //
	ERR_STD_1020(1020, "查询失败"), 
 /** The ER r_ st d_1030. */
 //
	ERR_STD_1030(1030, "创建失败"), 
 /** The ER r_ st d_1040. */
 //
	ERR_STD_1040(1040, "更新失败"), 
 /** The ER r_ st d_1050. */
 //
	ERR_STD_1050(1050, "删除失败"), 
 /** The ER r_ st d_1060. */
 //
	ERR_STD_1060(1060, "上传失败"), 
 /** The ER r_ st d_1061. */
 //
	ERR_STD_1061(1061, "上传文件尺寸超出范围"), 
 /** The ER r_ st d_1062. */
 //
	ERR_STD_1062(1062, "上传文件格式不正确"), 
 /** The ER r_ st d_1070. */
 //
	ERR_STD_1070(1070, "管理的网络不能重复"), 
 /** The ER r_ st d_1080. */
 ERR_STD_1080(1080, "图片格式不正确"), 
 /** The ER r_ st d_1081. */
 ERR_STD_1081(1081, "图片过大"), 
 /** The ER r_ st d_1082. */
 ERR_STD_1082(1082, "二维码图片不存在"), 
 /** The ER r_ st d_1083. */
 ERR_STD_1083(1083, "文件格式不正确"), 
 /** The ER r_ st d_1084. */
 ERR_STD_1084(
			1084, "文件格过大"), 
 /** The ER r_ st d_1090. */
 ERR_STD_1090(1090, "配置失败"), 
 /** The ER r_ st d_1091. */
 ERR_STD_1091(1091, "License文件格式不正确"), 
 /** The ER r_ st d_1092. */
 ERR_STD_1092(1092, "解析License文件出错"), 
 /** The ER r_ st d_1093. */
 ERR_STD_1093(1093,
			"没有读取到License文件"), 
 /** The ER r_ st d_1094. */
 ERR_STD_1094(1094, "请勿重复导入相同的License文件"), 
 /** The ER r_ st d_1095. */
 ERR_STD_1095(1095, "无效的License文件，请通过售后重新获取（需提供ServerID）"),
 
 ERR_STD_1096(1096, "AP设备类型不存在"),

	/** The ER r_ st d_1101. */
	ERR_STD_1101(1101, "重启失败"), /** The ER r_ st d_1102. */
 //
	ERR_STD_1102(1102, "恢复出厂失败"), 
 /** The ER r_ st d_1103. */
 //
	ERR_STD_1103(1103, "升级失败"), 
 /** The ER r_ st d_1131. */
 //
	ERR_STD_1131(1131, "升级时间设置错误"), 
 /** The ER r_ st d_1110. */
 //
	ERR_STD_1110(1110, "操作冲突"), //

	/** The ER r_ st d_1200. */
 ERR_STD_1200(1200, "无权限或权限已过期"), /** The ER r_ st d_1201. */
 //
	ERR_STD_1201(1201, "接口调用者与设备合作商不一致"), //

	/** The ER r_ st d_1400. */
 // 邮件提示信息添加
	ERR_STD_1400(1400, "邮箱认证失败（域名没有找到）"), 
 /** The ER r_ st d_1401. */
 //
	ERR_STD_1401(1401, "邮箱认证失败（用户名或密码或域名匹配有误）"), 
 /** The ER r_ st d_1402. */
 //
	ERR_STD_1402(1402, "邮件服务信息设置有误"), //

	/** The ER r_ clou d_2001. */
 ERR_CLOUD_2001(2001, "云账号尚未登录"), /** The ER r_ clou d_2002. */
 //
	ERR_CLOUD_2002(2002, "云账号尚未激活"), 
 /** The ER r_ clou d_2003. */
 //
	ERR_CLOUD_2003(2003, "云账号会话超时"), 
 /** The ER r_ clou d_2004. */
 //
	ERR_CLOUD_2004(2004, "云账号异处登录"), 
 /** The ER r_ clou d_2005. */
 //
	ERR_CLOUD_2005(2005, "云账号异常退出"), 
 /** The ER r_ clou d_2006. */
 //
	ERR_CLOUD_2006(2006, "云账号不存在"), 
 /** The ER r_ clou d_2007. */
 //
	ERR_CLOUD_2007(2007, "云账号已存在"), //

	/** The ER r_ clou d_2201. */
 ERR_CLOUD_2201(2201, "云账号密码不正确"), /** The ER r_ clou d_2202. */
 //
	ERR_CLOUD_2202(2202, "云账号登录过程异常"), 
 /** The ER r_ clou d_2203. */
 //
	ERR_CLOUD_2203(2203, "退出过程出现异常"), //

	/** The ER r_ clou d_1300. */
 ERR_CLOUD_1300(1300, "请求通过"), /** The ER r_ clou d_1301. */
 //
	ERR_CLOUD_1301(1301, "请求不通过"), //

	/** The ER r_ clou d_1012. */
 ERR_CLOUD_1012(1012, "参数个数超出限制"), //

	/** The ER r_ clou d_103. */
 ERR_CLOUD_103(103, "提交过快"), /** The ER r_ clou d_104. */
 //
	ERR_CLOUD_104(104, "系统忙"), 
 /** The ER r_ clou d_105. */
 //
	ERR_CLOUD_105(105, "短信内容包含敏感词"), 
 /** The ER r_ clou d_106. */
 //
	ERR_CLOUD_106(106, "消息长度错"), 
 /** The ER r_ clou d_107. */
 //
	ERR_CLOUD_107(107, "手机号错误"), 
 /** The ER r_ clou d_109. */
 //
	ERR_CLOUD_109(109, "无发送额度"), 
 /** The ER r_ clou d_110. */
 //
	ERR_CLOUD_110(110, "不在发送时间内"), 
 /** The ER r_ clou d_111. */
 //
	ERR_CLOUD_111(111, "超出该账户当月发送额度限制"), //

	/** The ER r_ lda p_201. */
 ERR_LDAP_201(201, "增加ldap源失败：请确认所输入信息是否正确，以及网络、用户配额、时间同步等环境问题"), /** The ER r_ lda p_202. */
 //
	ERR_LDAP_202(202, "删除ldap源失败"), 
 /** The ER r_ lda p_203. */
 //
	ERR_LDAP_203(203, "测试失败，连接Host超时"), 
 /** The ER r_ lda p_204. */
 // test报的错误号
	ERR_LDAP_204(204, "Docker Host IP或者端口配置错误"), 
 /** The ER r_ lda p_205. */
 //
	ERR_LDAP_205(205, "Docker主机上运行的FreeRadius容器数量已达上限"), 
 /** The ER r_ lda p_206. */
 //
	ERR_LDAP_206(206, "没有足够的端口资源来启动新的容器"), 
 /** The ER r_ lda p_207. */
 //
	ERR_LDAP_207(207, "生成代理FreeRadius配置文件失败"), 
 /** The ER r_ lda p_208. */
 //
	ERR_LDAP_208(208, "上传代理FreeRadius配置文件失败"), 
 /** The ER r_ lda p_209. */
 //
	ERR_LDAP_209(209, "shell脚本执行过程中发生中断"), 
 /** The ER r_ lda p_210. */
 //
	ERR_LDAP_210(210, "单机版只允许建立最多5个容器！请悉知"), 
 /** The ER r_ lda p_211. */
 //
	ERR_LDAP_211(211, "当前的域名已被使用，不支持重复使用，请重新填入"), 
 /** The ER r_ lda p_212. */
 //
	ERR_LDAP_212(212, "增加ldap源失败：添加类型错误"), 
 /** The ER r_ lda p_213. */
 //
	ERR_LDAP_213(213, "连接失败，无法正常连接LDAP Server"), 
 /** The ER r_ lda p_214. */
 // test报的错误号
	ERR_LDAP_214(214, "连接失败，用户名或密码错误"), // test报的错误号

	// ERR_OLT_12010(12010, "插座不存在"), //
	// ERR_OLT_12011(12011, "插座未绑定"), //
	// ERR_OLT_12012(12012, "插座管理员密码不正确"), //

	// 1211x：智能插座列表的异常集
	// 1212x：智能插座云绑定的异常集
	// 1213x：智能插座锁定的异常集
	// 1214x：智能插座管理密码修改的异常集
	// 1215x：智能插座的开关控制的异常集

	// 1216x：智能插座基本信息修改的异常集
	// ERR_OLT_12169(12169, "图片文件大小超出范围"), //

	// 1217x：智能插座定时设置的异常集
	// 1218x：智能插座功耗信息的异常集
	// 1219x：智能插座功耗统计的异常集
	// 1220x：智能插座时间同步的异常集
	// 1221x：智能插座固件升级的异常集
	// 1222x：智能插座的LED控制的异常集

	/**
  * Instantiates a new error enum.
  *
  * @param value the value
  * @param display the display
  */
 ;

	private ErrorEnum(int value, String display) {
		this.display = display;
		this.value = value;
	}

	/** The value. */
	private int value;

	/** The display. */
	private String display;

	/**
	 * Gets the value.
	 *
	 * @return the value
	 */
	public int getValue() {
		return value;
	}

	/**
	 * Sets the value.
	 *
	 * @param value the new value
	 */
	public void setValue(int value) {
		this.value = value;
	}

	/**
	 * Gets the display.
	 *
	 * @return the display
	 */
	public String getDisplay() {
		return display;
	}

	/**
	 * Sets the display.
	 *
	 * @param display the new display
	 */
	public void setDisplay(String display) {
		this.display = display;
	}

}
