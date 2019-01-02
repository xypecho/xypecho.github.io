var answer;
function showMask(title_name,select_data,mount){
	let mask_div=document.createElement('div');//遮罩
	document.body.style.cssText='overflow: hidden;position: fixed;';
	mask_div.className='mask_div';
	document.body.appendChild(mask_div);
	mask_div.style.cssText='width: 100%;position: fixed;top:0;right: 0;bottom:0;left: 0;overflow: hidden;outline: 0;filter: alpha(opacity=60);background-color: rgba(0, 0, 0, 0.6);z-index: 9;';
	showmodel(title_name,select_data,mount);
}
function showmodel(title_name,select_data,mount){
	let model_div=document.createElement('div');//模态框
	model_div.className = 'model_div';
	document.body.appendChild(model_div);
	model_div.style.cssText='width: 100%;height: 250px;background-color:#ffffff;z-index:9999;display: block;position: fixed;bottom: 0;';
	let title_div=document.createElement('div');//模态框的头部
	title_div.className='title_div';
	model_div.appendChild(title_div);
	title_div.style.cssText='height: 44px;background-color: #fafafa;display: flex;';
	let title_div_span1=document.createElement('span');
	title_div_span1.style.cssText='display: inline-block;flex: 1;height: 44px;line-height: 44px;text-align: left;font-size: 14px;color: #FF2244;padding-left: 15px;'
	let title_div_span2= document.createElement('span');
	title_div_span2.style.cssText = 'display: inline-block;flex: 1;height: 44px;line-height: 44px;text-align:center;font-size: 16px;color:#333333'
	let title_div_span3 = document.createElement('span');
	title_div_span3.style.cssText = 'display: inline-block;flex: 1;height: 44px;line-height: 44px;text-align: right;font-size: 14px;color: #FF2244;padding-right: 15px;'
	title_div.appendChild(title_div_span1);
	title_div.appendChild(title_div_span2);
	title_div.appendChild(title_div_span3);
	title_div_span1.innerHTML='取消';
	title_div_span3.innerHTML = '确定';
	title_div_span2.innerHTML=title_name;
	title_div_span1.className='title_div_span1';
	title_div_span3.className='title_div_span3';
	//插入选项
	let select_div=document.createElement('div');
	select_div.className='select_div';
	select_div.style.cssText='height: 206px;overflow: hidden;position: relative;';
	model_div.appendChild(select_div);
	let select_div_ul=document.createElement('ul');//选项的ul
	select_div_ul.className='select_div_ul';
	select_div_ul.style.cssText='padding: 0;';
	select_div.appendChild(select_div_ul);
	let select_div_li=document.createElement('li');
	select_div_li.className='select_div_li';
//	select_div_li.innerHTML='这是测试的';
//	select_div.appendChild(select_div_li);
	let select_div_li_html='';
	for(let val of select_data){
		select_div_li_html+=`
			<li style='list-style:none;height:48px;line-height:48px;text-align:center;font-size:15px;color:#999999;'>${val}</li>
		`
		select_div_ul.innerHTML=select_div_li_html;
	}
	let selected_line=document.createElement('div');//选中的方框
	selected_line.className='selected_line';
	selected_line.style.cssText='position: absolute;width: 100%;height: 48px;border-bottom:1px solid #DEDEDE;border-top:1px solid #DEDEDE;top:105px';
	title_div.appendChild(selected_line);
	//让选中的li变色
	let _li_father=document.getElementsByClassName('select_div_ul');
	_li=_li_father[0].children;
	_li[1].style.cssText='list-style: none; height: 48px; line-height: 48px; text-align: center; font-size: 15px; color: rgb(51, 51, 51);';
	let li_height;
	//判断是向上滑动还是向下滑动
	let starty,endy;
	let num=0;
	function touchstartFun(event){
		let touch=event.touches[0];
		let y=touch.pageY;
		starty=y;//最开始的y轴坐标
	}
	function touchmoveFun(event){
		let touch = event.touches[0];
		let y = touch.pageY;
	}
	function touchendFun(event){
		let touch=event.changedTouches[0];
		let y=touch.pageY;
		endy=y;
		//console.log(starty,endy);
		if(starty>endy){
			num--;
			//console.log('上');
			//console.log(num);
			//console.log(select_data.length);
			if(-num>select_data.length-2){
				//console.log('触发if');
				num=-(select_data.length-2);
			}
			select_div_ul.style.cssText=`transition-duration: 0.1s;;transform: translate3d(0px, ${48*num}px, 0px);padding: 0px;`;
		}else{
			num++;
			//console.log('下');
			//console.log(num);
			if(num>=1){
				num=1;
			}
			select_div_ul.style.cssText = `transition-duration: 0.1s;;transform: translate3d(0px, ${48*num}px, 0px);padding: 0px;`;
		}
	ul_off_index = 48*num / 48;
	console.log(ul_off_index);
	if(ul_off_index<=0){
		ul_off_index=-ul_off_index+2;
	}
	
	console.log("计算后的"+ul_off_index);
	for(let i=0;i<select_data.length;i++){
		_li[i].style.cssText='list-style:none;height:48px;line-height:48px;text-align:center;font-size:15px;color:#999999;';
	}
	_li[ul_off_index - 1].style.cssText='list-style:none;height:48px;line-height:48px;text-align:center;font-size:15px;color:#333333;';

	//console.log("距离顶部的距离是" + (ul_off_top),ul_off_index);
	};
select_div.addEventListener("touchstart", touchstartFun, true);
select_div.addEventListener("touchmove", touchmoveFun, true);
select_div.addEventListener("touchend", touchendFun, true);
//点击模态框自己关闭整个模态框
$('body').on('click','.mask_div',function(){
	$('body').css({
		'overflow': 'scroll',
		'position': 'relative'
	});
	$('.mask_div').css('display', 'none');
	$('.model_div').css('display', 'none');
})

//取消的功能
$('body').on('click','.title_div_span1',function(){
	$('body').css({
		'overflow': 'scroll',
		'position': 'relative'
	});
	$('.mask_div').css('display', 'none');
	$('.model_div').css('display', 'none');
})
//确定的功能
$("body").on('click','.title_div_span3',function(){
		ul_off_index = 48 * num / 48;
		if(ul_off_index <= 0) {
			ul_off_index = -ul_off_index + 2;
		};
		$('body').css({'overflow':'scroll','position':'relative'});
		$('.mask_div').css('display','none');
		$('.model_div').css('display','none');
		answer= _li[ul_off_index - 1].innerHTML;
		$(mount).attr('val',(_li[ul_off_index - 1].innerHTML));
		return answer;
})
}
