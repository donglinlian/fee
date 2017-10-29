/* 
* @Author: cici
* @Date:   2015-05-01 15:25:12
* @Last Modified by:   anchen
* @Last Modified time: 2015-06-16 19:30:20
*/

window.onload = function(){
	var documentHeight=$(window).height();
	console.log(documentHeight);
    if(documentHeight<770){
        $(".leftpanel").height("100%");
        $("#rightpanel").height("100%");
        $("#framedemo").height("600px");
    }else{
        $(".leftpanel").height(documentHeight);
        $("#rightpanel").height(documentHeight);
        $("#framedemo").height(documentHeight-70);
    }
};

 __animation_duration__ = 50
$(window).resize(function(){  
    var documentHeight=$(window).height();
    var documentWidth=$(window).width();
    if(documentHeight<770){
        $(".leftpanel").height("100%");
        $("#rightpanel").height("100%");
        $("#framedemo").height("600px");
    }else{
        $(".leftpanel").height(documentHeight);
        $("#rightpanel").height(documentHeight);
        $("#framedemo").height(documentHeight-70);
    }
 
    if(parseInt($("#alartCount").html())>0){
        $("#left_bg").css("background","url(resources/images/leftBgRed.png) repeat");
    }else{
        $("#left_bg").css("background","url(resources/images/left_bg.png) repeat");
    }
    
    if(documentWidth<1000){
        $("#rightpanel").width("1000px");
    }else{
        if(document.getElementById("left_close_btn").style.background.indexOf("left_close")>0){
            $("#rightpanel").animate({'width':(documentWidth-224)},__animation_duration__);  
        }else{
            $("#rightpanel").animate({'width':(documentWidth-50)},__animation_duration__); 
        } 
    }
	
	checkAlarm();
});	

var netInterfaceUrl = "platform/management/acupgrade";

function checkAlarm(){
    if(($("#seriousAlarmText").html()=="0")&&($("#mainAlarmText").html()=="0")&&($("#secondaryAlarmText").html()=="0")&&($("#normalAlarmText").html()=="0")){
        $(".leftpanel").removeClass("toTopRed").addClass("toTopGreen");
        $(".alarmImg").hide();
        $(".alarmInfo").hide();
    }else{
        $(".leftpanel").removeClass("toTopGreen").addClass("toTopRed");
        $(".alarmImg").show();
        $(".alarmInfo").hide();
    }
}

function addPagemask(){
	$(".show_left .dropdown>ul").each(function(){
        $(this).find("li>a").each(function(){
            if($(this).css("background-image").indexOf("drowLeftArrow2")>=0){
                alert($(this).parent().parent().html());
             
            }
        }); 
    });
}


