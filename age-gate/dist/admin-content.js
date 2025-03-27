/*! For license information please see admin-content.js.LICENSE.txt */
(()=>{function t(r){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(r)}function r(){"use strict";r=function(){return n};var e,n={},o=Object.prototype,a=o.hasOwnProperty,i=Object.defineProperty||function(t,r,e){t[r]=e.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",l=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function f(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{f({},"")}catch(e){f=function(t,r,e){return t[r]=e}}function h(t,r,e,n){var o=r&&r.prototype instanceof w?r:w,a=Object.create(o.prototype),c=new T(n||[]);return i(a,"_invoke",{value:k(t,e,c)}),a}function p(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}n.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",m="completed",g={};function w(){}function b(){}function x(){}var L={};f(L,u,(function(){return this}));var E=Object.getPrototypeOf,_=E&&E(E(G([])));_&&_!==o&&a.call(_,u)&&(L=_);var S=x.prototype=w.prototype=Object.create(L);function j(t){["next","throw","return"].forEach((function(r){f(t,r,(function(t){return this._invoke(r,t)}))}))}function O(r,e){function n(o,i,c,u){var l=p(r[o],r,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==t(f)&&a.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):e.resolve(f).then((function(t){s.value=t,c(s)}),(function(t){return n("throw",t,c,u)}))}u(l.arg)}var o;i(this,"_invoke",{value:function(t,r){function a(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(a,a):a()}})}function k(t,r,n){var o=y;return function(a,i){if(o===d)throw Error("Generator is already running");if(o===m){if("throw"===a)throw i;return{value:e,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=N(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var l=p(t,r,n);if("normal"===l.type){if(o=n.done?m:v,l.arg===g)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=m,n.method="throw",n.arg=l.arg)}}}function N(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,N(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=p(o,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function A(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function P(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function G(r){if(r||""===r){var n=r[u];if(n)return n.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,i=function t(){for(;++o<r.length;)if(a.call(r,o))return t.value=r[o],t.done=!1,t;return t.value=e,t.done=!0,t};return i.next=i}}throw new TypeError(t(r)+" is not iterable")}return b.prototype=x,i(S,"constructor",{value:x,configurable:!0}),i(x,"constructor",{value:b,configurable:!0}),b.displayName=f(x,s,"GeneratorFunction"),n.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===b||"GeneratorFunction"===(r.displayName||r.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,f(t,s,"GeneratorFunction")),t.prototype=Object.create(S),t},n.awrap=function(t){return{__await:t}},j(O.prototype),f(O.prototype,l,(function(){return this})),n.AsyncIterator=O,n.async=function(t,r,e,o,a){void 0===a&&(a=Promise);var i=new O(h(t,r,e,o),a);return n.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},j(S),f(S,s,"Generator"),f(S,u,(function(){return this})),f(S,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=G,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var r in this)"t"===r.charAt(0)&&a.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=a.call(i,"catchLoc"),l=a.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=r,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),g},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),P(e),g}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;P(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:G(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},n}function e(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var e=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(e=e.call(t)).next,0===r){if(Object(e)!==e)return;u=!1}else for(;!(u=(n=a.call(e)).done)&&(c.push(n.value),c.length!==r);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=e.return&&(i=e.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(t,r)||function(t,r){if(t){if("string"==typeof t)return n(t,r);var e={}.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,r):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=Array(r);e<r;e++)n[e]=t[e];return n}function o(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function a(t){return function(){var r=this,e=arguments;return new Promise((function(n,a){var i=t.apply(r,e);function c(t){o(i,n,a,c,u,"next",t)}function u(t){o(i,n,a,c,u,"throw",t)}c(void 0)}))}}var i=function(){var t=a(r().mark((function t(n){var o,a,c,u,l,s,f,h,p,y,v,d=arguments;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=d.length>1&&void 0!==d[1]?d[1]:null,a=d.length>2&&void 0!==d[2]?d[2]:0,n.length){t.next=4;break}return t.abrupt("return",!0);case 4:for(o||(o=ag_content_params.nonce),c=window,u=c.ajaxurl,(l=new FormData).append("action","age_gate_store_terms"),l.append("idx",a),l.append("nonce",o),s=0,f=Object.entries(n[0]);s<f.length;s++)h=e(f[s],2),p=h[0],y=h[1],l.append("ag_settings[".concat(p,"]"),y);return t.prev=12,t.next=15,fetch(u,{method:"POST",body:l});case 15:return t.next=17,t.sent.json();case 17:t.sent,t.next=23;break;case 20:return t.prev=20,t.t0=t.catch(12),t.abrupt("return",!1);case 23:return n.shift(),(v=document.querySelector(".age-gate-progress"))&&(v.value=a+1),t.abrupt("return",i(n,o,a+1));case 27:case"end":return t.stop()}}),t,null,[[12,20]])})));return function(r){return t.apply(this,arguments)}}();window.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector('[data-form="content"]');t&&t.addEventListener("submit",function(){var e=a(r().mark((function e(n){var o,a,c,u,l,s,f,h;return r().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),o=Array.from(document.querySelectorAll('[name="ag_settings[terms][]"]')),a=[],c=[],o.forEach((function(t){var r=JSON.parse(t.value);c.push(t.value);var e=Object.values(r),n={},o=[],i=0;for(var u in r)0!==i&&i%50==0&&(o.push(n),n={}),n[u]=e[i],i++;o.push(n),t.value="",a=a.concat(o)})),u=document.createElement("progress"),(l=document.createElement("div")).className="age-gate-overlay",u.className="age-gate-progress",l.append(u),document.body.appendChild(l),u.max=a.length,u.value=0,r.next=15,i(a);case 15:if(!1!==r.sent){r.next=24;break}return c.forEach((function(t,r){return o[r].value=t})),(s=document.querySelector(".age-gate-overlay"))&&s.parentNode.removeChild(s),f=ag_content_params,h=f.save_error,document.querySelector(".wrap h2").insertAdjacentHTML("afterend",'<div class="notice notice-error"><p><strong>'.concat(h,"</strong></p></div>")),window.scrollTo({top:0,left:0,behavior:"smooth"}),r.abrupt("return");case 24:t.submit();case 25:case"end":return r.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))})();