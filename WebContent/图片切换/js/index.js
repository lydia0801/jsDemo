// JavaScript Document
var lydia_index =0;//当前索引
var lydia_total=0;//图片总数
var lydia_time;
var lydia_change_time=1000;
var lydia_look_time =1000;
var lydia_flag=true;
var isLeft =false;
$(function(){
	lydia_total=$("#lydia_show_img li").length;
	lydia_time = setInterval("showPic()",lydia_change_time);
	
	//给小图片添加鼠标事件
	$("#lydia_show_imgsmall li img").bind({
		mouseover:function(){
			clearInterval(lydia_time);
			showPic($(this).parent().parent().index());	
		},
		mouseout:function(){
			clearInterval(lydia_time);
			lydia_time = setInterval("showPic()",lydia_change_time);	
		}
		
	});
	
	$("#lydia_left").click(function(){
		var lydia_right=0;
		clearInterval(lydia_time);
		if($("#lydia_show_imgsmall_view").scrollLeft()>450){
			lydia_right=$("#lydia_show_imgsmall_view").scrollLeft()-450;
		}else{
			lydia_right=0;	
		}
		$("#lydia_show_imgsmall_view").animate({scrollLeft:lydia_right},300);
		showPic(parseInt(lydia_right/70)+1);
		lydia_flag=true;
		lydia_time = setInterval("showPic()",lydia_change_time);	
	
	});
	
	$("#lydia_right").click(function(){
		clearInterval(lydia_time);
		if($("#lydia_show_imgsmall_view").scrollLeft()<(lydia_total-8)*65){
			var lydia_left=$("#lydia_show_imgsmall_view").scrollLeft()+460;
			$("#lydia_show_imgsmall_view").animate({scrollLeft:lydia_left},460);
			showPic(parseInt(lydia_left/65)+1);
		}
		lydia_time = setInterval("showPic()",lydia_change_time);	
	});
	
	$("#lydia_show_img").mousemove(function(){
		var e=arguments.callee.caller.arguments[0]||window.event;
		var num =(e.offsetX||e.layerX);  //	e.offsetX  IE||e.layerX W3C
		if(num<200){
			$(this).css("cursor","url('../image/left.png'),default");
		}else if(num>450){
			$(this).css("cursor","url('../image/right.png'),default");	
		}else{
			$(this).css("cursor","default");	
		}
	});
	
	$("#lydia_show_img").click(function(){
		lydia_flag=true;
		var e=arguments.callee.caller.arguments[0]||window.event;
		var num =(e.offsetX||e.layerX);  //	e.offsetX  IE||e.layerX W3C
		if(num<200){
			isLeft=true;
			window.clearInterval(lydia_time);
			var now =parseInt(lydia_index)-2;
			if(now==(-1)){
				$("#shitiInfo").text("已经到了第一张");
				$("#shitiInfo").fadeIn("slow",function(){
					$(this).fadeOut(500);	
				});
				lydia_time = setInterval("showPic()",lydia_change_time);
				return ;
			}
			setTimeout("showPic("+now+")",0);
			lydia_time = setInterval("showPic()",lydia_change_time);
		}else if(num>450){
			isLeft=false;
			window.clearInterval(lydia_time);
			var now =parseInt(lydia_index);
			if(now==lydia_total){
				$("#shitiInfo").text("已经到最后一张");
				$("#shitiInfo").fadeIn("slow",function(){
					$(this).fadeOut(500);	
				});
				lydia_time = setInterval("showPic()",lydia_change_time);
				return;
			}
			setTimeout("showPic("+now+")",0);
			lydia_time = setInterval("showPic()",lydia_change_time);
		}	
		
	});
		
});

//显示图片
function showPic(){
	if(arguments.length>0){
		if(arguments[0]<0){
			lydia_index =0;
		}else if(arguments[0]>lydia_total-1){
			lydia_index=lydia_total-1;
		}else{
			lydia_index=arguments[0];	
		}
	}else{
		lydia_index = lydia_index%lydia_total;
	}
	$("#lydia_show_img li ,#lydia_show_title li").css("display","none");
	$("#lydia_show_imgsmall li img").attr("class","lydia_out");
	$("#lydia_show_img li").eq(lydia_index-1).css("display","block");
	$("#lydia_show_title li").eq(lydia_index).css("display","block");
	$("#lydia_show_imgsmall li img").eq(lydia_index).attr("class","lydia_over");
	lydia_index++;
	if(isLeft){
		if(lydia_index!=0 && (lydia_index+1)%8==0){
			$("#lydia_show_imgsmall_view").animate({ scrollLeft:-450},300);
			isLeft=false;
		}
	}
	if(lydia_index!=0&&lydia_index%8==0){
		if(isLeft==false){
			$("#lydia_show_imgsmall_view").animate({scrollLeft:lydia_index*65},300);	
		}
	}else if(lydia_index==1){
		$("#lydia_show_imgsmall_view").animate({scrollLeft:0},300);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}