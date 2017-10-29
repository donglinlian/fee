$(document).ready(function(){
$("#btn_add").click(function(){
	$("#addModal").modal('show');
});	
	
});
//$("#btn_delete").click(function(){
//	
//});	


function selectAll(checkbox) {
	$('input[type=checkbox]').prop('checked', $(checkbox).prop('checked'));
	if ($("#checkAll").is(":checked") == true) {

	} else {
		initTable();
	}
}

// 表格样式设置
function initTable() {
	var _this = $(".tbl");
	_this.find("tr:odd").css({
		"background-color" : "#fff",
		"border-top" : "1px solid #ededed",
		"border-bottom" : "1px solid #ededed"
	});
	_this.find("tr:even").css("background-color", "#fafafa");
	_this.find("tfoot>tr").css({
		"border-bottom" : "0px",
		"background-color" : "#fff"
	});
}
function modify(id,feeName,theme,num){}