var musicFiles=[
	{musicId:1,name:"心酸",singer:"林宥嘉",url:"http://ws.stream.qqmusic.qq.com/7122566.m4a?fromtag=30",play_time:"4:12",imageUrl:"images/1.jpg"},
    {musicId:2,name:"泡沫",singer:"邓紫棋",url:"http://ws.stream.qqmusic.qq.com/1530858.m4a?fromtag=30",play_time:"4:33",imageUrl:"images/2.jpg"},
	{musicId:3,name:"Gentleman",singer:"Psy",url:"http://ws.stream.qqmusic.qq.com/7085699.m4a?fromtag=30",play_time:"3:13",imageUrl:"images/3.jpg"},
	{musicId:4,name:"Cross Every River",singer:"Maria Arredondo",url:"http://ws.stream.qqmusic.qq.com/432274.m4a?fromtag=30",play_time:"3:40",imageUrl:"images/4.jpg"},
	{musicId:5,name:"月半小夜曲",singer:"李克勤",url:"http://ws.stream.qqmusic.qq.com/1431046.m4a?fromtag=30",play_time:"4:51",imageUrl:"images/5.jpg"}  
];
var h5_audio=document.getElementById("h5audio_media");//audio
var musicIndex=-1;//当前正在播放的歌曲的索引
var playingFile=null;
var playMode=1;
var songNum=0;
h5_audio.autoplay=false;
function playMusic(musicUrl,name,singer,play_time,imgUrl){
	btnpause();
	setInfomation(musicUrl,name,singer,play_time,imgUrl);
	h5_audio.play();
	btnplay();
}
function getMusicById(id){
	return musicFiles[id];
}
function addToList(id){
		addRun();
		setListNum(getSongNum()+1);
		var divnulllist=document.getElementById("divnulllist");
		divnulllist.style.display="none";
		var divplaylist=document.getElementById("divplaylist");
		var divsonglist=document.getElementById("divsonglist");
		var ulsonglist=divsonglist.getElementsByTagName("ul")[0];
		var music=getMusicById(id);
		var lisong=document.createElement("li");
			for(var m=0;m<4;m++){
			var listrong=document.createElement("strong");
			var music_name=music.name;
			var singer=music.singer;
			var musicUrl=music.url;
			var time=music.play_time;
			var imgUrl=music.imageUrl;
			//lisong.className=musicUrl;
			if(m==0){
			//var node=document.createTextNode("")
			listrong.className="music_name";
			listrong.title=music_name;
			var node=document.createTextNode(music_name);
			listrong.appendChild(node);
			lisong.appendChild(listrong);}
			if(m==1){
			 listrong.className="singer_name";
			
			listrong.title=singer;
			node=document.createTextNode(singer);
			listrong.appendChild(node);
			lisong.appendChild(listrong);
		}
			if(m==2){
			listrong.className="play_time";
			listrong.title=time;
			node=document.createTextNode(time);
			listrong.appendChild(node);
			lisong.appendChild(listrong);
		}
		if(m==3){
			listrong.style.display="none";
			node=document.createTextNode(musicUrl+"|"+imgUrl);
			listrong.appendChild(node);
			lisong.appendChild(listrong);
		}
		}
			//var list_cp=document.getElementById("list_cpfuben");
			// var list_cp=list_cpfuben.getElementsByTagName("div");
			// //var list_cpCl=clone(list_cp);
			// var listcpCl=new Object();
			// list_cpCl=list_cp;
			// //list_cp.style.display="";
			// lisong.appendChild(list_cpCl[0]);
			// ulsonglist.appendChild(lisong);
			var list_cp=document.createElement("div");
			list_cp.className="list_cp";
			var spanlist_cp=document.createElement("span");
			spanlist_cp.className="data";
			list_cp.appendChild(spanlist_cp);
			for(var j=0;j<4;j++){
				var alist_cp=document.createElement("a");
				var stronglist_cp=document.createElement("strong");
				if(j==0){
					stronglist_cp.className="btn_like";
					stronglist_cp.title="喜欢";
				}
				if(j==1){
					stronglist_cp.className="btn_share";
					stronglist_cp.title="分享";
				}
				if(j==2){
					stronglist_cp.className="btn_fav";
					stronglist_cp.title="收藏到歌单";
				}
				if(j==3){
					stronglist_cp.className="btn_del";
					stronglist_cp.title="从列表中删除";
					stronglist_cp.addEventListener("click",delfromList,false);
				}
				alist_cp.appendChild(stronglist_cp);
				list_cp.appendChild(alist_cp);
			}
			lisong.appendChild(list_cp);
			lisong.addEventListener("mouseover",function(){
					if(this.className=="play_current")
						this.className+=" play_hover";
					else{
						this.className="play_hover"
					}
					},false);
			lisong.addEventListener("mouseout",function(){
					if(this.className=="play_hover")
						this.className="";
					if(this.className=="play_current play_hover")
						this.className="play_current";
				
				},false);
			lisong.addEventListener("click",clickPlay,false);
			ulsonglist.appendChild(lisong);
			divplaylist.style.display="block";
			return lisong;
}
function addandPlay(id){
	//addToList(id);
	var lisong=addToList(id);
	playLisong(lisong);
}
function delfromList(){
	//var strongthis= this;
	//var thisliClass=thisli.className;
	// var event=event||window.event;
	// event.stopPropagation();
	if (event.stopPropagation) { 
// this code is for Mozilla and Opera 
	event.stopPropagation(); 
	} 
	else if (window.event) { 
// this code is for IE 
	window.event.cancelBubble = true; 
	} 
	var lisong=this.parentNode.parentNode.parentNode;
	var ulsong=lisong.parentNode;
	if(lisong.className.indexOf("play_current")>=0)
		prevMusic();

	ulsong.removeChild(lisong);

	var songNum=getSongNum();
	setListNum(songNum);
	if(songNum<=0){
		clearList();
	}
}
function setInfomation(musicUrl,name,singer,play_time,imgUrl){
	var music_info_main=document.getElementById("music_info_main");
	var pmusic_info=music_info_main.getElementsByTagName("p");
	var album_img=document.getElementById("album_img");
	pmusic_info[0].innerHTML=name;
	pmusic_info[0].title=name;
	pmusic_info[1].innerHTML=singer;
	pmusic_info[1].title=singer;
	pmusic_info[2].innerHTML=play_time;
	album_img.src=imgUrl;
	h5_audio.src=musicUrl;
}
function playCurrentClear(){	
	var lisongs=getLisong();
	for(var i=0;i<lisongs.length;i++){
		lisongs[i].className="";
	}
}
function getSongNum(){
	var lisongs=getLisong();
	songNum=lisongs.length;
	return lisongs.length;
}
function getCurrentSong(){
	var lisongs=getLisong();
	for(var i=0;i<lisongs.length;i++){
		var lisongClass=lisongs[i].className;
		//console.log(lisongClass);
		if(lisongClass.indexOf("play_current")>=0){
			//alert(lisongClass);
			return i;
		}
	}

	return -1;
}
//点击播放
function clickPlay(){
	var lisong=this;
	playLisong(lisong);
}
//获取播放列表
function getLisong(){
	var divsonglist=document.getElementById("divsonglist");
	var lisongs=divsonglist.getElementsByTagName("li");
	return lisongs;
}
//播放音乐
function playLisong(lisong){
	setPlaybarStyle(0);
	playCurrentClear();
	lisong.className="play_current";
	var strongInfo=lisong.getElementsByTagName("strong");
	var url=strongInfo[3].innerHTML.split("|");
	var musicUrl=url[0];
	var imgUrl=url[1];
	var name=strongInfo[0].innerHTML;
	var singer=strongInfo[1].innerHTML;
	var play_time=strongInfo[2].innerHTML;
	playMusic(musicUrl,name,singer,play_time,imgUrl);
}
//时间格式转化
function timeformat(time) {
		var t = Math.round(time);
		var h = Math.floor(t / 3600);
		var m = Math.floor(t / 60);
		var s = t - h * 3600 - m * 60;
		if(h == 0) {
			str = m>9?m:("0"+m) + ":" + (s>9?s:("0"+s));
		} else {
			str = h>9?h:("0"+h) + ":" + (m>9?m:("0"+m)) + ":" + (s>9?s:("0"+s));
		}
		return str;
}
//进度
function TimeSelect(event){
	var songtime=h5_audio.duration;
	//alert(timeformat(songtime));
	var left=getLeft(event);
	//var curTime=left/540*songtime;
	setCurrentTime(left);

}

