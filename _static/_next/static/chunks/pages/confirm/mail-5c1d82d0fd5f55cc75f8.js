(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[144],{123:function(e,r,t){"use strict";t.d(r,{E:function(){return f}});var n=t(63),o=t(3105),a=t(5505),i=t(3808),s=t(7294),c=t(8894);function l(){return(l=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function u(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}var d=s.forwardRef(((e,r)=>{var{htmlWidth:t,htmlHeight:n,alt:o}=e,a=u(e,["htmlWidth","htmlHeight","alt"]);return s.createElement("img",l({width:t,height:n,ref:r,alt:o},a))})),f=(0,n.G)(((e,r)=>{var{fallbackSrc:t,fallback:n,src:i,align:f,fit:g,loading:p,ignoreFallback:m,crossOrigin:b}=e,h=u(e,["fallbackSrc","fallback","src","align","fit","loading","ignoreFallback","crossOrigin"]),v=null!=p||m,O=(0,c.d)(l({},e,{ignoreFallback:v})),j=l({ref:r,objectFit:g,objectPosition:f},v?h:(0,a.CE)(h,["onError","onLoad"]));return"loaded"!==O?n||s.createElement(o.m$.img,l({as:d,className:"chakra-image__placeholder",src:t},j)):s.createElement(o.m$.img,l({as:d,src:i,crossOrigin:b,loading:p,className:"chakra-image"},j))}));i.Ts&&(f.displayName="Image")},8894:function(e,r,t){"use strict";t.d(r,{d:function(){return a}});var n=t(8327),o=t(7294);function a(e){var{src:r,srcSet:t,onLoad:a,onError:i,crossOrigin:s,sizes:c,ignoreFallback:l}=e,[u,d]=(0,o.useState)("pending");(0,o.useEffect)((()=>{d(r?"loading":"pending")}),[r]);var f=(0,o.useRef)(),g=(0,o.useCallback)((()=>{if(r){p();var e=new Image;e.src=r,s&&(e.crossOrigin=s),t&&(e.srcset=t),c&&(e.sizes=c),e.onload=e=>{p(),d("loaded"),null==a||a(e)},e.onerror=e=>{p(),d("failed"),null==i||i(e)},f.current=e}}),[r,s,t,c,a,i]),p=()=>{f.current&&(f.current.onload=null,f.current.onerror=null,f.current=null)};return(0,n.G)((()=>{if(!l)return"loading"===u&&g(),()=>{p()}}),[u,g,l]),l?"loaded":u}},8017:function(e,r,t){"use strict";t.d(r,{xu:function(){return l}});var n=t(3105),o=t(63),a=t(3808),i=t(7294);function s(){return(s=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function c(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}var l=(0,n.m$)("div");a.Ts&&(l.displayName="Box");var u=(0,o.G)(((e,r)=>{var{size:t,centerContent:n=!0}=e,o=c(e,["size","centerContent"]),a=n?{display:"flex",alignItems:"center",justifyContent:"center"}:{};return i.createElement(l,s({ref:r,boxSize:t,__css:s({},a,{flexShrink:0,flexGrow:0})},o))}));a.Ts&&(u.displayName="Square");var d=(0,o.G)(((e,r)=>{var{size:t}=e,n=c(e,["size"]);return i.createElement(u,s({size:t,ref:r,borderRadius:"9999px"},n))}));a.Ts&&(d.displayName="Circle")},9059:function(e,r,t){"use strict";t.d(r,{I:function(){return v}});var n=t(5893),o=t(6265),a=t(8347),i=t(6729),s=t(6618),c=t(8488),l=t(9887),u=t(3955),d=t(8420),f=t(58),g=t(6185),p=t(4496);function m(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function b(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?m(Object(t),!0).forEach((function(r){(0,o.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var h=function(e,r){var t=e.name,o=e.label,m=e.isDisabled,h=void 0!==m&&m,v=e.error,O=void 0===v?null:v,j=e.button,y=e.buttonProps,_=(0,a.Z)(e,["name","label","isDisabled","error","button","buttonProps"]);return(0,n.jsxs)(i.NI,{isInvalid:!!O,children:[o&&(0,n.jsx)(s.l,{htmlFor:t,children:o}),(0,n.jsxs)(c.B,{children:[(0,n.jsx)(l.I,b({id:t,name:t,focusBorderColor:"pink.500",backgroundColor:"gray.900",variant:"filled",_hover:{backgroundColor:"gray.900"},isDisabled:h,size:"lg",ref:r},_)),j&&(0,n.jsx)(u.x,{height:"100%",paddingRight:"3",children:y.icon?(0,n.jsx)(d.h,{type:"button","aria-label":y.title,icon:(0,n.jsx)(f.J,{as:y.icon}),fontSize:"24",variant:"filled",onClick:y.onClick,backgroundColor:y.transition?"pink.500":"gray.500"}):(0,n.jsx)(g.z,{height:"80%",size:"sm",colorScheme:"pink",onClick:y.onClick,children:"buttonProps.title"})})]}),!!O&&(0,n.jsx)(p.J,{children:O.message})]})},v=(0,t(7294).forwardRef)(h)},5238:function(e,r,t){"use strict";t.d(r,{l:function(){return _}});var n=t(6159),o=t(6265),a=n.J.BAD_REQUEST,i={400:{"0001":{message:"Transa\xe7\xe3o Invalida!",status_code:a,code:"0001"},"0002":{message:"Informa\xe7\xf5es invalidas!",status_code:a,code:"0002"}}},s=n.J.UNAUTHORIZED,c={401:{1001:{message:"Senha incorreta",status_code:s,code:"1001"},1002:{message:"Token expirado!",status_code:s,code:"1002"},1003:{message:"Token n\xe3o encontrado!",status_code:s,code:"1003"},1004:{message:"Token invalido!",status_code:s,code:"1004"}}},l=n.J.FORBIDDEN,u={403:{3001:{message:"Token n\xe3o encontrado!",status_code:l,code:"3001"},3002:{message:"Usu\xe1rio n\xe3o \xe9 valido",status_code:l,code:"3002"},3003:{message:"Provedor n\xe3o ativado!",status_code:l,code:"3003"},3004:{message:"Insider n\xe3o ativado!",status_code:l,code:"3004"},3005:{message:"Administrador n\xe3o \xe9 ativado!",status_code:l,code:"3005"},3006:{message:"Celular ja pertence a outro usu\xe1rio",status_code:l,code:"3006"}}},d={405:{5001:{message:"N\xe3o Permitido",status_code:n.J.METHOD_NOT_ALLOWED,code:"5001"}}},f={422:{22001:{message:"C\xf3digo incorreto",status_code:n.J.UNPROCESSABLE_ENTITY,code:"22001"}}},g=n.J.CONFLICT,p={409:{9001:{message:"Usu\xe1rio ja existente!",status_code:g,code:"9001"},9003:{message:"Tag ja existente!",status_code:g,code:"9003"}}},m=n.J.NOT_FOUND,b={404:{4001:{message:"Usu\xe1rio n\xe3o existe!",status_code:m,code:"4001"},4002:{message:"Provider n\xe3o existe!",status_code:m,code:"4002"},4003:{message:"O servi\xe7o do provedor n\xe3o existe!",status_code:m,code:"4003"},4004:{message:"Refresh token n\xe3o existe!",status_code:m,code:"4004"},4005:{message:"Token n\xe3o encontrado!",status_code:m,code:"4005"}}},h={429:{29001:{message:"Requests excessivo",status_code:n.J.TOO_MANY_REQUESTS,code:"29001"}}},v={500:{50001:{message:"Erro n\xe3o conhecido reporte para o suporte",status_code:n.J.INTERNAL_SERVER_ERROR,code:"50001"}}};function O(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function j(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?O(Object(t),!0).forEach((function(r){(0,o.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var y=j(j(j(j(j(j(j(j(j({},i),c),u),d),f),p),b),h),v);function _(e){var r=e.code,t=e.status_code,o=e.message;return t&&r?"celebrate request validation failed"===(void 0===o?"":o)?new n.g(y[400]["0002"]):y[t][r]?new n.g(y[t][r]):new n.g(y[500][50001]):new n.g(y[500][50001])}},9878:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSP:function(){return E},default:function(){return w}});var n=t(809),o=t.n(n),a=t(6265),i=t(5893),s=t(2447),c=t(4096),l=t(8017),u=t(6034),d=t(123),f=t(4115),g=t(6185),p=t(7294),m=t(1163),b=t(9501),h=t(8834),v=t(2283),O=t(5986),j=t(5238),y=t(6061),_=t(9059);function k(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function x(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?k(Object(t),!0).forEach((function(r){(0,a.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):k(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var E=!0;function w(e){var r=(0,O.M0)(),t=r.appError,n=r.setAppError,a=r.setIsLoading,k=r.isLoading,E=(0,y.D1)(),w=E.resendActiveMailUser,P=E.resendActiveMailUserByMail,S=(0,p.useState)(""),C=S[0],T=S[1],D=(0,p.useState)(""),N=D[0],R=D[1],I=b.Ry().shape({email:"4004"===(null===t||void 0===t?void 0:t.code)?b.Z_().required("E-mail obrigat\xf3rio").email("E-mail inv\xe1lido"):b.Z_().optional()}),z=(0,v.cI)({resolver:(0,h.X)(I)}),A=z.register,J=z.handleSubmit,L=z.formState;function U(){return(U=(0,s.Z)(o().mark((function e(r,t,i){var s,c;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=i.token_param,c=i.error_code,a(!0),t.preventDefault(),s||m.default.replace("/"),e.prev=4,"4004"!==c){e.next=10;break}return e.next=8,P(r.email);case 8:e.next=12;break;case 10:return e.next=12,w(N);case 12:T("E-mail reenviado!"),n(null),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(4),n((0,j.l)(e.t0));case 19:return e.prev=19,a(!1),e.finish(19);case 22:case"end":return e.stop()}}),e,null,[[4,16,19,22]])})))).apply(this,arguments)}(0,p.useEffect)((function(){if(e.token&&R(e.token),e.confirm_mail)return n(null),void T("Conta ativada!");n((0,j.l)({status_code:e.appError.status_code,code:e.appError.code}))}),[]);var F=L.errors;return(0,i.jsx)(c.k,{width:"100vw",height:"100vh",alignItems:"center",justifyContent:"center",children:(0,i.jsx)(c.k,{width:"100%",maxWidth:360,backgroundColor:"gray.800",padding:"8",borderRadius:8,flexDirection:"column",children:(0,i.jsxs)(l.xu,{as:"form",flex:"1",borderRadius:8,backgroundColor:"gray.800",padding:["6","8"],onSubmit:J((function(e,r){return function(e,r,t){return U.apply(this,arguments)}(e,r,{error_code:t.code,token_param:N})})),children:[(0,i.jsxs)(u.Kq,{spacing:"4",marginBottom:"2",children:[(0,i.jsx)(d.E,{src:"../../images/logo-title.svg",fallbackSrc:"../../images/placeholder/240.png",fit:"contain",width:"400px",height:"300px"}),t?(0,i.jsx)(c.k,{justifyContent:"center",alignItems:"center",children:(0,i.jsx)(f.x,{color:"red.500",children:t.message})}):(0,i.jsx)(c.k,{justifyContent:"center",alignItems:"center",children:(0,i.jsx)(f.x,{color:"withe.500",children:C})})]}),(0,i.jsxs)(u.Kq,{spacing:"6",children:["4004"===(null===t||void 0===t?void 0:t.code)&&(0,i.jsx)(_.I,x(x({name:"email",type:"email",label:"E-mail"},A("email")),{},{error:F.email})),t?(0,i.jsx)(g.z,{type:"submit",colorScheme:"whiteAlpha",marginTop:"6",size:"lg",isLoading:k,children:N?"Reenviar confirma\xe7\xe3o":"Voltar"}):(0,i.jsx)(g.z,{type:"button",colorScheme:"pink",marginTop:"6",size:"lg",isLoading:k,onClick:function(){a(!0),m.default.replace("/"),a(!1)},children:"Entrar"})]})]})})})}},8856:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/confirm/mail",function(){return t(9878)}])}},function(e){e.O(0,[43,329,774,888,179],(function(){return r=8856,e(e.s=r);var r}));var r=e.O();_N_E=r}]);