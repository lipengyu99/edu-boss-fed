(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["course-video"],{"1f26":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("el-card",[a("el-form",{attrs:{"label-width":"40px"}},[a("el-form-item",{attrs:{label:"视频"}},[a("input",{ref:"video-file",attrs:{type:"file"}})]),a("el-form-item",{attrs:{label:"封面"}},[a("input",{ref:"image-file",attrs:{type:"file"}})]),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.authUpload}},[e._v("开始上传")]),a("el-button",{on:{click:function(t){return e.$router.back()}}},[e._v("返回")])],1),a("el-form-item",[0!==e.uploadPercent?a("p",[e._v("视频上传中: "+e._s(e.uploadPercent)+"%")]):e._e(),e.isUploadSuccess?a("p",[e._v(" 视频转码中："+e._s(e.isTranscodeSuccess?"完成":"正在转码中...")+" ")]):e._e()])],1)],1)],1)},r=[],o=a("1da1"),l=a("d4ec"),s=a("bee2"),i=a("262e"),u=a("2caf"),c=(a("96cf"),a("b0c0"),a("9ab4")),d=a("1b40"),p=a("b32d"),f=function(){return Object(p["a"])({method:"GET",url:"/boss/course/upload/aliyunImagUploadAddressAdnAuth.json"})},m=function(e){return Object(p["a"])({method:"GET",url:"/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json",params:e})},b=function(e){return Object(p["a"])({method:"POST",url:"/boss/course/upload/aliyunTransCode.json",data:e})},h=function(e){return Object(p["a"])({method:"GET",url:"/boss/course/upload/aliyunTransCodePercent.json",params:{lessonId:e}})},v=function(e){Object(i["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.uploader=null,e.videoId=null,e.imageUrl="",e.fileName="",e.uploadPercent=0,e.isUploadSuccess=!1,e.isTranscodeSuccess=!1,e}return Object(s["a"])(a,[{key:"created",value:function(){this.initUploader()}},{key:"authUpload",value:function(){var e=this.$refs["video-file"].files[0];this.uploader.addFile(e,null,null,null,'{"Vod":{}}'),this.uploader.addFile(this.$refs["image-file"].files[0],null,null,null,'{"Vod":{}}'),this.fileName=e.name,this.uploader.startUpload()}},{key:"initUploader",value:function(){var e=this;this.uploader=new window.AliyunUpload.Vod({userId:0x5bfb091c71f24,region:"cn-shanghai",partSize:1048576,parallel:5,retryCount:3,retryDuration:2,onUploadstarted:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(a){var n,r,o,l,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log("onUploadstarted",a),n=null,!a.isImage){t.next=11;break}return t.next=5,f();case 5:r=t.sent,o=r.data,e.imageUrl=o.data.imageURL,n=o.data,t.next=17;break;case 11:return t.next=13,m({fileName:a.file.name,imageUrl:e.imageUrl});case 13:l=t.sent,s=l.data,e.videoId=s.data.videoId,n=s.data;case 17:e.uploader.setUploadAuthAndAddress(a,n.uploadAuth,n.uploadAddress,n.videoId||n.imageId);case 18:case"end":return t.stop()}}),t)})));function a(e){return t.apply(this,arguments)}return a}(),onUploadSucceed:function(e){console.log("onUploadSucceed",e)},onUploadFailed:function(e,t,a){console.log("onUploadFailed",e,t,a)},onUploadProgress:function(e,t,a){console.log(e,t,a)},onUploadTokenExpired:function(e){console.log("onUploadTokenExpired")},onUploadEnd:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(a){var n,r,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isUploadSuccess=!0,t.next=3,b({lessonId:e.$route.query.lessonId,fileId:e.videoId,coverImageUrl:e.imageUrl,fileName:e.fileName});case 3:n=t.sent,r=n.data,"000000"===r.code&&(l=setInterval(Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h(e.$route.query.lessonId);case 2:a=t.sent,n=a.data,"000000"===n.code&&(e.isTranscodeSuccess=!0,e.$message.success("视频转码成功"),clearInterval(l));case 5:case"end":return t.stop()}}),t)}))),1e3));case 6:case"end":return t.stop()}}),t)})));function a(e){return t.apply(this,arguments)}return a}()})}}]),a}(d["c"]);v=Object(c["a"])([d["a"]],v);var g=v,U=g,y=a("2877"),w=Object(y["a"])(U,n,r,!1,null,"a1431a2c",null);t["default"]=w.exports},b0c0:function(e,t,a){var n=a("83ab"),r=a("9bf2").f,o=Function.prototype,l=o.toString,s=/^\s*function ([^ (]*)/,i="name";n&&!(i in o)&&r(o,i,{configurable:!0,get:function(){try{return l.call(this).match(s)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=course-video.bf0fa9e8.js.map