$(document).ready(function(){ 
    $(".show_left>li[class='dropdown']>a>span").each(function(){
        if($(this).html()!=""){
            $(this).hide();
        }
    });
 
    // dropdown in leftmenu
    $('.leftmenu .dropdown > a').click(function(){ 
        if(document.getElementById("left_close_btn").style.background.indexOf("left_close")>0){
            $('.leftmenu .dropdown > a').next().slideUp('fast');  
            if(lg=="zh_CN"){
                $('.leftmenu .dropdown > a').css({"background":"url(resources/images/downArrow.png) no-repeat","background-position":"135px 18px"});
            }else if(lg=="en_US"){
                $('.leftmenu .dropdown > a').css({"background":"url(resources/images/downArrow.png) no-repeat","background-position":"165px 18px"});

            }else{
                 $('.leftmenu .dropdown > a').css({"background":"url(resources/images/downArrow.png) no-repeat","background-position":"135px 18px"});
            }
           
             
            $(".leftmenu .dropdown > a").each(function(){
                $(this).parent().css("background","none");
            });
             

            if(!$(this).next().is(':visible'))
            { 
                $(this).next().slideDown('fast');
                if(lg=="zh_CN"){
                    $(this).css({"background":"url(resources/images/upArrow.png) no-repeat","background-position":"135px 18px"});
                }else if(lg=="en_US"){
                    $(this).css({"background":"url(resources/images/upArrow.png) no-repeat","background-position":"165px 18px"});
                }else{
                    $(this).css({"background":"url(resources/images/upArrow.png) no-repeat","background-position":"135px 18px"});
                }
            } 
            else
            { 
                $(this).next().slideUp('fast'); 
                if(lg=="zh_CN"){
                    $(this).css({"background":"url(resources/images/downArrow.png) no-repeat","background-position":"135px 18px"}); 
                }else if(lg=="en_US"){
                    $(this).css({"background":"url(resources/images/downArrow.png) no-repeat","background-position":"165px 18px"});
                }else{
                    $(this).css({"background":"url(resources/images/downArrow.png) no-repeat","background-position":"135px 18px"}); 
                }
            }  

            return false;  
        }else{
            push_open2();
            $('.leftmenu .dropdown > a').next().slideUp('fast');  
            $('.leftmenu .dropdown > a').css({"background":"url(resources/images/downArrow.png) no-repeat","background-position":"135px 18px"});
           
            $(".leftmenu .dropdown > a").each(function(){
                $(this).parent().css("background","none");
            });
             
            if(!$(this).next().is(':visible'))
            { 
                $(this).next().slideDown('fast');
                $(this).css({"background":"url(resources/images/upArrow.png) no-repeat","background-position":"135px 18px"});
            } 
            else
            { 
                $(this).next().slideUp('fast'); 
                $(this).css({"background":"url(resources/images/downArrow.png) no-repeat","background-position":"135px 18px"});  
            }  
            return false;  
        }
    });
	
	$(".leftmenu>ul li:not('.dropdown') a").mouseover(function(){
		$(this).css({"text-decoration":"none","background-color":"#4298c7"});
	}).mouseout(function(){
		$(this).css({"text-decoration":"none","background-color":"#4db1e3"});
	});
	
	

    $(".leftmenu>ul li:not('.dropdown') a").click(function() {
        $(".leftmenu>ul li:not('.dropdown') a").css({"background":"url(resources/images/drowLeftArrow.png) no-repeat","background-position":"50px 10px","color":"#f0f4f5"});
		$(this).css({"background":"url(resources/images/drowLeftArrow2.png) no-repeat","background-position":"50px 10px","color":"#fabb57"});
        $(this).parent().parent().parent().siblings().css({"background":"none"});
        $(this).parent().parent().parent().css({"background":"#4298c7"});

		$(".pageMask").remove();
		$(this).parent().parent().parent().before(pageMask);
		
    });

    var documentHeight=$(window).height();
    var documentWidth=$(window).width();

    if(documentHeight<700){
        $(".leftpanel").height("770px");
        $("#rightpanel").height("770px");
        $("#framedemo").height("705px");
    }else{
        $(".leftpanel").height(documentHeight);
        $("#rightpanel").height(documentHeight);
        $("#framedemo").height(documentHeight-70);
    }

 
	$("#alartInfHide").css("display","");

    if(parseInt($("#alartCount").html())>0){
        $("#left_bg").css("background","url(resources/images/leftBgRed.png) repeat");
    }else{
        $("#left_bg").css("background","url(resources/images/left_bg.png) repeat");
    }

    if(documentWidth<1000){
        $("#rightpanel").width("1000px");
    }else{
        if(document.getElementById("left_close_btn").style.background.indexOf("left_close")>0){
            $("#rightpanel").width(documentWidth-224);  
        }else{
            $("#rightpanel").width(documentWidth-50); 
        } 
    }
   

    if(parseInt($("#alartCount").html())>0){
        $("#left_bg").css("background","url(resources/images/leftBgRed.png) repeat");
    }else{
        $("#left_bg").css("background","url(resources/images/left_bg.png) repeat");
    }

leftClick();

loadTime(); 

$("#alartCount").click(function() {
    if( $("#alartCount").css("margin-left")=="80px"){
        $("#alartInfHide").css("display","none");
        $("#alartInfShow").css("display","");
    }
});
 
//$(".maskDiv").click(function() {
//  push_close();
//});

alarmHover();

checkAlarm();

setAcTime();

});

var acTimeInterval;

function push_close(){	
   
    $("#left_close_btn").css("background","url(resources/images/left_open_btn.png)");
    $(".leftmenu").animate({"width":"50px"},__animation_duration__);
    $("#rightpanel").css("width",$(window).width()-50);
    $("#rightpanel").animate({"margin-left":"50px"},__animation_duration__); 
    //$("#rightpanel").removeClass("blur_right_5") ;  // blur rightpanel
    $(".maskDiv").hide();  
    $("#time").hide();
	$("#date").hide();
	$("#week").hide();
    
	$("#acTime").hide();
    $("#acDate").hide();
	
    document.body.style.overflow="hidden";
	if($(".leftpanel").attr("class").indexOf("Red")>=0){
		$(".alarmImg").show();
		$(".alarmInfo").hide();
	}else{
		$(".alarmImg").hide();
		$(".alarmInfo").hide();
	}

    $(".show_left>li[class='dropdown']>a>span").each(function(){
        if($(this).html()!=""){
            $(this).hide();
        }
    });

    $(".show_left>li[class='dropdown']>ul").each(function(){
        $(this).hide();
        $(this).parent().css("background","none");
    });
	
	$(".pageMask").css("left","50px");

}

var acTime = new Date();

