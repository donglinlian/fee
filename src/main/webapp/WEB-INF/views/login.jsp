<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%-- <%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%> --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Alice Style 费用管理中心</title>
<link rel="short icon" href="${ctx}/resources/images/taiyang.ico" />
<link rel="stylesheet" href="${ctx}/resources/css/login.css"
	type="text/css" />
<script type="text/javascript" src="${ctx}/resources/jquery-1.11.1.min.js"></script>
</head>
<body>
	<p class="alice_logo">
		<img src="${ctx}/resources/images/taiyang.ico" />
	</p>
	<div class="signin_area">
		<form name="form" action="/fee/adminlogin" method="post">
			<table cellpadding="0" width="482px" align="left">
				<tr>
					<td colspan="2">Alice Style 费用管理中心</td>
				</tr>
				<tr>
					<td>用户名</td>
					<td><input type="text" name="username" /></td>
				</tr>
				<tr>
					<td>密码</td>
					<td><input type="password" name="password" /></td>
				</tr>
				<tr>
					<td colspan="2"><input type="submit" name="submit" value="登录" />
					</td>
				</tr>
			</table>
			 
		</form>
		 
	</div>
</body>
</html>