var int=setInterval(function(){
		setPlaybarStyle(getCurrentTimeBai());
		if(h5_audio.ended){
			if(playMode==4)
				play();
				else
			nextMusic();
		}
	},500);


function getCurrentTimeBai(){
	if(h5_audio.readyState){
	var songtime=h5_audio.duration;
	var currentTime=h5_audio.currentTime;
	var bai=Math.round(currentTime/songtime*100);
	}
	return bai;
}
function setCurrentTime(left){
	if(h5_audio.readyState){
		var songtime=h5_audio.duration;
		var time=left/540*songtime;
		h5_audio.currentTime=time;
		var bai=Math.round(time/songtime*100)-1;
		setPlaybarStyle(bai);
	}
}
function setPlaybarStyle(bai){
	var spanplaybar=document.getElementById("spanplaybar");
	var spanprogress_op=document.getElementById("spanprogress_op");
	spanplaybar.style.width=bai+"%";
	spanprogress_op.style.left=bai+"%";
}
function getLeft(event){
	event=event||window.event;
	var left=event.clientX;
	return left;
}
function showTime(event){
	if(h5_audio.readyState){
	var songtime=h5_audio.duration;
	var left=getLeft(event);
	// event=event||window.event;
	// var left=event.clientX;
	//var bai=Math.round(left/70*100);
	//alert(left);
	var bai=Math.round(left/540*100);
	var time_show=document.getElementById("time_show");
	var divtime_show=time_show.parentNode;
	var curTime=timeformat(left/540*songtime);
	time_show.innerHTML=(curTime);
	divtime_show.style.left=(left-22)+"px";
	divtime_show.style.display="block";
}
}
function notShowTime(){
	var time_show=document.getElementById("time_show");
	var divtime_show=time_show.parentNode;
	divtime_show.style.display="none";
}
//清楚列表
function clearList(){
	var divsonglist=document.getElementById("divsonglist");
	var ullist=divsonglist.getElementsByTagName("ul");
	ullist[0].innerHTML="";
	stopPlay();
	var divnulllist=document.getElementById("divnulllist");
	divnulllist.style.display="block";
	setListNum(0);
}
//设置列表歌曲数
function setListNum(num){
	var spansongnum1=document.getElementById("spansongnum1");
	var spanNum=spansongnum1.getElementsByTagName("span");
	spanNum[0].innerHTML=num;
}
//添加歌曲提示动画
function addRun(){
	var spanaddtips=document.getElementById("spanaddtips");
	var run=function(top){
		spanaddtips.style.top=top+"px";
		setTimeout(function(){
			top--;
			if(top<-25){
				return;
			}
			else
				run(top);
		},10); 
	}
	run(0);
	setTimeout(function(){
		spanaddtips.style.top="0px";
	},1000);
}
//上一首
function prevMusic(){
	//addRun();
	var current=getCurrentSong();

	var Lisongs=getLisong();
	var LisongsLen=Lisongs.length;
	//var next=musicIndex+1;
	if(LisongsLen>0){
	if(current<0){
		next=0;
	}
	next=current-1;
	if(next<0){
		next=LisongsLen-1;
	}
	//musicIndex=next;
	playLisong(Lisongs[next]);
}}
//下一首
function nextMusic(){
	//var num=getSongNum();

	var current=getCurrentSong();

	var Lisongs=getLisong();
	var LisongsLen=Lisongs.length;
	//var next=musicIndex+1;
	var next=0;
	if(LisongsLen>0){
	if(playMode==1||playMode==4){
		next=current+1;
		if(next>=LisongsLen){
			next=0;
			}
	}
	if(playMode==3){
		do{
			next=Math.floor(Math.random()*LisongsLen); 
		}while(next==current);
	}
	//musicIndex=next;
	playLisong(Lisongs[next]);
}
	// if(current>=0){
	// 	next=current+1;
	// 	if(next==LisongsLen){
	// 		next=0;
	// 	}
	// 	playLisong(Lisongs[next]);
	// }
	// else{

	// }
	//var next=current+1;
}
function btnplay(){
	var btnplay=document.getElementById("btnplay");
	btnplay.title="暂停(P)";
	btnplay.className="pause_bt";
}
function btnpause(){
	var btnplay=document.getElementById("btnplay");
	btnplay.title="播放(P)";
	btnplay.className="play_bt";
}
//播放 or 暂停
function play(){
	var current=getCurrentSong();
	var songNum=getSongNum();
	if(current<0){
		//nextMusic();
		if(songNum>0)
			nextMusic();

	}
	else{
	if(h5_audio.paused){
		h5_audio.play();
		btnplay();
	}
	else{
		h5_audio.pause();
		btnpause();
	}
	}
}
//停止播放
function stopPlay(){
	btnpause();
	setInfomation("","懂你的音乐","Pluto Music","","#");
	setPlaybarStyle(0);
}
//选择播放模式
function setPlayMode(){
	var divselect=document.getElementById("divselect");
	divselect.style.display="block";
}
function realSetPlayWay(playway){
	var btnPlayway=document.getElementById("btnPlayway");
	var divselect=document.getElementById("divselect");
	if(playway==1){
		btnPlayway.title="列表循环";
		btnPlayway.className="cycle_bt";
		playMode=1;
	}
	if(playway==2){
		btnPlayway.title="顺序播放";
		btnPlayway.className="ordered_bt";
		playMode=2;
	}
	if(playway==3){
		btnPlayway.title="随机播放";
		btnPlayway.className="unordered_bt";
		playMode=3;
	}
	if(playway==4){
		btnPlayway.title="单曲循环";
		btnPlayway.className="cycle_single_bt";
		playMode=4;
	}
	divselect.style.display="none";
}
//音量调节
function setMute(){
	var spanmute=document.getElementById("spanmute");
	if(h5_audio.muted){
		spanmute.className="volume_icon";
		spanmute.title="点击设置为静音(M)";
		h5_audio.muted=false;
	}
	else{
		spanmute.className="volume_mute";
		spanmute.title="点击开启声音(M)";
		h5_audio.muted=true;
	}
}
function setVolume(event){
	var spanvolumebar=document.getElementById("spanvolumebar");
	var spanvolumeop=document.getElementById("spanvolumeop");
	event=event||window.event;
	var left=event.clientX-445;
	var bai=Math.round(left/70*100);
	spanvolumebar.style.width=bai+"%";
	spanvolumeop.style.left=bai+"%";
	h5_audio.volume=bai/100;
}