function push_open(){    	

    $("#left_close_btn").css("background","url(resources/images/left_close.png)");
 	
 	$(".maskDiv").css("left","50px");
 	$(".maskDiv").show();
 	$(".maskDiv").animate({"left":"224px"},__animation_duration__);
 	
    $(".leftmenu").animate({"width":"224px"},__animation_duration__);
    $("#rightpanel").animate({"margin-left":"224px"},__animation_duration__);
   
    //$("#rightpanel").addClass("blur_right_5") ;  // blur rightpanel
    
    // $("#time").show();
	// $("#date").show();
	// $("#week").show();
    
	$("#acTime").show();
    $("#acDate").show();
	
	var data = {
		'token' : token
	};
	$phi.get(netInterfaceUrl + '/time', data, function(data) {
		acTime.setTime(parseInt(data.time));
	});

    $(".show_left>li[class='dropdown']>a>span").each(function(){
        if($(this).html()!=""){
            $(this).show();
        }
    });

    $(".show_left .dropdown>ul").each(function(){
        $(this).find("li>a").each(function(){
            if($(this).css("background-image").indexOf("drowLeftArrow2")>=0){
                $(this).parent().parent().slideDown('fast');
             
            }
        }); 
    });
    document.body.style.overflow="hidden";
	if($(".leftpanel").attr("class").indexOf("Red")>=0){
	    $(".alarmInfo").show();
	}else{
		$(".alarmInfo").hide();
	}
	$(".alarmImg").hide();		
	$(".pageMask").animate({"left":"224px"},__animation_duration__);
}

function setAcTime(value) {
	acTimeInterval = window.setInterval(function() {	
		var hour = parseInt(acTime.getHours()) < 10 ? '0' + acTime.getHours() : acTime
				.getHours();
		var minute = parseInt(acTime.getMinutes()) < 10 ? '0' + acTime.getMinutes() : acTime
				.getMinutes();
		var second = parseInt(acTime.getSeconds()) < 10 ? '0' + acTime.getSeconds() : acTime
				.getSeconds();
		$("#acTime").text(
				hour + ':' + minute + ':'
						+ second);
		$("#acDate").text(
				acTime.getFullYear() + '/'
						+ Number(parseInt(acTime.getMonth()) + 1) + '/'
						+ acTime.getDate());
		acTime.setTime(acTime.getTime()+500);
	}, 500);
}

function push_open2(){
	$(".maskDiv").css("left","50px");
 	$(".maskDiv").show();
 	$(".maskDiv").animate({"left":"224px"},__animation_duration__);
 	
    $("#left_close_btn").css("background","url(resources/images/left_close.png)");
 
    $(".leftmenu").animate({"width":"224px"}, __animation_duration__ );
    $("#rightpanel").css({"margin-left":"224px"}, __animation_duration__ );
    //$("#rightpanel").addClass("blur_right_5");
    // $("#time").show();
	// $("#date").show();
	// $("#week").show();

    $("#acTime").show();
    $("#acDate").show();	

    $(".show_left>li[class='dropdown']>a>span").each(function(){
        if($(this).html()!=""){
            $(this).show();
        }
    });
	
    document.body.style.overflow="hidden";
	if($(".leftpanel").attr("class").indexOf("Red")>=0){
	    $(".alarmInfo").show();
	}else{
		$(".alarmInfo").hide();
	}
	$(".alarmImg").hide();	
	$(".pageMask").animate({"left":"224px"},__animation_duration__);
}



function leftClick(){
    $("#left_close_btn").click(function(){
        if(document.getElementById("left_close_btn").style.background.indexOf("left_close")>0)
        {  
           push_close();
        }else{   
           push_open();
        }               
    });
}

function alarmHover(){
    $(".alarmhover").each(function(){
        $(this).mouseover(function(){           
            if($(this).attr("class").indexOf("seriousAlarm")>=0){
                $(this).html("严重告警");
            }
            if($(this).attr("class").indexOf("mainAlarm")>=0){
                $(this).html("主要告警");
            }
            if($(this).attr("class").indexOf("secondaryAlarm")>=0){
                $(this).html("次要告警");
            }
            if($(this).attr("class").indexOf("normalAlarm")>=0){
                $(this).html("普通告警");
            }

            $(this).parent().siblings().css("vertical-align","bottom");
            $(this).css({"height":"22px","width":"56px","font-size":"14px","line-height":"22px"});
            $(this).siblings().css({"font-size":"16px","opacity":"1","filter":"alpha(opacity=100)","-moz-opacity":"100"});

        });
		
        $(this).mouseout(function(){
            $(this).css({"height":"7px"});
            $(this).html("");
        });
    });
}

function loadTime(){

    var dateTime=new Date();
    var hh=dateTime.getHours();//小时
    var mm=dateTime.getMinutes();//分钟
    var yy=dateTime.getFullYear();//年份
    var MM=dateTime.getMonth()+1;  //月份-因为1月这个方法返回为0，所以加1
    var dd=dateTime.getDate();//日数

    var day=dateTime.getDay();
    var arr_week = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
    var week = arr_week[day];

    mm = mm<10 ? "0"+mm : mm;
    document.getElementById("date").innerHTML=yy+"/"+MM+"/"+dd;
    document.getElementById("time").innerHTML=hh+":"+mm;
    document.getElementById("week").innerHTML=week;

    setTimeout(loadTime,1000);
}
 



 
 

 

 