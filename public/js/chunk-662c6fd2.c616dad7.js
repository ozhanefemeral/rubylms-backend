(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-662c6fd2"],{"1a2f":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Courses")]),n("CustomTable",{attrs:{tableData:e.courses,headers:e.headers,loading:e.loading,viewItem:e.viewItem}})],1)},a=[],u=(n("4160"),n("d81d"),n("b0c0"),n("159b"),n("c4af")),c=n("25bf"),s={components:{CustomTable:c["a"]},data:function(){return{loading:!0,courses:[],headers:[{text:"Name",align:"start",value:"name"},{text:"Teacher",align:"start",value:"teachers"}]}},created:function(){var e=this;u["a"].GetAllCourses().then((function(t){t.forEach((function(e){e.teachers=e.teachers.map((function(e){return e.name+" "}))})),e.courses=t,e.loading=!1}))},methods:{viewItem:function(e){this.$router.push({name:"CourseProfile",params:{courseId:e._id}})}}},o=s,i=n("2877"),l=Object(i["a"])(o,r,a,!1,null,null,null);t["default"]=l.exports},c4af:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));n("99af"),n("96cf");var r=n("1da1"),a=n("d4ec"),u=n("bee2"),c=n("bc3a"),s=n.n(c),o=n("4360"),i=n("ace7"),l=function(){function e(){Object(a["a"])(this,e)}return Object(u["a"])(e,null,[{key:"GetAllCourses",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("".concat(i["a"].schoolsUrl,"/").concat(o["a"].state.school,"/courses"));case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"GetCourse",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r,a=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]&&a[1],e.next=3,s.a.get("".concat(i["a"].coursesUrl,"/").concat(t),{params:{populate:n}});case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}()}}]);
//# sourceMappingURL=chunk-662c6fd2.c616dad7.js.map