// 音乐播放器展开/收起
function folded(){

	//run(0);

	var divplayer=document.getElementById("divplayer");
	var btnfold=document.getElementById("btnfold");
	var runFold=function(left){
		divplayer.style.left=left+"px";
		setTimeout(function(){
			left-=10;
			if(left<=-540){
				divplayer.style.left=-540+"px";
				return;
			}
			else
				runFold(left);
		},10); 
	}
	var run=function(left){
		divplayer.style.left=left+"px";
		setTimeout(function(){
			left+=10;
			if(left>=0){
				divplayer.style.left=0+"px";
				return;
			}
			else
				run(left);
		},10); 
	}
	if(divplayer.className=="m_player"){
	//divplayer.style.left="-540px";
	//listFolded();
	runFold(0);
	divplayer.className="m_player m_player_folded";
	btnfold.title="点击展开"
	}
	else
	{
		//divplayer.style.left="0px";
		//listFolded();
		run(-540);
		divplayer.className="m_player";
		btnfold.title="点击收起";
	}
}
//歌词显示和收起
function lycFolded(){
	var lyc=document.getElementById("player_lyrics_pannel");
	if(lyc.style.display=="none")
		lyc.style.display="block";
	else
	lyc.style.display="none";
}

//播放列表展开和收起
function listFolded(){
	var play_list=document.getElementById("divplayframe");
	var run=function(op){
		play_list.style.opacity=op/100;
		setTimeout(function(){
			op+=5;
			if(op>=100){

				return ;
			}
			else
				run(op);
		},1);
	}
	var runNone=function(op){
		play_list.style.opacity=op/100;
		setTimeout(function(){
			op-=5;
			if(op<=0){
				play_list.style.display="none";
				return ;
			}
			else 
				runNone(op);
		},1);
	}
	if(play_list.style.display=="none"){
		run(0);
		play_list.style.display="block";
	}
	else{
		runNone(100);
		
	}
}

// var eventUtil={
// 			//添加事件
// 			addHandler:function(element,type,handler){
// 				if(element.addEventListener){
// 					element.addEventListener(type,handler,false);
// 				}
// 					else if(element.attachEvent){
// 						element.attachEvent('on'+type,handler);
// 					}
// 						else{
// 							element['on'+type]=handler;
// 						}
// 			},
// 			//删除事件
// 			removeHandler:function(element,type,handler){
// 				if(element.addEventListener){
// 					element.removeEventListener(type,handler,false);
// 				}
// 					else if(element.attachEvent){
// 						element.detachEvent('on'+type,handler);
// 					}
// 						else{
// 							element['on'+type]=null;
// 						}
// 			}
// 		}
// 播放列表效果

	// var divsonglist=document.getElementById("divsonglist");
	// var list=divsonglist.getElementsByTagName("li");
	// var listLen=list.length;
	// alert(listLen);
	


