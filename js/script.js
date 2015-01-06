var top_array=[];
	var elems=$(".panel").length;
	var $html_body=$("html, body");
	current_focus=0;
	var music1; 
	var music2;
	var animation_state=false;
	var timeline_first_time=true;
	$links=$(".main-link");
	$background_panel3=$("#background_panel3");
	$background_panel4=$("#background_panel4");
	var move_to_slide=function(slide){
		$links.css({"color":"#20c068"});
		//special case for ragam14 link with 2 slides
		if(slide==3){
			$(".main-link[data-slide-num='"+2+"']").css({"color":"white"});
		}
		if(slide==2||slide==3){
			$background_panel3.css({"background":""});
			$background_panel4.css({"background":""});
		}
		$(".main-link[data-slide-num='"+slide+"']").css({"color":"white"});
		$html_body.stop();
		animation_state=true;
		current_focus=slide;
		$html_body.animate({scrollTop: top_array[current_focus]},function(){animation_state=false;});
		var animated_divs=$('.panel').eq(current_focus).find('.animated');
		animated_divs.addClass(function(index){return animated_divs.eq(index).data('anim')||'zoomIn'});
		if(timeline_first_time&&slide==1){
			timeline_first_time=false;
			draw_animated_lines(data);
		}
	}
	var temp=0;
	$(window).resize(function(){
		calculate_top_array();
		move_to_slide(current_focus);
	});
	var calculate_top_array=function(){
		temp=0;
		top_array=[];
		$(".panel").each(function(){
			top_array.push(temp);
			temp+=$(this).height();
		})
	}
	var music1_playing=false;
	var music2_playing=false;
	$(document).bind('mousewheel DOMMouseScroll keydown',function(event){
		//event.preventDefault();
		//event.stopPropagation();
		if(animation_state==true)
			return false;
	 	if (event.originalEvent.wheelDelta < 0|| event.originalEvent.detail > 0||event.which==34||event.which==39||event.which==40) {
	 		if(current_focus!=elems-1)
				move_to_slide((current_focus+1)%elems);
			return false;
		}
		else if (event.originalEvent.wheelDelta >= 0||event.originalEvent.detail < 0||event.which==33||event.which==37||event.which==38){
			if(current_focus!=0)
				move_to_slide(((current_focus-1)+elems)%elems);
			return false;
		}
		else if(event.which==36){
			move_to_slide(0);
			return false;
		}
		else if(event.which==35){
			move_to_slide(elems-1);
			return false;
		}
		else if(event.which==83){
			if(!music1||!music2)
				return false;
			if(music1_playing==false){
				music1.play();
				music1_playing=true;
				music2.pause();
				music2_playing=false;
			}
			else{
				music1.pause();
				music1_playing=false;
			}

		}
		else if(event.which==66){
			if(!music1||!music2)
				return false;
			if(music2_playing==false){
				music2.play();
				music2_playing=true;
				music1.pause();
				music1_playing=false;
			}
			else{
				music2.pause();
				music2_playing=false;
			}

		}
	})
	$(document).bind("swipeup",function(){
		if(animation_state==true)
			return false;
		if(current_focus!=elems-1){
			move_to_slide((current_focus+1)%elems);
			return false;
		}
	})
	$(document).bind("swipedown",function(){
		if(animation_state==true)
			return false;
		if(current_focus!=0){
			move_to_slide(((current_focus-1)+elems)%elems);
			return false;
		}
	})
	$(".arrow-indicator,.arrow-indicator-text").click(function(){move_to_slide(1);})
	calculate_top_array();
	move_to_slide(0);
	$(".chart_container").hide();
	$(".chart_link").click(function(){
		$(".chart_link").removeClass("selected");
		$(this).addClass("selected");
		$(".chart_container").fadeOut();
		$("#"+$(this).data("chart-target")).slideDown();
	});
	/*Tweak for fixing the overflow of charts from the container.
		NO IDEA WHY THE FOLLOWING CODE WORKS ..BUT IT WORKS*/
	for(i=0;i<$(".chart_link").length;i++){
		$(".chart_link").eq(i).trigger('click');
	}
		$(".chart_link").eq(0).trigger('click');
	var preloader_text="Loading";
	var preloader_limit=4;
	var preloader_i=0;
	var preloader_handler=setInterval(function(){
		preloader_i++;
		$("#preloader>#preloader_text").html(preloader_text);
		if(preloader_i==preloader_limit){
			preloader_text="Loading";
			preloader_i=0;
		}
		else
			preloader_text=preloader_text+".";
	},500)
	window.onload=function(){
		$("#preloader").fadeOut();
		clearInterval(preloader_handler);
		move_to_slide(0);
		music1 = new Audio('music/music1.mp3');
		music2 = new Audio('music/music2.mp3');
	}
	$bgtexture=$("#bgtexture")
	$(document).mousemove(function(event){
		$bgtexture.css({"background-position": -event.pageX/80+"px "+ -event.pageY/80+"px"});
	});
	$("#panel3 .gal").hover(function(){
		$background_panel3.css({"background":"url('"+$(this).data('bg')+"') no-repeat center center fixed","-webkit-background-size":"cover","-moz-background-size":"cover","-o-background-size":"cover","background-size":"cover"});
	})
	$("#panel4 .gal").hover(function(){
		$background_panel4.css({"background":"url('"+$(this).data('bg')+"') no-repeat center center fixed","-webkit-background-size":"cover","-moz-background-size":"cover","-o-background-size":"cover","background-size":"cover"});
	})
	$links.click(function(){
		move_to_slide($(this).data('slide-num'));
	})
