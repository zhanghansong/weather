
	function fn1(data){
		var d=data;
		console.log(d);
		
		var oLoc=document.getElementById('loc');
		var oDate=document.getElementById('date');
		var oPm=document.getElementById('pm');
		var oNow=document.getElementById('now');
		var oWeather=document.getElementById('weather');
		//日期
		oDate.innerHTML=d.date;
		//地点
		oLoc.innerHTML=d.results[0].currentCity;
		//实时温度
		var arrDate=d.results[0].weather_data[0].date;
		arrDate=arrDate.split(' ');
		oNow.innerHTML=arrDate[2]
		
		//空气质量pm2.5；
		var pm=parseInt(d.results[0].pm25);
		var pmInfo="空气质量: "+pm;
		if(pm>0&&pm<50){
			oPm.innerHTML=pmInfo+'<strong style="color:#33ff66">优<strong>';
		}else if(pm>50&&pm<100){
			oPm.innerHTML=pmInfo+'<strong style="color:#33ff66">良<strong>';
		}else if(pm>100&&pm<150){
			oPm.innerHTML=pmInfo+'<strong style="color:yellow">轻度污染<strong>';
		}else if(pm>150&&pm<200){
			oPm.innerHTML=pmInfo+'<strong style="color:yellow">中度污染<strong>';
		}else if(pm>200&&pm<250){
			oPm.innerHTML=pmInfo+'<strong style="color:#cc0000">重度污染<strong>';
		}else{
			oPm.innerHTML=pmInfo+'<strong style="color:#cc0000">严重污染<strong>';
		}

		//alert(d.results[0].weather_data.length);
		//天气情况
		oWeather.innerHTML='';
		var wData=d.results[0].weather_data;
		for(var i=0;i<wData.length;i++){
			var oDl=document.createElement('dl');
			var oDt=document.createElement('dt');
			oDt.innerHTML=wData[i].date.substr(0,2);
			if(i==0){
				oDt.innerHTML='今天('+wData[i].date.substr(0,2)+")";
			}
			oDl.appendChild(oDt);
			
			//天气变化的图片
			var oDd=document.createElement('dd');
			oDd.className='img';
			var oSpan=document.createElement('span');
			var oImg=document.createElement('img');
			oImg.src=wData[i].dayPictureUrl;
			oSpan.appendChild(oImg);
			oDd.appendChild(oSpan);
			var oSpan=document.createElement('span');
			var oImg=document.createElement('img');
			oImg.src=wData[i].nightPictureUrl;
			oSpan.appendChild(oImg);
			oDd.appendChild(oSpan);
			oDl.appendChild(oDd);
			//天气变化文字描述
			var oDd=document.createElement('dd');
			oDd.innerHTML=wData[i].weather;
			oDd.className='info';
			oDl.appendChild(oDd);
			//风
			var oDd=document.createElement('dd');
			oDd.innerHTML=wData[i].wind;
			oDd.className='wind';
			oDl.appendChild(oDd);
			//气温变化
			var oDd=document.createElement('dd');
			oDd.innerHTML=wData[i].temperature;
			oDd.className='wind';
			oDd.style.color='#ffffcc'
			oDl.appendChild(oDd);
			oWeather.appendChild(oDl);
		}

		//其他指数
		//穿衣
		var oYifu=document.getElementById('yifu');
		oYifu.innerHTML='<span>'+d.results[0].index[0].tipt+': </span>'+d.results[0].index[0].des;
		
		//感冒
		var oSheng=document.getElementById('sheng');
		oSheng.innerHTML='<span>'+d.results[0].index[3].tipt+': </span>'+d.results[0].index[3].des;
	
	}
	window.onload=function(){
		var oText=document.getElementById('text');
		var oBtn=document.getElementById('btn');
		var oBox=document.getElementById('box');
		var val1=oText.value;
		if(val1){
			jsonp(val1);
		}
		oBtn.onclick=function(){
			var val2=oText.value;
			console.log(val2);
			if(val2){
				var aScript=document.getElementsByTagName('script');
				if(aScript.length>3){
					document.body.removeChild(aScript[aScript.length-1]);
				}
				
				jsonp(val2);
			}
		}
		function jsonp(val){
			var oScript=document.createElement('script');
			oScript.src='http://api.map.baidu.com/telematics/v3/weather?callback=fn1&location='+val+'&output=json&ak=BPsTlOEqm5RA65snZ0NoMnVm8xlwFa2o';
			document.body.appendChild(oScript);
		}
	}
