$(function(){
	//正确答案
	var answer = [];
	//提交的答案
	var submitanswer = [];
	//成绩
	var score =60;
	//错误答案
	var erranswer = [];
	//给每个项目绑定事件
	$(".myalert p").on("click",function(){
		$(".myalert").hide();
		$(".loading").show();
		$(".headTitle").html($(this).html());
		if($(this).html()=="html+css测试"){
			$.ajax({
				type:"get",
				url:"js/index.json",
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
									var span1 = $("<span></span>");
									input1.attr("name",i).appendTo(li1);
									span1.html('&ensp;'+s+"&ensp;"+item2).appendTo(li1);
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
					}5
				},
				complete:function(){
					$(".loading").fadeOut();
					$(".zhezhao").hide();
					$(".content").fadeIn();
					$("body").css("overflow","visible");
					//把答案记录在topic上
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
			console.log(answer);
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
				$(".topic").eq(i).find(".bixuan").show();
				$(".topic").eq(i).find("hr").show();
				$(".bttitle").fadeIn();
				an = false;
			}
		}
		//全选中
		if(an==true){
			$("#btn").remove();
			console.log("全选中");
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
			$(".zhezhao").show();
		}
	})
	//查看错误题目
	$(".errtimu").click(function(){
		for(var i=0;i<erranswer.length;i++){
			$(".topic").eq(erranswer[i]).css("background","gold");
			$(".zhezhao").hide();
			$(".myscore").addClass("errscore");
			$(".myscore .errtimu").hide();
		}
	})
})
