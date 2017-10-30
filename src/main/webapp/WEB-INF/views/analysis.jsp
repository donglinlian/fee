<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<link href="${ctx}/resources/bootstrap/css/bootstrap.min.css"
	rel="stylesheet" media="screen">
<link rel="stylesheet" href="${ctx}/resources/css/style.default.css"
	type="text/css">
<script type="text/javascript"
	src="${ctx}/resources/jquery-1.11.1.min.js"></script>
<script type="text/javascript"
	src="${ctx}/resources/bootstrap/js/jquery.bootstrap.min.js"></script>
<script type="text/javascript"
	src="${ctx}/resources/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/analysis.js"></script>
<style type="text/css">
#netable {
	width: 100%;
}

.tdMargin {
	margin-left: 10px;
}

.trHover {
	background: #e6e6e6;
}

.btn:active, .btn.active {
	outline: 0;
	background: #f0a448;
	color: #fff;
	-webkit-box-shadow: none;
	box-shadow: none;
	height: 30px;
}

input[type=checkbox]:hover {
	cursor: pointer;
}

._label {
	color: #555;
	font-weight: normal;
	font-size: 15px;
	margin-top: 5px;
	width: 150px;
	text-align: right;
	float: left;
	display: inline-block;
}

table {
	width: 100%;
}

td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
</head>
<body>
	<div class="TabDiv">
		<div class="tipText">当前位置:&nbsp;&nbsp;费用分析</div>

	</div>
	<div style="width: 100%;" id="netableDiv">
		<table id="netable" class="tbl">
			<thead>
				<tr>
					<th class="text-center" style="width: 20%;">费用流水总计</th>
					
				</tr>
			</thead>
			<tbody>
					<tr>
						<td class="text-center">${all}</td>
					</tr>
			</tbody>
			<tfoot>
			</tfoot>

		</table>
	</div>

</body>
</html>