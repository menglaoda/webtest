$(function(){
	//答案
	var answer = [];
	//给每个项目绑定事件
	$(".myalert p").on("click",function(){
		$(".myalert").hide();
		$(".loading").show();
		$(".headTitle").html($(this).html());
		if($(this).html()=="html+css测试"){
			$.ajax({
				type:"get",
				url:"js/index.json",
				async:true,
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
				}
			});
			console.log(answer);
		}
	})
})
