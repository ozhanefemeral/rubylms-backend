(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f7a392a8"],{c91d:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v(" Task Details - "),t.task?n("span",[t._v(" "+t._s(t.task.name)+" - "+t._s(t.average))]):t._e()]),t.task.document?n("span",[n("hr"),n("div",{staticClass:"my-2"},[t._v(" Uploaded document : "),n("a",{attrs:{href:t.document,target:"_blank"}},[t._v(" "+t._s(t.task.document)+" ")])]),n("hr")]):t._e(),void 0!=t.task?n("v-row",t._l(t.task.responsibles,(function(e,s){return n("v-col",{key:s,attrs:{cols:"12",md:"6",lg:"3"}},[n("v-card",{attrs:{raised:"",outlined:"",tile:""}},[n("v-card-title",[t._v(" "+t._s(e.name)+" "),n("v-btn",{attrs:{color:"primary",icon:""},on:{click:function(n){return t.goToStudentProfile(e)}}},[n("v-icon",[t._v("mdi-account-search")])],1)],1),n("v-card-text",t._l(t.task.solutions.filter((function(t){return e._id===t.student})),(function(e,s){return n("v-card",{key:s,attrs:{outlined:""}},[n("v-card-text",[n("v-icon",{attrs:{color:"accent"}},[t._v("mdi-star")]),t._v(" Mark: "+t._s(e.mark)+" "),n("br"),n("br"),n("v-icon",{attrs:{color:"accent"}},[t._v("mdi-calendar-clock")]),t._v(" Solved At: "+t._s(e.solvedAt.substr(0,10))+" - "+t._s(e.solvedAt.substr(12,7))+" ")],1),n("v-card-actions",[n("v-btn",{attrs:{tile:"",color:"primary"},on:{click:function(n){return t.viewSolution(e)}}},[n("v-icon",[t._v("mdi-magnify")]),t._v(" View ")],1)],1)],1)})),1)],1)],1)})),1):t._e(),t.selectedSolution?n("SolutionDetails",{attrs:{solution:t.selectedSolution,student:t.selectedStudent,task:t.task},model:{value:t.showSolution,callback:function(e){t.showSolution=e},expression:"showSolution"}}):t._e()],1)},a=[],r=(n("4160"),n("159b"),n("d8e7")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{"max-width":"700"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("v-card",[n("v-card-title",[n("v-row",[n("v-icon",[t._v("mdi-account")]),t._v(t._s(t.student.name)+" ")],1),n("br"),n("v-row",[n("v-icon",[t._v("mdi-star")]),t._v(t._s(t.solution.mark)+" ")],1),n("br"),n("v-row",[n("v-icon",[t._v("mdi-calendar-clock")]),t._v(" "+t._s(t.solution.solvedAt.substr(0,10))+" - "+t._s(t.solution.solvedAt.substr(12,7))+" ")],1)],1),t._l(t.task.questions,(function(e,s){return n("v-card",{key:s,attrs:{outlined:""}},[n("v-card-text",{staticClass:"text-subtitle-1",class:t.compareAnswerText(e,s)},[n("v-row",[n("v-col",{attrs:{cols:"10"}},[n("span",{staticClass:"text-h4"},[t._v(" "+t._s(e.text)+" ")]),"Test"===e.answerType?n("span",[n("br"),n("details",{staticClass:"black--text"},[n("summary",[t._v("Choices ")]),n("ul",t._l(e.choices,(function(s,a){return n("li",{key:a},[t._v(" "+t._s(e.choices[a])+" "),n("br")])})),0)]),n("span",[t._v(" Student Answer: "+t._s(e.choices[t.solution.answers[s]])+" ")]),n("br"),n("span",{staticClass:"black--text"},[t._v(" Answer: "+t._s(e.choices[e.answer]))])]):n("span",[n("br"),n("span",[t._v(" Student Answer: "+t._s(t.solution.answers[s])+" ")]),n("br"),n("span",{staticClass:"black--text"},[t._v(" Answer: "+t._s(e.answer))])]),e.points?n("span",[n("br"),t._v(" Question Point: "+t._s(e.points)+" ")]):t._e()]),n("v-col",{attrs:{cols:"2",justify:"end",align:"end"}},[n("v-icon",{attrs:{size:"3rem"}},[t._v(t._s(t.compareAnswerIcon(e,s)))]),n("br")],1)],1)],1)],1)}))],2)],1)},i=[],c={props:["solution","student","value","task"],computed:{show:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},methods:{compareAnswerText:function(t,e){var n=t.answer==this.solution.answers[e];return{"black--text":void 0==t.answer,"success--text":n,"error--text":!n}},compareAnswerIcon:function(t,e){var n=t.answer==this.solution.answers[e];return n?"mdi-check-circle":"mdi-close-circle"}}},u=c,l=n("2877"),d=n("6544"),v=n.n(d),p=n("b0af"),h=n("99d9"),_=n("62ad"),f=n("169a"),m=n("132d"),k=n("0fd9"),w=Object(l["a"])(u,o,i,!1,null,null,null),b=w.exports;v()(w,{VCard:p["a"],VCardText:h["b"],VCardTitle:h["c"],VCol:_["a"],VDialog:f["a"],VIcon:m["a"],VRow:k["a"]});var g={components:{SolutionDetails:b},data:function(){return{taskId:"",task:void 0,showSolution:!1,selectedSolution:void 0,selectedStudent:void 0}},created:function(){var t=this;this.taskId=this.$route.params.taskId;var e=[{path:"solutions",model:"Solution"},{path:"responsibles",model:"Student",select:["name","_id"]}];r["a"].GetTask(this.taskId,e).then((function(e){t.task=e,console.log(e)}))},methods:{viewSolution:function(t){this.showSolution=!0,this.selectedSolution=t;for(var e=0;e<this.task.responsibles.length;e++){var n=this.task.responsibles[e];if(n._id===this.selectedSolution.student){this.selectedStudent=n;break}}},goToStudentProfile:function(t){this.$router.push({name:"StudentProfile",params:{studentId:t._id}})}},computed:{average:function(){var t=0,e=this.task.solutions.length;return this.task.solutions.forEach((function(e){t+=e.mark})),t/e},document:function(){return"/api/files/"+this.task.document}}},x=g,S=n("8336"),y=Object(l["a"])(x,s,a,!1,null,null,null);e["default"]=y.exports;v()(y,{VBtn:S["a"],VCard:p["a"],VCardActions:h["a"],VCardText:h["b"],VCardTitle:h["c"],VCol:_["a"],VIcon:m["a"],VRow:k["a"]})},d8e7:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));n("99af"),n("96cf");var s=n("1da1"),a=n("d4ec"),r=n("bee2"),o=n("bc3a"),i=n.n(o),c=n("4328"),u=n.n(c),l=n("ace7"),d=function(){function t(){Object(a["a"])(this,t)}return Object(r["a"])(t,null,[{key:"CreateTask",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i.a.post("".concat(l["a"].tasksUrl),{task:e});case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"GetTask",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var n,s,a=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:void 0,n=u.a.stringify(n),t.next=4,i.a.get("".concat(l["a"].tasksUrl,"/").concat(e),{params:n});case 4:return s=t.sent,t.abrupt("return",s.data);case 6:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"FindSolutions",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var n,s,a,r=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=r.length>1&&void 0!==r[1]?r[1]:void 0,s=r.length>2&&void 0!==r[2]?r[2]:void 0,s=u.a.stringify(s),t.next=5,i.a.get("".concat(l["a"].studentsUrl,"/").concat(e,"/solutions"),{params:{select:n,populate:s}});case 5:return a=t.sent,t.abrupt("return",a.data);case 7:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()}]),t}()}}]);
//# sourceMappingURL=chunk-f7a392a8.a340a616.js.map