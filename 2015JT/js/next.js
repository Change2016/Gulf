// JavaScript Document
/*
 * Gulf 2015 6 11
 */
$(function(){
	var X=0,Y=-1,_X=0,_Y=-1,aniDom=null;
	var height = $(window).height();
	$("#pages>section").on("touchstart",touchstart)
	$("#pages>section").on("touchmove", touchmove);
	$("#pages>section").on("touchend", touchend);
	function touchstart(e) {
	      //e.preventDefault();
		  X = parseInt(e.originalEvent.changedTouches[0].clientX);
		  Y = parseInt(e.originalEvent.changedTouches[0].clientY);
	}
	function touchmove(e){
		  e.preventDefault();
		  _X = parseInt(e.originalEvent.changedTouches[0].clientX);
		  _Y = parseInt(e.originalEvent.changedTouches[0].clientY);
		  if(_Y<Y){
		      //上移动
		      if ($(this).next().length <= 0) {
		          return;
		      }
		      aniDom = $(this).next().length > 0 ? $(this).next() : $(this).siblings(":first");   
			  aniDom.animate({ top: height + _Y - Y }, 0);
		  } else {
		      if ($(this).prev().length <= 0) {
		          return;
		      }
		      aniDom = $(this).prev().length > 0 ? $(this).prev() : $(this).siblings(":last");
			  aniDom.animate({top:-height+_Y-Y},0);
		  }
		
	}	
	function touchend(e){
	    //e.preventDefault();
		 if(Y==-1||_Y==-1){
			 return; 
		 }
		 if((_Y-Y)<-40){
		   //上翻页
		     if ($(this).next().length <= 0) {
               return;
			   $(this).siblings(":first").animate({top:0},500,function(){
				 $(this).css({"z-index":"99"});//当前页
				 $(this).next().css({"top":"100%","z-index":"999"});//下一页
				 $(this).siblings(":last").css({"top":"-100%","z-index":"999"});//上一页
		       });
		     }else{
		       $(this).next().animate({top:0},500,function(){
				 $(this).addClass("animate").css("z-index","99");//当前页
				 $(this).prev().removeClass("animate").css({"top":"-100%","z-index":"999"});//上一页
		           //下一页

				 $(this).find(".border1>div").addClass("animate");
				 $(this).prev().find(".border1>div").removeClass("animate");

				 if ($(this).next().length <= 0) {
				     return;
			 	    $(this).siblings(":first").css({"top":"100%","z-index":"999"}); 
			     }else{
				    $(this).next().css({"top":"100%","z-index":"999"}); 
				 }
				
			  });
		     }
		    
		   //上翻页
		 }else if((_Y-Y)>40){
		   //下翻页
		     if($(this).prev().length<=0){			 
		       //end翻页
               return;
		       $(this).siblings(":last").animate({top:0},500,function(){
				 $(this).css("z-index","99");//当前页
				 $(this).siblings(":first").css({"top":"100%","z-index":"999"});//下一页
				 $(this).prev().css({"top":"-100%","z-index":"999"});//上一页
			  });
		     }else{
			  //end翻页
		       $(this).prev().animate({ top: 0 }, 500, function () {
				 $(this).addClass("animate").css("z-index","99");//当前
			     $(this).next().removeClass("animate").css({"top":"100%","z-index":"999"});//下一页
		           //上一页

			     if ($(this).prev().length <= 0) {
			         return;
				   $(this).siblings(":last").css({"top":"-100%","z-index":"999"});  
			     }else{
				   $(this).prev().css({"top":"-100%","z-index":"999"});
			     }
			  
			  });
		     }
		     //下翻页
		 }else{
			//返回原页
			 if(Y>_Y){
				//上翻页
				var nextPage = $(this).next().length>0?$(this).next() : $(this).siblings(":first");
				nextPage.animate({top:"100%"},200); 
			 }else{
			 	//下翻页
				var prevPage = $(this).prev().length<=0?$(this).siblings(":last") : $(this).prev();
				prevPage.animate({top:"-100%"},200);	
			 }
		 }
		 Y=-1,_Y=-1;
	}
});