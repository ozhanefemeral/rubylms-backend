(function(e){function t(t){for(var a,o,u=t[0],i=t[1],s=t[2],l=0,d=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&d.push(c[o][0]),c[o]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);h&&h(t);while(d.length)d.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,o=1;o<n.length;o++){var u=n[o];0!==c[u]&&(a=!1)}a&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},o={app:0},c={app:0},r=[];function u(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{about:"ef4e8839","chunk-36b6d880":"bd2f3360","chunk-5dc93f7c":"8d8d74df","chunk-11157fd6":"27d00792","chunk-f7a392a8":"a340a616","chunk-1e6e56d4":"22b39c7c","chunk-9d83132e":"364b143b","chunk-1fe8d2b4":"4ada4d60","chunk-3cb2d234":"09753aec","chunk-3ef95d8c":"3c948f52","chunk-f884e4ac":"48594d20","chunk-c63c292c":"cc072dc9","chunk-560160ae":"abe0b9d2"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-11157fd6":1,"chunk-1e6e56d4":1,"chunk-9d83132e":1,"chunk-3ef95d8c":1,"chunk-f884e4ac":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"31d6cfe0","chunk-36b6d880":"31d6cfe0","chunk-5dc93f7c":"31d6cfe0","chunk-11157fd6":"601d8c98","chunk-f7a392a8":"31d6cfe0","chunk-1e6e56d4":"6e2cf97c","chunk-9d83132e":"3fc27d66","chunk-1fe8d2b4":"31d6cfe0","chunk-3cb2d234":"31d6cfe0","chunk-3ef95d8c":"2daf5c90","chunk-f884e4ac":"49830f27","chunk-c63c292c":"31d6cfe0","chunk-560160ae":"31d6cfe0"}[e]+".css",c=i.p+a,r=document.getElementsByTagName("link"),u=0;u<r.length;u++){var s=r[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===a||l===c))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===a||l===c)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var a=t&&t.target&&t.target.src||c,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete o[e],h.parentNode.removeChild(h),n(r)},h.href=c;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){o[e]=0})));var a=c[e];if(0!==a)if(a)t.push(a[2]);else{var r=new Promise((function(t,n){a=c[e]=[t,n]}));t.push(a[2]=r);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=c[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",d.name="ChunkLoadError",d.type=a,d.request=o,n[1](d)}c[e]=void 0}};var h=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var h=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"433f":function(e,t,n){e.exports=n.p+"img/diamond.8b4c8ae9.png"},4360:function(e,t,n){"use strict";var a=n("2b0e"),o=n("2f62"),c=n("bc3a"),r=n.n(c);a["a"].use(o["a"]),t["a"]=new o["a"].Store({state:{school:"",token:""},mutations:{setSchool:function(e,t){e.school=t},setToken:function(e,t){localStorage.token=t,e.token=t,r.a.defaults.headers["Authorization"]="Bearer ".concat(t)}},actions:{},modules:{}})},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-navigation-drawer",{attrs:{app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",{attrs:{dense:""}},[""==e.token?n("v-list-item",{attrs:{link:"",to:"/login"}},[n("v-list-item-action",[n("v-icon",[e._v(" mdi-login")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Login")])],1)],1):e._l(e.navLinks,(function(t,a){return n("v-list-item",{key:a,attrs:{link:"",to:t.to}},[n("v-list-item-action",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.title))])],1)],1)}))],2),n("div",{staticClass:"pa-2"},[n("v-switch",{attrs:{prependIcon:"mdi-theme-light-dark",color:"white",label:"Dark Mode"},model:{value:e.darkMode,callback:function(t){e.darkMode=t},expression:"darkMode"}})],1),n("div",{staticClass:"pa-2"},[""!=e.token?n("v-btn",{attrs:{block:"",color:"red",tile:"",dark:""},on:{click:e.logout}},[e._v(" Logout ")]):e._e()],1)],1),n("v-app-bar",{attrs:{app:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}})],1),n("v-main",[n("v-container",{staticClass:"fill-height",attrs:{fluid:"","align-start":""}},[n("v-row",{attrs:{align:"start",justify:"start"}},[n("v-col",{attrs:{cols:"12"}},[n("router-view")],1)],1)],1)],1)],1)},c=[],r={data:function(){return{drawer:null,navLinks:[{to:"/",icon:"mdi-home",title:"Home"},{to:"/teachers",icon:"mdi-account",title:"Teachers"},{to:"/students",icon:"mdi-school",title:"Students"},{to:"/courses",icon:"mdi-book",title:"Courses"},{to:"/test",icon:"mdi-cogs",title:"Test"}]}},methods:{logout:function(){this.$store.commit("setToken",""),this.$router.push("Login")}},computed:{darkMode:{get:function(){return this.$vuetify.theme.dark},set:function(e){return this.$vuetify.theme.dark=e,e}},token:function(){return this.$store.state.token}}},u=r,i=n("2877"),s=n("6544"),l=n.n(s),d=n("7496"),h=n("40dc"),f=n("5bc1"),p=n("8336"),m=n("62ad"),k=n("a523"),v=n("132d"),b=n("8860"),g=n("da13"),w=n("1800"),y=n("5d23"),_=n("f6c4"),P=n("f774"),V=n("0fd9"),x=n("b73d"),C=Object(i["a"])(u,o,c,!1,null,null,null),L=C.exports;l()(C,{VApp:d["a"],VAppBar:h["a"],VAppBarNavIcon:f["a"],VBtn:p["a"],VCol:m["a"],VContainer:k["a"],VIcon:v["a"],VList:b["a"],VListItem:g["a"],VListItemAction:w["a"],VListItemContent:y["a"],VListItemTitle:y["b"],VMain:_["a"],VNavigationDrawer:P["a"],VRow:V["a"],VSwitch:x["a"]});n("b0c0"),n("d3b7");var T=n("8c4f"),S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-row",[a("v-col",{attrs:{cols:"12",align:"center",justify:"center"}},[a("img",{attrs:{width:"128",src:n("433f")}}),a("h1",{staticClass:"text-center"},[e._v(" Ruby ")])])],1)},j=[],O={},A=O,E=Object(i["a"])(A,S,j,!1,null,null,null),I=E.exports;l()(E,{VCol:m["a"],VRow:V["a"]});var $=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Login")]),n("v-card",{attrs:{raised:""}},[n("v-card-text",[n("v-text-field",{attrs:{label:"Phone Number"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),n("v-text-field",{attrs:{label:"Password",type:"password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),n("v-card-actions",[n("v-btn",{attrs:{color:"primary"},on:{click:e.login}},[e._v("Login")])],1)],1)],1)},M=[],B=n("bc3a"),N=n.n(B),D={data:function(){return{phone:"05375602191",password:"efemeral1"}},methods:{login:function(){var e=this;N.a.post("/api/auth/login/teacher",{phone:this.phone,password:this.password}).then((function(e){return e.data})).then((function(t){e.$store.commit("setToken",t),e.$router.push("Home")}))}}},H=D,R=n("b0af"),q=n("99d9"),F=n("8654"),J=Object(i["a"])(H,$,M,!1,null,null,null),z=J.exports;l()(J,{VBtn:p["a"],VCard:R["a"],VCardActions:q["a"],VCardText:q["b"],VTextField:F["a"]});var K=n("4360");a["a"].use(T["a"]);var U=[{path:"/",name:"Home",component:I},{path:"/login",name:"Login",component:z},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/courses",name:"Courses",component:function(){return Promise.all([n.e("chunk-5dc93f7c"),n.e("chunk-1e6e56d4"),n.e("chunk-11157fd6"),n.e("chunk-9d83132e"),n.e("chunk-f884e4ac")]).then(n.bind(null,"1a2f"))}},{path:"/teachers",name:"Teachers",component:function(){return Promise.all([n.e("chunk-5dc93f7c"),n.e("chunk-1e6e56d4"),n.e("chunk-9d83132e"),n.e("chunk-560160ae")]).then(n.bind(null,"a37d"))}},{path:"/students",name:"Students",component:function(){return Promise.all([n.e("chunk-5dc93f7c"),n.e("chunk-1e6e56d4"),n.e("chunk-11157fd6"),n.e("chunk-9d83132e"),n.e("chunk-3cb2d234")]).then(n.bind(null,"4929"))}},{path:"/course/:courseId",name:"CourseProfile",component:function(){return Promise.all([n.e("chunk-5dc93f7c"),n.e("chunk-1e6e56d4"),n.e("chunk-11157fd6"),n.e("chunk-9d83132e"),n.e("chunk-3ef95d8c")]).then(n.bind(null,"f616"))}},{path:"/teacher/:teacherId",name:"TeacherProfile",component:function(){return n.e("chunk-36b6d880").then(n.bind(null,"1641"))}},{path:"/student/:studentId",name:"StudentProfile",component:function(){return Promise.all([n.e("chunk-5dc93f7c"),n.e("chunk-1e6e56d4"),n.e("chunk-11157fd6"),n.e("chunk-9d83132e"),n.e("chunk-1fe8d2b4")]).then(n.bind(null,"5310"))}},{path:"/task/:taskId",name:"TaskDetails",component:function(){return Promise.all([n.e("chunk-5dc93f7c"),n.e("chunk-11157fd6"),n.e("chunk-f7a392a8")]).then(n.bind(null,"c91d"))}},{path:"/test",name:"Test",component:function(){return Promise.all([n.e("chunk-5dc93f7c"),n.e("chunk-1e6e56d4"),n.e("chunk-11157fd6"),n.e("chunk-c63c292c")]).then(n.bind(null,"78c1"))}}],G=new T["a"]({mode:"hash",base:"/",routes:U});G.beforeEach((function(e,t,n){"Login"!==e.name&&""==K["a"].state.token?n({name:"Login"}):n()}));var Q=G,W=n("f309"),X=n("fcf4");a["a"].use(W["a"]);var Y=new W["a"]({theme:{themes:{light:{primary:X["a"].blue.accent3,accent:X["a"].deepPurple.accent2},dark:{primary:X["a"].blue.accent3,accent:X["a"].deepPurple.accent2}}}}),Z=n("1321"),ee=n.n(Z);a["a"].use(ee.a),a["a"].config.productionTip=!1,a["a"].component("apexchart",ee.a),N.a.get("/api/test/school").then((function(e){return e.data})).then((function(e){K["a"].commit("setSchool",e._id)}));var te=localStorage.getItem("token");te&&0!=te.length?(K["a"].commit("setToken",te),Q.push("Home")):Q.push("Login"),new a["a"]({router:Q,store:K["a"],vuetify:Y,render:function(e){return e(L)}}).$mount("#app")}});
//# sourceMappingURL=app.07ad110d.js.map