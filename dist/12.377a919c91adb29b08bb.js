(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{cGQ5:function(l,n,t){"use strict";t.r(n);var e=t("CcnG"),u=function(){return function(){}}(),a=t("pMnS"),o=t("goBR"),i=t("EzEh"),c=t("Ip0R"),r=t("bse0"),s=t("gIcY"),d=t("26FU"),p=t("K9Ia"),f=t("dzgT"),m=t("F/XL"),g=t("15JJ"),h=t("67Y/"),v=t("t/Na"),C=function(){return(C=Object.assign||function(l){for(var n,t=1,e=arguments.length;t<e;t++)for(var u in n=arguments[t])Object.prototype.hasOwnProperty.call(n,u)&&(l[u]=n[u]);return l}).apply(this,arguments)},b=function(){return function(){}}(),y=function(){function l(l){this.http=l,this.onContactSelected=new d.a(null),this.onUserUpdated=new p.a,this.onChatSelected=new d.a(null),this.onChatsUpdated=new p.a}return l.prototype.loadChatData=function(){var l=this;return Object(f.b)(this.getAllContacts(),this.getAllChats(),this.getCurrentUser(),function(n,t,e){l.contacts=n,l.chats=t,l.user=e,l.onUserUpdated.next(e)})},l.prototype.getChatByContact=function(l){var n=this;this.loadingCollection=!0;var t=this.user.chatInfo.find(function(n){return n.contactId===l});return t?this.getAllChats().pipe(Object(g.a)(function(e){var u=e.find(function(l){return l.id===t.chatId}),a=n.contacts.find(function(n){return n.id===l});return n.onChatSelected.next({chatCollection:u,contact:a}),n.loadingCollection=!1,Object(m.a)(u)})):this.createChatCollection(l).pipe(Object(g.a)(function(t){return n.getChatByContact(l)}))},l.prototype.createChatCollection=function(l){var n=this,t=this.contacts.find(function(n){return n.id===l}),e=(1e9*Math.random()).toString(),u={id:e,chats:[]},a={chatId:e,lastChatTime:new Date,contactId:t.id,contactName:t.name,unread:null};return this.http.post("api/chat-collections",C({},u)).pipe(Object(g.a)(function(l){return n.user.chatInfo.push(a),n.updateUser(n.user).pipe(Object(g.a)(function(l){return n.getCurrentUser().pipe(Object(h.a)(function(l){n.user=l,n.onUserUpdated.next(l)}))}))}))},l.prototype.getAllContacts=function(){return this.http.get("api/contacts")},l.prototype.getAllChats=function(){return this.http.get("api/chat-collections")},l.prototype.getCurrentUser=function(){return this.http.get("api/chat-user").pipe(Object(h.a)(function(l){return l[0]}))},l.prototype.updateUser=function(l){return this.http.put("api/chat-user/"+l.id,C({},l))},l.prototype.updateChats=function(l,n){return this.http.put("api/chat-collections",{id:l,chats:n})},l.prototype.autoReply=function(l){var n=this;setTimeout(function(){n.onChatsUpdated.next(l)},1500)},l.ngInjectableDef=e["\u0275\u0275defineInjectable"]({factory:function(){return new l(e["\u0275\u0275inject"](v.c))},token:l,providedIn:"root"}),l}(),I=function(l,n){var t="function"==typeof Symbol&&l[Symbol.iterator];if(!t)return l;var e,u,a=t.call(l),o=[];try{for(;(void 0===n||n-- >0)&&!(e=a.next()).done;)o.push(e.value)}catch(i){u={error:i}}finally{try{e&&!e.done&&(t=a.return)&&t.call(a)}finally{if(u)throw u.error}}return o},x=function(){function l(l){this.chatService=l,this.user=new b,this.activeContact=new b}return l.prototype.ngOnInit=function(){var l=this;this.userUpdateSub=this.chatService.onUserUpdated.subscribe(function(n){l.user=n}),this.chatSelectSub=this.chatService.onChatSelected.subscribe(function(n){n&&(l.chatCollection=n.chatCollection,l.activeContact=n.contact,l.initMsgForm())}),this.chatUpdateSub=this.chatService.onChatsUpdated.subscribe(function(n){l.chatCollection.chats.push(n),l.scrollToBottom()})},l.prototype.ngOnDestroy=function(){this.userUpdateSub&&this.userUpdateSub.unsubscribe(),this.chatSelectSub&&this.chatSelectSub.unsubscribe(),this.chatUpdateSub&&this.chatUpdateSub.unsubscribe()},l.prototype.sendMessage=function(l){var n=this,t={contactId:this.chatService.user.id,text:this.msgForm.form.value.message,time:(new Date).toISOString()};this.chatCollection.chats.push(t),this.chatService.updateChats(this.chatCollection.id,function(){for(var l=[],n=0;n<arguments.length;n++)l=l.concat(I(arguments[n]));return l}(this.chatCollection.chats)).subscribe(function(l){n.initMsgForm()}),this.chatService.autoReply({contactId:this.activeContact.id,text:"Hi, I'm "+this.activeContact.name+". Your imaginary friend.",time:(new Date).toISOString()})},l.prototype.initMsgForm=function(){var l=this;setTimeout(function(){l.msgForm.reset(),l.msgInput.first.nativeElement.focus(),l.scrollToBottom()})},l.prototype.scrollToBottom=function(){var l=this;setTimeout(function(){l.psContainer.update(),l.psContainer.scrollToBottom(0,400)})},l}(),S=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{animation:[{type:7,name:"animate",definitions:[{type:1,expr:"void => *",animation:[{type:10,animation:{type:8,animation:[{type:6,styles:{opacity:"{{opacity}}",transform:"scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})"},offset:null},{type:4,styles:{type:6,styles:"*",offset:null},timings:"{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)"}],options:{params:{duration:"200ms",delay:"0ms",opacity:"0",scale:"1",x:"0",y:"0",z:"0"}}},options:null}],options:null}],options:{}},{type:7,name:"fadeInOut",definitions:[{type:0,name:"0",styles:{type:6,styles:{opacity:0,display:"none"},offset:null},options:void 0},{type:0,name:"1",styles:{type:6,styles:{opacity:1,display:"block"},offset:null},options:void 0},{type:1,expr:"0 => 1",animation:{type:4,styles:null,timings:"300ms"},options:null},{type:1,expr:"1 => 0",animation:{type:4,styles:null,timings:"300ms"},options:null}],options:{}}]}});function w(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,3,"div",[["class","d-flex align-items-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,0,"img",[["class","avatar-sm rounded-circle mr-2"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,1,"p",[["class","m-0 text-title text-16 flex-grow-1"]],null,null,null,null,null)),(l()(),e["\u0275ted"](3,null,["",""]))],null,function(l,n){var t=n.component;l(n,1,0,null==t.activeContact?null:t.activeContact.avatar,null==t.activeContact?null:t.activeContact.name),l(n,3,0,null==t.activeContact?null:t.activeContact.name)})}function R(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,10,"div",[["class","d-flex user"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,0,"img",[["class","avatar-sm rounded-circle mr-3"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,8,"div",[["class","message flex-grow-1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,5,"div",[["class","d-flex"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,1,"p",[["class","mb-1 text-title text-16 flex-grow-1"]],null,null,null,null,null)),(l()(),e["\u0275ted"](5,null,["",""])),(l()(),e["\u0275eld"](6,0,null,null,2,"span",[["class","text-small text-muted"]],null,null,null,null,null)),(l()(),e["\u0275ted"](7,null,["",""])),e["\u0275ppd"](8,1),(l()(),e["\u0275eld"](9,0,null,null,1,"p",[["class","m-0"]],null,null,null,null,null)),(l()(),e["\u0275ted"](10,null,["",""]))],null,function(l,n){var t=n.component;l(n,1,0,null==t.user?null:t.user.avatar,null==t.user?null:t.user.name),l(n,5,0,null==t.user?null:t.user.name);var u=e["\u0275unv"](n,7,0,l(n,8,0,e["\u0275nov"](n.parent.parent.parent,0),n.parent.context.$implicit.time));l(n,7,0,u),l(n,10,0,n.parent.context.$implicit.text)})}function U(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,10,"div",[["class","d-flex"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,8,"div",[["class","message flex-grow-1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,5,"div",[["class","d-flex"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,1,"p",[["class","mb-1 text-title text-16 flex-grow-1"]],null,null,null,null,null)),(l()(),e["\u0275ted"](4,null,["",""])),(l()(),e["\u0275eld"](5,0,null,null,2,"span",[["class","text-small text-muted"]],null,null,null,null,null)),(l()(),e["\u0275ted"](6,null,["",""])),e["\u0275ppd"](7,1),(l()(),e["\u0275eld"](8,0,null,null,1,"p",[["class","m-0"]],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275eld"](10,0,null,null,0,"img",[["class","avatar-sm rounded-circle ml-3"]],[[8,"src",4],[8,"alt",0]],null,null,null,null))],null,function(l,n){var t=n.component;l(n,4,0,null==t.activeContact?null:t.activeContact.name);var u=e["\u0275unv"](n,6,0,l(n,7,0,e["\u0275nov"](n.parent.parent.parent,0),n.parent.context.$implicit.time));l(n,6,0,u),l(n,9,0,n.parent.context.$implicit.text),l(n,10,0,null==t.activeContact?null:t.activeContact.avatar,null==t.activeContact?null:t.activeContact.name)})}function O(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,4,"div",[["class","mb-4"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,R)),e["\u0275did"](2,16384,null,0,c.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,U)),e["\u0275did"](4,16384,null,0,c.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var t=n.component;l(n,2,0,n.context.$implicit.contactId!==t.activeContact.id),l(n,4,0,n.context.$implicit.contactId===t.activeContact.id)},null)}function N(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,4,"div",[["class","chat-content rtl-ps-none"]],null,null,null,null,null)),e["\u0275did"](1,999424,[[1,4]],0,r.b,[e.NgZone,e.KeyValueDiffers,e.ElementRef,e.PLATFORM_ID,[2,r.a]],{config:[0,"config"]},null),e["\u0275pod"](2,{suppressScrollX:0}),(l()(),e["\u0275and"](16777216,null,null,1,null,O)),e["\u0275did"](4,278528,null,0,c.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){var t=n.component,e=l(n,2,0,!0);l(n,1,0,e),l(n,4,0,null==t.chatCollection?null:t.chatCollection.chats)},null)}function _(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,18,"div",[["class","pl-3 pr-3 pt-3 pb-3 box-shadow-1 chat-input-area"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,17,"form",[["class","inputForm"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"keyup.enter"],[null,"submit"],[null,"reset"]],function(l,n,t){var u=!0,a=l.component;return"submit"===n&&(u=!1!==e["\u0275nov"](l,3).onSubmit(t)&&u),"reset"===n&&(u=!1!==e["\u0275nov"](l,3).onReset()&&u),"ngSubmit"===n&&(u=!1!==a.sendMessage(t)&&u),"keyup.enter"===n&&(u=!1!==a.sendMessage(t)&&u),u},null,null)),e["\u0275did"](2,16384,null,0,s["\u0275angular_packages_forms_forms_z"],[],null,null),e["\u0275did"](3,4210688,[[3,4],["msgForm",4]],0,s.NgForm,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),e["\u0275prd"](2048,null,s.ControlContainer,null,[s.NgForm]),e["\u0275did"](5,16384,null,0,s.NgControlStatusGroup,[[4,s.ControlContainer]],null,null),(l()(),e["\u0275eld"](6,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,[[2,0],["msgInput",1]],null,5,"textarea",[["class","form-control form-control-rounded"],["cols","30"],["id","message"],["name","message"],["ngModel",""],["placeholder","Type your message"],["rows","3"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var u=!0;return"input"===n&&(u=!1!==e["\u0275nov"](l,8)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,8).onTouched()&&u),"compositionstart"===n&&(u=!1!==e["\u0275nov"](l,8)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e["\u0275nov"](l,8)._compositionEnd(t.target.value)&&u),u},null,null)),e["\u0275did"](8,16384,null,0,s.DefaultValueAccessor,[e.Renderer2,e.ElementRef,[2,s.COMPOSITION_BUFFER_MODE]],null,null),e["\u0275prd"](1024,null,s.NG_VALUE_ACCESSOR,function(l){return[l]},[s.DefaultValueAccessor]),e["\u0275did"](10,671744,null,0,s.NgModel,[[2,s.ControlContainer],[8,null],[8,null],[6,s.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),e["\u0275prd"](2048,null,s.NgControl,null,[s.NgModel]),e["\u0275did"](12,16384,null,0,s.NgControlStatus,[[4,s.NgControl]],null,null),(l()(),e["\u0275eld"](13,0,null,null,5,"div",[["class","d-flex"]],null,null,null,null,null)),(l()(),e["\u0275eld"](14,0,null,null,0,"div",[["class","flex-grow-1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-icon btn-rounded btn-primary mr-2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](16,0,null,null,0,"i",[["class","i-Paper-Plane"]],null,null,null,null,null)),(l()(),e["\u0275eld"](17,0,null,null,1,"button",[["class","btn btn-icon btn-rounded btn-outline-primary"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,0,"i",[["class","i-Add-File"]],null,null,null,null,null))],function(l,n){l(n,10,0,"message","")},function(l,n){l(n,1,0,e["\u0275nov"](n,5).ngClassUntouched,e["\u0275nov"](n,5).ngClassTouched,e["\u0275nov"](n,5).ngClassPristine,e["\u0275nov"](n,5).ngClassDirty,e["\u0275nov"](n,5).ngClassValid,e["\u0275nov"](n,5).ngClassInvalid,e["\u0275nov"](n,5).ngClassPending),l(n,7,0,e["\u0275nov"](n,12).ngClassUntouched,e["\u0275nov"](n,12).ngClassTouched,e["\u0275nov"](n,12).ngClassPristine,e["\u0275nov"](n,12).ngClassDirty,e["\u0275nov"](n,12).ngClassValid,e["\u0275nov"](n,12).ngClassInvalid,e["\u0275nov"](n,12).ngClassPending)})}function D(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,0,"div",[["class","spinner-glow spinner-glow-warning"]],null,null,null,null,null))],null,null)}function F(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,8,"div",[["class","app-inro-circle"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,3,"div",[["class","border rounded-circle big-bubble"]],[[24,"@animate",0]],null,null,null,null)),e["\u0275pod"](2,{scale:0,delay:1,duration:2}),e["\u0275pod"](3,{value:0,params:1}),(l()(),e["\u0275eld"](4,0,null,null,0,"i",[["class","i-Speach-Bubbles"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,3,"p",[["class","text-16"]],[[24,"@animate",0]],null,null,null,null)),e["\u0275pod"](6,{y:0,delay:1,duration:2}),e["\u0275pod"](7,{value:0,params:1}),(l()(),e["\u0275ted"](-1,null,["Select a contact and start chat."]))],null,function(l,n){var t=l(n,3,0,"*",l(n,2,0,".2","400ms","400ms"));l(n,1,0,t);var e=l(n,7,0,"*",l(n,6,0,"120px","600ms","400ms"));l(n,5,0,e)})}function k(l){return e["\u0275vid"](0,[e["\u0275pid"](0,c.DatePipe,[e.LOCALE_ID]),e["\u0275qud"](671088640,1,{psContainer:0}),e["\u0275qud"](671088640,2,{msgInput:1}),e["\u0275qud"](671088640,3,{msgForm:0}),(l()(),e["\u0275eld"](4,0,null,null,14,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,5,"div",[["class","d-flex pl-3 pr-3 pt-2 pb-2 o-hidden box-shadow-1 chat-topbar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,2,"a",[["appSidebarToggler","chat-sidebar"],["class","link-icon d-md-none"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==e["\u0275nov"](l,7).onClick()&&u),u},null,null)),e["\u0275did"](7,16384,null,0,o.d,[i.a],{id:[0,"id"]},null),(l()(),e["\u0275eld"](8,0,null,null,0,"i",[["class","icon-regular i-Right ml-0 mr-3"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,w)),e["\u0275did"](10,16384,null,0,c.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,N)),e["\u0275did"](12,16384,null,0,c.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,_)),e["\u0275did"](14,16384,null,0,c.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,D)),e["\u0275did"](16,16384,null,0,c.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,F)),e["\u0275did"](18,16384,null,0,c.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var t=n.component;l(n,7,0,"chat-sidebar"),l(n,10,0,null==t.activeContact?null:t.activeContact.id),l(n,12,0,!t.chatService.loadingCollection&&t.chatCollection),l(n,14,0,t.chatCollection&&!t.chatService.loadingCollection),l(n,16,0,t.chatService.loadingCollection),l(n,18,0,!t.chatCollection&&!t.chatService.loadingCollection)},null)}var T=t("YyUd"),E=function(){function l(l){this.chatService=l,this.isSidenavOpen=!0,this.currentUser=new b}return l.prototype.ngOnInit=function(){var l=this;this.userUpdateSub=this.chatService.onUserUpdated.subscribe(function(n){l.currentUser=n}),this.loadDataSub=this.chatService.loadChatData().subscribe(function(n){l.currentUser=l.chatService.user,l.contacts=l.chatService.contacts})},l.prototype.ngOnDestroy=function(){this.userUpdateSub&&this.userUpdateSub.unsubscribe(),this.loadDataSub&&this.loadDataSub.unsubscribe()},l.prototype.getChatByContact=function(l){this.chatService.getChatByContact(l).subscribe(function(l){},function(l){console.error(l)})},l}(),M=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function V(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,12,"div",[["class","p-3 d-flex align-items-center contact"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.getChatByContact(l.context.$implicit.contactId)&&e),e},null,null)),e["\u0275prd"](512,null,c["\u0275NgClassImpl"],c["\u0275NgClassR2Impl"],[e.IterableDiffers,e.KeyValueDiffers,e.ElementRef,e.Renderer2]),e["\u0275did"](2,278528,null,0,c.NgClass,[c["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e["\u0275pid"](0,T.a,[]),e["\u0275pod"](4,{"border-bottom":0,online:1}),(l()(),e["\u0275eld"](5,0,null,null,1,"img",[["alt",""],["class","avatar-sm rounded-circle mr-3"]],[[8,"src",4]],null,null,null,null)),e["\u0275pid"](0,T.a,[]),(l()(),e["\u0275eld"](7,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,1,"h6",[["class","m-0"]],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275eld"](10,0,null,null,2,"span",[["class","text-muted text-small"]],null,null,null,null,null)),(l()(),e["\u0275ted"](11,null,["",""])),e["\u0275ppd"](12,1)],function(l,n){var t=n.component,u=l(n,4,0,n.context.index!=(null==t.currentUser?null:t.currentUser.chatInfo.length)-1,"online"===e["\u0275unv"](n,2,1,e["\u0275nov"](n,3).transform(t.contacts,n.context.$implicit.contactId,"status")));l(n,2,0,"p-3 d-flex align-items-center contact",u)},function(l,n){var t=n.component;l(n,5,0,e["\u0275unv"](n,5,0,e["\u0275nov"](n,6).transform(t.contacts,n.context.$implicit.contactId,"avatar"))),l(n,9,0,n.context.$implicit.contactName);var u=e["\u0275unv"](n,11,0,l(n,12,0,e["\u0275nov"](n.parent,0),n.context.$implicit.lastChatTime));l(n,11,0,u)})}function A(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,6,"div",[["class","p-3 d-flex border-bottom align-items-center contact"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.getChatByContact(l.context.$implicit.id)&&e),e},null,null)),e["\u0275prd"](512,null,c["\u0275NgClassImpl"],c["\u0275NgClassR2Impl"],[e.IterableDiffers,e.KeyValueDiffers,e.ElementRef,e.Renderer2]),e["\u0275did"](2,278528,null,0,c.NgClass,[c["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e["\u0275pod"](3,{online:0}),(l()(),e["\u0275eld"](4,0,null,null,0,"img",[["alt",""],["class","avatar-sm rounded-circle mr-3"]],[[8,"src",4]],null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,1,"h6",[["class",""]],null,null,null,null,null)),(l()(),e["\u0275ted"](6,null,["",""]))],function(l,n){var t=l(n,3,0,"online"===n.context.$implicit.status);l(n,2,0,"p-3 d-flex border-bottom align-items-center contact",t)},function(l,n){l(n,4,0,n.context.$implicit.avatar),l(n,6,0,n.context.$implicit.name)})}function L(l){return e["\u0275vid"](0,[e["\u0275pid"](0,c.DatePipe,[e.LOCALE_ID]),(l()(),e["\u0275eld"](1,0,null,null,17,"div",[["class","border-right"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,5,"div",[["class","pt-2 pb-2 pl-3 pr-3 d-flex align-items-center o-hidden box-shadow-1 chat-topbar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,2,"a",[["appSidebarToggler","chat-sidebar"],["class","link-icon d-md-none"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==e["\u0275nov"](l,4).onClick()&&u),u},null,null)),e["\u0275did"](4,16384,null,0,o.d,[i.a],{id:[0,"id"]},null),(l()(),e["\u0275eld"](5,0,null,null,0,"i",[["class","icon-regular ml-0 mr-3 i-Left"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,1,"div",[["class","form-group m-0 flex-grow-1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,0,"input",[["class","form-control form-control-rounded"],["id","search"],["placeholder","Search contacts"],["type","text"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,10,"div",[["class","contacts-scrollable rtl-ps-none"]],null,null,null,null,null)),e["\u0275did"](9,999424,null,0,r.b,[e.NgZone,e.KeyValueDiffers,e.ElementRef,e.PLATFORM_ID,[2,r.a]],{config:[0,"config"]},null),e["\u0275pod"](10,{suppressScrollX:0}),(l()(),e["\u0275eld"](11,0,null,null,1,"div",[["class","mt-4 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Recent"])),(l()(),e["\u0275and"](16777216,null,null,1,null,V)),e["\u0275did"](14,278528,null,0,c.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](15,0,null,null,1,"div",[["class","mt-3 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Contacts"])),(l()(),e["\u0275and"](16777216,null,null,1,null,A)),e["\u0275did"](18,278528,null,0,c.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){var t=n.component;l(n,4,0,"chat-sidebar");var e=l(n,10,0,!0);l(n,9,0,e),l(n,14,0,null==t.currentUser?null:t.currentUser.chatInfo),l(n,18,0,t.contacts)},null)}var $=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),j=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function B(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,9,"div",[["appSidebarContainer",""],["class","card chat-sidebar-container"]],null,null,null,null,null)),e["\u0275did"](1,81920,null,0,o.a,[e.ElementRef,i.a],{id:[0,"id"]},null),(l()(),e["\u0275eld"](2,0,null,null,3,"div",[["appSidebarContent",""],["class","chat-content-wrap"]],null,null,null,null,null)),e["\u0275did"](3,16384,null,0,o.b,[e.ElementRef,i.a,o.a],{id:[0,"id"]},null),(l()(),e["\u0275eld"](4,0,null,null,1,"app-chat-contents",[],null,null,null,k,S)),e["\u0275did"](5,245760,null,0,x,[y],null,null),(l()(),e["\u0275eld"](6,0,null,null,3,"div",[["appSidebar","chat-sidebar"],["class","chat-sidebar-wrap"]],null,[["window","resize"]],function(l,n,t){var u=!0;return"window:resize"===n&&(u=!1!==e["\u0275nov"](l,7).onResize(t)&&u),u},null,null)),e["\u0275did"](7,81920,null,0,o.c,[e.ElementRef,i.a,o.a],{id:[0,"id"]},null),(l()(),e["\u0275eld"](8,0,null,null,1,"app-chat-left-sidebar",[],null,null,null,L,M)),e["\u0275did"](9,245760,null,0,E,[y],null,null)],function(l,n){l(n,1,0,""),l(n,3,0,""),l(n,5,0),l(n,7,0,"chat-sidebar"),l(n,9,0)},null)}function z(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-chat",[],null,null,null,B,j)),e["\u0275did"](1,114688,null,0,$,[],null,null)],function(l,n){l(n,1,0)},null)}var P=e["\u0275ccf"]("app-chat",$,z,{},{},[]),Y=t("mnDI"),G=t("aYsj"),K=t("ZYCi"),q=function(){return function(){}}();t.d(n,"ChatModuleNgFactory",function(){return J});var J=e["\u0275cmf"](u,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[a.a,P]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,c.NgLocalization,c.NgLocaleLocalization,[e.LOCALE_ID,[2,c["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,s["\u0275angular_packages_forms_forms_o"],s["\u0275angular_packages_forms_forms_o"],[]),e["\u0275mpd"](1073742336,c.CommonModule,c.CommonModule,[]),e["\u0275mpd"](1073742336,Y.a,Y.a,[]),e["\u0275mpd"](1073742336,G.a,G.a,[]),e["\u0275mpd"](1073742336,s["\u0275angular_packages_forms_forms_d"],s["\u0275angular_packages_forms_forms_d"],[]),e["\u0275mpd"](1073742336,s.FormsModule,s.FormsModule,[]),e["\u0275mpd"](1073742336,r.c,r.c,[]),e["\u0275mpd"](1073742336,K.u,K.u,[[2,K.z],[2,K.q]]),e["\u0275mpd"](1073742336,q,q,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](1024,K.k,function(){return[[{path:"",component:$}]]},[])])})}}]);