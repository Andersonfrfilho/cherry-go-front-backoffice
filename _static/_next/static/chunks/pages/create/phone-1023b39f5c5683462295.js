(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[556],{9059:function(e,t,n){"use strict";n.d(t,{I:function(){return k}});var r=n(5893),o=n(6265),s=n(8347),a=n(6729),i=n(6618),u=n(8488),l=n(9887),c=n(3955),p=n(8420),d=n(58),f=n(6185),h=n(4496);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=function(e,t){var n=e.name,o=e.label,m=e.isDisabled,v=void 0!==m&&m,k=e.error,O=void 0===k?null:k,b=e.button,w=e.buttonProps,C=(0,s.Z)(e,["name","label","isDisabled","error","button","buttonProps"]);return(0,r.jsxs)(a.NI,{isInvalid:!!O,children:[o&&(0,r.jsx)(i.l,{htmlFor:n,children:o}),(0,r.jsxs)(u.B,{children:[(0,r.jsx)(l.I,g({id:n,name:n,focusBorderColor:"pink.500",backgroundColor:"gray.900",variant:"filled",_hover:{backgroundColor:"gray.900"},isDisabled:v,size:"lg",ref:t},C)),b&&(0,r.jsx)(c.x,{height:"100%",paddingRight:"3",children:w.icon?(0,r.jsx)(p.h,{type:"button","aria-label":w.title,icon:(0,r.jsx)(d.J,{as:w.icon}),fontSize:"24",variant:"filled",onClick:w.onClick,backgroundColor:w.transition?"pink.500":"gray.500"}):(0,r.jsx)(f.z,{height:"80%",size:"sm",colorScheme:"pink",onClick:w.onClick,children:"buttonProps.title"})})]}),!!O&&(0,r.jsx)(h.J,{children:O.message})]})},k=(0,n(7294).forwardRef)(v)},5238:function(e,t,n){"use strict";n.d(t,{l:function(){return C}});var r=n(6159),o=n(6265),s=r.J.BAD_REQUEST,a={400:{"0001":{message:"Transa\xe7\xe3o Invalida!",status_code:s,code:"0001"},"0002":{message:"Informa\xe7\xf5es invalidas!",status_code:s,code:"0002"}}},i=r.J.UNAUTHORIZED,u={401:{1001:{message:"Senha incorreta",status_code:i,code:"1001"},1002:{message:"Token expirado!",status_code:i,code:"1002"},1003:{message:"Token n\xe3o encontrado!",status_code:i,code:"1003"},1004:{message:"Token invalido!",status_code:i,code:"1004"}}},l=r.J.FORBIDDEN,c={403:{3001:{message:"Token n\xe3o encontrado!",status_code:l,code:"3001"},3002:{message:"Usu\xe1rio n\xe3o \xe9 valido",status_code:l,code:"3002"},3003:{message:"Provedor n\xe3o ativado!",status_code:l,code:"3003"},3004:{message:"Insider n\xe3o ativado!",status_code:l,code:"3004"},3005:{message:"Administrador n\xe3o \xe9 ativado!",status_code:l,code:"3005"},3006:{message:"Celular ja pertence a outro usu\xe1rio",status_code:l,code:"3006"}}},p={405:{5001:{message:"N\xe3o Permitido",status_code:r.J.METHOD_NOT_ALLOWED,code:"5001"}}},d={422:{22001:{message:"C\xf3digo incorreto",status_code:r.J.UNPROCESSABLE_ENTITY,code:"22001"}}},f=r.J.CONFLICT,h={409:{9001:{message:"Usu\xe1rio ja existente!",status_code:f,code:"9001"},9003:{message:"Tag ja existente!",status_code:f,code:"9003"}}},m=r.J.NOT_FOUND,g={404:{4001:{message:"Usu\xe1rio n\xe3o existe!",status_code:m,code:"4001"},4002:{message:"Provider n\xe3o existe!",status_code:m,code:"4002"},4003:{message:"O servi\xe7o do provedor n\xe3o existe!",status_code:m,code:"4003"},4004:{message:"Refresh token n\xe3o existe!",status_code:m,code:"4004"},4005:{message:"Token n\xe3o encontrado!",status_code:m,code:"4005"}}},v={429:{29001:{message:"Requests excessivo",status_code:r.J.TOO_MANY_REQUESTS,code:"29001"}}},k={500:{50001:{message:"Erro n\xe3o conhecido reporte para o suporte",status_code:r.J.INTERNAL_SERVER_ERROR,code:"50001"}}};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=b(b(b(b(b(b(b(b(b({},a),u),c),p),d),h),g),v),k);function C(e){var t=e.code,n=e.status_code,o=e.message;return n&&t?"celebrate request validation failed"===(void 0===o?"":o)?new r.g(w[400]["0002"]):w[n][t]?new r.g(w[n][t]):new r.g(w[500][50001]):new r.g(w[500][50001])}},7880:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return R}});var r=n(5893),o=n(6265),s=n(809),a=n.n(s),i=n(4121),u=n(2447),l=n(1163),c=n(8017),p=n(4096),d=n(336),f=n(4003),h=n(6034),m=n(4115),g=n(7086),v=n(6185),k=n(6627),O=n.n(k),b=n(5063),w=n(2283),C=n(9501),S=n(8834),y=n(7294),j=n(9059),x=n(6061),D=n(5238),P=n(5986);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var _=C.Ry().shape({phone:C.Z_().required("Celular obrigat\xf3ria")}),M=C.Ry().shape({code:C.Z_().length(4,"C\xf3digo invalido").required("C\xf3digo obrigat\xf3ria")});function R(){var e=(0,P.M0)(),t=e.appError,n=e.setAppError,o=e.isLoading,s=e.setIsLoading,k=(0,x.D1)(),C=k.createPhoneUserInsides,E=k.phoneConfirmation,R=k.confirmPhoneUserInsides,T=k.user,V=(0,w.cI)({resolver:(0,S.X)(_)}),N=V.register,L=V.handleSubmit,A=V.formState,F=(0,w.cI)({resolver:(0,S.X)(M)}),B=F.register,U=F.handleSubmit,Z=F.formState;function z(){return(z=(0,u.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),e.next=3,l.default.replace("/");case 3:s(!1);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(0,y.useEffect)((function(){T||function(){z.apply(this,arguments)}()}),[]);var J=function(){var e=(0,u.Z)(a().mark((function e(t){var r,o,u,l,c,p,d,f;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),r=t.phone,n({}),o=r.split(" "),u=(0,i.Z)(o,4),l=u[0],c=u[1],p=u[2],d=u[3],e.prev=4,f={country_code:l,ddd:c,number:"".concat(p).concat(d)},e.next=8,C(f);case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(4),n((0,D.l)(e.t0));case 13:return e.prev=13,s(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[4,10,13,16]])})));return function(t){return e.apply(this,arguments)}}(),X=function(){var e=(0,u.Z)(a().mark((function e(t,r){var o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),r.preventDefault(),o=t.code,n({}),e.prev=4,e.next=7,R(o);case 7:return e.next=9,l.default.push("/");case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),n((0,D.l)(e.t0));case 14:return e.prev=14,s(!1),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[4,11,14,17]])})));return function(t,n){return e.apply(this,arguments)}}(),q=A.errors,Y=Z.errors;return(0,r.jsx)(c.xu,{children:(0,r.jsx)(p.k,{width:"100%",marginY:"6",maxWidth:1480,marginX:"auto",paddingX:"6",children:(0,r.jsxs)(c.xu,{flex:"1",as:"form",borderRadius:8,backgroundColor:"gray.800",padding:["6","8"],onSubmit:E?U(X):L(J),children:[(0,r.jsx)(d.X,{size:"lg",fontWeight:"normal",children:E?"Confirmar celular":"Vincular celular"}),(0,r.jsx)(f.i,{marginY:"6",borderColor:"gray.700"}),(0,r.jsxs)(h.gC,{spacing:"8",children:[!!t&&(0,r.jsx)(m.x,{color:"red",children:t.message}),(0,r.jsxs)(g.M,{minChildWidth:"240px",spacing:["6","8"],width:"100%",children:[(0,r.jsx)(j.I,I(I({as:O(),mask:"+55 (**) * ****-****",name:"phone",type:"phone",label:"Celular"},N("phone")),{},{error:q.phone,isDisabled:E})),E&&(0,r.jsx)(j.I,I(I({name:"code",type:"code",label:"C\xf3digo:"},B("code")),{},{error:Y.code,max:4,isDisabled:!E}))]})]}),(0,r.jsx)(p.k,{marginTop:"8",justify:"flex-end",children:(0,r.jsxs)(h.Ug,{spacing:"4",children:[(0,r.jsx)(b.default,{href:"/",passHref:!0,children:(0,r.jsx)(v.z,{as:"a",colorScheme:"whiteAlpha",isLoading:A.isSubmitting||o,children:"Cancelar"})}),(0,r.jsx)(v.z,{type:"submit",isLoading:A.isSubmitting||o,colorScheme:"pink",children:"Avan\xe7ar"})]})})]})})})}},4920:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/create/phone",function(){return n(7880)}])},6627:function(e,t,n){e.exports=n(3462)},3462:function(e,t,n){"use strict";var r,o=(r=n(7294))&&"object"==typeof r&&"default"in r?r.default:r,s=n(3935);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function i(e,t){e.prototype=Object.create(t.prototype),function(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],s=Object.getOwnPropertyDescriptor(t,o);s&&s.configurable&&void 0===e[o]&&Object.defineProperty(e,o,s)}}(e.prototype.constructor=e,t)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var l=function(e,t,n,r,o,s,a,i){if(!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,r,o,s,a,i],c=0;(u=new Error(t.replace(/%s/g,(function(){return l[c++]})))).name="Invariant Violation"}throw u.framesToPop=1,u}};function c(e,t,n){if("selectionStart"in e&&"selectionEnd"in e)e.selectionStart=t,e.selectionEnd=n;else{var r=e.createTextRange();r.collapse(!0),r.moveStart("character",t),r.moveEnd("character",n-t),r.select()}}var p={9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"};function d(e,t,n){var r="",o="",s=null,a=[];if(void 0===t&&(t="_"),null==n&&(n=p),!e||"string"!=typeof e)return{maskChar:t,formatChars:n,mask:null,prefix:null,lastEditablePosition:null,permanents:[]};var i=!1;return e.split("").forEach((function(e){i=!i&&"\\"===e||(i||!n[e]?(a.push(r.length),r.length===a.length-1&&(o+=e)):s=r.length+1,r+=e,!1)})),{maskChar:t,formatChars:n,prefix:o,mask:r,lastEditablePosition:s,permanents:a}}function f(e,t){return-1!==e.permanents.indexOf(t)}function h(e,t,n){var r=e.mask,o=e.formatChars;if(!n)return!1;if(f(e,t))return r[t]===n;var s=o[r[t]];return new RegExp(s).test(n)}function m(e,t){return t.split("").every((function(t,n){return f(e,n)||!h(e,n,t)}))}function g(e,t){var n=e.maskChar,r=e.prefix;if(!n){for(;t.length>r.length&&f(e,t.length-1);)t=t.slice(0,t.length-1);return t.length}for(var o=r.length,s=t.length;s>=r.length;s--){var a=t[s];if(!f(e,s)&&h(e,s,a)){o=s+1;break}}return o}function v(e,t){return g(e,t)===e.mask.length}function k(e,t){var n=e.maskChar,r=e.mask,o=e.prefix;if(!n){for((t=O(e,"",t,0)).length<o.length&&(t=o);t.length<r.length&&f(e,t.length);)t+=r[t.length];return t}if(t)return O(e,k(e,""),t,0);for(var s=0;s<r.length;s++)f(e,s)?t+=r[s]:t+=n;return t}function O(e,t,n,r){var o=e.mask,s=e.maskChar,a=e.prefix,i=n.split(""),u=v(e,t);return!s&&r>t.length&&(t+=o.slice(t.length,r)),i.every((function(n){for(;c=n,f(e,l=r)&&c!==o[l];){if(r>=t.length&&(t+=o[r]),i=n,s&&f(e,r)&&i===s)return!0;if(++r>=o.length)return!1}var i,l,c;return!h(e,r,n)&&n!==s||(r<t.length?t=s||u||r<a.length?t.slice(0,r)+n+t.slice(r+1):(t=t.slice(0,r)+n+t.slice(r),k(e,t)):s||(t+=n),++r<o.length)})),t}function b(e,t){for(var n=e.mask,r=t;r<n.length;++r)if(!f(e,r))return r;return null}function w(e){return e||0===e?e+"":""}function C(e,t,n,r,o){var s=e.mask,a=e.prefix,i=e.lastEditablePosition,u=t,l="",c=0,p=0,d=Math.min(o.start,n.start);return n.end>o.start?p=(c=function(e,t,n,r){var o=e.mask,s=e.maskChar,a=n.split(""),i=r;return a.every((function(t){for(;a=t,f(e,n=r)&&a!==o[n];)if(++r>=o.length)return!1;var n,a;return(h(e,r,t)||t===s)&&r++,r<o.length})),r-i}(e,0,l=u.slice(o.start,n.end),d))?o.length:0:u.length<r.length&&(p=r.length-u.length),u=r,p&&(1!==p||o.length||(d=o.start===n.start?b(e,n.start):function(e,t){for(var n=t;0<=n;--n)if(!f(e,n))return n;return null}(e,n.start)),u=function(e,t,n,r){var o=n+r,s=e.maskChar,a=e.mask,i=e.prefix,u=t.split("");if(s)return u.map((function(t,r){return r<n||o<=r?t:f(e,r)?a[r]:s})).join("");for(var l=o;l<u.length;l++)f(e,l)&&(u[l]="");return n=Math.max(i.length,n),u.splice(n,o-n),t=u.join(""),k(e,t)}(e,u,d,p)),u=O(e,u,l,d),(d+=c)>=s.length?d=s.length:d<a.length&&!c?d=a.length:d>=a.length&&d<i&&c&&(d=b(e,d)),l||(l=null),{value:u=k(e,u),enteredString:l,selection:{start:d,end:d}}}function S(e){return"function"==typeof e}function y(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame}function j(e){return(y()?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame:function(){return setTimeout(e,1e3/60)})(e)}function x(e){(y()||clearTimeout)(e)}var D=function(e){function t(t){var n=e.call(this,t)||this;n.focused=!1,n.mounted=!1,n.previousSelection=null,n.selectionDeferId=null,n.saveSelectionLoopDeferId=null,n.saveSelectionLoop=function(){n.previousSelection=n.getSelection(),n.saveSelectionLoopDeferId=j(n.saveSelectionLoop)},n.runSaveSelectionLoop=function(){null===n.saveSelectionLoopDeferId&&n.saveSelectionLoop()},n.stopSaveSelectionLoop=function(){null!==n.saveSelectionLoopDeferId&&(x(n.saveSelectionLoopDeferId),n.saveSelectionLoopDeferId=null,n.previousSelection=null)},n.getInputDOMNode=function(){if(!n.mounted)return null;var e=s.findDOMNode(u(u(n))),t="undefined"!=typeof window&&e instanceof window.Element;if(e&&!t)return null;if("INPUT"!==e.nodeName&&(e=e.querySelector("input")),!e)throw new Error("react-input-mask: inputComponent doesn't contain input node");return e},n.getInputValue=function(){var e=n.getInputDOMNode();return e?e.value:null},n.setInputValue=function(e){var t=n.getInputDOMNode();t&&(n.value=e,t.value=e)},n.setCursorToEnd=function(){var e=g(n.maskOptions,n.value),t=b(n.maskOptions,e);null!==t&&n.setCursorPosition(t)},n.setSelection=function(e,t,r){void 0===r&&(r={});var o=n.getInputDOMNode(),s=n.isFocused();o&&s&&(r.deferred||c(o,e,t),null!==n.selectionDeferId&&x(n.selectionDeferId),n.selectionDeferId=j((function(){n.selectionDeferId=null,c(o,e,t)})),n.previousSelection={start:e,end:t,length:Math.abs(t-e)})},n.getSelection=function(){return function(e){var t=0,n=0;if("selectionStart"in e&&"selectionEnd"in e)t=e.selectionStart,n=e.selectionEnd;else{var r=document.selection.createRange();r.parentElement()===e&&(t=-r.moveStart("character",-e.value.length),n=-r.moveEnd("character",-e.value.length))}return{start:t,end:n,length:n-t}}(n.getInputDOMNode())},n.getCursorPosition=function(){return n.getSelection().start},n.setCursorPosition=function(e){n.setSelection(e,e)},n.isFocused=function(){return n.focused},n.getBeforeMaskedValueChangeConfig=function(){var e=n.maskOptions,t=e.mask,r=e.maskChar,o=e.permanents,s=e.formatChars;return{mask:t,maskChar:r,permanents:o,alwaysShowMask:!!n.props.alwaysShowMask,formatChars:s}},n.isInputAutofilled=function(e,t,r,o){var s=n.getInputDOMNode();try{if(s.matches(":-webkit-autofill"))return!0}catch(l){}return!n.focused||o.end<r.length&&t.end===e.length},n.onChange=function(e){var t=u(u(n)).beforePasteState,r=u(u(n)).previousSelection,o=n.props.beforeMaskedValueChange,s=n.getInputValue(),a=n.value,i=n.getSelection();n.isInputAutofilled(s,i,a,r)&&(a=k(n.maskOptions,""),r={start:0,end:0,length:0}),t&&(r=t.selection,a=t.value,i={start:r.start+s.length,end:r.start+s.length,length:0},s=a.slice(0,r.start)+s+a.slice(r.end),n.beforePasteState=null);var l=C(n.maskOptions,s,i,a,r),c=l.enteredString,p=l.selection,d=l.value;if(S(o)){var f=o({value:d,selection:p},{value:a,selection:r},c,n.getBeforeMaskedValueChangeConfig());d=f.value,p=f.selection}n.setInputValue(d),S(n.props.onChange)&&n.props.onChange(e),n.isWindowsPhoneBrowser?n.setSelection(p.start,p.end,{deferred:!0}):n.setSelection(p.start,p.end)},n.onFocus=function(e){var t=n.props.beforeMaskedValueChange,r=n.maskOptions,o=r.mask,s=r.prefix;if(n.focused=!0,n.mounted=!0,o){if(n.value)g(n.maskOptions,n.value)<n.maskOptions.mask.length&&n.setCursorToEnd();else{var a=k(n.maskOptions,s),i=k(n.maskOptions,a),u=g(n.maskOptions,i),l=b(n.maskOptions,u),c={start:l,end:l};if(S(t)){var p=t({value:i,selection:c},{value:n.value,selection:null},null,n.getBeforeMaskedValueChangeConfig());i=p.value,c=p.selection}var d=i!==n.getInputValue();d&&n.setInputValue(i),d&&S(n.props.onChange)&&n.props.onChange(e),n.setSelection(c.start,c.end)}n.runSaveSelectionLoop()}S(n.props.onFocus)&&n.props.onFocus(e)},n.onBlur=function(e){var t=n.props.beforeMaskedValueChange,r=n.maskOptions.mask;if(n.stopSaveSelectionLoop(),n.focused=!1,r&&!n.props.alwaysShowMask&&m(n.maskOptions,n.value)){var o="";S(t)&&(o=t({value:o,selection:null},{value:n.value,selection:n.previousSelection},null,n.getBeforeMaskedValueChangeConfig()).value);var s=o!==n.getInputValue();s&&n.setInputValue(o),s&&S(n.props.onChange)&&n.props.onChange(e)}S(n.props.onBlur)&&n.props.onBlur(e)},n.onMouseDown=function(e){if(!n.focused&&document.addEventListener){n.mouseDownX=e.clientX,n.mouseDownY=e.clientY,n.mouseDownTime=(new Date).getTime();document.addEventListener("mouseup",(function e(t){if(document.removeEventListener("mouseup",e),n.focused){var r=Math.abs(t.clientX-n.mouseDownX),o=Math.abs(t.clientY-n.mouseDownY),s=Math.max(r,o),a=(new Date).getTime()-n.mouseDownTime;(s<=10&&a<=200||s<=5&&a<=300)&&n.setCursorToEnd()}}))}S(n.props.onMouseDown)&&n.props.onMouseDown(e)},n.onPaste=function(e){S(n.props.onPaste)&&n.props.onPaste(e),e.defaultPrevented||(n.beforePasteState={value:n.getInputValue(),selection:n.getSelection()},n.setInputValue(""))},n.handleRef=function(e){null==n.props.children&&S(n.props.inputRef)&&n.props.inputRef(e)};var r=t.mask,o=t.maskChar,a=t.formatChars,i=t.alwaysShowMask,l=t.beforeMaskedValueChange,p=t.defaultValue,f=t.value;n.maskOptions=d(r,o,a),null==p&&(p=""),null==f&&(f=p);var h=w(f);if(n.maskOptions.mask&&(i||h)&&(h=k(n.maskOptions,h),S(l))){var v=t.value;null==t.value&&(v=p),h=l({value:h,selection:null},{value:v=w(v),selection:null},null,n.getBeforeMaskedValueChangeConfig()).value}return n.value=h,n}i(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.getInputDOMNode()&&(this.isWindowsPhoneBrowser=function(){var e=new RegExp("windows","i"),t=new RegExp("phone","i"),n=navigator.userAgent;return e.test(n)&&t.test(n)}(),this.maskOptions.mask&&this.getInputValue()!==this.value&&this.setInputValue(this.value))},n.componentDidUpdate=function(){var e=this.previousSelection,t=this.props,n=t.beforeMaskedValueChange,r=t.alwaysShowMask,o=t.mask,s=t.maskChar,a=t.formatChars,i=this.maskOptions,u=r||this.isFocused(),l=null!=this.props.value,c=l?w(this.props.value):this.value,p=e?e.start:null;if(this.maskOptions=d(o,s,a),this.maskOptions.mask){!i.mask&&this.isFocused()&&this.runSaveSelectionLoop();var f=this.maskOptions.mask&&this.maskOptions.mask!==i.mask;if(i.mask||l||(c=this.getInputValue()),(f||this.maskOptions.mask&&(c||u))&&(c=k(this.maskOptions,c)),f){var h=g(this.maskOptions,c);(null===p||h<p)&&(p=v(this.maskOptions,c)?h:b(this.maskOptions,h))}!this.maskOptions.mask||!m(this.maskOptions,c)||u||l&&this.props.value||(c="");var O={start:p,end:p};if(S(n)){var C=n({value:c,selection:O},{value:this.value,selection:this.previousSelection},null,this.getBeforeMaskedValueChangeConfig());c=C.value,O=C.selection}this.value=c;var y=this.getInputValue()!==this.value;y?(this.setInputValue(this.value),this.forceUpdate()):f&&this.forceUpdate();var j=!1;null!=O.start&&null!=O.end&&(j=!e||e.start!==O.start||e.end!==O.end),(j||y)&&this.setSelection(O.start,O.end)}else i.mask&&(this.stopSaveSelectionLoop(),this.forceUpdate())},n.componentWillUnmount=function(){this.mounted=!1,null!==this.selectionDeferId&&x(this.selectionDeferId),this.stopSaveSelectionLoop()},n.render=function(){var e,t=this.props,n=(t.mask,t.alwaysShowMask,t.maskChar,t.formatChars,t.inputRef,t.beforeMaskedValueChange,t.children),r=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],0<=t.indexOf(n)||(o[n]=e[n]);return o}(t,["mask","alwaysShowMask","maskChar","formatChars","inputRef","beforeMaskedValueChange","children"]);if(n){S(n)||l(!1);var s=["onChange","onPaste","onMouseDown","onFocus","onBlur","value","disabled","readOnly"],i=a({},r);s.forEach((function(e){return delete i[e]})),e=n(i),s.filter((function(t){return null!=e.props[t]&&e.props[t]!==r[t]})).length&&l(!1)}else e=o.createElement("input",a({ref:this.handleRef},r));var u={onFocus:this.onFocus,onBlur:this.onBlur};return this.maskOptions.mask&&(r.disabled||r.readOnly||(u.onChange=this.onChange,u.onPaste=this.onPaste,u.onMouseDown=this.onMouseDown),null!=r.value&&(u.value=this.value)),e=o.cloneElement(e,u)},t}(o.Component);e.exports=D}},function(e){e.O(0,[43,329,657,774,888,179],(function(){return t=4920,e(e.s=t);var t}));var t=e.O();_N_E=t}]);