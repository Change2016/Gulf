//.ddw��¼�ڼ�ҳ
$('.ddw').val(0);
//.ddw2 0Ϊδ���������¼���1Ϊ���ڹ�������
$('.ddw2').val(0);
$(function(){
  //deltaΪ����ʾ���¹���Ϊ����ʾ���Ϲ���
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
    	//���¹���
	   if(-b==c-1){
		  return;
	   }
	   b-=1;
	   $('.ddw2').val(1);
   }else if(a>0){
		//���Ϲ���
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
	   //����ÿ��ҳ��Ķ���Ч��
	   
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
		//����ÿ��ҳ��Ķ���Ч��
	});
})

function _resize(){
    var single_hh = $(window).height();
    var single_ww = $(window).width();
    $('.num').height(single_hh);
    $('.num li').width(single_ww);
}

_resize();

//�������������ʱ������resize�¼�
$(window).resize(function(){
	if (typeof indexSlides != 'undefined' && indexSlides.reformat) 
		indexSlides.reformat();
		quanp();
});
