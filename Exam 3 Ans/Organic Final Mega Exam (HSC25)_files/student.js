if(!Array.prototype.indexOf)Array.prototype.indexOf=(function(Object,max,min){"use strict";return function indexOf(member,fromIndex){if(this===null||this===undefined)throw TypeError("Array.prototype.indexOf called on null or undefined");var that=Object(this),Len=that.length>>>0,i=min(fromIndex|0,Len);if(i<0)i=max(0,Len+i);else if(i>=Len)return-1;if(member===void 0){for(;i!==Len;++i)if(that[i]===void 0&&i in that)return i;}else if(member!==member){for(;i!==Len;++i)if(that[i]!==that[i])return i;}else for(;i!==Len;++i)if(that[i]===member)return i;return-1;};})(Object,Math.max,Math.min);if(!HTMLCanvasElement.prototype.toBlob){Object.defineProperty(HTMLCanvasElement.prototype,'toBlob',{value:function(callback,type,quality){var binStr=atob(this.toDataURL(type,quality).split(',')[1]),len=binStr.length,arr=new Uint8Array(len);for(var i=0;i<len;i++){arr[i]=binStr.charCodeAt(i);}
callback(new Blob([arr],{type:type||'image/png'}));}});}
window.URL=window.URL||window.webkitURL;function getExifOrientation(file,callback){var testImageURL='data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA'+
'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA'+
'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE'+
'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAIAAwMBEQACEQEDEQH/x'+
'ABRAAEAAAAAAAAAAAAAAAAAAAAKEAEBAQADAQEAAAAAAAAAAAAGBQQDCAkCBwEBAAAAAAA'+
'AAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AG8T9NfSMEVMhQ'+
'voP3fFiRZ+MTHDifa/95OFSZU5OzRzxkyejv8ciEfhSceSXGjS8eSdLnZc2HDm4M3BxcXw'+
'H/9k='
var img=document.createElement('img')
img.onload=function(){orientation=img.width===2&&img.height===3;if(!orientation){rest(file,callback);}else{callback(1);}}
img.src=testImageURL
function rest(file,callback){if(file.slice){file=file.slice(0,131072);}else if(file.webkitSlice){file=file.webkitSlice(0,131072);}
var reader=new FileReader();reader.onload=function(e){var view=new DataView(e.target.result);if(view.getUint16(0,false)!=0xFFD8){callback(-2);return;}
var length=view.byteLength,offset=2;while(offset<length){var marker=view.getUint16(offset,false);offset+=2;if(marker==0xFFE1){if(view.getUint32(offset+=2,false)!=0x45786966){callback(-1);return;}
var little=view.getUint16(offset+=6,false)==0x4949;offset+=view.getUint32(offset+4,little);var tags=view.getUint16(offset,little);offset+=2;for(var i=0;i<tags;i++)
if(view.getUint16(offset+(i*12),little)==0x0112){callback(view.getUint16(offset+(i*12)+8,little));return;}}
else if((marker&0xFF00)!=0xFF00)break;else offset+=view.getUint16(offset,false);}
callback(-1);};reader.readAsArrayBuffer(file);}}
function imgToCanvasWithOrientation(img,rawWidth,rawHeight,orientation){var canvas=document.createElement('canvas');if(orientation>4){canvas.width=rawHeight;canvas.height=rawWidth;}else{canvas.width=rawWidth;canvas.height=rawHeight;}
if(orientation>1){console.log("EXIF orientation = "+orientation+", rotating picture");}
var ctx=canvas.getContext('2d');switch(orientation){case 2:ctx.transform(-1,0,0,1,rawWidth,0);break;case 3:ctx.transform(-1,0,0,-1,rawWidth,rawHeight);break;case 4:ctx.transform(1,0,0,-1,0,rawHeight);break;case 5:ctx.transform(0,1,1,0,0,0);break;case 6:ctx.transform(0,1,-1,0,rawHeight,0);break;case 7:ctx.transform(0,-1,-1,0,rawHeight,rawWidth);break;case 8:ctx.transform(0,-1,1,0,0,rawWidth);break;}
ctx.drawImage(img,0,0,rawWidth,rawHeight);return canvas;}
function reduceFileSize(file,acceptFileSize,maxWidth,maxHeight,quality,callback){if(file.size<=acceptFileSize){callback(file);return;}
var img=new Image();img.onerror=function(){URL.revokeObjectURL(this.src);callback(file);};img.onload=function(){URL.revokeObjectURL(this.src);getExifOrientation(file,function(orientation){var w=img.width,h=img.height;var maxHeight=Math.max(w,h)
var maxWidth=Math.max(w,h)
var scale=(orientation>4?Math.min(maxHeight/w,maxWidth/h,1):Math.min(maxWidth/w,maxHeight/h,1));h=Math.round(h*scale);w=Math.round(w*scale);var canvas=imgToCanvasWithOrientation(img,w,h,orientation);canvas.toBlob(function(blob){console.log("Resized image to "+w+"x"+h+", "+(blob.size>>10)+"kB");callback(blob);},'image/jpeg',quality);});};img.src=URL.createObjectURL(file);}
function getHash(){var hash=window.location.hash;return hash.substring(1);}
function $(selector){var elements=document.querySelectorAll(selector);return new Thing(elements);}
function Thing(elements){this.elements=elements;}
Thing.prototype.removeClass=function(className){for(var i=0;i<this.elements.length;i++){var el=this.elements[i];if(el.classList)
el.classList.remove(className);else
el.className=el.className.replace(new RegExp('(^|\\b)'+className.split(' ').join('|')+'(\\b|$)','gi'),' ');}}
Thing.prototype.addClass=function(className){for(var i=0;i<this.elements.length;i++){var el=this.elements[i];if(el.classList)
el.classList.add(className);else
el.className+=' '+className;}}
Thing.prototype.hide=function(){for(var i=0;i<this.elements.length;i++){var el=this.elements[i];el.style.display="none";}}
Thing.prototype.show=function(){for(var i=0;i<this.elements.length;i++){var el=this.elements[i];el.style.display="block";}}
Thing.prototype.focus=function(){for(var i=0;i<this.elements.length;i++){var el=this.elements[i];setTimeout(function(){console.log(el);el.select()
el.focus()},0)}}
function ready(fn){if(document.attachEvent?document.readyState==="complete":document.readyState!=="loading"){fn();}else{document.addEventListener('DOMContentLoaded',fn);}}
function disableSpellcheck(){var fields=document.querySelectorAll("input[type='text'], textarea");for(var i=0;i<fields.length;i++){fields[i].setAttribute("autocomplete","off");fields[i].setAttribute("autocorrect","off");fields[i].setAttribute("autocapitalize","off");fields[i].setAttribute("spellcheck","false");}}
function disableAutocomplete(){var fields=document.querySelectorAll("input[type='number'], input[type='text'], textarea");for(var i=0;i<fields.length;i++){fields[i].setAttribute("autocomplete","off");}}
function disablePaste(){var fields=document.querySelectorAll("input[type='number'], input[type='text'], textarea");for(var i=0;i<fields.length;i++){fields[i].addEventListener("paste",function(e){e.preventDefault();},false);fields[i].addEventListener("drop",function(e){e.preventDefault();},false);}}
function closest(el,selector){var matchesFn;['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn){if(typeof document.body[fn]=='function'){matchesFn=fn;return true;}
return false;})
var parent;while(el){parent=el.parentElement;if(parent&&parent[matchesFn](selector)){return parent;}
el=parent;}
return null;}
function getNumber(el){var component=closest(el,".component");if(component){var number=component.getAttribute("data-number");return number;}
return "?"}
function isBlankOrPartiallyBlank(){var inputs=document.querySelectorAll(".confirm-blanks input, .confirm-blanks textarea, .confirm-blanks select");var is_blank=false;var checks={}
var numbers=[];var media_elements=[];for(var i=0;i<inputs.length;i++){var el=inputs[i];var is_media=closest(el,".media-field");var type=tagToType(inputs[i]);if(is_media){}else if(type=="text"||type=="number"){if((el.value||"").trim().length==0){is_blank=true;numbers.push(getNumber(el));}}else if(type=="select"){if(el.value=="0"){is_blank=true;numbers.push(getNumber(el));}}else if(type=="radio"||type=="checkbox"){var n=getNumber(el);checks[n]=checks[n]||el.checked}}
for(var k in checks){if(!checks[k]){is_blank=true;numbers.push(k)}}
var media_fields=document.querySelectorAll(".media-field");for(var i=0;i<media_fields.length;i++){var media_element=media_fields[i];var names=media_element.querySelectorAll("input[type='text'][name$='_name']")
var urls=media_element.querySelectorAll("input[type='text'][name$='_url']")
var has_file=false;for(var j=0;j<names.length;j++){var name=names[j].value;var url=urls[j].value;if(name&&url){has_file=true;break}}
if(!has_file){is_blank=true;numbers.push(getNumber(media_element));}}
var dedupe={};for(var i=0;i<numbers.length;i++){dedupe[numbers[i]]=true;}
numbers=[];for(var k in dedupe){numbers.push(k);}
numbers.sort(function(a,b){if(a=="?"||b=="?"){return 0;}
return parseInt(a)-parseInt(b);});return is_blank?numbers:null;}
function tagToType(target){var tag_name=target.tagName;var type=(target.getAttribute("type")||"").toLowerCase();if(tag_name=="TEXTAREA"){type="text";}else if(tag_name=="SELECT"){type="select";}else if(type=="number"){type="text";}
return type}
function saveChange(e){var target=e.target;var state=null;var type=tagToType(target);var name=null;if(type=="radio"){name=target.name;state={"type":"radio","answer":target.value}}else if(type=="checkbox"){name=target.name;var checkboxes=document.querySelectorAll("input[name='"+name+"']");var checked=[];for(var i=0;i<checkboxes.length;i++){if(checkboxes[i].checked){checked.push(checkboxes[i].value)}}
state={"type":"checkbox","answer":checked}}else if(type=="text"||type=="number"){name=target.name;state={"type":"text","answer":target.value}}else if(type=="select"){name=target.name
state={"type":"select","answer":target.value}}
if(!name){return;}
if(state){try{localStorage.setItem("test-"+name,JSON.stringify(state))}catch(e){}}
var component=closest(target,".component");if(component){if(!("saveToServer"in component)){component.saveToServer=debounce(saveToServer,250,false);}
component.saveToServer(component);}}
function componentToFormData(el){var inputs=el.querySelectorAll("input, textarea, select");var form_data=new FormData();var seen={};for(var i=0;i<inputs.length;i++){var input_element=inputs[i];var type=tagToType(input_element);var name=input_element.getAttribute("name");var value="";if(name in seen){continue}else if(type=="text"||type=="select"){value=input_element.value;form_data.append(name,value);}else if(type=="radio"||type=="checkbox"){var checks=el.querySelectorAll("input[name='"+name+"']:checked");for(var j=0;j<checks.length;j++){form_data.append(name,checks[j].value);}
seen[name]=true;}}
return form_data}
function hideError(error_code){var place=document.getElementById(error_code);if(place){place.parentElement.removeChild(place);}}
function displayError(error_code){try{var place=document.getElementById(error_code)
if(place===null){var template=document.getElementById(error_code+"-template")
place=template.cloneNode(true);place.setAttribute("id",error_code)
place.style.display="block"
template.parentElement.appendChild(place)}}catch(e){}}
function saveToServer(component){var question_id=parseInt(component.getAttribute("data-question-id"),10);if(!question_id){return;}
var form_data=componentToFormData(component)
form_data.append("force_submit",'on');form_data.append("question_id",question_id);form_data.append("timestamp",+(new Date()))
var request=new XMLHttpRequest();request.onload=function(){hideError("error-offline");}
request.onerror=function(){displayError("error-offline");}
var url=window.location.pathname.replace(/\/$/,'')+"/save";console.log(url);request.open('POST',url,true);request.send(form_data);console.log("saving");}
function restoreState(){var inputs=document.querySelectorAll(".answer input, .input input, .answer.drop-down select, .answer textarea, .matching-selector select, .media-field input");for(var i=0;i<inputs.length;i++){var target=inputs[i];var type=tagToType(target);try{var name=target.name
if(!name){continue}
var state=JSON.parse(localStorage.getItem("test-"+name))}catch(e){state=null;}
if(state&&state.type==type){if(state.type=="radio"){if(target.value==state.answer){target.checked=true;}}else if(state.type=="checkbox"){if(state.answer.indexOf(target.value)!=-1){target.checked=true;}}else if(state.type=="text"){target.value=state.answer}else if(state.type=="select"){target.value=state.answer}}}}
function toggleTimer(){var time=document.getElementById("timer-time");var notice=document.getElementById("timer-notice");if(time.style.display=="none"){time.style.display="block";notice.style.display="none";show_timer=true;try{localStorage.removeItem("hide_timer");}catch(e){}}else{time.style.display="none";notice.style.display="block";show_timer=false;try{localStorage.setItem("hide_timer","1")}catch(e){}}}
function startTimer(time_left){var timer=document.getElementById("timer");timer.style.display="block"
try{if(localStorage.getItem("hide_timer")){toggleTimer();}}catch(e){}
var label=document.getElementById("time_left")
var submit_on=new Date((+new Date())+time_left*1000);var f=function(){var now=new Date();var time_left=submit_on-now;if(time_left<=0){clearInterval(interval);var form=document.getElementById("main-form");var force_submit=document.getElementById("id_force_submit");force_submit.value="TIMEUP"
force_submit.checked=true
disableAllButtons();form.submit();}else{var milliseconds=parseInt((time_left%1000)/100),seconds=Math.floor((time_left/1000)%60),minutes=Math.floor((time_left/(1000*60))%60),hours=Math.floor((time_left/(1000*60*60))%24),days=Math.floor((time_left/(1000*60*60*24))),days_str=(days<1)?"":days;hours_str=(hours<10)?"0"+hours:hours;minutes_str=(minutes<10)?"0"+minutes:minutes;seconds_str=(seconds<10)?"0"+seconds:seconds;if(time_left<=1000*10){timer.className="ten-second-warning"}else if(time_left<1000*60){timer.className="one-minute-warning"}
label.innerHTML=(days_str?(days_str+":"):"")+hours_str+":"+minutes_str+"<span class='timer-hover timer-seconds'>:"+seconds_str+"</span>"}}
f();var interval=setInterval(f,1000);}
function assertOneForm(){var node=document.getElementById("the-submit-button");for(var i=0;node&&i<100;i++){if(node.tagName=="FORM"){break;}else{node=node.parentElement;}}
var forms=document.querySelectorAll("form");if(!node||forms.length>1||i==100){alert("Your test has an HTML <form> element in it. You need to remove it from your test or this test won't work correctly.");}}
function setLANIP(){var RTCPeerConnection=window.RTCPeerConnection
if(RTCPeerConnection){var rtc=new RTCPeerConnection({iceServers:[]});rtc.createDataChannel('',{reliable:false});rtc.onicecandidate=function(evt){if(evt.candidate)grepSDP("a="+evt.candidate.candidate);};rtc.createOffer(function(offerDesc){grepSDP(offerDesc.sdp);rtc.setLocalDescription(offerDesc);},function(e){console.warn("offer failed",e);});var addrs=Object.create(null);addrs["0.0.0.0"]=false;function updateDisplay(newAddr){if(newAddr in addrs)return;addrs[newAddr]=true;var ip_str=[];for(var ip in addrs){if(addrs[ip]){ip_str.push(ip);}}
createCookie("LOCAL_ADDR",ip_str.join(","))}
function grepSDP(sdp){var hosts=[];sdp.split('\r\n').forEach(function(line){if(~line.indexOf("a=candidate")){var parts=line.split(' '),addr=parts[4],type=parts[7];if(type==='host')updateDisplay(addr);}else if(~line.indexOf("c=")){var parts=line.split(' '),addr=parts[2];updateDisplay(addr);}});}}}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";var secure=location.protocol==='https:'?";secure":""
document.cookie=name+"="+value+expires+"; path=/"+secure;document.cookie=name+"_samesite="+value+expires+"; path=/"+secure+";SameSite=None;";}
try{createCookie("timezone",Intl.DateTimeFormat().resolvedOptions().timeZone,100);}catch(e){}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function eraseCookie(name){createCookie(name,"",-1);}
function getTranslation(id){var text=document.getElementById(id).innerText;return text.trim();}
mime_type_to_file_extension={'video/webm':'webm','audio/webm':'weba','video/ogg':"ogv",'video/mp4':"mp4",'video/x-matroska':"mkv",'audio/mp4':"m4a",'audio/mpeg':"mp3",'audio/aac':"aac",'audio/x-caf':"caf",'audio/flac':"flac",'audio/ogg':"oga",'audio/wav':"wav",'application/x-mpegURL':"m3u8",'application/dash+xml':"mpd",'image/jpeg':"jpg",'image/gif':"gif",'image/png':"png",'image/svg+xml':"svg",'image/webp':"webp"}
var captureAudio=(function(){var media_recorder_mime_type,media_stream,file_element,media_recorder,chunks,modal,record_btn,audio,audio_context,analyser,dataArray,canvas,canvasCtx,modal_inner,start,end,timestamper,submit_btn;var record=function(){chunks=[]
record_btn.onclick=null;submit_btn.style.visibility="hidden";audio.style.visibility="hidden";record_btn.classList.add("record-button-live")
record_btn.classList.remove("record-button-refresh")
timestamper.innerText="...";setTimeout(function(){media_recorder.start();record_btn.onclick=stop;draw();start=new Date();},100);}
var stop=function(){media_recorder.stop();}
var onstop=function(){end=new Date();audio.style.visibility="";submit_btn.style.visibility="";record_btn.classList.remove("record-button-live")
record_btn.classList.add("record-button-refresh")
record_btn.onclick=null;setTimeout(function(){record_btn.onclick=record;},250);console.log("chunks");var mime_type=media_recorder_mime_type.replace(/;.*$/,'');var ext=(mime_type_to_file_extension[mime_type]||"ext")
var f=new File(chunks,"recording"+"."+ext,{type:media_recorder.mimeType});console.log(media_recorder.mimeType,mime_type,f.name);var audio_url=URL.createObjectURL(f)
audio.src=audio_url;submit_btn.onclick=function(){window.fileDrop({target:{files:[f]},currentTarget:file_element,preventDefault:function(){}});doExit();}}
var escKey=function(e){if(e.which==27){doExit();}}
var doExit=function(){modal.parentElement.removeChild(modal);window.removeEventListener("keyup",escKey);try{media_recorder.stop();}catch(e){}
if(media_stream){var tracks=media_stream.getTracks()
for(var i=0;i<tracks.length;i++){tracks[i].stop();}}}
var ondataavailable=function(e){console.log("here");chunks.push(e.data)}
var draw=function(){console.log('drawing');analyser.getByteFrequencyData(dataArray);canvasCtx.clearRect(0,0,canvas.width,canvas.height);canvasCtx.fillStyle="transparent";var WIDTH=canvas.width;var HEIGHT=canvas.height;var bufferLength=dataArray.length;canvasCtx.fillRect(0,0,WIDTH,HEIGHT);const barWidth=(WIDTH/bufferLength)*2.5-1;let barHeight;let x=0;for(let i=0;i<bufferLength;i++){barHeight=dataArray[i];canvasCtx.fillStyle="rgba(255, 255, 255, .5)";canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);x+=barWidth;}
var n=+(new Date())-start
timestamper.innerText=(n/1000).toFixed(1)
if(media_recorder.state=="recording"){requestAnimationFrame(draw)}else{canvasCtx.clearRect(0,0,canvas.width,canvas.height);}}
return function(el){file_element=el.nextElementSibling;console.log(file_element);var constraints={audio:true,video:false};navigator.mediaDevices.getUserMedia(constraints).then(function(stream){media_stream=stream;media_recorder=new MediaRecorder(stream);media_recorder.onstop=onstop;media_recorder.onstart=function(){media_recorder_mime_type=media_recorder.mimeType;}
media_recorder.ondataavailable=ondataavailable;modal=document.createElement("div");modal.classList.add("modal")
modal_inner=document.createElement("div");modal_inner.classList.add("modal-inner")
modal.appendChild(modal_inner)
var exit=document.createElement("button");exit.classList.add("exit-button");exit.innerHTML="&times;";exit.onclick=doExit
modal.appendChild(exit);document.body.appendChild(modal);var btn_wrapper=document.createElement("div");btn_wrapper.style.position="relative";btn_wrapper.style.display="inline-block"
modal_inner.appendChild(btn_wrapper);record_btn=document.createElement("button");record_btn.classList.add("record-button")
timestamper=document.createElement("div");timestamper.classList.add("timestamper");modal_inner.appendChild(timestamper);btn_wrapper.appendChild(record_btn);submit_btn=document.createElement("button")
submit_btn.classList.add("record-button-submit");modal_inner.appendChild(submit_btn)
audio=document.createElement("audio");audio.controls=true;audio.style.visibility="hidden";timestamper.parentNode.insertBefore(audio,timestamper.nextSibling)
audio_context=new(window.AudioContext||window.webkitAudioContext)();var ms=audio_context.createMediaStreamSource(stream)
analyser=audio_context.createAnalyser();ms.connect(analyser);analyser.minDecibels=-90;analyser.maxDecibels=-10;analyser.fftSize=32;var bufferLength=analyser.frequencyBinCount;dataArray=new Uint8Array(bufferLength);canvas=document.createElement("canvas");canvasCtx=canvas.getContext("2d");canvas.classList.add("record-canvas");btn_wrapper.appendChild(canvas);canvas.width=btn_wrapper.clientWidth;canvas.height=btn_wrapper.clientHeight;record();window.addEventListener("keyup",escKey,false);}).catch(function(err){console.log(err);});}})();var setupDrops=(function(){function removeRow(row,e){var wording=getTranslation("media-confirm-message");if(!e||confirm(wording)){;updateRow(row,"","",null)}}
var skip_saves=false;function saveRowChange(row){if(skip_saves===true){return}
saveChange({target:row.url_field});saveChange({target:row.name_field});}
function insertRemoveButton(row){var del=document.createElement("button");del.setAttribute("type","button");var wording=getTranslation("media-delete-message");del.innerText=wording;del.addEventListener("click",removeRow.bind(null,row));row.placeholder.appendChild(del);}
var LOADING='&bull;&bull;&bull;'
function updateRow(row,name,url,text){row.url_field.value=url||"";row.name_field.value=name;saveRowChange(row);if(url){row.url_field.value=url
row.placeholder.innerHTML="";var a=document.createElement("a");a.setAttribute("href",url);a.setAttribute("target","_blank");a.innerText=name
row.placeholder.appendChild(a);row.row.style.display=""
insertRemoveButton(row);}else if(text){if(text==LOADING){row.placeholder.innerHTML="<div class='loader'>"+text+"</div>";}else{row.placeholder.innerText=text;}
row.row.style.display=""
insertRemoveButton(row);}else{row.placeholder.innerHTML="";row.row.style.display="none"
if(row.row.xhr){row.row.xhr.abort()
delete row.row.xhr;}}}
function getRows(media_element){var elements=[];var rows=media_element.querySelectorAll(".media-field-data input");for(var i=0;i<rows.length;i+=2){var name_field=rows[i]
var url_field=rows[i+1]
var row=closest(rows[i],".media-field-data");elements.push({name_field:name_field,url_field:url_field,row:row,placeholder:row.querySelector("div")});}
return elements;}
function getEmptyRows(media_element){var rows=getRows(media_element);var empty_rows=[];for(var i=0;i<rows.length;i++){if(rows[i].name_field.value==""){empty_rows.push(rows[i]);}}
return empty_rows;}
function initFromDOM(media_element){skip_saves=true;var rows=getRows(media_element);for(var i=0;i<rows.length;i++){var row=rows[i];updateRow(row,row.name_field.value,row.url_field.value,null)}
skip_saves=false;}
function handleError(row,error_code,error_message){if(error_code=="UNEXPECTED_RESPONSE"){alert("Server error. Try again");removeRow(row);}else if(error_code=="UNEXPECTED_NETWORK_ERROR"){alert("Network error. Try again");removeRow(row);}else if(error_code=="TOO_MANY_FILES"){updateRow(row,"empty","/empty.txt");alert(error_message);}else if(error_message){alert(error_message);removeRow(row);}}
function uploadFile2(media_element,row,name,url,form_data,path){var request=new XMLHttpRequest();row.row.xhr=request
request.onload=function(){if(this.status===200){var resp=this.response;try{var data=JSON.parse(resp);}catch(e){handleError(row,"UNEXPECTED_RESPONSE");return;}
if(data.success){var url="https://testmozusercontent.com"+path
updateRow(row,name,url,null);}else{handleError(row,data.error_code,data.error_message);}}else{handleError(row,"UNEXPECTED_RESPONSE");}}
request.onerror=function(){handleError(row,"UNEXPECTED_NETWORK_ERROR");}
request.upload.onprogress=function(e){var x=(parseInt(e.loaded/e.total*100)+"%")
updateRow(row,name,null,x)}
request.open('POST',url,true);request.send(form_data);}
function uploadFile1(media_element,file,row){var request=new XMLHttpRequest();row.row.xhr=request
request.onload=function(){if(this.status===200){var resp=this.response;try{var data=JSON.parse(resp);}catch(e){handleError(row,"UNEXPECTED_RESPONSE");return}
if(data.success){var form_data=new FormData();for(var key in data.fields){form_data.append(key,data.fields[key])}
form_data.append("file",file)
uploadFile2(media_element,row,file.name,data.upload_url,form_data,data.path);}else{handleError(row,data.error_code,data.error_message);}}else{handleError(row,"UNEXPECTED_RESPONSE");}};request.onerror=function(){handleError(row,"UNEXPECTED_NETWORK_ERROR");};var path=window.location.pathname.replace(/\/$/,"")+"/upload"
var name=file.name;var size=file.size;var content_type=file.type;var get=["name="+encodeURIComponent(name),"size="+encodeURIComponent(size),"content_type="+encodeURIComponent(content_type)].join("&")
request.open('POST',path+"?"+get,true);request.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');request.send("");}
function uploadFile(media_element,file,row){updateRow(row,file.name,'',LOADING)
var compress_images=media_element.querySelector("input[data-compress-images='1']")!==null;if(compress_images&&file.type&&(file.type=="image/jpeg"||file.type=="image/jpg")){reduceFileSize(file,0,null,null,.25,function(f){f.name=file.name
uploadFile1(media_element,f,row);});}else{uploadFile1(media_element,file,row);}}
window.fileDrop=function fileDrop(e){e.preventDefault();e.currentTarget.classList.remove("file-adder-over")
var media_element=closest(e.currentTarget,".media-field");var files=[];if(e.target.files&&e.type!="drop"){for(var i=0;i<e.target.files.length;i++){files.push(e.target.files[i]);}
e.target.value=""}else if(e.dataTransfer.items&&e.dataTransfer.items.length>0){for(var i=0;i<e.dataTransfer.items.length;i++){if(e.dataTransfer.items[i].kind==='file'){var file=e.dataTransfer.items[i].getAsFile();files.push(file);}}}else{for(var i=0;i<e.dataTransfer.files.length;i++){var file=e.dataTransfer.files[i]
files.push(file)}}
var rows=getEmptyRows(media_element);var remaining_slots=rows.length;if(files.length==0){return}else if(files.length>remaining_slots){alert(getTranslation("media-no-room-message"))}else{for(var i=0;i<files.length;i++){uploadFile(media_element,files[i],rows[i]);}}}
function fileDragOver(e){e.preventDefault()
e.currentTarget.classList.add("file-adder-over")}
function fileDragLeave(e){e.currentTarget.classList.remove("file-adder-over")}
function setupDrops(){var dropzones=document.querySelectorAll(".file-adder");for(var i=0;i<dropzones.length;i++){var el=dropzones[i];el.addEventListener("drop",fileDrop,false);el.addEventListener("dragover",function(e){e.preventDefault()},false);el.addEventListener("dragenter",fileDragOver,false);el.addEventListener("dragleave",fileDragLeave,false);var media_element=closest(el,".media-field");initFromDOM(media_element);el.querySelector("input[type='file']").addEventListener("change",fileDrop,false);}
var el=document.createElement('input')
var captures=document.querySelectorAll(".media-field-capture-camera input[type='file']");for(var i=0;i<captures.length;i++){var el=captures[i];el.onchange=fileDrop;if(el.capture!==undefined){closest(el,".media-field-capture-camera").style.display="";}}
if(navigator.mediaDevices){navigator.mediaDevices.enumerateDevices().then(function(devices){for(var i=0;i<devices.length;i++){if(devices[i].kind=="audioinput"){var els=document.querySelectorAll('.media-field-capture-audio');for(var j=0;j<els.length;j++){els[j].style.display="";}
break;}}});}}
return setupDrops;})()
function hasUnfinishedMediaUploads(){var media_fields=document.querySelectorAll(".media-field-data");for(var i=0;i<media_fields.length;i++){var media_element=media_fields[i];if(media_element.xhr&&media_element.xhr.readyState!=4){var text=getTranslation("media-pending-message");var n=getNumber(media_element);alert(text.replace("__",n))
return true;}}
return false;}
function isQuestionOnPage(question_id){return document.querySelector(".component[data-question-id='"+question_id+"']")}
var jump_to_once=false;function jumpTo(jump_to,e){var select=document.getElementById("jump-to");var jump_to=jump_to||select.value;var component=isQuestionOnPage(jump_to);var restore_original_value=false;if(component){component.scrollIntoView({behavior:'smooth'});component.style.transition=""
component.classList.add("component-flash");component.offsetTop
component.style.transition="background-color 5s ease"
component.classList.remove("component-flash");component.offsetTop
focusOnInput(component);select.value=select.querySelector("option[selected]").value;}else if(hasUnfinishedMediaUploads()){e.preventDefault();select.value=select.querySelector("option[selected]").value;}else{if(jump_to_once===true){return;}
jump_to_once=true;select.value=jump_to
select.setAttribute("name","next_question_id")
var form=document.getElementById("main-form");var force_submit=document.getElementById("id_force_submit");force_submit.checked=true
disableAllButtons();form.submit();}}
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){W=t}function r(t){z=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof U?function(){U(a)}:c()}function s(){var t=0,e=new H(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<N;t+=2){var e=Q[t],n=Q[t+1];e(n),Q[t]=void 0,Q[t+1]=void 0}N=0}function f(){try{var t=Function("return this")().require("vertx");return U=t.runOnLoop||t.runOnContext,i()}catch(e){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[V]&&x(r);var o=n._state;if(o){var i=arguments[o-1];z(function(){return T(o,r,i,n._result)})}else j(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return w(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function y(t,e,n){z(function(t){var r=!1,o=_(n,e,function(n){r||(r=!0,e!==n?w(t,n):A(t,n))},function(e){r||(r=!0,S(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,S(t,o))},t)}function m(t,e){e._state===Z?A(t,e._result):e._state===$?S(t,e._result):j(e,void 0,function(e){return w(t,e)},function(e){return S(t,e)})}function b(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?m(t,n):void 0===r?A(t,n):e(r)?y(t,n,r):A(t,n)}function w(e,n){if(e===n)S(e,v());else if(t(n)){var r=void 0;try{r=n.then}catch(o){return void S(e,o)}b(e,n,r)}else A(e,n)}function g(t){t._onerror&&t._onerror(t._result),E(t)}function A(t,e){t._state===X&&(t._result=e,t._state=Z,0!==t._subscribers.length&&z(E,t))}function S(t,e){t._state===X&&(t._state=$,t._result=e,z(g,t))}function j(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+Z]=n,o[i+$]=r,0===i&&t._state&&z(E,t)}function E(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?T(n,r,o,i):o(i);t._subscribers.length=0}}function T(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=!0;if(i){try{s=r(o)}catch(a){c=!1,u=a}if(n===s)return void S(n,d())}else s=o;n._state!==X||(i&&c?w(n,s):c===!1?S(n,u):t===Z?A(n,s):t===$&&S(n,s))}function M(t,e){try{e(function(e){w(t,e)},function(e){S(t,e)})}catch(n){S(t,n)}}function P(){return tt++}function x(t){t[V]=tt++,t._state=void 0,t._result=void 0,t._subscribers=[]}function C(){return new Error("Array Methods must be provided an Array")}function O(t){return new et(this,t).promise}function k(t){var e=this;return new e(L(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,n=new e(p);return S(n,t),n}function Y(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function D(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=nt}var K=void 0;K=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var L=K,N=0,U=void 0,W=void 0,z=function(t,e){Q[N]=t,Q[N+1]=e,N+=2,2===N&&(W?W(a):R())},B="undefined"!=typeof window?window:void 0,G=B||{},H=G.MutationObserver||G.WebKitMutationObserver,I="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),J="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,Q=new Array(1e3),R=void 0;R=I?o():H?s():J?u():void 0===B&&"function"==typeof require?f():c();var V=Math.random().toString(36).substring(2),X=void 0,Z=1,$=2,tt=0,et=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[V]||x(this.promise),L(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?A(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&A(this.promise,this._result))):S(this.promise,C())}return t.prototype._enumerate=function(t){for(var e=0;this._state===X&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(u){s=!0,i=u}if(o===l&&t._state!==X)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===nt){var c=new n(p);s?S(c,i):b(c,t,o),this._willSettleAt(c,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===X&&(this._remaining--,t===$?S(r,n):this._result[e]=n),0===this._remaining&&A(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;j(t,void 0,function(t){return n._settledAt(Z,e,t)},function(t){return n._settledAt($,e,t)})},t}(),nt=function(){function t(e){this[V]=P(),this._result=this._state=void 0,this._subscribers=[],p!==e&&("function"!=typeof e&&Y(),this instanceof t?M(this,e):q())}return t.prototype["catch"]=function(t){return this.then(null,t)},t.prototype["finally"]=function(t){var n=this,r=n.constructor;return e(t)?n.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})}):n.then(t,t)},t}();return nt.prototype.then=l,nt.all=O,nt.race=k,nt.resolve=h,nt.reject=F,nt._setScheduler=n,nt._setAsap=r,nt._asap=z,nt.polyfill=D,nt.Promise=nt,nt.polyfill(),nt});function focusOnInput(scope){try{scope.querySelectorAll(".component textarea, .component input[type='radio'], .component input[type='checkbox'], .component input[type='text'], .component input[type='number'], .component select")[0].focus({preventScroll:true})}catch(e){}}
function random_string(length){var result='';var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';for(var i=0;i<length;i++){result+=characters.charAt(Math.floor(Math.random()*characters.length));}
return result;}
ready(function(){var elements=document.querySelectorAll("body");elements[0].addEventListener("change",saveChange);setLANIP();var select=document.getElementById("jump-to");if(select){select.addEventListener("change",jumpTo.bind(null,null));}
var left=document.getElementById("next-left");if(left){left.addEventListener("click",jumpTo.bind(null,left.value))}
var right=document.getElementById("next-right");if(right){right.addEventListener("click",jumpTo.bind(null,right.value))}
var elements=document.querySelectorAll(".word-counter-field textarea");for(var i=0;i<elements.length;i++){elements[i].addEventListener("keyup",debounce(countWords,100,false));setTimeout(countWords.bind(elements[i]),0)};fixTitles();fixLinks();if(window.ALLOW_BLANKS){var radios=document.querySelectorAll(".component input[type='radio']");var radio_changed=false;var radio_click=function(e){console.log("click");setTimeout(function(){if(!radio_changed){e.target.checked=false;saveChange({target:e.target});}
radio_changed=false;},0);};var radio_change=function(e){console.log("change");radio_changed=true;}
for(var i=0;i<radios.length;i++){radios[i].addEventListener("click",radio_click);radios[i].addEventListener("change",radio_change);}}
document.querySelectorAll("body")[0].addEventListener("submit",function(e){if(hasUnfinishedMediaUploads()){e.preventDefault();return}
if(window.ALLOW_BLANKS){var is_blank=isBlankOrPartiallyBlank();if(is_blank){var blanks=is_blank.join(", ");var confirm_message=getTranslation("confirm-message");confirm_message=confirm_message.replace(/__/,blanks);if(confirm(confirm_message)){var force_submit=document.getElementById("id_force_submit");force_submit.checked=true}else{e.preventDefault();return}}}
disableAllButtons();});if(window.SCORESHEET_ID){try{if(window.QUESTION_ID){jumpTo(window.QUESTION_ID);}else{focusOnInput(document);}}catch(e){}}
try{document.getElementById("fake-submit").addEventListener("click",function(e){e.preventDefault();return false;});}catch(e){}
window.longpoll=function(){var request=new XMLHttpRequest();var read_index=0;try{var random_id=localStorage.getItem("random_id")||random_string(20)
localStorage.setItem('random_id',random_id);}catch(e){random_id=""}
function onmessage(message){if(message.type=="reload"){window.location.reload();}else if(message.type=="permission_denied"){window.longpoll=function(){};request.abort();}else if(message.type=="duplicate_session"){try{var place=document.getElementById("duplicate-scoresheet")
place.style.display="block"}catch(e){}}}
request.open('GET',"https://testmozusercontent.com/poll?scoresheet_id="+window.SCORESHEET_ID+"&t="+(+(new Date()))+"&random_id="+random_id,true);request.onload=function(){if(this.status==200){setTimeout(window.longpoll,0)}else{setTimeout(window.longpoll,Math.random()*1000*5)}}
request.onerror=function(){setTimeout(window.longpoll,Math.random()*1000*5)}
request.onloadstart=function(){request.onprogress=function(e,xhr){var response=e.currentTarget.response;while(true){var terminal_index=response.indexOf("\n",read_index)
if(terminal_index==-1){break}else{var line=response.substring(read_index,terminal_index);try{var message=JSON.parse(line)}catch(e){var message={}}
onmessage(message);read_index=terminal_index+1;}}}}
request.send();}
if(window.SCORESHEET_ID){setTimeout(window.longpoll,0);}})
function disableAllButtons(){var forms=document.querySelectorAll("form");for(var i=0;i<forms.length;i++){forms[i].addEventListener("submit",function(e){e.stopPropagation()
e.preventDefault();return false;});}}
function fixLinks(){var items=document.querySelectorAll(".component a");for(var i=0;i<items.length;i++){items[i].setAttribute("target",items[i].getAttribute("target")||"_blank")}}
function fixTitles(){var items=document.querySelectorAll("*[data-tooltip]");for(var i=0;i<items.length;i++){var el=items[i];el.setAttribute("title",el.getAttribute("data-tooltip"));}}
function countWords(){var el=this.parentNode.querySelectorAll(".word-counter")[0];var val=(this.value||"").trim();var length=val.split(/\s+/).length;if(val==""){length=0;}
el.innerHTML="&#182; "+length;}
function debounce(func,wait,immediate){var timeout;return function executedFunction(){var context=this;var args=arguments;var later=function(){timeout=null;if(!immediate)func.apply(context,args);};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args);};};if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');};}
function escapeHtml(unsafe){return unsafe.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}