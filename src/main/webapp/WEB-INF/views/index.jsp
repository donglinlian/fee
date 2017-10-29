
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Alice Style 费用管理中心</title>
<link></link>
<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css" href="resources/css/index.css">
<script type="text/javascript" src="${ctx}/resources/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="resources/js/index.js"></script>

<script>
	// 	$(document).ready(
	// 			function($) {$("#left_close_btn").css("background","url(resources/images/fee.png)")}
	// 			)
</script>
</head>
<body class="fee-body" style="overflow: hidden;">
	<div class="leftpanel">
		<div class="leftmenu ">
			<ul id='mainTitleUl'>
				<li id='theFirstLi' class="nav nav-tabs nav-stacked show_left">
					<ul class="submenue_ul">
						<li class =menu_ul_li onclick="goForward('${ctx}/basic/list')">基础费用</li>
						<li class =menu_ul_li onclick="goForward('${ctx}/analysis/list')">结果分析</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<div class="rightpanel">
		<div class="logoDiv">
			<div class="logoImg">
<!-- 				<img src="resources/images/fee.png" /> -->
			</div>
			<div class="title">Alice Style 费用管理中心</div>
			<div class="logoout">
			<button style="border:0px" class ="button_class" type="button" onclick="window.location.href='${ctx}/logout'">退出</button>
			</div>
		</div>
		<iframe name="framedemo" id="framedemo" src="${ctx}/analysis/list" frameborder="NO" border="0" framespacing="0"></iframe>
	</div>
</body>
</html>