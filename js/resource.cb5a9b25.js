(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["resource"],{2240:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("resourceList")],1)},o=[],n=a("d4ec"),l=a("262e"),i=a("2caf"),s=a("9ab4"),c=a("1b40"),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"resource-list"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-form",{ref:"form",attrs:{inline:!0,model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{prop:"name",label:"资源名称"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{prop:"url",label:"资源路径"}},[a("el-input",{model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1),a("el-form-item",{attrs:{prop:"categoryId",label:"资源分类"}},[a("el-select",{attrs:{placeholder:"请选择资源分类",clearable:""},model:{value:e.form.categoryId,callback:function(t){e.$set(e.form,"categoryId",t)},expression:"form.categoryId"}},e._l(e.resourceCategories,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",disabled:e.isLoading},on:{click:e.onSubmit}},[e._v("查询搜索")]),a("el-button",{attrs:{disabled:e.isLoading},on:{click:e.onReset}},[e._v("重置")])],1)],1),a("div",{staticClass:"btnGroup"},[a("el-button",{attrs:{type:"primary",size:"default"},on:{click:e.add}},[e._v("添加")]),a("el-button",{attrs:{type:"primary",size:"default"},on:{click:function(t){return e.$router.push("/resourceCategory")}}},[e._v("资源分类")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:e.resources}},[a("el-table-column",{attrs:{type:"index",label:"编号",width:"100"}}),a("el-table-column",{attrs:{prop:"name",label:"资源名称",width:"180"}}),a("el-table-column",{attrs:{prop:"url",width:"180",label:"资源路径"}}),a("el-table-column",{attrs:{prop:"description",width:"180",label:"描述"}}),a("el-table-column",{attrs:{width:"180",prop:"createdTime",label:"添加时间"}}),a("el-table-column",{attrs:{width:"180",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{attrs:{disabled:e.isLoading,"current-page":e.form.current,"page-sizes":[5,10,20],"page-size":e.form.size,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){return e.$set(e.form,"current",t)},"update:current-page":function(t){return e.$set(e.form,"current",t)}}}),a("el-dialog",{attrs:{title:e.title,visible:e.modalBool,width:"40%"},on:{"update:visible":function(t){e.modalBool=t}}},[a("el-form",{ref:"modal",attrs:{model:e.modalData,"label-width":"80px",inline:!0,size:"normal"}},[a("el-form-item",{attrs:{label:"资源名称"}},[a("el-input",{model:{value:e.modalData.name,callback:function(t){e.$set(e.modalData,"name",t)},expression:"modalData.name"}})],1),a("el-form-item",{attrs:{label:"资源路径"}},[a("el-input",{model:{value:e.modalData.url,callback:function(t){e.$set(e.modalData,"url",t)},expression:"modalData.url"}})],1),a("el-form-item",{attrs:{label:"资源分类"}},[a("el-select",{attrs:{placeholder:"请选择资源分类",clearable:""},model:{value:e.modalData.categoryId,callback:function(t){e.$set(e.modalData,"categoryId",t)},expression:"modalData.categoryId"}},e._l(e.resourceCategories,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"描述"}},[a("el-input",{model:{value:e.modalData.description,callback:function(t){e.$set(e.modalData,"description",t)},expression:"modalData.description"}})],1)],1),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.onCancel}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.onOK}},[e._v("确定")])],1)],1)],1)],1)},d=[],m=a("1da1"),f=a("bee2"),b=(a("b0c0"),a("a4d3"),a("e01a"),a("159b"),a("b64b"),a("96cf"),a("2ef8")),p=a("d771"),h=function(e){Object(l["a"])(a,e);var t=Object(i["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.resources=[],e.title="",e.row=null,e.options=[],e.modalBool=!1,e.modalData={id:"",name:"",categoryId:"",url:"",description:""},e.form={name:"",url:"",current:1,size:5,categoryId:null},e.totalCount=0,e.resourceCategories=[],e.isLoading=!0,e}return Object(f["a"])(a,[{key:"created",value:function(){this.loadResources(),this.loadResourceCategories()}},{key:"loadResources",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.isLoading=!0,e.next=3,Object(b["d"])(this.form);case 3:t=e.sent,a=t.data,this.resources=a.data.records,this.totalCount=a.data.total,this.isLoading=!1;case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"loadResourceCategories",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(p["b"])();case 2:t=e.sent,a=t.data,this.resourceCategories=a.data;case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onSubmit",value:function(){this.form.current=1,this.loadResources()}},{key:"handleEdit",value:function(e){this.title="编辑资源",this.modalBool=!0;var t=e.id,a=e.name,r=e.categoryId,o=e.url,n=e.description;this.modalData={id:t,name:a,categoryId:r,url:o,description:n}}},{key:"handleDelete",value:function(e){var t=this;this.$confirm("是否删除该资源","删除提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(b["b"])(e.id).then((function(){t.$message.success("删除成功"),t.loadResources()}))})).catch((function(){t.$message.info("取消删除")}))}},{key:"handleSizeChange",value:function(e){this.form.size=e,this.form.current=1,this.loadResources()}},{key:"handleCurrentChange",value:function(e){this.form.current=e,this.loadResources()}},{key:"onReset",value:function(){this.$refs.form.resetFields(),this.form.current=1,this.loadResources()}},{key:"onOK",value:function(){var e=this;Object(b["f"])(this.modalData).then((function(t){e.$message.success("".concat("新增资源"===e.title?"新增":"编辑","成功")),e.modalBool=!1,e.loadResources()}))}},{key:"onCancel",value:function(){this.modalBool=!1}},{key:"add",value:function(){var e=this;this.title="新增资源",this.modalBool=!0,Object.keys(this.modalData).forEach((function(t){e.modalData[t]=""}))}}]),a}(c["c"]);h=Object(s["a"])([c["a"]],h);var g=h,v=g,y=a("2877"),O=Object(y["a"])(v,u,d,!1,null,"6d09ffbc",null),k=O.exports,j=function(e){Object(l["a"])(a,e);var t=Object(i["a"])(a);function a(){return Object(n["a"])(this,a),t.apply(this,arguments)}return a}(c["c"]);j=Object(s["a"])([Object(c["a"])({components:{resourceList:k}})],j);var w=j,x=w,C=Object(y["a"])(x,r,o,!1,null,"524f0236",null);t["default"]=C.exports},"2ef8":function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return l})),a.d(t,"e",(function(){return i})),a.d(t,"f",(function(){return s})),a.d(t,"b",(function(){return c}));var r=a("b32d"),o=function(e){return Object(r["a"])({method:"POST",url:"/boss/resource/getResourcePages",data:e})},n=function(){return Object(r["a"])({method:"GET",url:"/boss/resource/getAll"})},l=function(e){return Object(r["a"])({method:"POST",url:"/boss/resource/allocateRoleResources",data:e})},i=function(e){return Object(r["a"])({method:"GET",url:"/boss/resource/getRoleResources",params:{roleId:e}})},s=function(e){return Object(r["a"])({method:"POST",url:"/boss/resource/saveOrUpdate",data:e})},c=function(e){return Object(r["a"])({method:"DELETE",url:"/boss/resource/".concat(e)})}},b0c0:function(e,t,a){var r=a("83ab"),o=a("9bf2").f,n=Function.prototype,l=n.toString,i=/^\s*function ([^ (]*)/,s="name";r&&!(s in n)&&o(n,s,{configurable:!0,get:function(){try{return l.call(this).match(i)[1]}catch(e){return""}}})},b64b:function(e,t,a){var r=a("23e7"),o=a("7b0b"),n=a("df75"),l=a("d039"),i=l((function(){n(1)}));r({target:"Object",stat:!0,forced:i},{keys:function(e){return n(o(e))}})},d771:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return l}));var r=a("b32d"),o=function(){return Object(r["a"])({method:"GET",url:"/boss/resource/category/getAll"})},n=function(e){return Object(r["a"])({method:"POST",url:"/boss/resource/category/saveOrderUpdate",data:e})},l=function(e){return Object(r["a"])({method:"DELETE",url:"/boss/resource/category/".concat(e)})}}}]);
//# sourceMappingURL=resource.cb5a9b25.js.map