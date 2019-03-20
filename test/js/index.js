$(function(){
	//正确答案
	var answer = [];
	//提交的答案
	var submitanswer = [];
	//成绩
	var score =60;
	//错误答案
	var erranswer = [];
	//定时器
	var timer  ;
	//剩余时间
	var mytime = 1800;
	//控制时间
	function time(){
		mytime--;
		//分
		var m = parseInt(mytime/60);
		//秒
		var s = mytime%60;
		if(mytime>1730){
			$(".bttitle").fadeIn();
		}else if(mytime<1730 &&mytime>600){
			$(".bttitle").fadeOut();
		}else if(mytime<300&&mytime>0){
			$(".bttitle").fadeIn().css("color","red");
		}else if(mytime<=0){
			clearInterval(timer);
			$("#btn").remove();
			fn();	
		}
		$(".bttitle").html("剩余时间："+m+"分"+s+"秒");
	}
	//成绩
	function fn(){
		for(var i=0;i<$(".topic").length;i++){
			submitanswer.push($(".topic").eq(i).attr("name"));
		}
		//计算成绩
		for(var i=0;i<answer.length;i++){
			if(answer[i]!=submitanswer[i]){
				score-=2;
				erranswer.push(i);
			}
		}
		//成绩弹窗
		$(".bttitle").hide();
		$(".myscore").show();
		$(".myscore span").html(score);
		//判断成绩等级
		if(score==60){
			$(".myscore img").attr("src","img/hao.gif");
		}else if(score<60&&score>=50){
			$(".myscore img").attr("src","img/youxiu.gif");
		}else if(score<50&&score>=40){
			$(".myscore img").attr("src","img/jy.gif");
		}else if(score<40&&score>=10){
			$(".myscore img").attr("src","img/lingxin.gif");
		}else if(score<10){
			$(".myscore img").attr("src","img/xintong.gif");
		}
		$(".zhezhao").show();
	}
	//点击首页
	$(".home").click(function(){
		window.location.href = "index.html";
	})
	//给每个项目绑定事件
	$(".mytest li").on("click",function(){
		mytime=1800;
		$(".mytest").hide();
		$(".loading").show();
		timer = setInterval(function(){
			time();
		},1000)
		$(".headTitle").html($(this).text());
		if($(this).index()=="0"){
			$.ajax({
				type:"get",
				url:"js/htmlCss.json",
				async:false,
				success:function(res){
					var num1 = num(res.length);//随机30道题目
					for(var i=0;i<30;i++){
						$(res).each(function(idx,item){							
							if(num1[i]==idx){
								answer[i] = item.answer;
								var topic = $("<div class='topic'></div>");
								var timu = $("<p class='timu'></p>");
								timu.html((i+1)+"."+item.title).appendTo(topic);
								var ol = $("<ol class='xuanze'></ol>");
								$(item.choose).each(function(idx2,item2){
									var s = 'A';
									if(idx2==0){
										s= 'A';
									}else if(idx2==1){
										s='B';
									}else if(idx2==2){
										s='C';
									}else if(idx2==3){
										s='D';
									}
									var li1 = $("<li></li>");
									var input1 = $("<input type='radio' />");
									var label1 = $("<label></label>");
									input1.attr({"name":idx,"id":"like"+i+""+idx2}).appendTo(li1);
									label1.attr("for","like"+i+""+idx2).html('&ensp;'+s+"&ensp;"+item2).appendTo(li1);
									li1.appendTo(ol);
								});
								ol.appendTo(topic);
								var hr = $("<hr />");
								hr.appendTo(topic);
								var pp = $("<p class='bixuan'>请选择选项</p>");
								pp.appendTo(topic);
								topic.appendTo($(".textbox"));
							}
						})
					}
				},
				complete:function(){
					$(".loading").fadeOut();
					$(".zhezhao").hide();
					$(".content").fadeIn();
					$("body").css("overflow","visible");
					//点击选项把答案记录在topic上
					$(".topic input").on("click",function(){
						if($(this).parent().index()==0){
							n="A";
						}else if($(this).parent().index()==1){
							n="B";
						}else if($(this).parent().index()==2){
							n="C";
						}else if($(this).parent().index()==3){
							n="D";
						}
						$(this).parents(".topic").css("border","solid 1px white").attr("name",n);
						$(this).parents("ol").siblings("hr").hide();
						$(this).parents("ol").siblings(".bixuan").hide();
					})
				}
			});
		}
	})
	//点击提交按钮
	$("#btn").click(function(){
		var an = true;
		//检查是否全部选中
		for(var i=0;i<$(".topic").length;i++){
			//没选中
			if(typeof $(".topic").eq(i).attr("name")=="undefined"){
				$(".topic").eq(i).css("border","crimson solid 1px");
				$(".topic").eq(i).find(".bixuan").html("请选择选项").show();
				$(".topic").eq(i).find("hr").show();			
				an = false;
			}
		}
		$(".unfinished").fadeIn().delay(5000).fadeOut();
		//全选中
		if(an==true){
			$(".unfinished").hide();
			$("#btn").remove();
			//console.log("全选中");
			fn();
			clearInterval(timer);
		}
	})
	//查看错误题目
	$(".errtimu").click(function(){
		$(".bixuan").hide();
		for(var i=0;i<erranswer.length;i++){
			$(".topic").eq(erranswer[i]).css("background","gold");
			$(".topic").eq(erranswer[i]).find("hr").show();
			var nice = $("<p></p>");
			nice.appendTo($(".topic").eq(erranswer[i]));
			nice.html("正确答案为："+answer[erranswer[i]]).css({"color":"green","text-indent": "22px","margin":" 4px 0px"});
			$(".topic").eq(erranswer[i]).css("border","solid 1px white");
			$(".zhezhao").hide();
			$(".myscore").hide();
			$(".myscore2").show().html("您的成绩为："+score+"分").css("color","red");
		}
		$(".topic input").off("click");
	})
})
