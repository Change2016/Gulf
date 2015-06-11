/*
 * Gulf 2015 6 11
 */
//代码还可以精简：确定当前页，前一页，后一页，可以精简判断。<30px回退没有处理，待处理
$(function(){
	var X=0,Y=-1,_X=0,_Y=-1,aniDom=null;
	var height = $(window).height();
	$("#pages>div").on("touchstart",touchstart)
	$("#pages>div").on("touchmove",touchmove);
	$("#pages>div").on("touchend",touchend);
	
	function touchstart(e){
	      e.preventDefault();
		  X = e.originalEvent.changedTouches[0].clientX;
		  Y = e.originalEvent.changedTouches[0].clientY;
	}
	function touchmove(e){
		  e.preventDefault();
		  _X = e.originalEvent.changedTouches[0].clientX;
		  _Y = e.originalEvent.changedTouches[0].clientY;
		  if(parseInt(_Y)<parseInt(Y)){
			  //上移动
			  aniDom = $(this).next().length>0? $(this).next() : $(this).siblings(":first");
			  aniDom.animate({top:height+parseInt(_Y)-parseInt(Y)},0);
		  }else{
			  aniDom = $(this).prev().length>0? $(this).prev() : $(this).siblings(":last");
			  aniDom.animate({top:-height+parseInt(_Y)-parseInt(Y)},0);
		  }
	}	
	function touchend(e){
		 e.preventDefault();
		 if(Y==-1||_Y==-1){
			 return; 
		 }
		 if((parseInt(_Y)-parseInt(Y))<-30){
		   //上翻页
		   if($(this).next().length<=0){
			  $(this).siblings(":first").animate({top:0},500,function(){
				 $(this).css({"z-index":"99"});//当前页
				 $(this).next().css({"top":"100%","z-index":"999"});//下一页
				 $(this).siblings(":last").css({"top":"-100%","z-index":"999"});//上一页
		      });
		   }else{
		      $(this).next().animate({top:0},500,function(){
				 $(this).css("z-index","99");//当前页
				 $(this).prev().css({"top":"-100%","z-index":"999"});//上一页
				 //下一页
			     if($(this).next().length<=0){
			 	    $(this).siblings(":first").css({"top":"100%","z-index":"999"}); 
			     }else{
				    $(this).next().css({"top":"100%","z-index":"999"}); 
			     }
			  });
		   }
		     Y=-1,_Y=-1;
		   //上翻页
		 }else if((parseInt(_Y)-parseInt(Y))>30){
		   //下翻页
		   if($(this).prev().length<=0){			 
              //end翻页
		      $(this).siblings(":last").animate({top:0},500,function(){
				 $(this).css("z-index","99");//当前页
				 $(this).siblings(":first").css({"top":"100%","z-index":"999"});//下一页
				 $(this).prev().css({"top":"-100%","z-index":"999"});//上一页
			  });
		   }else{
			  //end翻页
			  $(this).prev().animate({top:0},500,function(){
				 $(this).css("z-index","99");//当前
			     $(this).next().css({"top":"100%","z-index":"999"});//下一页
				 //上一页
				 if($(this).prev().length<=0){
				   $(this).siblings(":last").css({"top":"-100%","z-index":"999"});  
			     }else{
				   $(this).prev().css({"top":"-100%","z-index":"999"});
			     }
			  });
		    }
			Y=-1,_Y=-1;
		   //下翻页
		 }
	}
});