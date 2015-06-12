//.ddw记录第几页
$('.ddw').val(0);
//.ddw2 0为未触发滚动事件，1为正在滚动当中
$('.ddw2').val(0);
$(function(){
  //delta为负表示向下滚动为正表示向上滚动
  $('.num_box').mousewheel(function(event, delta) {
	var aaaa=$('.ddw2').val();
	if (aaaa == 1){
		return;	
	}
	_scroll(delta);
  });
});

function _scroll(a){
   var z =$('.ddw').val();
   b = parseInt(z);
   c = $('.num').length;
   if(a<0){
    	//向下滚动
	   if(-b==c-1){
		  return;
	   }
	   b-=1;
	   $('.ddw2').val(1);
   }else if(a>0){
		//向上滚动
	   if(-b==0){
			return;
	   }
  	   b+=1;
	   $('.ddw2').val(1);
   }
   
   $('.ddw').val(b);
   $('.fixed_r li').eq(-b).addClass('on').siblings('li').removeClass('on');
   var single_hh = $(window).height();
   click_hh =-single_hh*b;
   $('.num_box').animate({'bottom': click_hh},1000,function (){
	   $(".ddw2").val(0);
	   //调用每个页面的动画效果
	   
	});
    /* setTimeout(function(){
	   $('.ddw2').val(0);
	 },1400);*/
}

$('.fixed_r li').eq(0).addClass('on');
$('.fixed_r li').click(function(){
    var b = $(this).index();
    $(this).addClass('on').siblings('li').removeClass('on');
	$('.ddw').val(-b);
    var single_hh = $(window).height();
    click_hh =single_hh*b;
    $('.num_box').animate({'bottom': click_hh},1000,function (){
		//调用每个页面的动画效果
	});
})

function _resize(){
    var single_hh = $(window).height();
    var single_ww = $(window).width();
    $('.num').height(single_hh);
    $('.num li').width(single_ww);
}

_resize();

//调整浏览器窗口时，触发resize事件
$(window).resize(function(){
	if (typeof indexSlides != 'undefined' && indexSlides.reformat) 
		indexSlides.reformat();
		quanp();
});
