$(function(){function e(){try{A(),window.AudioContext=window.AudioContext||window.webkitAudioContext,x=new AudioContext,S=new n(x,["../../snd/bop.wav","../../snd/twist.wav","../../snd/pull.wav","../../snd/bopped.wav","../../snd/twisted.wav","../../snd/pulled.wav","../../snd/think.wav"],t),S.load()}catch(e){alert(e),alert("Web Audio API is not supported in this browser")}}function t(e){i=x.createBufferSource(),f=x.createBufferSource(),u=x.createBufferSource(),a=x.createBufferSource(),c=x.createBufferSource(),s=x.createBufferSource(),d=x.createBufferSource(),i.buffer=e[0],f.buffer=e[1],u.buffer=e[2],a.buffer=e[3],c.buffer=e[4],s.buffer=e[5],d.buffer=e[6],i.connect(x.destination),f.connect(x.destination),u.connect(x.destination),a.connect(x.destination),c.connect(x.destination),s.connect(x.destination),d.connect(x.destination),$(".it").click(function(){var e=$(this).attr("id");L(e),"bop"===e?o(a.buffer):"twist"===e?o(c.buffer):"pull"===e?o(s.buffer):alert("what is selection")}),roundInterval=setInterval(function(){r=p[Math.floor(3*Math.random())],"bop"===r?o(i.buffer):"twist"===r?o(f.buffer):"pull"===r?o(u.buffer):alert("what is currentAnswer"),B(r),o(d.buffer)},1885)}function o(e){var t=x.createBufferSource();t.buffer=e,t.connect(x.destination),t.start(0)}function n(e,t,o){this.context=e,this.urlList=t,this.onload=o,this.bufferList=[],this.loadCount=0}var r,i,f,u,a,c,s,d,l="bop",b="twist",w="pull",p=[l,b,w],h=1e3,v=0,B=function(e){var t="";t+=e.toUpperCase()+" IT!!!!",$("#selection").text(t),$("#selection").css("color","black")},A=function(){for(var e=[],t=0;h>t;t++)e.push(p[Math.floor(3*Math.random())])},L=function(e){e===r?($("#selection").css("color","green"),v++):($("#selection").css("color","red"),v=0),$("#score-val").text(v)};window.onload=e;var x,S;n.prototype.loadBuffer=function(e,t){var o=new XMLHttpRequest;o.open("GET",e,!0),o.responseType="arraybuffer";var n=this;o.onload=function(){n.context.decodeAudioData(o.response,function(o){return o?(n.bufferList[t]=o,void(++n.loadCount==n.urlList.length&&n.onload(n.bufferList))):void alert("error decoding file data: "+e)},function(e){console.error("decodeAudioData error",e)})},o.onerror=function(){alert("BufferLoader: XHR error")},o.send()},n.prototype.load=function(){for(var e=0;e<this.urlList.length;++e)this.loadBuffer(this.urlList[e],e)}});