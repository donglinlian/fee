$(document).ready(function(){
	initLayOut();
})

function forwardAndSaveUrl(url) {
	window.frames["framedemo"].location.href = url;
}

function initLayOut(){
	var documentHeight=$(window).height();
    var documentWidth=$(window).width();

    $(".leftmenu").height(documentHeight);
    $(".rightpanel").height(documentHeight).width(documentWidth-100);
    $("#framedemo").width(documentWidth-100);
    $("#framedemo").height(documentHeight-55);
}

function goForward(URL){
	var URL = URL+"?encryptParam=8ACB2B7A053A1DA678119F4E9BED884E40A991B1D609F25B480DA373051DF301";

	//$("#framedemo").attr("src",URL);
	//document.getElementById("framedemo").setAttribute("src",URL);
	
	$("#framedemo").remove();
	$(".rightpanel").append('<iframe name="framedemo" id="framedemo" src="" frameborder="NO" border="0" framespacing="0" style="visibility:visible")></iframe>');

	var documentHeight=$(window).height();
	var documentWidth=$(window).width();
	$(".rightpanel").height(documentHeight);
	$("#framedemo").height(documentHeight-55);
	$(".rightpanel").width(documentWidth-100);
	$("#framedemo").width(documentWidth-100);
	
	document.getElementById("framedemo").setAttribute("src",URL);
}