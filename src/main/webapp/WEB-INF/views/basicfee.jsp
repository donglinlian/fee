<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head >
<!-- 元标签 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>fee</title>
<%-- <c:set>标签用于设置变量值和对象属性。 --%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!-- 引入公共的css -->
<link href="${ctx}/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link rel="stylesheet" href="${ctx}/resources/css/style.default.css" type="text/css">
<script type="text/javascript" src="${ctx}/resources/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/bootstrap/js/jquery.bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/basicfee.js"></script>
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

</style>
</head>
<body>
	<div class="TabDiv">
      <div class="tipText">当前位置:&nbsp;&nbsp;基本费用</div>				
      <div class="pull-right btngroup" style = "margin-right:20px">
            <a class="btn_default" id=btn_add>
                <span class="img_btn_add"><img src="${ctx}/resources/images/btn_add.png" /></span>
                <span>添加</span>
            </a>
<!--             <a class="btn_default" id="btn_delete"> -->
<%--                 <span class="img_btn_add"><img src="${ctx}/resources/images/btn_delete.png" /></span> --%>
<!--                 <span>删除</span> -->
<!--             </a> -->
        </div>
	</div>
	<div style="width: 100%;" id="netableDiv">
		<table id="netable" class="tbl">
			<thead>
				<tr>
					<th style="width: 2%;" class="text-center"><input
						name="checkAllItem" id="checkAll" type="checkbox"
						onclick="selectAll(this);"/></th>
					<th class="text-center" style="width:20%;">费用名称</th>
					<th class="text-center" style="width:15%;">费用数量 单位：元</th>
					<th class="text-center" style="width:10%;">主题</th>
					<th class="text-center" style="width:10%;">费用种类</th>
					<th class="text-center" style="width:15%;">费用来源</th>
					<th class="text-center" style="width:12%;">时间</th>
<!-- 					<th class="text-center" style="width:5%;">费用管理</th> -->
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${FeeDemo}" var="result">
				<c:set var="direction" value="${(result.theme==0)?\"OUT\":\"IN\"}"/> 
					<tr>
						<td class="text-center"><input name="chkItem" type="checkbox" id="${result.id}" /></td>
						<td class="text-center">${result.feeName }</td>
						<td class="text-center">${result.num}</td>
						<td class="text-center">${result.theme}</td>
						<td class="text-center">${direction}</td>
						<td class="text-center">${result.fromName}</td>
						<td class="text-center">${result.createTime}</td>
<!-- 						<td class="text-center"><span class="icon-uniE621" -->
<%-- 							onclick="modify('${result.id}','${result.feeName}','${result.theme}','${result.num}')"></span> --%>
<!-- 						</td> -->
					</tr>
				</c:forEach>
			</tbody>

			<tfoot>
<!-- 				<tr style="background-color: #fff !important;"> -->
<!-- 					<td colspan="11" style="text-align: right; padding-right: 20px;"> -->
<%-- 						<jsp:include page="/public/inc/pager.jsp" flush="true"> --%>
<%-- 							<jsp:param value="${page.total }" name="items" /> --%>
<%-- 							<jsp:param value="hotsort" name="url" /> --%>
<%-- 							<jsp:param value="${page.pageSize }" name="pageSize" /> --%>
<%-- 						</jsp:include> --%>
<!-- 					</td> -->
<!-- 				</tr> -->
			</tfoot>

		</table>
	</div>
	<!-- 添加 -->
	<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<form  class="modal-content" action="/fee/basic/add" method="post" >
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">添加新费用</h4>
				</div>
				<div class="modal-body">
								
					<div class="form-group input-group">
						<div class="_label">费用名称:</div>
						<input type="text" class="form-control" name="feeName" style="float: left;width: 300px;" placeholder="*必填">
					</div>
					
					<div class="form-group input-group">
						<div class="_label">费用数量:</div>
						<input type="text" class="form-control"  name="num" style="float: left;width: 300px;" placeholder="*必填，单位 :元">
					</div>
					<div class="form-group input-group">
						<div class="_label">费用主题:</div>
						<select class="form-control" name="theme" style="float: left;width: 300px;">
						<option value="0">生辰</option>
						<option value="1">新婚</option>
						<option value="2">乔迁</option>
						<option value="3">中榜</option>
						<option value="4">满月</option>
						<option value="5">其它</option>
						</select>
					</div>
					<div class="form-group input-group">
						<div class="_label">费用来源:</div>
						<input  type="text" class="form-control"  name="fromName" style="float: left;width: 300px;" placeholder="*必填">
					</div>
					<div class="form-group input-group">
						<div class="_label">费用种类:</div>
						<select class="form-control"  name="direction" style="float: left;width: 300px;">
						<option value="1">IN</option>
						<option value="0">OUT</option>
						</select>
					</div>
				   <div class="form-group input-group">
						<div class="_label">备注:</div>
						<input type="text" class="form-control" name="notice"  style="float: left;width: 300px;margin-left: 20px;">
					</div>
				</div>
				<div class="modal-footer">
					<button id="addConfirm" type="submit" class="btn_default">确定</button>
					<button type="button" class="btn_default grayBtn" data-dismiss="modal">取消</button>
				</div>
			</form>
		</div>
	</div>
</body>
</html>