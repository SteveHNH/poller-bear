var app=function(){"use strict";function e(){}const t=e=>e;function n(e,t){for(const n in t)e[n]=t[n];return e}function s(e){return e()}function r(){return Object.create(null)}function i(e){e.forEach(s)}function o(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let c;function l(e,t){return c||(c=document.createElement("a")),c.href=t,e===c.href}function u(t,...n){if(null==t)return e;const s=t.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}function h(e,t,n){e.$$.on_destroy.push(u(t,n))}function d(e,t,n,s){if(e){const r=f(e,t,n,s);return e[0](r)}}function f(e,t,s,r){return e[1]&&r?n(s.ctx.slice(),e[1](r(t))):s.ctx}function p(e,t,n,s){if(e[2]&&s){const r=e[2](s(n));if(void 0===t.dirty)return r;if("object"==typeof r){const e=[],n=Math.max(t.dirty.length,r.length);for(let s=0;s<n;s+=1)e[s]=t.dirty[s]|r[s];return e}return t.dirty|r}return t.dirty}function m(e,t,n,s,r,i){if(r){const o=f(t,n,s,i);e.p(o,r)}}function g(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}function v(e){const t={};for(const n in e)"$"!==n[0]&&(t[n]=e[n]);return t}const y="undefined"!=typeof window;let w=y?()=>window.performance.now():()=>Date.now(),_=y?e=>requestAnimationFrame(e):e;const b=new Set;function T(e){b.forEach((t=>{t.c(e)||(b.delete(t),t.f())})),0!==b.size&&_(T)}function I(e){let t;return 0===b.size&&_(T),{promise:new Promise((n=>{b.add(t={c:e,f:n})})),abort(){b.delete(t)}}}function E(e,t){e.appendChild(t)}function k(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function S(e){const t=N("style");return function(e,t){E(e.head||e,t),t.sheet}(k(e),t),t.sheet}function C(e,t,n){e.insertBefore(t,n||null)}function A(e){e.parentNode&&e.parentNode.removeChild(e)}function N(e){return document.createElement(e)}function R(e){return document.createTextNode(e)}function D(){return R(" ")}function O(){return R("")}function P(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function x(e){return function(t){return t.preventDefault(),e.call(this,t)}}function L(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function M(e){return""===e?null:+e}function U(e,t){t=""+t,e.data!==t&&(e.data=t)}function $(e,t){e.value=null==t?"":t}function F(e,t,n,s){null==n?e.style.removeProperty(t):e.style.setProperty(t,n,s?"important":"")}function V(e,t,n){e.classList[n?"add":"remove"](t)}function j(e,t){return new e(t)}const B=new Map;let q,z=0;function K(e,t,n,s,r,i,o,a=0){const c=16.666/s;let l="{\n";for(let e=0;e<=1;e+=c){const s=t+(n-t)*i(e);l+=100*e+`%{${o(s,1-s)}}\n`}const u=l+`100% {${o(n,1-n)}}\n}`,h=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(u)}_${a}`,d=k(e),{stylesheet:f,rules:p}=B.get(d)||function(e,t){const n={stylesheet:S(t),rules:{}};return B.set(e,n),n}(d,e);p[h]||(p[h]=!0,f.insertRule(`@keyframes ${h} ${u}`,f.cssRules.length));const m=e.style.animation||"";return e.style.animation=`${m?`${m}, `:""}${h} ${s}ms linear ${r}ms 1 both`,z+=1,h}function H(e,t){const n=(e.style.animation||"").split(", "),s=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),r=n.length-s.length;r&&(e.style.animation=s.join(", "),z-=r,z||_((()=>{z||(B.forEach((e=>{const{ownerNode:t}=e.stylesheet;t&&A(t)})),B.clear())})))}function G(e){q=e}function W(){if(!q)throw new Error("Function called outside component initialization");return q}function Q(e){W().$$.on_mount.push(e)}function Y(e){W().$$.on_destroy.push(e)}function J(e,t){return W().$$.context.set(e,t),t}function X(e){return W().$$.context.get(e)}const Z=[],ee=[];let te=[];const ne=[],se=Promise.resolve();let re=!1;function ie(e){te.push(e)}const oe=new Set;let ae,ce=0;function le(){if(0!==ce)return;const e=q;do{try{for(;ce<Z.length;){const e=Z[ce];ce++,G(e),ue(e.$$)}}catch(e){throw Z.length=0,ce=0,e}for(G(null),Z.length=0,ce=0;ee.length;)ee.pop()();for(let e=0;e<te.length;e+=1){const t=te[e];oe.has(t)||(oe.add(t),t())}te.length=0}while(Z.length);for(;ne.length;)ne.pop()();re=!1,oe.clear(),G(e)}function ue(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ie)}}function he(){return ae||(ae=Promise.resolve(),ae.then((()=>{ae=null}))),ae}function de(e,t,n){e.dispatchEvent(function(e,t,{bubbles:n=!1,cancelable:s=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,s,t),r}(`${t?"intro":"outro"}${n}`))}const fe=new Set;let pe;function me(){pe={r:0,c:[],p:pe}}function ge(){pe.r||i(pe.c),pe=pe.p}function ve(e,t){e&&e.i&&(fe.delete(e),e.i(t))}function ye(e,t,n,s){if(e&&e.o){if(fe.has(e))return;fe.add(e),pe.c.push((()=>{fe.delete(e),s&&(n&&e.d(1),s())})),e.o(t)}else s&&s()}const we={duration:0};function _e(e,t){const n=t.token={};function s(e,s,r,i){if(t.token!==n)return;t.resolved=i;let o=t.ctx;void 0!==r&&(o=o.slice(),o[r]=i);const a=e&&(t.current=e)(o);let c=!1;t.block&&(t.blocks?t.blocks.forEach(((e,n)=>{n!==s&&e&&(me(),ye(e,1,1,(()=>{t.blocks[n]===e&&(t.blocks[n]=null)})),ge())})):t.block.d(1),a.c(),ve(a,1),a.m(t.mount(),t.anchor),c=!0),t.block=a,t.blocks&&(t.blocks[s]=a),c&&le()}if(!(r=e)||"object"!=typeof r&&"function"!=typeof r||"function"!=typeof r.then){if(t.current!==t.then)return s(t.then,1,t.value,e),!0;t.resolved=e}else{const n=W();if(e.then((e=>{G(n),s(t.then,1,t.value,e),G(null)}),(e=>{if(G(n),s(t.catch,2,t.error,e),G(null),!t.hasCatch)throw e})),t.current!==t.pending)return s(t.pending,0),!0}var r}function be(e,t){e.d(1),t.delete(e.key)}function Te(e,t){ye(e,1,1,(()=>{t.delete(e.key)}))}function Ie(e,t,n,s,r,o,a,c,l,u,h,d){let f=e.length,p=o.length,m=f;const g={};for(;m--;)g[e[m].key]=m;const v=[],y=new Map,w=new Map,_=[];for(m=p;m--;){const e=d(r,o,m),i=n(e);let c=a.get(i);c?s&&_.push((()=>c.p(e,t))):(c=u(i,e),c.c()),y.set(i,v[m]=c),i in g&&w.set(i,Math.abs(m-g[i]))}const b=new Set,T=new Set;function I(e){ve(e,1),e.m(c,h),a.set(e.key,e),h=e.first,p--}for(;f&&p;){const t=v[p-1],n=e[f-1],s=t.key,r=n.key;t===n?(h=t.first,f--,p--):y.has(r)?!a.has(s)||b.has(s)?I(t):T.has(r)?f--:w.get(s)>w.get(r)?(T.add(s),I(t)):(b.add(r),f--):(l(n,a),f--)}for(;f--;){const t=e[f];y.has(t.key)||l(t,a)}for(;p;)I(v[p-1]);return i(_),v}function Ee(e){return"object"==typeof e&&null!==e?e:{}}function ke(e){e&&e.c()}function Se(e,t,n,r){const{fragment:a,after_update:c}=e.$$;a&&a.m(t,n),r||ie((()=>{const t=e.$$.on_mount.map(s).filter(o);e.$$.on_destroy?e.$$.on_destroy.push(...t):i(t),e.$$.on_mount=[]})),c.forEach(ie)}function Ce(e,t){const n=e.$$;null!==n.fragment&&(!function(e){const t=[],n=[];te.forEach((s=>-1===e.indexOf(s)?t.push(s):n.push(s))),n.forEach((e=>e())),te=t}(n.after_update),i(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ae(e,t){-1===e.$$.dirty[0]&&(Z.push(e),re||(re=!0,se.then(le)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Ne(t,n,s,o,a,c,l,u=[-1]){const h=q;G(t);const d=t.$$={fragment:null,ctx:[],props:c,update:e,not_equal:a,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(h?h.$$.context:[])),callbacks:r(),dirty:u,skip_bound:!1,root:n.target||h.$$.root};l&&l(d.root);let f=!1;if(d.ctx=s?s(t,n.props||{},((e,n,...s)=>{const r=s.length?s[0]:n;return d.ctx&&a(d.ctx[e],d.ctx[e]=r)&&(!d.skip_bound&&d.bound[e]&&d.bound[e](r),f&&Ae(t,e)),n})):[],d.update(),f=!0,i(d.before_update),d.fragment=!!o&&o(d.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);d.fragment&&d.fragment.l(e),e.forEach(A)}else d.fragment&&d.fragment.c();n.intro&&ve(t.$$.fragment),Se(t,n.target,n.anchor,n.customElement),le()}G(h)}class Re{$destroy(){Ce(this,1),this.$destroy=e}$on(t,n){if(!o(n))return e;const s=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return s.push(n),()=>{const e=s.indexOf(n);-1!==e&&s.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const De={},Oe={},Pe={},xe=/^:(.+)/,Le=e=>e.replace(/(^\/+|\/+$)/g,"").split("/"),Me=e=>e.replace(/(^\/+|\/+$)/g,""),Ue=(e,t)=>({route:e,score:e.default?0:Le(e.path).reduce(((e,t)=>(e+=4,""===t?e+=1:xe.test(t)?e+=2:"*"===t[0]?e-=5:e+=3,e)),0),index:t}),$e=(e,t)=>{let n,s;const[r]=t.split("?"),i=Le(r),o=""===i[0],a=(e=>e.map(Ue).sort(((e,t)=>e.score<t.score?1:e.score>t.score?-1:e.index-t.index)))(e);for(let e=0,r=a.length;e<r;e++){const r=a[e].route;let c=!1;if(r.default){s={route:r,params:{},uri:t};continue}const l=Le(r.path),u={},h=Math.max(i.length,l.length);let d=0;for(;d<h;d++){const e=l[d],t=i[d];if(e&&"*"===e[0]){u["*"===e?"*":e.slice(1)]=i.slice(d).map(decodeURIComponent).join("/");break}if(void 0===t){c=!0;break}const n=xe.exec(e);if(n&&!o){const e=decodeURIComponent(t);u[n[1]]=e}else if(e!==t){c=!0;break}}if(!c){n={route:r,params:u,uri:"/"+i.slice(0,d).join("/")};break}}return n||s||null},Fe=(e,t)=>`${Me("/"===t?e:`${Me(e)}/${Me(t)}`)}/`,Ve=()=>"undefined"!=typeof window&&"document"in window&&"location"in window,je=e=>({params:4&e}),Be=e=>({params:e[2]});function qe(e){let t,n,s,r;const i=[Ke,ze],o=[];function a(e,t){return e[0]?0:1}return t=a(e),n=o[t]=i[t](e),{c(){n.c(),s=O()},m(e,n){o[t].m(e,n),C(e,s,n),r=!0},p(e,r){let c=t;t=a(e),t===c?o[t].p(e,r):(me(),ye(o[c],1,1,(()=>{o[c]=null})),ge(),n=o[t],n?n.p(e,r):(n=o[t]=i[t](e),n.c()),ve(n,1),n.m(s.parentNode,s))},i(e){r||(ve(n),r=!0)},o(e){ye(n),r=!1},d(e){o[t].d(e),e&&A(s)}}}function ze(e){let t;const n=e[8].default,s=d(n,e,e[7],Be);return{c(){s&&s.c()},m(e,n){s&&s.m(e,n),t=!0},p(e,r){s&&s.p&&(!t||132&r)&&m(s,n,e,e[7],t?p(n,e[7],r,je):g(e[7]),Be)},i(e){t||(ve(s,e),t=!0)},o(e){ye(s,e),t=!1},d(e){s&&s.d(e)}}}function Ke(e){let t,n,s,r={ctx:e,current:null,token:null,hasCatch:!1,pending:We,then:Ge,catch:He,value:12,blocks:[,,,]};return _e(n=e[0],r),{c(){t=O(),r.block.c()},m(e,n){C(e,t,n),r.block.m(e,r.anchor=n),r.mount=()=>t.parentNode,r.anchor=t,s=!0},p(t,s){e=t,r.ctx=e,1&s&&n!==(n=e[0])&&_e(n,r)||function(e,t,n){const s=t.slice(),{resolved:r}=e;e.current===e.then&&(s[e.value]=r),e.current===e.catch&&(s[e.error]=r),e.block.p(s,n)}(r,e,s)},i(e){s||(ve(r.block),s=!0)},o(e){for(let e=0;e<3;e+=1){ye(r.blocks[e])}s=!1},d(e){e&&A(t),r.block.d(e),r.token=null,r=null}}}function He(t){return{c:e,m:e,p:e,i:e,o:e,d:e}}function Ge(e){let t,s,r;const i=[e[2],e[3]];var o=e[12]?.default||e[12];function a(e){let t={};for(let e=0;e<i.length;e+=1)t=n(t,i[e]);return{props:t}}return o&&(t=j(o,a())),{c(){t&&ke(t.$$.fragment),s=O()},m(e,n){t&&Se(t,e,n),C(e,s,n),r=!0},p(e,n){const r=12&n?function(e,t){const n={},s={},r={$$scope:1};let i=e.length;for(;i--;){const o=e[i],a=t[i];if(a){for(const e in o)e in a||(s[e]=1);for(const e in a)r[e]||(n[e]=a[e],r[e]=1);e[i]=a}else for(const e in o)r[e]=1}for(const e in s)e in n||(n[e]=void 0);return n}(i,[4&n&&Ee(e[2]),8&n&&Ee(e[3])]):{};if(1&n&&o!==(o=e[12]?.default||e[12])){if(t){me();const e=t;ye(e.$$.fragment,1,0,(()=>{Ce(e,1)})),ge()}o?(t=j(o,a()),ke(t.$$.fragment),ve(t.$$.fragment,1),Se(t,s.parentNode,s)):t=null}else o&&t.$set(r)},i(e){r||(t&&ve(t.$$.fragment,e),r=!0)},o(e){t&&ye(t.$$.fragment,e),r=!1},d(e){e&&A(s),t&&Ce(t,e)}}}function We(t){return{c:e,m:e,p:e,i:e,o:e,d:e}}function Qe(e){let t,n,s=e[1]&&e[1].route===e[5]&&qe(e);return{c(){s&&s.c(),t=O()},m(e,r){s&&s.m(e,r),C(e,t,r),n=!0},p(e,[n]){e[1]&&e[1].route===e[5]?s?(s.p(e,n),2&n&&ve(s,1)):(s=qe(e),s.c(),ve(s,1),s.m(t.parentNode,t)):s&&(me(),ye(s,1,1,(()=>{s=null})),ge())},i(e){n||(ve(s),n=!0)},o(e){ye(s),n=!1},d(e){s&&s.d(e),e&&A(t)}}}function Ye(e,t,s){let r,{$$slots:i={},$$scope:o}=t,{path:a=""}=t,{component:c=null}=t,l={},u={};const{registerRoute:d,unregisterRoute:f,activeRoute:p}=X(Oe);h(e,p,(e=>s(1,r=e)));const m={path:a,default:""===a};return d(m),Y((()=>{f(m)})),e.$$set=e=>{s(11,t=n(n({},t),v(e))),"path"in e&&s(6,a=e.path),"component"in e&&s(0,c=e.component),"$$scope"in e&&s(7,o=e.$$scope)},e.$$.update=()=>{if(r&&r.route===m){s(2,l=r.params);const{component:e,path:n,...i}=t;s(3,u=i),e&&(e.toString().startsWith("class ")?s(0,c=e):s(0,c=e())),Ve()&&!r.preserveScroll&&window?.scrollTo(0,0)}},t=v(t),[c,r,l,u,p,m,a,o,i]}class Je extends Re{constructor(e){super(),Ne(this,e,Ye,Qe,a,{path:6,component:0})}}const Xe=[];function Ze(t,n=e){let s;const r=new Set;function i(e){if(a(t,e)&&(t=e,s)){const e=!Xe.length;for(const e of r)e[1](),Xe.push(e,t);if(e){for(let e=0;e<Xe.length;e+=2)Xe[e][0](Xe[e+1]);Xe.length=0}}}return{set:i,update:function(e){i(e(t))},subscribe:function(o,a=e){const c=[o,a];return r.add(c),1===r.size&&(s=n(i)||e),o(t),()=>{r.delete(c),0===r.size&&s&&(s(),s=null)}}}}function et(t,n,s){const r=!Array.isArray(t),a=r?[t]:t,c=n.length<2;return l=t=>{let s=!1;const l=[];let h=0,d=e;const f=()=>{if(h)return;d();const s=n(r?l[0]:l,t);c?t(s):d=o(s)?s:e},p=a.map(((e,t)=>u(e,(e=>{l[t]=e,h&=~(1<<t),s&&f()}),(()=>{h|=1<<t}))));return s=!0,f(),function(){i(p),d(),s=!1}},{subscribe:Ze(s,l).subscribe};var l}const tt=e=>({...e.location,state:e.history.state,key:e.history.state&&e.history.state.key||"initial"}),nt=(e=>{const t=[];let n=tt(e);return{get location(){return n},listen(s){t.push(s);const r=()=>{n=tt(e),s({location:n,action:"POP"})};return e.addEventListener("popstate",r),()=>{e.removeEventListener("popstate",r);const n=t.indexOf(s);t.splice(n,1)}},navigate(s,{state:r,replace:i=!1,preserveScroll:o=!1}={}){r={...r,key:Date.now()+""};try{i?e.history.replaceState(r,"",s):e.history.pushState(r,"",s)}catch(t){e.location[i?"replace":"assign"](s)}n=tt(e),t.forEach((e=>e({location:n,action:"PUSH",preserveScroll:o}))),document.activeElement.blur()}}})(Ve()?window:((e="/")=>{let t=0;const n=[{pathname:e,search:""}],s=[];return{get location(){return n[t]},addEventListener(e,t){},removeEventListener(e,t){},history:{get entries(){return n},get index(){return t},get state(){return s[t]},pushState(e,r,i){const[o,a=""]=i.split("?");t++,n.push({pathname:o,search:a}),s.push(e)},replaceState(e,r,i){const[o,a=""]=i.split("?");n[t]={pathname:o,search:a},s[t]=e}}}})()),{navigate:st}=nt,rt=e=>({route:4&e,location:2&e}),it=e=>({route:e[2]&&e[2].uri,location:e[1]}),ot=e=>({route:4&e,location:2&e}),at=e=>({route:e[2]&&e[2].uri,location:e[1]});function ct(e){let t;const n=e[15].default,s=d(n,e,e[14],it);return{c(){s&&s.c()},m(e,n){s&&s.m(e,n),t=!0},p(e,r){s&&s.p&&(!t||16390&r)&&m(s,n,e,e[14],t?p(n,e[14],r,rt):g(e[14]),it)},i(e){t||(ve(s,e),t=!0)},o(e){ye(s,e),t=!1},d(e){s&&s.d(e)}}}function lt(t){let n,s,r=t[1].pathname,i=ut(t);return{c(){i.c(),n=O()},m(e,t){i.m(e,t),C(e,n,t),s=!0},p(t,s){2&s&&a(r,r=t[1].pathname)?(me(),ye(i,1,1,e),ge(),i=ut(t),i.c(),ve(i,1),i.m(n.parentNode,n)):i.p(t,s)},i(e){s||(ve(i),s=!0)},o(e){ye(i),s=!1},d(e){e&&A(n),i.d(e)}}}function ut(n){let s,r,a,c;const l=n[15].default,u=d(l,n,n[14],at);return{c(){s=N("div"),u&&u.c()},m(e,t){C(e,s,t),u&&u.m(s,null),c=!0},p(e,t){u&&u.p&&(!c||16390&t)&&m(u,l,e,e[14],c?p(l,e[14],t,ot):g(e[14]),at)},i(i){c||(ve(u,i),ie((()=>{c&&(a&&a.end(1),r=function(n,s,r){const i={direction:"in"};let a,c,l=s(n,r,i),u=!1,h=0;function d(){a&&H(n,a)}function f(){const{delay:s=0,duration:r=300,easing:i=t,tick:o=e,css:f}=l||we;f&&(a=K(n,0,1,r,s,i,f,h++)),o(0,1);const p=w()+s,m=p+r;c&&c.abort(),u=!0,ie((()=>de(n,!0,"start"))),c=I((e=>{if(u){if(e>=m)return o(1,0),de(n,!0,"end"),d(),u=!1;if(e>=p){const t=i((e-p)/r);o(t,1-t)}}return u}))}let p=!1;return{start(){p||(p=!0,H(n),o(l)?(l=l(i),he().then(f)):f())},invalidate(){p=!1},end(){u&&(d(),u=!1)}}}(s,n[3],{}),r.start())})),c=!0)},o(l){ye(u,l),r&&r.invalidate(),a=function(n,s,r){const a={direction:"out"};let c,l=s(n,r,a),u=!0;const h=pe;function d(){const{delay:s=0,duration:r=300,easing:o=t,tick:a=e,css:d}=l||we;d&&(c=K(n,1,0,r,s,o,d));const f=w()+s,p=f+r;ie((()=>de(n,!1,"start"))),I((e=>{if(u){if(e>=p)return a(0,1),de(n,!1,"end"),--h.r||i(h.c),!1;if(e>=f){const t=o((e-f)/r);a(1-t,t)}}return u}))}return h.r+=1,o(l)?he().then((()=>{l=l(a),d()})):d(),{end(e){e&&l.tick&&l.tick(1,0),u&&(c&&H(n,c),u=!1)}}}(s,n[3],{}),c=!1},d(e){e&&A(s),u&&u.d(e),e&&a&&a.end()}}}function ht(e){let t,n,s,r;const i=[lt,ct],o=[];function a(e,t){return e[0]?0:1}return t=a(e),n=o[t]=i[t](e),{c(){n.c(),s=O()},m(e,n){o[t].m(e,n),C(e,s,n),r=!0},p(e,[r]){let c=t;t=a(e),t===c?o[t].p(e,r):(me(),ye(o[c],1,1,(()=>{o[c]=null})),ge(),n=o[t],n?n.p(e,r):(n=o[t]=i[t](e),n.c()),ve(n,1),n.m(s.parentNode,s))},i(e){r||(ve(n),r=!0)},o(e){ye(n),r=!1},d(e){o[t].d(e),e&&A(s)}}}function dt(e,t,n){let s,r,i,o,{$$slots:a={},$$scope:c}=t,{basepath:l="/"}=t,{url:u=null}=t,{viewtransition:d=null}=t,{history:f=nt}=t;J(Pe,f);const p=X(De),m=X(Oe),g=Ze([]);h(e,g,(e=>n(12,r=e)));const v=Ze(null);h(e,v,(e=>n(2,o=e)));let y=!1;const w=p||Ze(u?{pathname:u}:f.location);h(e,w,(e=>n(1,s=e)));const _=m?m.routerBase:Ze({path:l,uri:l});h(e,_,(e=>n(13,i=e)));const b=et([_,v],(([e,t])=>{if(!t)return e;const{path:n}=e,{route:s,uri:r}=t;return{path:s.default?n:s.path.replace(/\*.*$/,""),uri:r}}));let T=!1;return p||(Q((()=>f.listen((e=>{n(11,T=e.preserveScroll||!1),w.set(e.location)})))),J(De,w)),J(Oe,{activeRoute:v,base:_,routerBase:b,registerRoute:e=>{const{path:t}=i;let{path:n}=e;if(e._path=n,e.path=Fe(t,n),"undefined"==typeof window){if(y)return;const t=$e([e],s.pathname);t&&(v.set(t),y=!0)}else g.update((t=>[...t,e]))},unregisterRoute:e=>{g.update((t=>t.filter((t=>t!==e))))}}),e.$$set=e=>{"basepath"in e&&n(8,l=e.basepath),"url"in e&&n(9,u=e.url),"viewtransition"in e&&n(0,d=e.viewtransition),"history"in e&&n(10,f=e.history),"$$scope"in e&&n(14,c=e.$$scope)},e.$$.update=()=>{if(8192&e.$$.dirty){const{path:e}=i;g.update((t=>t.map((t=>Object.assign(t,{path:Fe(e,t._path)})))))}if(6146&e.$$.dirty){const e=$e(r,s.pathname);v.set({...e,preserveScroll:T})}},[d,s,o,(e,t,n)=>{const s=d(n);return"function"==typeof s?.fn?s.fn(e,s):s},g,v,w,_,l,u,f,T,r,i,c,a]}class ft extends Re{constructor(e){super(),Ne(this,e,dt,ht,a,{basepath:8,url:9,viewtransition:0,history:10})}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const pt=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=63&r|128):55296==(64512&r)&&s+1<e.length&&56320==(64512&e.charCodeAt(s+1))?(r=65536+((1023&r)<<10)+(1023&e.charCodeAt(++s)),t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=63&r|128):(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=63&r|128)}return t},mt={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let t=0;t<e.length;t+=3){const r=e[t],i=t+1<e.length,o=i?e[t+1]:0,a=t+2<e.length,c=a?e[t+2]:0,l=r>>2,u=(3&r)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(h=64)),s.push(n[l],n[u],n[h],n[d])}return s.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(pt(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,s=0;for(;n<e.length;){const r=e[n++];if(r<128)t[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=e[n++];t[s++]=String.fromCharCode((31&r)<<6|63&i)}else if(r>239&&r<365){const i=((7&r)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[s++]=String.fromCharCode(55296+(i>>10)),t[s++]=String.fromCharCode(56320+(1023&i))}else{const i=e[n++],o=e[n++];t[s++]=String.fromCharCode((15&r)<<12|(63&i)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let t=0;t<e.length;){const r=n[e.charAt(t++)],i=t<e.length?n[e.charAt(t)]:0;++t;const o=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==r||null==i||null==o||null==a)throw new gt;const c=r<<2|i>>4;if(s.push(c),64!==o){const e=i<<4&240|o>>2;if(s.push(e),64!==a){const e=o<<6&192|a;s.push(e)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class gt extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const vt=function(e){return function(e){const t=pt(e);return mt.encodeByteArray(t,!0)}(e).replace(/\./g,"")},yt=function(e){try{return mt.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const wt=()=>
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,_t=()=>{try{return wt()||(()=>{if("undefined"==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&yt(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},bt=e=>{var t,n;return null===(n=null===(t=_t())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},Tt=()=>{var e;return null===(e=_t())||void 0===e?void 0:e.config},It=e=>{var t;return null===(t=_t())||void 0===t?void 0:t[`_${e}`]};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Et{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function kt(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function St(){return!function(){var e;const t=null===(e=_t())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class Ct extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,Ct.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,At.prototype.create)}}class At{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],i=r?function(e,t){return e.replace(Nt,((e,n)=>{const s=t[n];return null!=s?String(s):`<${n}?>`}))}(r,n):"Error",o=`${this.serviceName}: ${i} (${s}).`;return new Ct(s,o,n)}}const Nt=/\{\$([^}]+)}/g;function Rt(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const r of n){if(!s.includes(r))return!1;const n=e[r],i=t[r];if(Dt(n)&&Dt(i)){if(!Rt(n,i))return!1}else if(n!==i)return!1}for(const e of s)if(!n.includes(e))return!1;return!0}function Dt(e){return null!==e&&"object"==typeof e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Ot(e){const t=[];for(const[n,s]of Object.entries(e))Array.isArray(s)?s.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}class Pt{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let s;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");s=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===s.next&&(s.next=xt),void 0===s.error&&(s.error=xt),void 0===s.complete&&(s.complete=xt);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch(e){}})),this.observers.push(s),r}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}}function xt(){}
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Lt(e){return e&&e._delegate?e._delegate:e}class Mt{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Ut="[DEFAULT]";
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class $t{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new Et;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),s=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(s)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e))try{this.getOrInitializeService({instanceIdentifier:Ut})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=Ut){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e=Ut){return this.instances.has(e)}getOptions(e=Ut){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(s)}return s}onInit(e,t){var n;const s=this.normalizeInstanceIdentifier(t),r=null!==(n=this.onInitCallbacks.get(s))&&void 0!==n?n:new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=e,s===Ut?void 0:s),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var s;return n||null}normalizeInstanceIdentifier(e=Ut){return this.component?this.component.multipleInstances?e:Ut:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class Ft{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new $t(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Vt;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(Vt||(Vt={}));const jt={debug:Vt.DEBUG,verbose:Vt.VERBOSE,info:Vt.INFO,warn:Vt.WARN,error:Vt.ERROR,silent:Vt.SILENT},Bt=Vt.INFO,qt={[Vt.DEBUG]:"log",[Vt.VERBOSE]:"log",[Vt.INFO]:"info",[Vt.WARN]:"warn",[Vt.ERROR]:"error"},zt=(e,t,...n)=>{if(t<e.logLevel)return;const s=(new Date).toISOString(),r=qt[t];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[r](`[${s}]  ${e.name}:`,...n)};class Kt{constructor(e){this.name=e,this._logLevel=Bt,this._logHandler=zt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Vt))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?jt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Vt.DEBUG,...e),this._logHandler(this,Vt.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Vt.VERBOSE,...e),this._logHandler(this,Vt.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Vt.INFO,...e),this._logHandler(this,Vt.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Vt.WARN,...e),this._logHandler(this,Vt.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Vt.ERROR,...e),this._logHandler(this,Vt.ERROR,...e)}}const Ht=(e,t)=>t.some((t=>e instanceof t));let Gt,Wt;const Qt=new WeakMap,Yt=new WeakMap,Jt=new WeakMap,Xt=new WeakMap,Zt=new WeakMap;let en={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return Yt.get(e);if("objectStoreNames"===t)return e.objectStoreNames||Jt.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return sn(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function tn(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(Wt||(Wt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(rn(this),t),sn(Qt.get(this))}:function(...t){return sn(e.apply(rn(this),t))}:function(t,...n){const s=e.call(rn(this),t,...n);return Jt.set(s,t.sort?t.sort():[t]),sn(s)}}function nn(e){return"function"==typeof e?tn(e):(e instanceof IDBTransaction&&function(e){if(Yt.has(e))return;const t=new Promise(((t,n)=>{const s=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",i),e.removeEventListener("abort",i)},r=()=>{t(),s()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",r),e.addEventListener("error",i),e.addEventListener("abort",i)}));Yt.set(e,t)}(e),Ht(e,Gt||(Gt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,en):e)}function sn(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const s=()=>{e.removeEventListener("success",r),e.removeEventListener("error",i)},r=()=>{t(sn(e.result)),s()},i=()=>{n(e.error),s()};e.addEventListener("success",r),e.addEventListener("error",i)}));return t.then((t=>{t instanceof IDBCursor&&Qt.set(t,e)})).catch((()=>{})),Zt.set(t,e),t}(e);if(Xt.has(e))return Xt.get(e);const t=nn(e);return t!==e&&(Xt.set(e,t),Zt.set(t,e)),t}const rn=e=>Zt.get(e);const on=["get","getKey","getAll","getAllKeys","count"],an=["put","add","delete","clear"],cn=new Map;function ln(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(cn.get(t))return cn.get(t);const n=t.replace(/FromIndex$/,""),s=t!==n,r=an.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!r&&!on.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,r?"readwrite":"readonly");let o=i.store;return s&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),r&&i.done]))[0]};return cn.set(t,i),i}en=(e=>({...e,get:(t,n,s)=>ln(t,n)||e.get(t,n,s),has:(t,n)=>!!ln(t,n)||e.has(t,n)}))(en);
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class un{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const hn="@firebase/app",dn="0.10.13",fn=new Kt("@firebase/app"),pn="[DEFAULT]",mn={[hn]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/data-connect":"fire-data-connect","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","@firebase/vertexai-preview":"fire-vertex","fire-js":"fire-js",firebase:"fire-js-all"},gn=new Map,vn=new Map,yn=new Map;function wn(e,t){try{e.container.addComponent(t)}catch(n){fn.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function _n(e){const t=e.name;if(yn.has(t))return fn.debug(`There were multiple attempts to register component ${t}.`),!1;yn.set(t,e);for(const t of gn.values())wn(t,e);for(const t of vn.values())wn(t,e);return!0}function bn(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Tn(e){return void 0!==e.settings}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const In=new At("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class En{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Mt("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw In.create("app-deleted",{appName:this._name})}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const kn="10.14.1";function Sn(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const s=Object.assign({name:pn,automaticDataCollectionEnabled:!1},t),r=s.name;if("string"!=typeof r||!r)throw In.create("bad-app-name",{appName:String(r)});if(n||(n=Tt()),!n)throw In.create("no-options");const i=gn.get(r);if(i){if(Rt(n,i.options)&&Rt(s,i.config))return i;throw In.create("duplicate-app",{appName:r})}const o=new Ft(r);for(const e of yn.values())o.addComponent(e);const a=new En(n,s,o);return gn.set(r,a),a}function Cn(e=pn){const t=gn.get(e);if(!t&&e===pn&&Tt())return Sn();if(!t)throw In.create("no-app",{appName:e});return t}function An(e,t,n){var s;let r=null!==(s=mn[e])&&void 0!==s?s:e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=t.match(/\s|\//);if(i||o){const e=[`Unable to register library "${r}" with version "${t}":`];return i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void fn.warn(e.join(" "))}_n(new Mt(`${r}-version`,(()=>({library:r,version:t})),"VERSION"))}
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Nn="firebase-heartbeat-database",Rn=1,Dn="firebase-heartbeat-store";let On=null;function Pn(){return On||(On=function(e,t,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(e,t),a=sn(o);return s&&o.addEventListener("upgradeneeded",(e=>{s(sn(o.result),e.oldVersion,e.newVersion,sn(o.transaction),e)})),n&&o.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),a.then((e=>{i&&e.addEventListener("close",(()=>i())),r&&e.addEventListener("versionchange",(e=>r(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),a}(Nn,Rn,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Dn)}catch(e){console.warn(e)}}}).catch((e=>{throw In.create("idb-open",{originalErrorMessage:e.message})}))),On}async function xn(e,t){try{const n=(await Pn()).transaction(Dn,"readwrite"),s=n.objectStore(Dn);await s.put(t,Ln(e)),await n.done}catch(e){if(e instanceof Ct)fn.warn(e.message);else{const t=In.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});fn.warn(t.message)}}}function Ln(e){return`${e.name}!${e.options.appId}`}
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Mn{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new $n(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Un();if(null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some((e=>e.date===s)))return;return this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}catch(e){fn.warn(e)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=Un(),{heartbeatsToSend:n,unsentEntries:s}=function(e,t=1024){const n=[];let s=e.slice();for(const r of e){const e=n.find((e=>e.agent===r.agent));if(e){if(e.dates.push(r.date),Fn(n)>t){e.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Fn(n)>t){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),r=vt(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return fn.warn(e),""}}}function Un(){return(new Date).toISOString().substring(0,10)}class $n{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(e){return!1}}()&&new Promise(((e,t)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var e;t((null===(e=r.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})).then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await Pn()).transaction(Dn),n=await t.objectStore(Dn).get(Ln(e));return await t.done,n}catch(e){if(e instanceof Ct)fn.warn(e.message);else{const t=In.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});fn.warn(t.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return xn(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return xn(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function Fn(e){return vt(JSON.stringify({version:2,heartbeats:e})).length}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Vn;Vn="",_n(new Mt("platform-logger",(e=>new un(e)),"PRIVATE")),_n(new Mt("heartbeat",(e=>new Mn(e)),"PRIVATE")),An(hn,dn,Vn),An(hn,dn,"esm2017"),An("fire-js","");var jn,Bn,qn="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
    Copyright The Closure Library Authors.
    SPDX-License-Identifier: Apache-2.0
    */(function(){var e;
/** @license

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(e,t,n){n||(n=0);var s=Array(16);if("string"==typeof t)for(var r=0;16>r;++r)s[r]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(r=0;16>r;++r)s[r]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],r=e.g[2];var i=e.g[3],o=t+(i^n&(r^i))+s[0]+3614090360&4294967295;o=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=(n=(r=(i=(t=n+(o<<7&4294967295|o>>>25))+((o=i+(r^t&(n^r))+s[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(t^n))+s[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^r&(i^t))+s[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=t+(i^n&(r^i))+s[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^t&(n^r))+s[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(t^n))+s[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^r&(i^t))+s[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=t+(i^n&(r^i))+s[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^t&(n^r))+s[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(t^n))+s[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^r&(i^t))+s[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=t+(i^n&(r^i))+s[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^t&(n^r))+s[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(t^n))+s[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^r&(i^t))+s[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=t+(r^i&(n^r))+s[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(t^n))+s[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=r+(t^n&(i^t))+s[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^t&(r^i))+s[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=t+(r^i&(n^r))+s[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(t^n))+s[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=r+(t^n&(i^t))+s[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^t&(r^i))+s[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=t+(r^i&(n^r))+s[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(t^n))+s[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=r+(t^n&(i^t))+s[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^t&(r^i))+s[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=t+(r^i&(n^r))+s[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(t^n))+s[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=r+(t^n&(i^t))+s[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^t&(r^i))+s[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=t+(n^r^i)+s[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=i+(t^n^r)+s[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^t^n)+s[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^t)+s[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^r^i)+s[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=i+(t^n^r)+s[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^t^n)+s[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^t)+s[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^r^i)+s[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=i+(t^n^r)+s[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^t^n)+s[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^t)+s[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^r^i)+s[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=i+(t^n^r)+s[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^t^n)+s[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^t)+s[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=t+(r^(n|~i))+s[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(t|~r))+s[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=r+(t^(i|~n))+s[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~t))+s[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=t+(r^(n|~i))+s[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(t|~r))+s[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=r+(t^(i|~n))+s[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~t))+s[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=t+(r^(n|~i))+s[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(t|~r))+s[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=r+(t^(i|~n))+s[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~t))+s[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((i=(t=n+((o=t+(r^(n|~i))+s[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(t|~r))+s[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((r=i+((o=r+(t^(i|~n))+s[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~t))+s[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+r&4294967295,e.g[3]=e.g[3]+i&4294967295}function s(e,t){this.h=t;for(var n=[],s=!0,r=e.length-1;0<=r;r--){var i=0|e[r];s&&i==t||(n[r]=i,s=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.D=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.C=function(e,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return t.prototype[n].apply(e,r)}}(t,(function(){this.blockSize=-1})),t.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.u=function(e,t){void 0===t&&(t=e.length);for(var s=t-this.blockSize,r=this.B,i=this.h,o=0;o<t;){if(0==i)for(;o<=s;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(r[i++]=e.charCodeAt(o++),i==this.blockSize){n(this,r),i=0;break}}else for(;o<t;)if(r[i++]=e[o++],i==this.blockSize){n(this,r),i=0;break}}this.h=i,this.o+=t},t.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.u(e),e=Array(16),t=n=0;4>t;++t)for(var s=0;32>s;s+=8)e[n++]=this.g[t]>>>s&255;return e};var r={};function i(e){return-128<=e&&128>e?function(e,t){var n=r;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,(function(e){return new s([0|e],0>e?-1:0)})):new s([0|e],0>e?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(0>e)return d(o(-e));for(var t=[],n=1,r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new s(t,0)}var a=i(0),c=i(1),l=i(16777216);function u(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function h(e){return-1==e.h}function d(e){for(var t=e.g.length,n=[],r=0;r<t;r++)n[r]=~e.g[r];return new s(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(u(t))throw Error("division by zero");if(u(e))return new m(a,a);if(h(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(h(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(30<e.g.length){if(h(e)||h(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,s=t;0>=s.l(e);)n=v(n),s=v(s);var r=y(n,1),i=y(s,1);for(s=y(s,2),n=y(n,2);!u(s);){var l=i.add(s);0>=l.l(e)&&(r=r.add(n),i=l),s=y(s,1),n=y(n,1)}return t=f(e,r.j(t)),new m(r,t)}for(r=a;0<=e.l(t);){for(n=Math.max(1,Math.floor(e.m()/t.m())),s=48>=(s=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,s-48),l=(i=o(n)).j(t);h(l)||0<l.l(e);)l=(i=o(n-=s)).j(t);u(i)&&(i=c),r=r.add(i),e=f(e,l)}return new m(r,e)}function v(e){for(var t=e.g.length+1,n=[],r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new s(n,e.h)}function y(e,t){var n=t>>5;t%=32;for(var r=e.g.length-n,i=[],o=0;o<r;o++)i[o]=0<t?e.i(o+n)>>>t|e.i(o+n+1)<<32-t:e.i(o+n);return new s(i,e.h)}(e=s.prototype).m=function(){if(h(this))return-d(this).m();for(var e=0,t=1,n=0;n<this.g.length;n++){var s=this.i(n);e+=(0<=s?s:4294967296+s)*t,t*=4294967296}return e},e.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(u(this))return"0";if(h(this))return"-"+d(this).toString(e);for(var t=o(Math.pow(e,6)),n=this,s="";;){var r=g(n,t).g,i=((0<(n=f(n,r.j(t))).g.length?n.g[0]:n.h)>>>0).toString(e);if(u(n=r))return i+s;for(;6>i.length;)i="0"+i;s=i+s}},e.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return h(e=f(this,e))?-1:u(e)?0:1},e.abs=function(){return h(this)?d(this):this},e.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0,i=0;i<=t;i++){var o=r+(65535&this.i(i))+(65535&e.i(i)),a=(o>>>16)+(this.i(i)>>>16)+(e.i(i)>>>16);r=a>>>16,o&=65535,a&=65535,n[i]=a<<16|o}return new s(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(u(this)||u(e))return a;if(h(this))return h(e)?d(this).j(d(e)):d(d(this).j(e));if(h(e))return d(this.j(d(e)));if(0>this.l(l)&&0>e.l(l))return o(this.m()*e.m());for(var t=this.g.length+e.g.length,n=[],r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<e.g.length;i++){var c=this.i(r)>>>16,f=65535&this.i(r),m=e.i(i)>>>16,g=65535&e.i(i);n[2*r+2*i]+=f*g,p(n,2*r+2*i),n[2*r+2*i+1]+=c*g,p(n,2*r+2*i+1),n[2*r+2*i+1]+=f*m,p(n,2*r+2*i+1),n[2*r+2*i+2]+=c*m,p(n,2*r+2*i+2)}for(r=0;r<t;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=t;r<2*t;r++)n[r]=0;return new s(n,0)},e.A=function(e){return g(this,e).h},e.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new s(n,this.h&e.h)},e.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new s(n,this.h|e.h)},e.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new s(n,this.h^e.h)},t.prototype.digest=t.prototype.v,t.prototype.reset=t.prototype.s,t.prototype.update=t.prototype.u,Bn=t,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.A,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=o,s.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var s=o(Math.pow(n,8)),r=a,i=0;i<t.length;i+=8){var c=Math.min(8,t.length-i),l=parseInt(t.substring(i,i+c),n);8>c?(c=o(Math.pow(n,c)),r=r.j(c).add(o(l))):r=(r=r.j(s)).add(o(l))}return r},jn=s}).apply(void 0!==qn?qn:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var zn,Kn,Hn,Gn,Wn,Qn,Yn,Jn,Xn="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
    Copyright The Closure Library Authors.
    SPDX-License-Identifier: Apache-2.0
    */(function(){var e,t="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,n){return e==Array.prototype||e==Object.prototype||(e[t]=n.value),e};var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Xn&&Xn];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(e,s){if(s)e:{var r=n;e=e.split(".");for(var i=0;i<e.length-1;i++){var o=e[i];if(!(o in r))break e;r=r[o]}(s=s(i=r[e=e[e.length-1]]))!=i&&null!=s&&t(r,e,{configurable:!0,writable:!0,value:s})}}("Array.prototype.values",(function(e){return e||function(){return function(e,t){e instanceof String&&(e+="");var n=0,s=!1,r={next:function(){if(!s&&n<e.length){var r=n++;return{value:t(r,e[r]),done:!1}}return s=!0,{done:!0,value:void 0}}};return r[Symbol.iterator]=function(){return r},r}(this,(function(e,t){return t}))}}));
/** @license

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
var s=s||{},r=this||self;function i(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){if(!e)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function l(e,t,n){return(l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:c).apply(null,arguments)}function u(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function h(e,t){function n(){}n.prototype=t.prototype,e.aa=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Qb=function(e,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return t.prototype[n].apply(e,r)}}function d(e){const t=e.length;if(0<t){const n=Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}return[]}function f(e,t){for(let t=1;t<arguments.length;t++){const n=arguments[t];if(i(n)){const t=e.length||0,s=n.length||0;e.length=t+s;for(let r=0;r<s;r++)e[t+r]=n[r]}else e.push(n)}}function p(e){return/^[\s\xa0]*$/.test(e)}function m(){var e=r.navigator;return e&&(e=e.userAgent)?e:""}function g(e){return g[" "](e),e}g[" "]=function(){};var v=!(-1==m().indexOf("Gecko")||-1!=m().toLowerCase().indexOf("webkit")&&-1==m().indexOf("Edge")||-1!=m().indexOf("Trident")||-1!=m().indexOf("MSIE")||-1!=m().indexOf("Edge"));function y(e,t,n){for(const s in e)t.call(n,e[s],s,e)}function w(e){const t={};for(const n in e)t[n]=e[n];return t}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(e,t){let n,s;for(let t=1;t<arguments.length;t++){for(n in s=arguments[t],s)e[n]=s[n];for(let t=0;t<_.length;t++)n=_[t],Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}}function T(e){var t=1;e=e.split(":");const n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function I(e){r.setTimeout((()=>{throw e}),0)}function E(){var e=N;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var k=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}((()=>new S),(e=>e.reset()));class S{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let C,A=!1,N=new class{constructor(){this.h=this.g=null}add(e,t){const n=k.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},R=()=>{const e=r.Promise.resolve(void 0);C=()=>{e.then(D)}};var D=()=>{for(var e;e=E();){try{e.h.call(e.g)}catch(e){I(e)}var t=k;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}A=!1};function O(){this.s=this.s,this.C=this.C}function P(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}O.prototype.s=!1,O.prototype.ma=function(){this.s||(this.s=!0,this.N())},O.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},P.prototype.h=function(){this.defaultPrevented=!0};var x=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};r.addEventListener("test",e,t),r.removeEventListener("test",e,t)}catch(e){}return e}();function L(e,t){if(P.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,s=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(v){e:{try{g(t.nodeName);var r=!0;break e}catch(e){}r=!1}r||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:M[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&L.aa.h.call(this)}}h(L,P);var M={2:"touch",3:"pen",4:"mouse"};L.prototype.h=function(){L.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var U="closure_listenable_"+(1e6*Math.random()|0),$=0;function F(e,t,n,s,r){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!s,this.ha=r,this.key=++$,this.da=this.fa=!1}function V(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function j(e){this.src=e,this.g={},this.h=0}function B(e,t){var n=t.type;if(n in e.g){var s,r=e.g[n],i=Array.prototype.indexOf.call(r,t,void 0);(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(V(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function q(e,t,n,s){for(var r=0;r<e.length;++r){var i=e[r];if(!i.da&&i.listener==t&&i.capture==!!n&&i.ha==s)return r}return-1}j.prototype.add=function(e,t,n,s,r){var i=e.toString();(e=this.g[i])||(e=this.g[i]=[],this.h++);var o=q(e,t,s,r);return-1<o?(t=e[o],n||(t.fa=!1)):((t=new F(t,this.src,i,!!s,r)).fa=n,e.push(t)),t};var z="closure_lm_"+(1e6*Math.random()|0),K={};function H(e,t,n,s,r){if(s&&s.once)return W(e,t,n,s,r);if(Array.isArray(t)){for(var i=0;i<t.length;i++)H(e,t[i],n,s,r);return null}return n=te(n),e&&e[U]?e.K(t,n,o(s)?!!s.capture:!!s,r):G(e,t,n,!1,s,r)}function G(e,t,n,s,r,i){if(!t)throw Error("Invalid event type");var a=o(r)?!!r.capture:!!r,c=Z(e);if(c||(e[z]=c=new j(e)),(n=c.add(t,n,s,a,i)).proxy)return n;if(s=function(){function e(n){return t.call(e.src,e.listener,n)}const t=X;return e}(),n.proxy=s,s.src=e,s.listener=n,e.addEventListener)x||(r=a),void 0===r&&(r=!1),e.addEventListener(t.toString(),s,r);else if(e.attachEvent)e.attachEvent(J(t.toString()),s);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(s)}return n}function W(e,t,n,s,r){if(Array.isArray(t)){for(var i=0;i<t.length;i++)W(e,t[i],n,s,r);return null}return n=te(n),e&&e[U]?e.L(t,n,o(s)?!!s.capture:!!s,r):G(e,t,n,!0,s,r)}function Q(e,t,n,s,r){if(Array.isArray(t))for(var i=0;i<t.length;i++)Q(e,t[i],n,s,r);else s=o(s)?!!s.capture:!!s,n=te(n),e&&e[U]?(e=e.i,(t=String(t).toString())in e.g&&(-1<(n=q(i=e.g[t],n,s,r))&&(V(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete e.g[t],e.h--)))):e&&(e=Z(e))&&(t=e.g[t.toString()],e=-1,t&&(e=q(t,n,s,r)),(n=-1<e?t[e]:null)&&Y(n))}function Y(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[U])B(t.i,e);else{var n=e.type,s=e.proxy;t.removeEventListener?t.removeEventListener(n,s,e.capture):t.detachEvent?t.detachEvent(J(n),s):t.addListener&&t.removeListener&&t.removeListener(s),(n=Z(t))?(B(n,e),0==n.h&&(n.src=null,t[z]=null)):V(e)}}}function J(e){return e in K?K[e]:K[e]="on"+e}function X(e,t){if(e.da)e=!0;else{t=new L(t,this);var n=e.listener,s=e.ha||e.src;e.fa&&Y(e),e=n.call(s,t)}return e}function Z(e){return(e=e[z])instanceof j?e:null}var ee="__closure_events_fn_"+(1e9*Math.random()>>>0);function te(e){return"function"==typeof e?e:(e[ee]||(e[ee]=function(t){return e.handleEvent(t)}),e[ee])}function ne(){O.call(this),this.i=new j(this),this.M=this,this.F=null}function se(e,t){var n,s=e.F;if(s)for(n=[];s;s=s.F)n.push(s);if(e=e.M,s=t.type||t,"string"==typeof t)t=new P(t,e);else if(t instanceof P)t.target=t.target||e;else{var r=t;b(t=new P(s,e),r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=t.g=n[i];r=re(o,s,!0,t)&&r}if(r=re(o=t.g=e,s,!0,t)&&r,r=re(o,s,!1,t)&&r,n)for(i=0;i<n.length;i++)r=re(o=t.g=n[i],s,!1,t)&&r}function re(e,t,n,s){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var r=!0,i=0;i<t.length;++i){var o=t[i];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&B(e.i,o),r=!1!==a.call(c,s)&&r}}return r&&!s.defaultPrevented}function ie(e,t,n){if("function"==typeof e)n&&(e=l(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=l(e.handleEvent,e)}return 2147483647<Number(t)?-1:r.setTimeout(e,t||0)}function oe(e){e.g=ie((()=>{e.g=null,e.i&&(e.i=!1,oe(e))}),e.l);const t=e.h;e.h=null,e.m.apply(null,t)}h(ne,O),ne.prototype[U]=!0,ne.prototype.removeEventListener=function(e,t,n,s){Q(this,e,t,n,s)},ne.prototype.N=function(){if(ne.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)V(n[s]);delete t.g[e],t.h--}}this.F=null},ne.prototype.K=function(e,t,n,s){return this.i.add(String(e),t,!1,n,s)},ne.prototype.L=function(e,t,n,s){return this.i.add(String(e),t,!0,n,s)};class ae extends O{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:oe(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ce(e){O.call(this),this.h=e,this.g={}}h(ce,O);var le=[];function ue(e){y(e.g,(function(e,t){this.g.hasOwnProperty(t)&&Y(e)}),e),e.g={}}ce.prototype.N=function(){ce.aa.N.call(this),ue(this)},ce.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var he=r.JSON.stringify,de=r.JSON.parse,fe=class{stringify(e){return r.JSON.stringify(e,void 0)}parse(e){return r.JSON.parse(e,void 0)}};function pe(){}function me(e){return e.h||(e.h=e.i())}function ge(){}pe.prototype.h=null;var ve={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ye(){P.call(this,"d")}function we(){P.call(this,"c")}h(ye,P),h(we,P);var _e={},be=null;function Te(){return be=be||new ne}function Ie(e){P.call(this,_e.La,e)}function Ee(e){const t=Te();se(t,new Ie(t))}function ke(e,t){P.call(this,_e.STAT_EVENT,e),this.stat=t}function Se(e){const t=Te();se(t,new ke(t,e))}function Ce(e,t){P.call(this,_e.Ma,e),this.size=t}function Ae(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return r.setTimeout((function(){e()}),t)}function Ne(){this.g=!0}function Re(e,t,n,s){e.info((function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var s=n[e];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<r.length;o++)r[o]=""}}}return he(n)}catch(e){return t}}(e,n)+(s?" "+s:"")}))}_e.La="serverreachability",h(Ie,P),_e.STAT_EVENT="statevent",h(ke,P),_e.Ma="timingevent",h(Ce,P),Ne.prototype.xa=function(){this.g=!1},Ne.prototype.info=function(){};var De,Oe={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Pe={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function xe(){}function Le(e,t,n,s){this.j=e,this.i=t,this.l=n,this.R=s||1,this.U=new ce(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Me}function Me(){this.i=null,this.g="",this.h=!1}h(xe,pe),xe.prototype.g=function(){return new XMLHttpRequest},xe.prototype.i=function(){return{}},De=new xe;var Ue={},$e={};function Fe(e,t,n){e.L=1,e.v=ht(ot(t)),e.m=n,e.P=!0,Ve(e,null)}function Ve(e,t){e.F=Date.now(),qe(e),e.A=ot(e.v);var n=e.A,s=e.R;Array.isArray(s)||(s=[String(s)]),kt(n.i,"t",s),e.C=0,n=e.j.J,e.h=new Me,e.g=fn(e.j,n?t:null,!e.m),0<e.O&&(e.M=new ae(l(e.Y,e,e.g),e.O)),t=e.U,n=e.g,s=e.ca;var r="readystatechange";Array.isArray(r)||(r&&(le[0]=r.toString()),r=le);for(var i=0;i<r.length;i++){var o=H(n,r[i],s||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}t=e.H?w(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),Ee(),function(e,t,n,s,r,i){e.info((function(){if(e.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&"type"==h[1]?o+(u+"=")+l+"&":o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+t+"\n"+n+"\n"+o}))}(e.i,e.u,e.A,e.l,e.R,e.m)}function je(e){return!!e.g&&("GET"==e.u&&2!=e.L&&e.j.Ca)}function Be(e,t){var n=e.C,s=t.indexOf("\n",n);return-1==s?$e:(n=Number(t.substring(n,s)),isNaN(n)?Ue:(s+=1)+n>t.length?$e:(t=t.slice(s,s+n),e.C=s+n,t))}function qe(e){e.S=Date.now()+e.I,ze(e,e.I)}function ze(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=Ae(l(e.ba,e),t)}function Ke(e){e.B&&(r.clearTimeout(e.B),e.B=null)}function He(e){0==e.j.G||e.J||cn(e.j,e)}function Ge(e){Ke(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,ue(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function We(e,t){try{var n=e.j;if(0!=n.G&&(n.g==e||Ze(n.h,e)))if(!e.K&&Ze(n.h,e)&&3==n.G){try{var s=n.Da.g.parse(t)}catch(e){s=null}if(Array.isArray(s)&&3==s.length){var r=s;if(0==r[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;an(n),Yt(n)}sn(n),Se(18)}}else n.za=r[1],0<n.za-n.T&&37500>r[2]&&n.F&&0==n.v&&!n.C&&(n.C=Ae(l(n.Za,n),6e3));if(1>=Xe(n.h)&&n.ca){try{n.ca()}catch(e){}n.ca=void 0}}else un(n,11)}else if((e.K||n.g==e)&&an(n),!p(t))for(r=n.Da.g.parse(t),t=0;t<r.length;t++){let l=r[t];if(n.T=l[0],l=l[1],2==n.G)if("c"==l[0]){n.K=l[1],n.ia=l[2];const t=l[3];null!=t&&(n.la=t,n.j.info("VER="+n.la));const r=l[4];null!=r&&(n.Aa=r,n.j.info("SVER="+n.Aa));const u=l[5];null!=u&&"number"==typeof u&&0<u&&(s=1.5*u,n.L=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var i=s.h;i.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(et(i,i.h),i.h=null))}if(s.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(s.ya=e,ut(s.I,s.D,e))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-e.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=e;if((s=n).qa=dn(s,s.J?s.ia:null,s.W),o.K){tt(s.h,o);var a=o,c=s.L;c&&(a.I=c),a.B&&(Ke(a),qe(a)),s.g=o}else nn(s);0<n.i.length&&Xt(n)}else"stop"!=l[0]&&"close"!=l[0]||un(n,7);else 3==n.G&&("stop"==l[0]||"close"==l[0]?"stop"==l[0]?un(n,7):Qt(n):"noop"!=l[0]&&n.l&&n.l.ta(l),n.v=0)}Ee()}catch(e){}}Le.prototype.ca=function(e){e=e.target;const t=this.M;t&&3==Kt(e)?t.j():this.Y(e)},Le.prototype.Y=function(e){try{if(e==this.g)e:{const d=Kt(this.g);var t=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Ht(this.g)))){this.J||4!=d||7==t||Ee(),Ke(this);var n=this.g.Z();this.X=n;t:if(je(this)){var s=Ht(this.g);e="";var i=s.length,o=4==Kt(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Ge(this),He(this);var a="";break t}this.h.i=new r.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(s[t],{stream:!(o&&t==i-1)});s.length=0,this.h.g+=e,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(e,t,n,s,r,i,o){e.info((function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+t+"\n"+n+"\n"+i+" "+o}))}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){t:{if(this.g){var c,l=this.g;if((c=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(c)){var u=c;break t}}u=null}if(!(n=u)){this.o=!1,this.s=3,Se(12),Ge(this),He(this);break e}Re(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,We(this,n)}if(this.P){let e;for(n=!0;!this.J&&this.C<a.length;){if(e=Be(this,a),e==$e){4==d&&(this.s=4,Se(14),n=!1),Re(this.i,this.l,null,"[Incomplete Response]");break}if(e==Ue){this.s=4,Se(15),Re(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}Re(this.i,this.l,e,null),We(this,e)}if(je(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,Se(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),rn(h),h.M=!0,Se(11))}}else Re(this.i,this.l,a,"[Invalid Chunked Response]"),Ge(this),He(this)}else Re(this.i,this.l,a,null),We(this,a);4==d&&Ge(this),this.o&&!this.J&&(4==d?cn(this.j,this):(this.o=!1,qe(this)))}else(function(e){const t={};e=(e.g&&2<=Kt(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let s=0;s<e.length;s++){if(p(e[s]))continue;var n=T(e[s]);const r=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=t[r]||[];t[r]=i,i.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,(function(e){return e.join(", ")}))})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,Se(12)):(this.s=0,Se(13)),Ge(this),He(this)}}}catch(e){}},Le.prototype.cancel=function(){this.J=!0,Ge(this)},Le.prototype.ba=function(){this.B=null;const e=Date.now();0<=e-this.S?(function(e,t){e.info((function(){return"TIMEOUT: "+t}))}(this.i,this.A),2!=this.L&&(Ee(),Se(17)),Ge(this),this.s=2,He(this)):ze(this,this.S-e)};var Qe=class{constructor(e,t){this.g=e,this.map=t}};function Ye(e){this.l=e||10,r.PerformanceNavigationTiming?e=0<(e=r.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Je(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Xe(e){return e.h?1:e.g?e.g.size:0}function Ze(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function et(e,t){e.g?e.g.add(t):e.h=t}function tt(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function nt(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return d(e.i)}function st(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(i(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(i(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const s in e)t[n++]=s;return t}}}(e),s=function(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(i(e)){for(var t=[],n=e.length,s=0;s<n;s++)t.push(e[s]);return t}for(s in t=[],n=0,e)t[n++]=e[s];return t}(e),r=s.length,o=0;o<r;o++)t.call(void 0,s[o],n&&n[o],e)}Ye.prototype.cancel=function(){if(this.i=nt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var rt=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function it(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof it){this.h=e.h,at(this,e.j),this.o=e.o,this.g=e.g,ct(this,e.s),this.l=e.l;var t=e.i,n=new bt;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),lt(this,n),this.m=e.m}else e&&(t=String(e).match(rt))?(this.h=!1,at(this,t[1]||"",!0),this.o=dt(t[2]||""),this.g=dt(t[3]||"",!0),ct(this,t[4]),this.l=dt(t[5]||"",!0),lt(this,t[6]||"",!0),this.m=dt(t[7]||"")):(this.h=!1,this.i=new bt(null,this.h))}function ot(e){return new it(e)}function at(e,t,n){e.j=n?dt(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function ct(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function lt(e,t,n){t instanceof bt?(e.i=t,function(e,t){t&&!e.j&&(Tt(e),e.i=null,e.g.forEach((function(e,t){var n=t.toLowerCase();t!=n&&(It(this,t),kt(this,n,e))}),e)),e.j=t}(e.i,e.h)):(n||(t=ft(t,wt)),e.i=new bt(t,e.h))}function ut(e,t,n){e.i.set(t,n)}function ht(e){return ut(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function dt(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function ft(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,pt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function pt(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}it.prototype.toString=function(){var e=[],t=this.j;t&&e.push(ft(t,gt,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(ft(t,gt,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(ft(n,"/"==n.charAt(0)?yt:vt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",ft(n,_t)),e.join("")};var mt,gt=/[#\/\?@]/g,vt=/[#\?:]/g,yt=/[#\?]/g,wt=/[#\?@]/g,_t=/#/g;function bt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function Tt(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var s=e[n].indexOf("="),r=null;if(0<=s){var i=e[n].substring(0,s);r=e[n].substring(s+1)}else i=e[n];t(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}(e.i,(function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)})))}function It(e,t){Tt(e),t=St(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function Et(e,t){return Tt(e),t=St(e,t),e.g.has(t)}function kt(e,t,n){It(e,t),0<n.length&&(e.i=null,e.g.set(St(e,t),d(n)),e.h+=n.length)}function St(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function Ct(e,t,n,s,r){try{r&&(r.onload=null,r.onerror=null,r.onabort=null,r.ontimeout=null),s(n)}catch(e){}}function At(){this.g=new fe}function Nt(e,t,n){const s=n||"";try{st(e,(function(e,n){let r=e;o(e)&&(r=he(e)),t.push(s+n+"="+encodeURIComponent(r))}))}catch(e){throw t.push(s+"type="+encodeURIComponent("_badmap")),e}}function Rt(e){this.l=e.Ub||null,this.j=e.eb||!1}function Dt(e,t){ne.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function Ot(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function Pt(e){e.readyState=4,e.l=null,e.j=null,e.v=null,xt(e)}function xt(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Lt(e){let t="";return y(e,(function(e,n){t+=n,t+=":",t+=e,t+="\r\n"})),t}function Mt(e,t,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=Lt(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):ut(e,t,n))}function Ut(e){ne.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(e=bt.prototype).add=function(e,t){Tt(this),this.i=null,e=St(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){Tt(this),this.g.forEach((function(n,s){n.forEach((function(n){e.call(t,n,s,this)}),this)}),this)},e.na=function(){Tt(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let s=0;s<t.length;s++){const r=e[s];for(let e=0;e<r.length;e++)n.push(t[s])}return n},e.V=function(e){Tt(this);let t=[];if("string"==typeof e)Et(this,e)&&(t=t.concat(this.g.get(St(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},e.set=function(e,t){return Tt(this),this.i=null,Et(this,e=St(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&0<(e=this.V(e)).length?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var s=t[n];const i=encodeURIComponent(String(s)),o=this.V(s);for(s=0;s<o.length;s++){var r=i;""!==o[s]&&(r+="="+encodeURIComponent(String(o[s]))),e.push(r)}}return this.i=e.join("&")},h(Rt,pe),Rt.prototype.g=function(){return new Dt(this.l,this.j)},Rt.prototype.i=(mt={},function(){return mt}),h(Dt,ne),(e=Dt.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,xt(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||r).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch((()=>{})),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Pt(this)),this.readyState=0},e.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,xt(this)),this.g&&(this.readyState=3,xt(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==r.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ot(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))},e.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Pt(this):xt(this),3==this.readyState&&Ot(this)}},e.Ra=function(e){this.g&&(this.response=this.responseText=e,Pt(this))},e.Qa=function(e){this.g&&(this.response=e,Pt(this))},e.ga=function(){this.g&&Pt(this)},e.setRequestHeader=function(e,t){this.u.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Dt.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),h(Ut,ne);var $t=/^https?$/i,Ft=["POST","PUT"];function Vt(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,jt(e),qt(e)}function jt(e){e.A||(e.A=!0,se(e,"complete"),se(e,"error"))}function Bt(e){if(e.h&&void 0!==s&&(!e.v[1]||4!=Kt(e)||2!=e.Z()))if(e.u&&4==Kt(e))ie(e.Ea,0,e);else if(se(e,"readystatechange"),4==Kt(e)){e.h=!1;try{const s=e.Z();e:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var i;if(i=0===s){var o=String(e.D).match(rt)[1]||null;!o&&r.self&&r.self.location&&(o=r.self.location.protocol.slice(0,-1)),i=!$t.test(o?o.toLowerCase():"")}n=i}if(n)se(e,"complete"),se(e,"success");else{e.m=6;try{var a=2<Kt(e)?e.g.statusText:""}catch(e){a=""}e.l=a+" ["+e.Z()+"]",jt(e)}}finally{qt(e)}}}function qt(e,t){if(e.g){zt(e);const n=e.g,s=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||se(e,"ready");try{n.onreadystatechange=s}catch(e){}}}function zt(e){e.I&&(r.clearTimeout(e.I),e.I=null)}function Kt(e){return e.g?e.g.readyState:0}function Ht(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Gt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Wt(e){this.Aa=0,this.i=[],this.j=new Ne,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Gt("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Gt("baseRetryDelayMs",5e3,e),this.cb=Gt("retryDelaySeedMs",1e4,e),this.Wa=Gt("forwardChannelMaxRetries",2,e),this.wa=Gt("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new Ye(e&&e.concurrentRequestLimit),this.Da=new At,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function Qt(e){if(Jt(e),3==e.G){var t=e.U++,n=ot(e.I);if(ut(n,"SID",e.K),ut(n,"RID",t),ut(n,"TYPE","terminate"),en(e,n),(t=new Le(e,e.j,t)).L=2,t.v=ht(ot(n)),n=!1,r.navigator&&r.navigator.sendBeacon)try{n=r.navigator.sendBeacon(t.v.toString(),"")}catch(e){}!n&&r.Image&&((new Image).src=t.v,n=!0),n||(t.g=fn(t.j,null),t.g.ea(t.v)),t.F=Date.now(),qe(t)}hn(e)}function Yt(e){e.g&&(rn(e),e.g.cancel(),e.g=null)}function Jt(e){Yt(e),e.u&&(r.clearTimeout(e.u),e.u=null),an(e),e.h.cancel(),e.s&&("number"==typeof e.s&&r.clearTimeout(e.s),e.s=null)}function Xt(e){if(!Je(e.h)&&!e.s){e.s=!0;var t=e.Ga;C||R(),A||(C(),A=!0),N.add(t,e),e.B=0}}function Zt(e,t){var n;n=t?t.l:e.U++;const s=ot(e.I);ut(s,"SID",e.K),ut(s,"RID",n),ut(s,"AID",e.T),en(e,s),e.m&&e.o&&Mt(s,e.m,e.o),n=new Le(e,e.j,n,e.B+1),null===e.m&&(n.H=e.o),t&&(e.i=t.D.concat(e.i)),t=tn(e,n,1e3),n.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),et(e.h,n),Fe(n,s,t)}function en(e,t){e.H&&y(e.H,(function(e,n){ut(t,n,e)})),e.l&&st({},(function(e,n){ut(t,n,e)}))}function tn(e,t,n){n=Math.min(e.i.length,n);var s=e.l?l(e.l.Na,e.l,e):null;e:{var r=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=r[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let i=!0;for(let o=0;o<n;o++){let n=r[o].g;const a=r[o].map;if(n-=t,0>n)t=Math.max(0,r[o].g-100),i=!1;else try{Nt(a,e,"req"+n+"_")}catch(e){s&&s(a)}}if(i){s=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,s}function nn(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;C||R(),A||(C(),A=!0),N.add(t,e),e.v=0}}function sn(e){return!(e.g||e.u||3<=e.v)&&(e.Y++,e.u=Ae(l(e.Fa,e),ln(e,e.v)),e.v++,!0)}function rn(e){null!=e.A&&(r.clearTimeout(e.A),e.A=null)}function on(e){e.g=new Le(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=ot(e.qa);ut(t,"RID","rpc"),ut(t,"SID",e.K),ut(t,"AID",e.T),ut(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&ut(t,"TO",e.ja),ut(t,"TYPE","xmlhttp"),en(e,t),e.m&&e.o&&Mt(t,e.m,e.o),e.L&&(e.g.I=e.L);var n=e.g;e=e.ia,n.L=1,n.v=ht(ot(t)),n.m=null,n.P=!0,Ve(n,e)}function an(e){null!=e.C&&(r.clearTimeout(e.C),e.C=null)}function cn(e,t){var n=null;if(e.g==t){an(e),rn(e),e.g=null;var s=2}else{if(!Ze(e.h,t))return;n=t.D,tt(e.h,t),s=1}if(0!=e.G)if(t.o)if(1==s){n=t.m?t.m.length:0,t=Date.now()-t.F;var r=e.B;se(s=Te(),new Ce(s,n)),Xt(e)}else nn(e);else if(3==(r=t.s)||0==r&&0<t.X||!(1==s&&function(e,t){return!(Xe(e.h)>=e.h.j-(e.s?1:0)||(e.s?(e.i=t.D.concat(e.i),0):1==e.G||2==e.G||e.B>=(e.Va?0:e.Wa)||(e.s=Ae(l(e.Ga,e,t),ln(e,e.B)),e.B++,0)))}(e,t)||2==s&&sn(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),r){case 1:un(e,5);break;case 4:un(e,10);break;case 3:un(e,6);break;default:un(e,2)}}function ln(e,t){let n=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(n*=2),n*t}function un(e,t){if(e.j.info("Error code "+t),2==t){var n=l(e.fb,e),s=e.Xa;const t=!s;s=new it(s||"//www.google.com/images/cleardot.gif"),r.location&&"http"==r.location.protocol||at(s,"https"),ht(s),t?function(e,t){const n=new Ne;if(r.Image){const s=new Image;s.onload=u(Ct,n,"TestLoadImage: loaded",!0,t,s),s.onerror=u(Ct,n,"TestLoadImage: error",!1,t,s),s.onabort=u(Ct,n,"TestLoadImage: abort",!1,t,s),s.ontimeout=u(Ct,n,"TestLoadImage: timeout",!1,t,s),r.setTimeout((function(){s.ontimeout&&s.ontimeout()}),1e4),s.src=e}else t(!1)}(s.toString(),n):function(e,t){new Ne;const n=new AbortController,s=setTimeout((()=>{n.abort(),Ct(0,0,!1,t)}),1e4);fetch(e,{signal:n.signal}).then((e=>{clearTimeout(s),e.ok?Ct(0,0,!0,t):Ct(0,0,!1,t)})).catch((()=>{clearTimeout(s),Ct(0,0,!1,t)}))}(s.toString(),n)}else Se(2);e.G=0,e.l&&e.l.sa(t),hn(e),Jt(e)}function hn(e){if(e.G=0,e.ka=[],e.l){const t=nt(e.h);0==t.length&&0==e.i.length||(f(e.ka,t),f(e.ka,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.ra()}}function dn(e,t,n){var s=n instanceof it?ot(n):new it(n);if(""!=s.g)t&&(s.g=t+"."+s.g),ct(s,s.s);else{var i=r.location;s=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var o=new it(null);s&&at(o,s),t&&(o.g=t),i&&ct(o,i),n&&(o.l=n),s=o}return n=e.D,t=e.ya,n&&t&&ut(s,n,t),ut(s,"VER",e.la),en(e,s),s}function fn(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Ca&&!e.pa?new Ut(new Rt({eb:n})):new Ut(e.pa)).Ha(e.J),t}function pn(){}function mn(){}function gn(e,t){ne.call(this),this.g=new Wt(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!p(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!p(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new wn(this)}function vn(e){ye.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function yn(){we.call(this),this.status=1}function wn(e){this.g=e}(e=Ut.prototype).Ha=function(e){this.J=e},e.ea=function(e,t,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():De.g(),this.v=this.o?me(this.o):me(De),this.g.onreadystatechange=l(this.Ea,this);try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(e){return void Vt(this,e)}if(e=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var i in s)n.set(i,s[i]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const e of s.keys())n.set(e,s.get(e))}s=Array.from(n.keys()).find((e=>"content-type"==e.toLowerCase())),i=r.FormData&&e instanceof r.FormData,!(0<=Array.prototype.indexOf.call(Ft,t,void 0))||s||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[e,t]of n)this.g.setRequestHeader(e,t);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{zt(this),this.u=!0,this.g.send(e),this.u=!1}catch(e){Vt(this,e)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,se(this,"complete"),se(this,"abort"),qt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),qt(this,!0)),Ut.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?Bt(this):this.bb())},e.bb=function(){Bt(this)},e.isActive=function(){return!!this.g},e.Z=function(){try{return 2<Kt(this)?this.g.status:-1}catch(e){return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),de(t)}},e.Ba=function(){return this.m},e.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Wt.prototype).la=8,e.G=1,e.connect=function(e,t,n,s){Se(0),this.W=e,this.H=t||{},n&&void 0!==s&&(this.H.OSID=n,this.H.OAID=s),this.F=this.X,this.I=dn(this,null,this.W),Xt(this)},e.Ga=function(e){if(this.s)if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const r=new Le(this,this.j,e);let i=this.o;if(this.S&&(i?(i=w(i),b(i,this.S)):i=this.S),null!==this.m||this.O||(r.H=i,i=null),this.P)e:{for(var t=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.map&&"string"==typeof(s=s.map.__data__)?s.length:void 0))break;if(4096<(t+=s)){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=tn(this,r,t),ut(n=ot(this.I),"RID",e),ut(n,"CVER",22),this.D&&ut(n,"X-HTTP-Session-Id",this.D),en(this,n),i&&(this.O?t="headers="+encodeURIComponent(String(Lt(i)))+"&"+t:this.m&&Mt(n,this.m,i)),et(this.h,r),this.Ua&&ut(n,"TYPE","init"),this.P?(ut(n,"$req",t),ut(n,"SID","null"),r.T=!0,Fe(r,n,null)):Fe(r,n,t),this.G=2}}else 3==this.G&&(e?Zt(this,e):0==this.i.length||Je(this.h)||Zt(this))},e.Fa=function(){if(this.u=null,on(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=Ae(l(this.ab,this),e)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Se(10),Yt(this),on(this))},e.Za=function(){null!=this.C&&(this.C=null,Yt(this),sn(this),Se(19))},e.fb=function(e){e?(this.j.info("Successfully pinged google.com"),Se(2)):(this.j.info("Failed to ping google.com"),Se(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=pn.prototype).ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){},mn.prototype.g=function(e,t){return new gn(e,t)},h(gn,ne),gn.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},gn.prototype.close=function(){Qt(this.g)},gn.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.u&&((n={}).__data__=he(e),e=n);t.i.push(new Qe(t.Ya++,e)),3==t.G&&Xt(t)},gn.prototype.N=function(){this.g.l=null,delete this.j,Qt(this.g),delete this.g,gn.aa.N.call(this)},h(vn,ye),h(yn,we),h(wn,pn),wn.prototype.ua=function(){se(this.g,"a")},wn.prototype.ta=function(e){se(this.g,new vn(e))},wn.prototype.sa=function(e){se(this.g,new yn)},wn.prototype.ra=function(){se(this.g,"b")},mn.prototype.createWebChannel=mn.prototype.g,gn.prototype.send=gn.prototype.o,gn.prototype.open=gn.prototype.m,gn.prototype.close=gn.prototype.close,Jn=function(){return new mn},Yn=function(){return Te()},Qn=_e,Wn={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Oe.NO_ERROR=0,Oe.TIMEOUT=8,Oe.HTTP_ERROR=6,Gn=Oe,Pe.COMPLETE="complete",Hn=Pe,ge.EventType=ve,ve.OPEN="a",ve.CLOSE="b",ve.ERROR="c",ve.MESSAGE="d",ne.prototype.listen=ne.prototype.K,Kn=ge,Ut.prototype.listenOnce=Ut.prototype.L,Ut.prototype.getLastError=Ut.prototype.Ka,Ut.prototype.getLastErrorCode=Ut.prototype.Ba,Ut.prototype.getStatus=Ut.prototype.Z,Ut.prototype.getResponseJson=Ut.prototype.Oa,Ut.prototype.getResponseText=Ut.prototype.oa,Ut.prototype.send=Ut.prototype.ea,Ut.prototype.setWithCredentials=Ut.prototype.Ha,zn=Ut}).apply(void 0!==Xn?Xn:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Zn="@firebase/firestore";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class es{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}es.UNAUTHENTICATED=new es(null),es.GOOGLE_CREDENTIALS=new es("google-credentials-uid"),es.FIRST_PARTY=new es("first-party-uid"),es.MOCK_USER=new es("mock-user");
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
let ts="10.14.0";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const ns=new Kt("@firebase/firestore");function ss(){return ns.logLevel}function rs(e,...t){if(ns.logLevel<=Vt.DEBUG){const n=t.map(as);ns.debug(`Firestore (${ts}): ${e}`,...n)}}function is(e,...t){if(ns.logLevel<=Vt.ERROR){const n=t.map(as);ns.error(`Firestore (${ts}): ${e}`,...n)}}function os(e,...t){if(ns.logLevel<=Vt.WARN){const n=t.map(as);ns.warn(`Firestore (${ts}): ${e}`,...n)}}function as(e){if("string"==typeof e)return e;try{
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function cs(e="Unexpected state"){const t=`FIRESTORE (${ts}) INTERNAL ASSERTION FAILED: `+e;throw is(t),new Error(t)}function ls(e,t){e||cs()}function us(e,t){return e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const hs={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ds extends Ct{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class fs{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ps{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ms{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(es.UNAUTHENTICATED)))}shutdown(){}}class gs{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class vs{constructor(e){this.t=e,this.currentUser=es.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ls(void 0===this.o);let n=this.i;const s=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let r=new fs;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new fs,e.enqueueRetryable((()=>s(this.currentUser)))};const i=()=>{const t=r;e.enqueueRetryable((async()=>{await t.promise,await s(this.currentUser)}))},o=e=>{rs("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit((e=>o(e))),setTimeout((()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(rs("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new fs)}}),0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((t=>this.i!==e?(rs("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(ls("string"==typeof t.accessToken),new ps(t.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ls(null===e||"string"==typeof e),new es(e)}}class ys{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=es.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class ws{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new ys(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(es.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class _s{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class bs{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ls(void 0===this.o);const n=e=>{null!=e.error&&rs("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.R;return this.R=e.token,rs("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable((()=>n(t)))};const s=e=>{rs("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((e=>s(e))),setTimeout((()=>{if(!this.appCheck){const e=this.A.getImmediate({optional:!0});e?s(e):rs("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((e=>e?(ls("string"==typeof e.token),this.R=e.token,new _s(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Ts(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Is{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(256/62);let n="";for(;n.length<20;){const s=Ts(40);for(let r=0;r<s.length;++r)n.length<20&&s[r]<t&&(n+=e.charAt(s[r]%62))}return n}}function Es(e,t){return e<t?-1:e>t?1:0}function ks(e,t,n){return e.length===t.length&&e.every(((e,s)=>n(e,t[s])))}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ss{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new ds(hs.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new ds(hs.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new ds(hs.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ds(hs.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ss.fromMillis(Date.now())}static fromDate(e){return Ss.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new Ss(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Es(this.nanoseconds,e.nanoseconds):Es(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Cs{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Cs(e)}static min(){return new Cs(new Ss(0,0))}static max(){return new Cs(new Ss(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class As{constructor(e,t,n){void 0===t?t=0:t>e.length&&cs(),void 0===n?n=e.length-t:n>e.length-t&&cs(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===As.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof As?e.forEach((e=>{t.push(e)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const n=e.get(s),r=t.get(s);if(n<r)return-1;if(n>r)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Ns extends As{construct(e,t,n){return new Ns(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new ds(hs.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((e=>e.length>0)))}return new Ns(t)}static emptyPath(){return new Ns([])}}const Rs=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ds extends As{construct(e,t,n){return new Ds(e,t,n)}static isValidIdentifier(e){return Rs.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ds.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new Ds(["__name__"])}static fromServerFormat(e){const t=[];let n="",s=0;const r=()=>{if(0===n.length)throw new ds(hs.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;s<e.length;){const t=e[s];if("\\"===t){if(s+1===e.length)throw new ds(hs.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[s+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new ds(hs.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,s+=2}else"`"===t?(i=!i,s++):"."!==t||i?(n+=t,s++):(r(),s++)}if(r(),i)throw new ds(hs.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ds(t)}static emptyPath(){return new Ds([])}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Os{constructor(e){this.path=e}static fromPath(e){return new Os(Ns.fromString(e))}static fromName(e){return new Os(Ns.fromString(e).popFirst(5))}static empty(){return new Os(Ns.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Ns.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Ns.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Os(new Ns(e.slice()))}}function Ps(e){return new xs(e.readTime,e.key,-1)}class xs{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new xs(Cs.min(),Os.empty(),-1)}static max(){return new xs(Cs.max(),Os.empty(),-1)}}function Ls(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=Os.comparator(e.documentKey,t.documentKey),0!==n?n:Es(e.largestBatchId,t.largestBatchId))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Ms="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Us{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */async function $s(e){if(e.code!==hs.FAILED_PRECONDITION||e.message!==Ms)throw e;rs("LocalStore","Unexpectedly lost primary lease")}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Fs{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&cs(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new Fs(((n,s)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,s)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof Fs?t:Fs.resolve(t)}catch(e){return Fs.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):Fs.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):Fs.reject(t)}static resolve(e){return new Fs(((t,n)=>{t(e)}))}static reject(e){return new Fs(((t,n)=>{n(e)}))}static waitFor(e){return new Fs(((t,n)=>{let s=0,r=0,i=!1;e.forEach((e=>{++s,e.next((()=>{++r,i&&r===s&&t()}),(e=>n(e)))})),i=!0,r===s&&t()}))}static or(e){let t=Fs.resolve(!1);for(const n of e)t=t.next((e=>e?Fs.resolve(e):n()));return t}static forEach(e,t){const n=[];return e.forEach(((e,s)=>{n.push(t.call(this,e,s))})),this.waitFor(n)}static mapArray(e,t){return new Fs(((n,s)=>{const r=e.length,i=new Array(r);let o=0;for(let a=0;a<r;a++){const c=a;t(e[c]).next((e=>{i[c]=e,++o,o===r&&n(i)}),(e=>s(e)))}}))}static doWhile(e,t){return new Fs(((n,s)=>{const r=()=>{!0===e()?t().next((()=>{r()}),s):n()};r()}))}}function Vs(e){return"IndexedDbTransactionError"===e.name}
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class js{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ie(e),this.se=e=>t.writeSequenceNumber(e))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}function Bs(e){return null==e}function qs(e){return 0===e&&1/e==-1/0}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function zs(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Ks(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Hs(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */js.oe=-1;class Gs{constructor(e,t){this.comparator=e,this.root=t||Qs.EMPTY}insert(e,t){return new Gs(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Qs.BLACK,null,null))}remove(e){return new Gs(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qs.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(0===s)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ws(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ws(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ws(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ws(this.root,e,this.comparator,!0)}}class Ws{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?n(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(0===r){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Qs{constructor(e,t,n,s,r){this.key=e,this.value=t,this.color=null!=n?n:Qs.RED,this.left=null!=s?s:Qs.EMPTY,this.right=null!=r?r:Qs.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,r){return new Qs(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=r?r:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const r=n(e,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(e,t,n),null):0===r?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Qs.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===t(e,s.key)){if(s.right.isEmpty())return Qs.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qs.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qs.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw cs();if(this.right.isRed())throw cs();const e=this.left.check();if(e!==this.right.check())throw cs();return e+(this.isRed()?0:1)}}Qs.EMPTY=null,Qs.RED=!0,Qs.BLACK=!1,Qs.EMPTY=new class{constructor(){this.size=0}get key(){throw cs()}get value(){throw cs()}get color(){throw cs()}get left(){throw cs()}get right(){throw cs()}copy(e,t,n,s,r){return this}insert(e,t,n){return new Qs(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Ys{constructor(e){this.comparator=e,this.data=new Gs(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Js(this.data.getIterator())}getIteratorFrom(e){return new Js(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((e=>{t=t.add(e)})),t}isEqual(e){if(!(e instanceof Ys))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,s=n.getNext().key;if(0!==this.comparator(e,s))return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Ys(this.comparator);return t.data=e,t}}class Js{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Xs{constructor(e){this.fields=e,e.sort(Ds.comparator)}static empty(){return new Xs([])}unionWith(e){let t=new Ys(Ds.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new Xs(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ks(this.fields,e.fields,((e,t)=>e.isEqual(t)))}}
/**
     * @license
     * Copyright 2023 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Zs extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class er{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new Zs("Invalid base64 string: "+e):e}}(e);return new er(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new er(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Es(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}er.EMPTY_BYTE_STRING=new er("");const tr=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nr(e){if(ls(!!e),"string"==typeof e){let t=0;const n=tr.exec(e);if(ls(!!n),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const s=new Date(e);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:sr(e.seconds),nanos:sr(e.nanos)}}function sr(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function rr(e){return"string"==typeof e?er.fromBase64String(e):er.fromUint8Array(e)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ir(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function or(e){const t=e.mapValue.fields.__previous_value__;return ir(t)?or(t):t}function ar(e){const t=nr(e.mapValue.fields.__local_write_time__.timestampValue);return new Ss(t.seconds,t.nanos)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class cr{constructor(e,t,n,s,r,i,o,a,c){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c}}class lr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new lr("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof lr&&e.projectId===this.projectId&&e.database===this.database}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const ur={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function hr(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?ir(e)?4:function(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e)?9007199254740991:function(e){var t,n;return"__vector__"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}(e)?10:11:cs()}function dr(e,t){if(e===t)return!0;const n=hr(e);if(n!==hr(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return ar(e).isEqual(ar(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=nr(e.timestampValue),s=nr(t.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return rr(e.bytesValue).isEqual(rr(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return sr(e.geoPointValue.latitude)===sr(t.geoPointValue.latitude)&&sr(e.geoPointValue.longitude)===sr(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return sr(e.integerValue)===sr(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=sr(e.doubleValue),s=sr(t.doubleValue);return n===s?qs(n)===qs(s):isNaN(n)&&isNaN(s)}return!1}(e,t);case 9:return ks(e.arrayValue.values||[],t.arrayValue.values||[],dr);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},s=t.mapValue.fields||{};if(zs(n)!==zs(s))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===s[e]||!dr(n[e],s[e])))return!1;return!0}(e,t);default:return cs()}}function fr(e,t){return void 0!==(e.values||[]).find((e=>dr(e,t)))}function pr(e,t){if(e===t)return 0;const n=hr(e),s=hr(t);if(n!==s)return Es(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return Es(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=sr(e.integerValue||e.doubleValue),s=sr(t.integerValue||t.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(e,t);case 3:return mr(e.timestampValue,t.timestampValue);case 4:return mr(ar(e),ar(t));case 5:return Es(e.stringValue,t.stringValue);case 6:return function(e,t){const n=rr(e),s=rr(t);return n.compareTo(s)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),s=t.split("/");for(let e=0;e<n.length&&e<s.length;e++){const t=Es(n[e],s[e]);if(0!==t)return t}return Es(n.length,s.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Es(sr(e.latitude),sr(t.latitude));return 0!==n?n:Es(sr(e.longitude),sr(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return gr(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,s,r,i;const o=e.fields||{},a=t.fields||{},c=null===(n=o.value)||void 0===n?void 0:n.arrayValue,l=null===(s=a.value)||void 0===s?void 0:s.arrayValue,u=Es((null===(r=null==c?void 0:c.values)||void 0===r?void 0:r.length)||0,(null===(i=null==l?void 0:l.values)||void 0===i?void 0:i.length)||0);return 0!==u?u:gr(c,l)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===ur.mapValue&&t===ur.mapValue)return 0;if(e===ur.mapValue)return 1;if(t===ur.mapValue)return-1;const n=e.fields||{},s=Object.keys(n),r=t.fields||{},i=Object.keys(r);s.sort(),i.sort();for(let e=0;e<s.length&&e<i.length;++e){const t=Es(s[e],i[e]);if(0!==t)return t;const o=pr(n[s[e]],r[i[e]]);if(0!==o)return o}return Es(s.length,i.length)}(e.mapValue,t.mapValue);default:throw cs()}}function mr(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Es(e,t);const n=nr(e),s=nr(t),r=Es(n.seconds,s.seconds);return 0!==r?r:Es(n.nanos,s.nanos)}function gr(e,t){const n=e.values||[],s=t.values||[];for(let e=0;e<n.length&&e<s.length;++e){const t=pr(n[e],s[e]);if(t)return t}return Es(n.length,s.length)}function vr(e){return yr(e)}function yr(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=nr(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return rr(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return Os.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const s of e.values||[])n?n=!1:t+=",",t+=yr(s);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",s=!0;for(const r of t)s?s=!1:n+=",",n+=`${r}:${yr(e.fields[r])}`;return n+"}"}(e.mapValue):cs()}function wr(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function _r(e){return!!e&&"integerValue"in e}function br(e){return!!e&&"arrayValue"in e}function Tr(e){return!!e&&"nullValue"in e}function Ir(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Er(e){return!!e&&"mapValue"in e}function kr(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return Ks(e.mapValue.fields,((e,n)=>t.mapValue.fields[e]=kr(n))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=kr(e.arrayValue.values[n]);return t}return Object.assign({},e)}class Sr{constructor(e){this.value=e}static empty(){return new Sr({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Er(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=kr(t)}setAll(e){let t=Ds.emptyPath(),n={},s=[];e.forEach(((e,r)=>{if(!t.isImmediateParentOf(r)){const e=this.getFieldsMap(t);this.applyChanges(e,n,s),n={},s=[],t=r.popLast()}e?n[r.lastSegment()]=kr(e):s.push(r.lastSegment())}));const r=this.getFieldsMap(t);this.applyChanges(r,n,s)}delete(e){const t=this.field(e.popLast());Er(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return dr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Er(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Ks(t,((t,n)=>e[t]=n));for(const t of n)delete e[t]}clone(){return new Sr(kr(this.value))}}function Cr(e){const t=[];return Ks(e.fields,((e,n)=>{const s=new Ds([e]);if(Er(n)){const e=Cr(n.mapValue).fields;if(0===e.length)t.push(s);else for(const n of e)t.push(s.child(n))}else t.push(s)})),new Xs(t)
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}class Ar{constructor(e,t,n,s,r,i,o){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=r,this.data=i,this.documentState=o}static newInvalidDocument(e){return new Ar(e,0,Cs.min(),Cs.min(),Cs.min(),Sr.empty(),0)}static newFoundDocument(e,t,n,s){return new Ar(e,1,t,Cs.min(),n,s,0)}static newNoDocument(e,t){return new Ar(e,2,t,Cs.min(),Cs.min(),Sr.empty(),0)}static newUnknownDocument(e,t){return new Ar(e,3,t,Cs.min(),Cs.min(),Sr.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Cs.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Sr.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Sr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Cs.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Ar&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ar(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Nr{constructor(e,t){this.position=e,this.inclusive=t}}function Rr(e,t,n){let s=0;for(let r=0;r<e.position.length;r++){const i=t[r],o=e.position[r];if(s=i.field.isKeyField()?Os.comparator(Os.fromName(o.referenceValue),n.key):pr(o,n.data.field(i.field)),"desc"===i.dir&&(s*=-1),0!==s)break}return s}function Dr(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!dr(e.position[n],t.position[n]))return!1;return!0}
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Or{constructor(e,t="asc"){this.field=e,this.dir=t}}function Pr(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class xr{}class Lr extends xr{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new Br(e,t,n):"array-contains"===t?new Hr(e,n):"in"===t?new Gr(e,n):"not-in"===t?new Wr(e,n):"array-contains-any"===t?new Qr(e,n):new Lr(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new qr(e,n):new zr(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(pr(t,this.value)):null!==t&&hr(this.value)===hr(t)&&this.matchesComparison(pr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return cs()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Mr extends xr{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Mr(e,t)}matches(e){return Ur(this)?void 0===this.filters.find((t=>!t.matches(e))):void 0!==this.filters.find((t=>t.matches(e)))}getFlattenedFilters(){return null!==this.ae||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Ur(e){return"and"===e.op}function $r(e){return function(e){for(const t of e.filters)if(t instanceof Mr)return!1;return!0}(e)&&Ur(e)}function Fr(e){if(e instanceof Lr)return e.field.canonicalString()+e.op.toString()+vr(e.value);if($r(e))return e.filters.map((e=>Fr(e))).join(",");{const t=e.filters.map((e=>Fr(e))).join(",");return`${e.op}(${t})`}}function Vr(e,t){return e instanceof Lr?function(e,t){return t instanceof Lr&&e.op===t.op&&e.field.isEqual(t.field)&&dr(e.value,t.value)}(e,t):e instanceof Mr?function(e,t){return t instanceof Mr&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce(((e,n,s)=>e&&Vr(n,t.filters[s])),!0)}(e,t):void cs()}function jr(e){return e instanceof Lr?function(e){return`${e.field.canonicalString()} ${e.op} ${vr(e.value)}`}(e):e instanceof Mr?function(e){return e.op.toString()+" {"+e.getFilters().map(jr).join(" ,")+"}"}(e):"Filter"}class Br extends Lr{constructor(e,t,n){super(e,t,n),this.key=Os.fromName(n.referenceValue)}matches(e){const t=Os.comparator(e.key,this.key);return this.matchesComparison(t)}}class qr extends Lr{constructor(e,t){super(e,"in",t),this.keys=Kr("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class zr extends Lr{constructor(e,t){super(e,"not-in",t),this.keys=Kr("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Kr(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map((e=>Os.fromName(e.referenceValue)))}class Hr extends Lr{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return br(t)&&fr(t.arrayValue,this.value)}}class Gr extends Lr{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&fr(this.value.arrayValue,t)}}class Wr extends Lr{constructor(e,t){super(e,"not-in",t)}matches(e){if(fr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&!fr(this.value.arrayValue,t)}}class Qr extends Lr{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!br(t)||!t.arrayValue.values)&&t.arrayValue.values.some((e=>fr(this.value.arrayValue,e)))}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Yr{constructor(e,t=null,n=[],s=[],r=null,i=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=r,this.startAt=i,this.endAt=o,this.ue=null}}function Jr(e,t=null,n=[],s=[],r=null,i=null,o=null){return new Yr(e,t,n,s,r,i,o)}function Xr(e){const t=us(e);if(null===t.ue){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((e=>Fr(e))).join(","),e+="|ob:",e+=t.orderBy.map((e=>function(e){return e.field.canonicalString()+e.dir}(e))).join(","),Bs(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((e=>vr(e))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((e=>vr(e))).join(",")),t.ue=e}return t.ue}function Zr(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Pr(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Vr(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Dr(e.startAt,t.startAt)&&Dr(e.endAt,t.endAt)}function ei(e){return Os.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ti{constructor(e,t=null,n=[],s=[],r=null,i="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=r,this.limitType=i,this.startAt=o,this.endAt=a,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function ni(e){return new ti(e)}function si(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function ri(e){return null!==e.collectionGroup}function ii(e){const t=us(e);if(null===t.ce){t.ce=[];const e=new Set;for(const n of t.explicitOrderBy)t.ce.push(n),e.add(n.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",s=function(e){let t=new Ys(Ds.comparator);return e.filters.forEach((e=>{e.getFlattenedFilters().forEach((e=>{e.isInequality()&&(t=t.add(e.field))}))})),t}(t);s.forEach((s=>{e.has(s.canonicalString())||s.isKeyField()||t.ce.push(new Or(s,n))})),e.has(Ds.keyField().canonicalString())||t.ce.push(new Or(Ds.keyField(),n))}return t.ce}function oi(e){const t=us(e);return t.le||(t.le=function(e,t){if("F"===e.limitType)return Jr(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map((e=>{const t="desc"===e.dir?"asc":"desc";return new Or(e.field,t)}));const n=e.endAt?new Nr(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new Nr(e.startAt.position,e.startAt.inclusive):null;return Jr(e.path,e.collectionGroup,t,e.filters,e.limit,n,s)}}(t,ii(e))),t.le}function ai(e,t){const n=e.filters.concat([t]);return new ti(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function ci(e,t,n){return new ti(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function li(e,t){return Zr(oi(e),oi(t))&&e.limitType===t.limitType}function ui(e){return`${Xr(oi(e))}|lt:${e.limitType}`}function hi(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map((e=>jr(e))).join(", ")}]`),Bs(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map((e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e))).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((e=>vr(e))).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((e=>vr(e))).join(",")),`Target(${t})`}(oi(e))}; limitType=${e.limitType})`}function di(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):Os.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of ii(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const s=Rr(e,t,n);return e.inclusive?s<=0:s<0}(e.startAt,ii(e),t))&&!(e.endAt&&!function(e,t,n){const s=Rr(e,t,n);return e.inclusive?s>=0:s>0}(e.endAt,ii(e),t))}(e,t)}function fi(e){return(t,n)=>{let s=!1;for(const r of ii(e)){const e=pi(r,t,n);if(0!==e)return e;s=s||r.field.isKeyField()}return 0}}function pi(e,t,n){const s=e.field.isKeyField()?Os.comparator(t.key,n.key):function(e,t,n){const s=t.data.field(e),r=n.data.field(e);return null!==s&&null!==r?pr(s,r):cs()}(e.field,t,n);switch(e.dir){case"asc":return s;case"desc":return-1*s;default:return cs()}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class mi{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,s]of n)if(this.equalsFn(t,e))return s}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(void 0===s)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<s.length;n++)if(this.equalsFn(s[n][0],e))return void(s[n]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return 1===n.length?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ks(this.inner,((t,n)=>{for(const[t,s]of n)e(t,s)}))}isEmpty(){return Hs(this.inner)}size(){return this.innerSize}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const gi=new Gs(Os.comparator);function vi(){return gi}const yi=new Gs(Os.comparator);function wi(...e){let t=yi;for(const n of e)t=t.insert(n.key,n);return t}function _i(e){let t=yi;return e.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function bi(){return Ii()}function Ti(){return Ii()}function Ii(){return new mi((e=>e.toString()),((e,t)=>e.isEqual(t)))}const Ei=new Gs(Os.comparator),ki=new Ys(Os.comparator);function Si(...e){let t=ki;for(const n of e)t=t.add(n);return t}const Ci=new Ys(Es);
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function Ai(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qs(t)?"-0":t}}function Ni(e){return{integerValue:""+e}}function Ri(e,t){return function(e){return"number"==typeof e&&Number.isInteger(e)&&!qs(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}(t)?Ni(t):Ai(e,t)}
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Di{constructor(){this._=void 0}}function Oi(e,t,n){return e instanceof Li?function(e,t){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&ir(t)&&(t=or(t)),t&&(n.fields.__previous_value__=t),{mapValue:n}}(n,t):e instanceof Mi?Ui(e,t):e instanceof $i?Fi(e,t):function(e,t){const n=xi(e,t),s=ji(n)+ji(e.Pe);return _r(n)&&_r(e.Pe)?Ni(s):Ai(e.serializer,s)}(e,t)}function Pi(e,t,n){return e instanceof Mi?Ui(e,t):e instanceof $i?Fi(e,t):n}function xi(e,t){return e instanceof Vi?function(e){return _r(e)||function(e){return!!e&&"doubleValue"in e}(e)}(t)?t:{integerValue:0}:null}class Li extends Di{}class Mi extends Di{constructor(e){super(),this.elements=e}}function Ui(e,t){const n=Bi(t);for(const t of e.elements)n.some((e=>dr(e,t)))||n.push(t);return{arrayValue:{values:n}}}class $i extends Di{constructor(e){super(),this.elements=e}}function Fi(e,t){let n=Bi(t);for(const t of e.elements)n=n.filter((e=>!dr(e,t)));return{arrayValue:{values:n}}}class Vi extends Di{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function ji(e){return sr(e.integerValue||e.doubleValue)}function Bi(e){return br(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class qi{constructor(e,t){this.field=e,this.transform=t}}class zi{constructor(e,t){this.version=e,this.transformResults=t}}class Ki{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ki}static exists(e){return new Ki(void 0,e)}static updateTime(e){return new Ki(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Hi(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Gi{}function Wi(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new ro(e.key,Ki.none()):new Zi(e.key,e.data,Ki.none());{const n=e.data,s=Sr.empty();let r=new Ys(Ds.comparator);for(let e of t.fields)if(!r.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?s.delete(e):s.set(e,t),r=r.add(e)}return new eo(e.key,s,new Xs(r.toArray()),Ki.none())}}function Qi(e,t,n){e instanceof Zi?function(e,t,n){const s=e.value.clone(),r=no(e.fieldTransforms,t,n.transformResults);s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):e instanceof eo?function(e,t,n){if(!Hi(e.precondition,t))return void t.convertToUnknownDocument(n.version);const s=no(e.fieldTransforms,t,n.transformResults),r=t.data;r.setAll(to(e)),r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function Yi(e,t,n,s){return e instanceof Zi?function(e,t,n,s){if(!Hi(e.precondition,t))return n;const r=e.value.clone(),i=so(e.fieldTransforms,s,t);return r.setAll(i),t.convertToFoundDocument(t.version,r).setHasLocalMutations(),null}(e,t,n,s):e instanceof eo?function(e,t,n,s){if(!Hi(e.precondition,t))return n;const r=so(e.fieldTransforms,s,t),i=t.data;return i.setAll(to(e)),i.setAll(r),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e=>e.field)))}(e,t,n,s):function(e,t,n){return Hi(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function Ji(e,t){let n=null;for(const s of e.fieldTransforms){const e=t.data.field(s.field),r=xi(s.transform,e||null);null!=r&&(null===n&&(n=Sr.empty()),n.set(s.field,r))}return n||null}function Xi(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&ks(e,t,((e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof Mi&&t instanceof Mi||e instanceof $i&&t instanceof $i?ks(e.elements,t.elements,dr):e instanceof Vi&&t instanceof Vi?dr(e.Pe,t.Pe):e instanceof Li&&t instanceof Li}(e.transform,t.transform)}(e,t)))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Zi extends Gi{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class eo extends Gi{constructor(e,t,n,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function to(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const s=e.data.field(n);t.set(n,s)}})),t}function no(e,t,n){const s=new Map;ls(e.length===n.length);for(let r=0;r<n.length;r++){const i=e[r],o=i.transform,a=t.data.field(i.field);s.set(i.field,Pi(o,a,n[r]))}return s}function so(e,t,n){const s=new Map;for(const r of e){const e=r.transform,i=n.data.field(r.field);s.set(r.field,Oi(e,i,t))}return s}class ro extends Gi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class io extends Gi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class oo{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const s=this.mutations[t];s.key.isEqual(e.key)&&Qi(s,e,n[t])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Yi(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Yi(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Ti();return this.mutations.forEach((s=>{const r=e.get(s.key),i=r.overlayedDocument;let o=this.applyToLocalView(i,r.mutatedFields);o=t.has(s.key)?null:o;const a=Wi(i,o);null!==a&&n.set(s.key,a),i.isValidDocument()||i.convertToNoDocument(Cs.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Si())}isEqual(e){return this.batchId===e.batchId&&ks(this.mutations,e.mutations,((e,t)=>Xi(e,t)))&&ks(this.baseMutations,e.baseMutations,((e,t)=>Xi(e,t)))}}class ao{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){ls(e.mutations.length===n.length);let s=Ei;const r=e.mutations;for(let e=0;e<r.length;e++)s=s.insert(r[e].key,n[e].version);return new ao(e,t,n,s)}}
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class co{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class lo{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var uo,ho;function fo(e){if(void 0===e)return is("GRPC error has no .code"),hs.UNKNOWN;switch(e){case uo.OK:return hs.OK;case uo.CANCELLED:return hs.CANCELLED;case uo.UNKNOWN:return hs.UNKNOWN;case uo.DEADLINE_EXCEEDED:return hs.DEADLINE_EXCEEDED;case uo.RESOURCE_EXHAUSTED:return hs.RESOURCE_EXHAUSTED;case uo.INTERNAL:return hs.INTERNAL;case uo.UNAVAILABLE:return hs.UNAVAILABLE;case uo.UNAUTHENTICATED:return hs.UNAUTHENTICATED;case uo.INVALID_ARGUMENT:return hs.INVALID_ARGUMENT;case uo.NOT_FOUND:return hs.NOT_FOUND;case uo.ALREADY_EXISTS:return hs.ALREADY_EXISTS;case uo.PERMISSION_DENIED:return hs.PERMISSION_DENIED;case uo.FAILED_PRECONDITION:return hs.FAILED_PRECONDITION;case uo.ABORTED:return hs.ABORTED;case uo.OUT_OF_RANGE:return hs.OUT_OF_RANGE;case uo.UNIMPLEMENTED:return hs.UNIMPLEMENTED;case uo.DATA_LOSS:return hs.DATA_LOSS;default:return cs()}}(ho=uo||(uo={}))[ho.OK=0]="OK",ho[ho.CANCELLED=1]="CANCELLED",ho[ho.UNKNOWN=2]="UNKNOWN",ho[ho.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ho[ho.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ho[ho.NOT_FOUND=5]="NOT_FOUND",ho[ho.ALREADY_EXISTS=6]="ALREADY_EXISTS",ho[ho.PERMISSION_DENIED=7]="PERMISSION_DENIED",ho[ho.UNAUTHENTICATED=16]="UNAUTHENTICATED",ho[ho.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ho[ho.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ho[ho.ABORTED=10]="ABORTED",ho[ho.OUT_OF_RANGE=11]="OUT_OF_RANGE",ho[ho.UNIMPLEMENTED=12]="UNIMPLEMENTED",ho[ho.INTERNAL=13]="INTERNAL",ho[ho.UNAVAILABLE=14]="UNAVAILABLE",ho[ho.DATA_LOSS=15]="DATA_LOSS";
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const po=new jn([4294967295,4294967295],0);function mo(e){const t=(new TextEncoder).encode(e),n=new Bn;return n.update(t),new Uint8Array(n.digest())}function go(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),s=t.getUint32(4,!0),r=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new jn([n,s],0),new jn([r,i],0)]}class vo{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new yo(`Invalid padding: ${t}`);if(n<0)throw new yo(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new yo(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new yo(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=jn.fromNumber(this.Ie)}Ee(e,t,n){let s=e.add(t.multiply(jn.fromNumber(n)));return 1===s.compare(po)&&(s=new jn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return 0!=(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.Ie)return!1;const t=mo(e),[n,s]=go(t);for(let e=0;e<this.hashCount;e++){const t=this.Ee(n,s,e);if(!this.de(t))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),i=new vo(r,s,t);return n.forEach((e=>i.insert(e))),i}insert(e){if(0===this.Ie)return;const t=mo(e),[n,s]=go(t);for(let e=0;e<this.hashCount;e++){const t=this.Ee(n,s,e);this.Ae(t)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class yo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class wo{constructor(e,t,n,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,_o.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new wo(Cs.min(),s,new Gs(Es),vi(),Si())}}class _o{constructor(e,t,n,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new _o(n,t,Si(),Si(),Si())}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class bo{constructor(e,t,n,s){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=s}}class To{constructor(e,t){this.targetId=e,this.me=t}}class Io{constructor(e,t,n=er.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Eo{constructor(){this.fe=0,this.ge=Co(),this.pe=er.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return 0!==this.fe}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Si(),t=Si(),n=Si();return this.ge.forEach(((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:cs()}})),new _o(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=Co()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ls(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class ko{constructor(e){this.Le=e,this.Be=new Map,this.ke=vi(),this.qe=So(),this.Qe=new Gs(Es)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:cs()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((e,n)=>{this.ze(n)&&t(n)}))}He(e){const t=e.targetId,n=e.me.count,s=this.Je(t);if(s){const r=s.target;if(ei(r))if(0===n){const e=new Os(r.path);this.Ue(t,e,Ar.newNoDocument(e,Cs.min()))}else ls(1===n);else{const s=this.Ye(t);if(s!==n){const n=this.Ze(e),r=n?this.Xe(n,e,s):1;if(0!==r){this.je(t);const e=2===r?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,e)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:r=0}=t;let i,o;try{i=rr(n).toUint8Array()}catch(e){if(e instanceof Zs)return os("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new vo(i,s,r)}catch(e){return os(e instanceof yo?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.Ie?null:o}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let s=0;return n.forEach((n=>{const r=this.Le.tt(),i=`projects/${r.projectId}/databases/${r.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.Ue(t,n,null),s++)})),s}rt(e){const t=new Map;this.Be.forEach(((n,s)=>{const r=this.Je(s);if(r){if(n.current&&ei(r.target)){const t=new Os(r.target.path);null!==this.ke.get(t)||this.it(s,t)||this.Ue(s,t,Ar.newNoDocument(t,e))}n.be&&(t.set(s,n.ve()),n.Ce())}}));let n=Si();this.qe.forEach(((e,t)=>{let s=!0;t.forEachWhile((e=>{const t=this.Je(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(s=!1,!1)})),s&&(n=n.add(e))})),this.ke.forEach(((t,n)=>n.setReadTime(e)));const s=new wo(e,t,this.Qe,this.ke,n);return this.ke=vi(),this.qe=So(),this.Qe=new Gs(Es),s}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Eo,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ys(Es),this.qe=this.qe.insert(e,t)),t}ze(e){const t=null!==this.Je(e);return t||rs("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Eo),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function So(){return new Gs(Os.comparator)}function Co(){return new Gs(Os.comparator)}const Ao={asc:"ASCENDING",desc:"DESCENDING"},No={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ro={and:"AND",or:"OR"};class Do{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Oo(e,t){return e.useProto3Json||Bs(t)?t:{value:t}}function Po(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function xo(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Lo(e,t){return Po(e,t.toTimestamp())}function Mo(e){return ls(!!e),Cs.fromTimestamp(function(e){const t=nr(e);return new Ss(t.seconds,t.nanos)}(e))}function Uo(e,t){return $o(e,t).canonicalString()}function $o(e,t){const n=function(e){return new Ns(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function Fo(e){const t=Ns.fromString(e);return ls(sa(t)),t}function Vo(e,t){return Uo(e.databaseId,t.path)}function jo(e,t){const n=Fo(t);if(n.get(1)!==e.databaseId.projectId)throw new ds(hs.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new ds(hs.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new Os(zo(n))}function Bo(e,t){return Uo(e.databaseId,t)}function qo(e){return new Ns(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function zo(e){return ls(e.length>4&&"documents"===e.get(4)),e.popFirst(5)}function Ko(e,t,n){return{name:Vo(e,t),fields:n.value.mapValue.fields}}function Ho(e,t){return{documents:[Bo(e,t.path)]}}function Go(e,t){const n={structuredQuery:{}},s=t.path;let r;null!==t.collectionGroup?(r=s,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(r=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=Bo(e,r);const i=function(e){if(0!==e.length)return ta(Mr.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map((e=>function(e){return{field:Zo(e.field),direction:Yo(e.dir)}}(e)))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Oo(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{_t:n,parent:r}}function Wo(e){let t=function(e){const t=Fo(e);return 4===t.length?Ns.emptyPath():zo(t)}(e.parent);const n=e.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){ls(1===s);const e=n.from[0];e.allDescendants?r=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=function(e){const t=Qo(e);return t instanceof Mr&&$r(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map((e=>function(e){return new Or(ea(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e)))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Bs(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Nr(n,t)}(n.startAt));let l=null;return n.endAt&&(l=function(e){const t=!e.before,n=e.values||[];return new Nr(n,t)}(n.endAt)),function(e,t,n,s,r,i,o,a){return new ti(e,t,n,s,r,i,o,a)}(t,r,o,i,a,"F",c,l)}function Qo(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=ea(e.unaryFilter.field);return Lr.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=ea(e.unaryFilter.field);return Lr.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ea(e.unaryFilter.field);return Lr.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=ea(e.unaryFilter.field);return Lr.create(r,"!=",{nullValue:"NULL_VALUE"});default:return cs()}}(e):void 0!==e.fieldFilter?function(e){return Lr.create(ea(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return cs()}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return Mr.create(e.compositeFilter.filters.map((e=>Qo(e))),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return cs()}}(e.compositeFilter.op))}(e):cs()}function Yo(e){return Ao[e]}function Jo(e){return No[e]}function Xo(e){return Ro[e]}function Zo(e){return{fieldPath:e.canonicalString()}}function ea(e){return Ds.fromServerFormat(e.fieldPath)}function ta(e){return e instanceof Lr?function(e){if("=="===e.op){if(Ir(e.value))return{unaryFilter:{field:Zo(e.field),op:"IS_NAN"}};if(Tr(e.value))return{unaryFilter:{field:Zo(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Ir(e.value))return{unaryFilter:{field:Zo(e.field),op:"IS_NOT_NAN"}};if(Tr(e.value))return{unaryFilter:{field:Zo(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Zo(e.field),op:Jo(e.op),value:e.value}}}(e):e instanceof Mr?function(e){const t=e.getFilters().map((e=>ta(e)));return 1===t.length?t[0]:{compositeFilter:{op:Xo(e.op),filters:t}}}(e):cs()}function na(e){const t=[];return e.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function sa(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ra{constructor(e,t,n,s,r=Cs.min(),i=Cs.min(),o=er.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new ra(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ra(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ra(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ra(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ia{constructor(e){this.ct=e}}function oa(e){const t=Wo({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?ci(t,t.limit,"L"):t}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class aa{constructor(){this.un=new ca}addToCollectionParentIndex(e,t){return this.un.add(t),Fs.resolve()}getCollectionParents(e,t){return Fs.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return Fs.resolve()}deleteFieldIndex(e,t){return Fs.resolve()}deleteAllFieldIndexes(e){return Fs.resolve()}createTargetIndexes(e,t){return Fs.resolve()}getDocumentsMatchingTarget(e,t){return Fs.resolve(null)}getIndexType(e,t){return Fs.resolve(0)}getFieldIndexes(e,t){return Fs.resolve([])}getNextCollectionGroupToUpdate(e){return Fs.resolve(null)}getMinOffset(e,t){return Fs.resolve(xs.min())}getMinOffsetFromCollectionGroup(e,t){return Fs.resolve(xs.min())}updateCollectionGroup(e,t,n){return Fs.resolve()}updateIndexEntries(e,t){return Fs.resolve()}}class ca{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new Ys(Ns.comparator),r=!s.has(n);return this.index[t]=s.add(n),r}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new Ys(Ns.comparator)).toArray()}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class la{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new la(0)}static kn(){return new la(-1)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ua{constructor(){this.changes=new mi((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ar.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?Fs.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ha{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class da{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((e=>(null!==n&&Yi(n.mutation,e,Xs.empty(),Ss.now()),e)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.getLocalViewOfDocuments(e,t,Si()).next((()=>t))))}getLocalViewOfDocuments(e,t,n=Si()){const s=bi();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((e=>{let t=wi();return e.forEach(((e,n)=>{t=t.insert(e,n.overlayedDocument)})),t}))))}getOverlayedDocuments(e,t){const n=bi();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,Si())))}populateOverlays(e,t,n){const s=[];return n.forEach((e=>{t.has(e)||s.push(e)})),this.documentOverlayCache.getOverlays(e,s).next((e=>{e.forEach(((e,n)=>{t.set(e,n)}))}))}computeViews(e,t,n,s){let r=vi();const i=Ii(),o=Ii();return t.forEach(((e,t)=>{const o=n.get(t.key);s.has(t.key)&&(void 0===o||o.mutation instanceof eo)?r=r.insert(t.key,t):void 0!==o?(i.set(t.key,o.mutation.getFieldMask()),Yi(o.mutation,t,o.mutation.getFieldMask(),Ss.now())):i.set(t.key,Xs.empty())})),this.recalculateAndSaveOverlays(e,r).next((e=>(e.forEach(((e,t)=>i.set(e,t))),t.forEach(((e,t)=>{var n;return o.set(e,new ha(t,null!==(n=i.get(e))&&void 0!==n?n:null))})),o)))}recalculateAndSaveOverlays(e,t){const n=Ii();let s=new Gs(((e,t)=>e-t)),r=Si();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((e=>{for(const r of e)r.keys().forEach((e=>{const i=t.get(e);if(null===i)return;let o=n.get(e)||Xs.empty();o=r.applyToLocalView(i,o),n.set(e,o);const a=(s.get(r.batchId)||Si()).add(e);s=s.insert(r.batchId,a)}))})).next((()=>{const i=[],o=s.getReverseIterator();for(;o.hasNext();){const s=o.getNext(),a=s.key,c=s.value,l=Ti();c.forEach((e=>{if(!r.has(e)){const s=Wi(t.get(e),n.get(e));null!==s&&l.set(e,s),r=r.add(e)}})),i.push(this.documentOverlayCache.saveOverlays(e,a,l))}return Fs.waitFor(i)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.recalculateAndSaveOverlays(e,t)))}getDocumentsMatchingQuery(e,t,n,s){return function(e){return Os.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ri(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((r=>{const i=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-r.size):Fs.resolve(bi());let o=-1,a=r;return i.next((t=>Fs.forEach(t,((t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),r.get(t)?Fs.resolve():this.remoteDocumentCache.getEntry(e,t).next((e=>{a=a.insert(t,e)}))))).next((()=>this.populateOverlays(e,t,r))).next((()=>this.computeViews(e,a,t,Si()))).next((e=>({batchId:o,changes:_i(e)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Os(t)).next((e=>{let t=wi();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const r=t.collectionGroup;let i=wi();return this.indexManager.getCollectionParents(e,r).next((o=>Fs.forEach(o,(o=>{const a=function(e,t){return new ti(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(r));return this.getDocumentsMatchingCollectionQuery(e,a,n,s).next((e=>{e.forEach(((e,t)=>{i=i.insert(e,t)}))}))})).next((()=>i))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,r,s)))).next((e=>{r.forEach(((t,n)=>{const s=n.getKey();null===e.get(s)&&(e=e.insert(s,Ar.newInvalidDocument(s)))}));let n=wi();return e.forEach(((e,s)=>{const i=r.get(e);void 0!==i&&Yi(i.mutation,s,Xs.empty(),Ss.now()),di(t,s)&&(n=n.insert(e,s))})),n}))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class fa{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return Fs.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(e){return{id:e.id,version:e.version,createTime:Mo(e.createTime)}}(t)),Fs.resolve()}getNamedQuery(e,t){return Fs.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(e){return{name:e.name,query:oa(e.bundledQuery),readTime:Mo(e.readTime)}}(t)),Fs.resolve()}}
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class pa{constructor(){this.overlays=new Gs(Os.comparator),this.Ir=new Map}getOverlay(e,t){return Fs.resolve(this.overlays.get(t))}getOverlays(e,t){const n=bi();return Fs.forEach(t,(t=>this.getOverlay(e,t).next((e=>{null!==e&&n.set(t,e)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((n,s)=>{this.ht(e,t,s)})),Fs.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Ir.get(n);return void 0!==s&&(s.forEach((e=>this.overlays=this.overlays.remove(e))),this.Ir.delete(n)),Fs.resolve()}getOverlaysForCollection(e,t,n){const s=bi(),r=t.length+1,i=new Os(t.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const e=o.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===r&&e.largestBatchId>n&&s.set(e.getKey(),e)}return Fs.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let r=new Gs(((e,t)=>e-t));const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=r.get(e.largestBatchId);null===t&&(t=bi(),r=r.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=bi(),a=r.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach(((e,t)=>o.set(e,t))),!(o.size()>=s)););return Fs.resolve(o)}ht(e,t,n){const s=this.overlays.get(n.key);if(null!==s){const e=this.Ir.get(s.largestBatchId).delete(n.key);this.Ir.set(s.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new co(t,n));let r=this.Ir.get(t);void 0===r&&(r=Si(),this.Ir.set(t,r)),this.Ir.set(t,r.add(n.key))}}
/**
     * @license
     * Copyright 2024 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ma{constructor(){this.sessionToken=er.EMPTY_BYTE_STRING}getSessionToken(e){return Fs.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,Fs.resolve()}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ga{constructor(){this.Tr=new Ys(va.Er),this.dr=new Ys(va.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new va(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach((e=>this.addReference(e,t)))}removeReference(e,t){this.Vr(new va(e,t))}mr(e,t){e.forEach((e=>this.removeReference(e,t)))}gr(e){const t=new Os(new Ns([])),n=new va(t,e),s=new va(t,e+1),r=[];return this.dr.forEachInRange([n,s],(e=>{this.Vr(e),r.push(e.key)})),r}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new Os(new Ns([])),n=new va(t,e),s=new va(t,e+1);let r=Si();return this.dr.forEachInRange([n,s],(e=>{r=r.add(e.key)})),r}containsKey(e){const t=new va(e,0),n=this.Tr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class va{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return Os.comparator(e.key,t.key)||Es(e.wr,t.wr)}static Ar(e,t){return Es(e.wr,t.wr)||Os.comparator(e.key,t.key)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ya{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Ys(va.Er)}checkEmpty(e){return Fs.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,s){const r=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new oo(r,t,n,s);this.mutationQueue.push(i);for(const t of s)this.br=this.br.add(new va(t.key,r)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return Fs.resolve(i)}lookupMutationBatch(e,t){return Fs.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.vr(n),r=s<0?0:s;return Fs.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return Fs.resolve(0===this.mutationQueue.length?-1:this.Sr-1)}getAllMutationBatches(e){return Fs.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new va(t,0),s=new va(t,Number.POSITIVE_INFINITY),r=[];return this.br.forEachInRange([n,s],(e=>{const t=this.Dr(e.wr);r.push(t)})),Fs.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Ys(Es);return t.forEach((e=>{const t=new va(e,0),s=new va(e,Number.POSITIVE_INFINITY);this.br.forEachInRange([t,s],(e=>{n=n.add(e.wr)}))})),Fs.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let r=n;Os.isDocumentKey(r)||(r=r.child(""));const i=new va(new Os(r),0);let o=new Ys(Es);return this.br.forEachWhile((e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===s&&(o=o.add(e.wr)),!0)}),i),Fs.resolve(this.Cr(o))}Cr(e){const t=[];return e.forEach((e=>{const n=this.Dr(e);null!==n&&t.push(n)})),t}removeMutationBatch(e,t){ls(0===this.Fr(t.batchId,"removed")),this.mutationQueue.shift();let n=this.br;return Fs.forEach(t.mutations,(s=>{const r=new va(s.key,t.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.br=n}))}On(e){}containsKey(e,t){const n=new va(t,0),s=this.br.firstAfterOrEqual(n);return Fs.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,Fs.resolve()}Fr(e,t){return this.vr(e)}vr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class wa{constructor(e){this.Mr=e,this.docs=new Gs(Os.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),r=s?s.size:0,i=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-r,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return Fs.resolve(n?n.document.mutableCopy():Ar.newInvalidDocument(t))}getEntries(e,t){let n=vi();return t.forEach((e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Ar.newInvalidDocument(e))})),Fs.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let r=vi();const i=t.path,o=new Os(i.child("")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!i.isPrefixOf(e.path))break;e.path.length>i.length+1||Ls(Ps(o),n)<=0||(s.has(o.key)||di(t,o))&&(r=r.insert(o.key,o.mutableCopy()))}return Fs.resolve(r)}getAllFromCollectionGroup(e,t,n,s){cs()}Or(e,t){return Fs.forEach(this.docs,(e=>t(e)))}newChangeBuffer(e){return new _a(this)}getSize(e){return Fs.resolve(this.size)}}class _a extends ua{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(n)})),Fs.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ba{constructor(e){this.persistence=e,this.Nr=new mi((e=>Xr(e)),Zr),this.lastRemoteSnapshotVersion=Cs.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ga,this.targetCount=0,this.kr=la.Bn()}forEachTarget(e,t){return this.Nr.forEach(((e,n)=>t(n))),Fs.resolve()}getLastRemoteSnapshotVersion(e){return Fs.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Fs.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),Fs.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),Fs.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new la(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,Fs.resolve()}updateTargetData(e,t){return this.Kn(t),Fs.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,Fs.resolve()}removeTargets(e,t,n){let s=0;const r=[];return this.Nr.forEach(((i,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.Nr.delete(i),r.push(this.removeMatchingKeysForTargetId(e,o.targetId)),s++)})),Fs.waitFor(r).next((()=>s))}getTargetCount(e){return Fs.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return Fs.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),Fs.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const s=this.persistence.referenceDelegate,r=[];return s&&t.forEach((t=>{r.push(s.markPotentiallyOrphaned(e,t))})),Fs.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),Fs.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return Fs.resolve(n)}containsKey(e,t){return Fs.resolve(this.Br.containsKey(t))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ta{constructor(e,t){this.qr={},this.overlays={},this.Qr=new js(0),this.Kr=!1,this.Kr=!0,this.$r=new ma,this.referenceDelegate=e(this),this.Ur=new ba(this),this.indexManager=new aa,this.remoteDocumentCache=function(e){return new wa(e)}((e=>this.referenceDelegate.Wr(e))),this.serializer=new ia(t),this.Gr=new fa(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new pa,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new ya(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){rs("MemoryPersistence","Starting transaction:",e);const s=new Ia(this.Qr.next());return this.referenceDelegate.zr(),n(s).next((e=>this.referenceDelegate.jr(s).next((()=>e)))).toPromise().then((e=>(s.raiseOnCommittedEvent(),e)))}Hr(e,t){return Fs.or(Object.values(this.qr).map((n=>()=>n.containsKey(e,t))))}}class Ia extends Us{constructor(e){super(),this.currentSequenceNumber=e}}class Ea{constructor(e){this.persistence=e,this.Jr=new ga,this.Yr=null}static Zr(e){return new Ea(e)}get Xr(){if(this.Yr)return this.Yr;throw cs()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),Fs.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),Fs.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),Fs.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((e=>this.Xr.add(e.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((e=>{e.forEach((e=>this.Xr.add(e.toString())))})).next((()=>n.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Fs.forEach(this.Xr,(n=>{const s=Os.fromPath(n);return this.ei(e,s).next((e=>{e||t.removeEntry(s,Cs.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((e=>{e?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return Fs.or([()=>Fs.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ka{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=s}static Wi(e,t){let n=Si(),s=Si();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:s=s.add(e.doc.key)}return new ka(e,t.fromCache,n,s)}}
/**
     * @license
     * Copyright 2023 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Sa{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ca{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=St()?8:function(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}(kt())>0?6:4}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,s){const r={result:null};return this.Yi(e,t).next((e=>{r.result=e})).next((()=>{if(!r.result)return this.Zi(e,t,s,n).next((e=>{r.result=e}))})).next((()=>{if(r.result)return;const n=new Sa;return this.Xi(e,t,n).next((s=>{if(r.result=s,this.zi)return this.es(e,t,n,s.size)}))})).next((()=>r.result))}es(e,t,n,s){return n.documentReadCount<this.ji?(ss()<=Vt.DEBUG&&rs("QueryEngine","SDK will not create cache indexes for query:",hi(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),Fs.resolve()):(ss()<=Vt.DEBUG&&rs("QueryEngine","Query:",hi(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Hi*s?(ss()<=Vt.DEBUG&&rs("QueryEngine","The SDK decides to create cache indexes for query:",hi(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,oi(t))):Fs.resolve())}Yi(e,t){if(si(t))return Fs.resolve(null);let n=oi(t);return this.indexManager.getIndexType(e,n).next((s=>0===s?null:(null!==t.limit&&1===s&&(t=ci(t,null,"F"),n=oi(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((s=>{const r=Si(...s);return this.Ji.getDocuments(e,r).next((s=>this.indexManager.getMinOffset(e,n).next((n=>{const i=this.ts(t,s);return this.ns(t,i,r,n.readTime)?this.Yi(e,ci(t,null,"F")):this.rs(e,i,t,n)}))))})))))}Zi(e,t,n,s){return si(t)||s.isEqual(Cs.min())?Fs.resolve(null):this.Ji.getDocuments(e,n).next((r=>{const i=this.ts(t,r);return this.ns(t,i,n,s)?Fs.resolve(null):(ss()<=Vt.DEBUG&&rs("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),hi(t)),this.rs(e,i,t,function(e,t){const n=e.toTimestamp().seconds,s=e.toTimestamp().nanoseconds+1,r=Cs.fromTimestamp(1e9===s?new Ss(n+1,0):new Ss(n,s));return new xs(r,Os.empty(),t)}(s,-1)).next((e=>e)))}))}ts(e,t){let n=new Ys(fi(e));return t.forEach(((t,s)=>{di(e,s)&&(n=n.add(s))})),n}ns(e,t,n,s){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const r="F"===e.limitType?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Xi(e,t,n){return ss()<=Vt.DEBUG&&rs("QueryEngine","Using full collection scan to execute query:",hi(t)),this.Ji.getDocumentsMatchingQuery(e,t,xs.min(),n)}rs(e,t,n,s){return this.Ji.getDocumentsMatchingQuery(e,n,s).next((e=>(t.forEach((t=>{e=e.insert(t.key,t)})),e)))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Aa{constructor(e,t,n,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new Gs(Es),this._s=new mi((e=>Xr(e)),Zr),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new da(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}async function Na(e,t){const n=us(e);return await n.persistence.runTransaction("Handle user change","readonly",(e=>{let s;return n.mutationQueue.getAllMutationBatches(e).next((r=>(s=r,n.ls(t),n.mutationQueue.getAllMutationBatches(e)))).next((t=>{const r=[],i=[];let o=Si();for(const e of s){r.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next((e=>({hs:e,removedBatchIds:r,addedBatchIds:i})))}))}))}function Ra(e){const t=us(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Ur.getLastRemoteSnapshotVersion(e)))}function Da(e,t){const n=us(e),s=t.snapshotVersion;let r=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(e=>{const i=n.cs.newChangeBuffer({trackRemovals:!0});r=n.os;const o=[];t.targetChanges.forEach(((i,a)=>{const c=r.get(a);if(!c)return;o.push(n.Ur.removeMatchingKeys(e,i.removedDocuments,a).next((()=>n.Ur.addMatchingKeys(e,i.addedDocuments,a))));let l=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?l=l.withResumeToken(er.EMPTY_BYTE_STRING,Cs.min()).withLastLimboFreeSnapshotVersion(Cs.min()):i.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(i.resumeToken,s)),r=r.insert(a,l),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,l,i)&&o.push(n.Ur.updateTargetData(e,l))}));let a=vi(),c=Si();if(t.documentUpdates.forEach((s=>{t.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,s))})),o.push(function(e,t,n){let s=Si(),r=Si();return n.forEach((e=>s=s.add(e))),t.getEntries(e,s).next((e=>{let s=vi();return n.forEach(((n,i)=>{const o=e.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(r=r.add(n)),i.isNoDocument()&&i.version.isEqual(Cs.min())?(t.removeEntry(n,i.readTime),s=s.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(i),s=s.insert(n,i)):rs("LocalStore","Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)})),{Ps:s,Is:r}}))}(e,i,t.documentUpdates).next((e=>{a=e.Ps,c=e.Is}))),!s.isEqual(Cs.min())){const t=n.Ur.getLastRemoteSnapshotVersion(e).next((t=>n.Ur.setTargetsMetadata(e,e.currentSequenceNumber,s)));o.push(t)}return Fs.waitFor(o).next((()=>i.apply(e))).next((()=>n.localDocuments.getLocalViewOfDocuments(e,a,c))).next((()=>a))})).then((e=>(n.os=r,e)))}function Oa(e,t){const n=us(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t))))}async function Pa(e,t,n){const s=us(e),r=s.os.get(t),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,(e=>s.persistence.referenceDelegate.removeTarget(e,r)))}catch(e){if(!Vs(e))throw e;rs("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}s.os=s.os.remove(t),s._s.delete(r.target)}function xa(e,t,n){const s=us(e);let r=Cs.min(),i=Si();return s.persistence.runTransaction("Execute query","readwrite",(e=>function(e,t,n){const s=us(e),r=s._s.get(n);return void 0!==r?Fs.resolve(s.os.get(r)):s.Ur.getTargetData(t,n)}(s,e,oi(t)).next((t=>{if(t)return r=t.lastLimboFreeSnapshotVersion,s.Ur.getMatchingKeysForTargetId(e,t.targetId).next((e=>{i=e}))})).next((()=>s.ss.getDocumentsMatchingQuery(e,t,n?r:Cs.min(),n?i:Si()))).next((e=>(function(e,t,n){let s=e.us.get(t)||Cs.min();n.forEach(((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)})),e.us.set(t,s)}(s,function(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}(t),e),{documents:e,Ts:i})))))}class La{constructor(){this.activeTargetIds=Ci}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Ma{constructor(){this.so=new La,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new La,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ua{_o(e){}shutdown(){}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class $a{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){rs("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){rs("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
     * @license
     * Copyright 2023 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let Fa=null;function Va(){return null===Fa?Fa=268435456+Math.round(2147483648*Math.random()):Fa++,"0x"+Fa.toString(16)
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}const ja={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ba{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const qa="WebChannelConnection";class za extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=t+"://"+e.host,this.vo=`projects/${n}/databases/${s}`,this.Co="(default)"===this.databaseId.database?`project_id=${n}`:`project_id=${n}&database_id=${s}`}get Fo(){return!1}Mo(e,t,n,s,r){const i=Va(),o=this.xo(e,t.toUriEncodedString());rs("RestConnection",`Sending RPC '${e}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(a,s,r),this.No(e,o,a,n).then((t=>(rs("RestConnection",`Received RPC '${e}' ${i}: `,t),t)),(t=>{throw os("RestConnection",`RPC '${e}' ${i} failed with error: `,t,"url: ",o,"request:",n),t}))}Lo(e,t,n,s,r,i){return this.Mo(e,t,n,s,r)}Oo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+ts,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((t,n)=>e[n]=t)),n&&n.headers.forEach(((t,n)=>e[n]=t))}xo(e,t){const n=ja[e];return`${this.Do}/v1/${t}:${n}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,s){const r=Va();return new Promise(((i,o)=>{const a=new zn;a.setWithCredentials(!0),a.listenOnce(Hn.COMPLETE,(()=>{try{switch(a.getLastErrorCode()){case Gn.NO_ERROR:const t=a.getResponseJson();rs(qa,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(t)),i(t);break;case Gn.TIMEOUT:rs(qa,`RPC '${e}' ${r} timed out`),o(new ds(hs.DEADLINE_EXCEEDED,"Request time out"));break;case Gn.HTTP_ERROR:const n=a.getStatus();if(rs(qa,`RPC '${e}' ${r} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(hs).indexOf(t)>=0?t:hs.UNKNOWN}(t.status);o(new ds(e,t.message))}else o(new ds(hs.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new ds(hs.UNAVAILABLE,"Connection failed."));break;default:cs()}}finally{rs(qa,`RPC '${e}' ${r} completed.`)}}));const c=JSON.stringify(s);rs(qa,`RPC '${e}' ${r} sending request:`,s),a.send(t,"POST",c,n,15)}))}Bo(e,t,n){const s=Va(),r=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=Jn(),o=Yn(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Oo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const l=r.join("");rs(qa,`Creating RPC '${e}' stream ${s}: ${l}`,a);const u=i.createWebChannel(l,a);let h=!1,d=!1;const f=new Ba({Io:t=>{d?rs(qa,`Not sending because RPC '${e}' stream ${s} is closed:`,t):(h||(rs(qa,`Opening RPC '${e}' stream ${s} transport.`),u.open(),h=!0),rs(qa,`RPC '${e}' stream ${s} sending:`,t),u.send(t))},To:()=>u.close()}),p=(e,t,n)=>{e.listen(t,(e=>{try{n(e)}catch(e){setTimeout((()=>{throw e}),0)}}))};return p(u,Kn.EventType.OPEN,(()=>{d||(rs(qa,`RPC '${e}' stream ${s} transport opened.`),f.yo())})),p(u,Kn.EventType.CLOSE,(()=>{d||(d=!0,rs(qa,`RPC '${e}' stream ${s} transport closed`),f.So())})),p(u,Kn.EventType.ERROR,(t=>{d||(d=!0,os(qa,`RPC '${e}' stream ${s} transport errored:`,t),f.So(new ds(hs.UNAVAILABLE,"The operation could not be completed")))})),p(u,Kn.EventType.MESSAGE,(t=>{var n;if(!d){const r=t.data[0];ls(!!r);const i=r,o=i.error||(null===(n=i[0])||void 0===n?void 0:n.error);if(o){rs(qa,`RPC '${e}' stream ${s} received error:`,o);const t=o.status;let n=function(e){const t=uo[e];if(void 0!==t)return fo(t)}(t),r=o.message;void 0===n&&(n=hs.INTERNAL,r="Unknown error status: "+t+" with message "+o.message),d=!0,f.So(new ds(n,r)),u.close()}else rs(qa,`RPC '${e}' stream ${s} received:`,r),f.bo(r)}})),p(o,Qn.STAT_EVENT,(t=>{t.stat===Wn.PROXY?rs(qa,`RPC '${e}' stream ${s} detected buffering proxy`):t.stat===Wn.NOPROXY&&rs(qa,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{f.wo()}),0),f}}function Ka(){return"undefined"!=typeof document?document:null}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Ha(e){return new Do(e,!0)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ga{constructor(e,t,n=1e3,s=1.5,r=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=s,this.Qo=r,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-n);s>0&&rs("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){null!==this.$o&&(this.$o.skipDelay(),this.$o=null)}cancel(){null!==this.$o&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Wa{constructor(e,t,n,s,r,i,o,a){this.ui=e,this.Ho=n,this.Jo=s,this.connection=r,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Ga(e,t)}n_(){return 1===this.state||5===this.state||this.r_()}r_(){return 2===this.state||3===this.state}start(){this.e_=0,4!==this.state?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&null===this.Zo&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,4!==e?this.t_.reset():t&&t.code===hs.RESOURCE_EXHAUSTED?(is(t.toString()),is("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===hs.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([e,n])=>{this.Yo===t&&this.P_(e,n)}),(t=>{e((()=>{const e=new ds(hs.UNKNOWN,"Fetching auth token failed: "+t.message);return this.I_(e)}))}))}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{n((()=>this.listener.Eo()))})),this.stream.Ro((()=>{n((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((e=>{n((()=>this.I_(e)))})),this.stream.onMessage((e=>{n((()=>1==++this.e_?this.E_(e):this.onNext(e)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return rs("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():(rs("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Qa extends Wa{constructor(e,t,n,s,r,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,i),this.serializer=r}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const s=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:cs()}(t.targetChange.targetChangeType||"NO_CHANGE"),r=t.targetChange.targetIds||[],i=function(e,t){return e.useProto3Json?(ls(void 0===t||"string"==typeof t),er.fromBase64String(t||"")):(ls(void 0===t||t instanceof Buffer||t instanceof Uint8Array),er.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?hs.UNKNOWN:fo(e.code);return new ds(t,e.message||"")}(o);n=new Io(s,r,i,a||null)}else if("documentChange"in t){t.documentChange;const s=t.documentChange;s.document,s.document.name,s.document.updateTime;const r=jo(e,s.document.name),i=Mo(s.document.updateTime),o=s.document.createTime?Mo(s.document.createTime):Cs.min(),a=new Sr({mapValue:{fields:s.document.fields}}),c=Ar.newFoundDocument(r,i,o,a),l=s.targetIds||[],u=s.removedTargetIds||[];n=new bo(l,u,c.key,c)}else if("documentDelete"in t){t.documentDelete;const s=t.documentDelete;s.document;const r=jo(e,s.document),i=s.readTime?Mo(s.readTime):Cs.min(),o=Ar.newNoDocument(r,i),a=s.removedTargetIds||[];n=new bo([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const s=t.documentRemove;s.document;const r=jo(e,s.document),i=s.removedTargetIds||[];n=new bo([],i,r,null)}else{if(!("filter"in t))return cs();{t.filter;const e=t.filter;e.targetId;const{count:s=0,unchangedNames:r}=e,i=new lo(s,r),o=e.targetId;n=new To(o,i)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return Cs.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?Cs.min():t.readTime?Mo(t.readTime):Cs.min()}(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=qo(this.serializer),t.addTarget=function(e,t){let n;const s=t.target;if(n=ei(s)?{documents:Ho(e,s)}:{query:Go(e,s)._t},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=xo(e,t.resumeToken);const s=Oo(e,t.expectedCount);null!==s&&(n.expectedCount=s)}else if(t.snapshotVersion.compareTo(Cs.min())>0){n.readTime=Po(e,t.snapshotVersion.toTimestamp());const s=Oo(e,t.expectedCount);null!==s&&(n.expectedCount=s)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return cs()}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=qo(this.serializer),t.removeTarget=e,this.a_(t)}}class Ya extends Wa{constructor(e,t,n,s,r,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,i),this.serializer=r}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return ls(!!e.streamToken),this.lastStreamToken=e.streamToken,ls(!e.writeResults||0===e.writeResults.length),this.listener.f_()}onNext(e){ls(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=function(e,t){return e&&e.length>0?(ls(void 0!==t),e.map((e=>function(e,t){let n=e.updateTime?Mo(e.updateTime):Mo(t);return n.isEqual(Cs.min())&&(n=Mo(t)),new zi(n,e.transformResults||[])}(e,t)))):[]}(e.writeResults,e.commitTime),n=Mo(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=qo(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((e=>function(e,t){let n;if(t instanceof Zi)n={update:Ko(e,t.key,t.value)};else if(t instanceof ro)n={delete:Vo(e,t.key)};else if(t instanceof eo)n={update:Ko(e,t.key,t.data),updateMask:na(t.fieldMask)};else{if(!(t instanceof io))return cs();n={verify:Vo(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((e=>function(e,t){const n=t.transform;if(n instanceof Li)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Mi)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof $i)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Vi)return{fieldPath:t.field.canonicalString(),increment:n.Pe};throw cs()}(0,e)))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:Lo(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:cs()}(e,t.precondition)),n}(this.serializer,e)))};this.a_(t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ja extends class{}{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new ds(hs.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([r,i])=>this.connection.Mo(e,$o(t,n),s,r,i))).catch((e=>{throw"FirebaseError"===e.name?(e.code===hs.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new ds(hs.UNKNOWN,e.toString())}))}Lo(e,t,n,s,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Lo(e,$o(t,n),s,i,o,r))).catch((e=>{throw"FirebaseError"===e.name?(e.code===hs.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new ds(hs.UNKNOWN,e.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class Xa{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){0===this.S_&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){"Online"===this.state?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,"Online"===e&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(is(t),this.D_=!1):rs("OnlineStateTracker",t)}x_(){null!==this.b_&&(this.b_.cancel(),this.b_=null)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Za{constructor(e,t,n,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=r,this.k_._o((e=>{n.enqueueAndForget((async()=>{cc(this)&&(rs("RemoteStore","Restarting streams for network reachability change."),await async function(e){const t=us(e);t.L_.add(4),await tc(t),t.q_.set("Unknown"),t.L_.delete(4),await ec(t)}(this))}))})),this.q_=new Xa(n,s)}}async function ec(e){if(cc(e))for(const t of e.B_)await t(!0)}async function tc(e){for(const t of e.B_)await t(!1)}function nc(e,t){const n=us(e);n.N_.has(t.targetId)||(n.N_.set(t.targetId,t),ac(n)?oc(n):Sc(n).r_()&&rc(n,t))}function sc(e,t){const n=us(e),s=Sc(n);n.N_.delete(t),s.r_()&&ic(n,t),0===n.N_.size&&(s.r_()?s.o_():cc(n)&&n.q_.set("Unknown"))}function rc(e,t){if(e.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(Cs.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Sc(e).A_(t)}function ic(e,t){e.Q_.xe(t),Sc(e).R_(t)}function oc(e){e.Q_=new ko({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>e.N_.get(t)||null,tt:()=>e.datastore.serializer.databaseId}),Sc(e).start(),e.q_.v_()}function ac(e){return cc(e)&&!Sc(e).n_()&&e.N_.size>0}function cc(e){return 0===us(e).L_.size}function lc(e){e.Q_=void 0}async function uc(e){e.q_.set("Online")}async function hc(e){e.N_.forEach(((t,n)=>{rc(e,t)}))}async function dc(e,t){lc(e),ac(e)?(e.q_.M_(t),oc(e)):e.q_.set("Unknown")}async function fc(e,t,n){if(e.q_.set("Online"),t instanceof Io&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const s of t.targetIds)e.N_.has(s)&&(await e.remoteSyncer.rejectListen(s,n),e.N_.delete(s),e.Q_.removeTarget(s))}(e,t)}catch(n){rs("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await pc(e,n)}else if(t instanceof bo?e.Q_.Ke(t):t instanceof To?e.Q_.He(t):e.Q_.We(t),!n.isEqual(Cs.min()))try{const t=await Ra(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Q_.rt(t);return n.targetChanges.forEach(((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const r=e.N_.get(s);r&&e.N_.set(s,r.withResumeToken(n.resumeToken,t))}})),n.targetMismatches.forEach(((t,n)=>{const s=e.N_.get(t);if(!s)return;e.N_.set(t,s.withResumeToken(er.EMPTY_BYTE_STRING,s.snapshotVersion)),ic(e,t);const r=new ra(s.target,t,n,s.sequenceNumber);rc(e,r)})),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){rs("RemoteStore","Failed to raise snapshot:",t),await pc(e,t)}}async function pc(e,t,n){if(!Vs(t))throw t;e.L_.add(1),await tc(e),e.q_.set("Offline"),n||(n=()=>Ra(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{rs("RemoteStore","Retrying IndexedDB access"),await n(),e.L_.delete(1),await ec(e)}))}function mc(e,t){return t().catch((n=>pc(e,n,t)))}async function gc(e){const t=us(e),n=Cc(t);let s=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;vc(t);)try{const e=await Oa(t.localStore,s);if(null===e){0===t.O_.length&&n.o_();break}s=e.batchId,yc(t,e)}catch(e){await pc(t,e)}wc(t)&&_c(t)}function vc(e){return cc(e)&&e.O_.length<10}function yc(e,t){e.O_.push(t);const n=Cc(e);n.r_()&&n.V_&&n.m_(t.mutations)}function wc(e){return cc(e)&&!Cc(e).n_()&&e.O_.length>0}function _c(e){Cc(e).start()}async function bc(e){Cc(e).p_()}async function Tc(e){const t=Cc(e);for(const n of e.O_)t.m_(n.mutations)}async function Ic(e,t,n){const s=e.O_.shift(),r=ao.from(s,t,n);await mc(e,(()=>e.remoteSyncer.applySuccessfulWrite(r))),await gc(e)}async function Ec(e,t){t&&Cc(e).V_&&await async function(e,t){if(function(e){return function(e){switch(e){default:return cs();case hs.CANCELLED:case hs.UNKNOWN:case hs.DEADLINE_EXCEEDED:case hs.RESOURCE_EXHAUSTED:case hs.INTERNAL:case hs.UNAVAILABLE:case hs.UNAUTHENTICATED:return!1;case hs.INVALID_ARGUMENT:case hs.NOT_FOUND:case hs.ALREADY_EXISTS:case hs.PERMISSION_DENIED:case hs.FAILED_PRECONDITION:case hs.ABORTED:case hs.OUT_OF_RANGE:case hs.UNIMPLEMENTED:case hs.DATA_LOSS:return!0}}(e)&&e!==hs.ABORTED}(t.code)){const n=e.O_.shift();Cc(e).s_(),await mc(e,(()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t))),await gc(e)}}(e,t),wc(e)&&_c(e)}async function kc(e,t){const n=us(e);n.asyncQueue.verifyOperationInProgress(),rs("RemoteStore","RemoteStore received new credentials");const s=cc(n);n.L_.add(3),await tc(n),s&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.L_.delete(3),await ec(n)}function Sc(e){return e.K_||(e.K_=function(e,t,n){const s=us(e);return s.w_(),new Qa(t,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}(e.datastore,e.asyncQueue,{Eo:uc.bind(null,e),Ro:hc.bind(null,e),mo:dc.bind(null,e),d_:fc.bind(null,e)}),e.B_.push((async t=>{t?(e.K_.s_(),ac(e)?oc(e):e.q_.set("Unknown")):(await e.K_.stop(),lc(e))}))),e.K_}function Cc(e){return e.U_||(e.U_=function(e,t,n){const s=us(e);return s.w_(),new Ya(t,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)}(e.datastore,e.asyncQueue,{Eo:()=>Promise.resolve(),Ro:bc.bind(null,e),mo:Ec.bind(null,e),f_:Tc.bind(null,e),g_:Ic.bind(null,e)}),e.B_.push((async t=>{t?(e.U_.s_(),await gc(e)):(await e.U_.stop(),e.O_.length>0&&(rs("RemoteStore",`Stopping write stream with ${e.O_.length} pending writes`),e.O_=[]))}))),e.U_
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}class Ac{constructor(e,t,n,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new fs,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((e=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,r){const i=Date.now()+n,o=new Ac(e,t,i,s,r);return o.start(n),o}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new ds(hs.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Nc(e,t){if(is("AsyncQueue",`${t}: ${e}`),Vs(e))return new ds(hs.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Rc{constructor(e){this.comparator=e?(t,n)=>e(t,n)||Os.comparator(t.key,n.key):(e,t)=>Os.comparator(e.key,t.key),this.keyedMap=wi(),this.sortedSet=new Gs(this.comparator)}static emptySet(e){return new Rc(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Rc))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,s=n.getNext().key;if(!e.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Rc;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Dc{constructor(){this.W_=new Gs(Os.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?0!==e.type&&3===n.type?this.W_=this.W_.insert(t,e):3===e.type&&1!==n.type?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.W_=this.W_.remove(t):1===e.type&&2===n.type?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):cs():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,n)=>{e.push(n)})),e}}class Oc{constructor(e,t,n,s,r,i,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=r,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,s,r){const i=[];return t.forEach((e=>{i.push({type:0,doc:e})})),new Oc(e,t,Rc.emptySet(t),i,n,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&li(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Pc{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class xc{constructor(){this.queries=Lc(),this.onlineState="Unknown",this.Y_=new Set}terminate(){!function(e,t){const n=us(e),s=n.queries;n.queries=Lc(),s.forEach(((e,n)=>{for(const e of n.j_)e.onError(t)}))}(this,new ds(hs.ABORTED,"Firestore shutting down"))}}function Lc(){return new mi((e=>ui(e)),li)}async function Mc(e,t){const n=us(e);let s=3;const r=t.query;let i=n.queries.get(r);i?!i.H_()&&t.J_()&&(s=2):(i=new Pc,s=t.J_()?0:1);try{switch(s){case 0:i.z_=await n.onListen(r,!0);break;case 1:i.z_=await n.onListen(r,!1);break;case 2:await n.onFirstRemoteStoreListen(r)}}catch(e){const n=Nc(e,`Initialization of query '${hi(t.query)}' failed`);return void t.onError(n)}n.queries.set(r,i),i.j_.push(t),t.Z_(n.onlineState),i.z_&&t.X_(i.z_)&&Vc(n)}async function Uc(e,t){const n=us(e),s=t.query;let r=3;const i=n.queries.get(s);if(i){const e=i.j_.indexOf(t);e>=0&&(i.j_.splice(e,1),0===i.j_.length?r=t.J_()?0:1:!i.H_()&&t.J_()&&(r=2))}switch(r){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}function $c(e,t){const n=us(e);let s=!1;for(const e of t){const t=e.query,r=n.queries.get(t);if(r){for(const t of r.j_)t.X_(e)&&(s=!0);r.z_=e}}s&&Vc(n)}function Fc(e,t,n){const s=us(e),r=s.queries.get(t);if(r)for(const e of r.j_)e.onError(n);s.queries.delete(t)}function Vc(e){e.Y_.forEach((e=>{e.next()}))}var jc,Bc;(Bc=jc||(jc={})).ea="default",Bc.Cache="cache";class qc{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Oc(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache)return!0;if(!this.J_())return!0;const n="Offline"!==t;return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}oa(e){e=Oc.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==jc.Cache}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class zc{constructor(e){this.key=e}}class Kc{constructor(e){this.key=e}}class Hc{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Si(),this.mutatedKeys=Si(),this.Aa=fi(e),this.Ra=new Rc(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new Dc,s=t?t.Ra:this.Ra;let r=t?t.mutatedKeys:this.mutatedKeys,i=s,o=!1;const a="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,c="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((e,t)=>{const l=s.get(e),u=di(this.query,t)?t:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;l&&u?l.data.isEqual(u.data)?h!==d&&(n.track({type:3,doc:u}),f=!0):this.ga(l,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.Aa(u,a)>0||c&&this.Aa(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),f=!0):l&&!u&&(n.track({type:1,doc:l}),f=!0,(a||c)&&(o=!0)),f&&(u?(i=i.add(u),r=d?r.add(e):r.delete(e)):(i=i.delete(e),r=r.delete(e)))})),null!==this.query.limit)for(;i.size>this.query.limit;){const e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),r=r.delete(e.key),n.track({type:1,doc:e})}return{Ra:i,fa:n,ns:o,mutatedKeys:r}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const r=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const i=e.fa.G_();i.sort(((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return cs()}};return n(e)-n(t)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e.type,t.type)||this.Aa(e.doc,t.doc))),this.pa(n),s=null!=s&&s;const o=t&&!s?this.ya():[],a=0===this.da.size&&this.current&&!s?1:0,c=a!==this.Ea;return this.Ea=a,0!==i.length||c?{snapshot:new Oc(this.query,e.Ra,r,i,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:o}:{wa:o}}Z_(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Dc,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((e=>this.Ta=this.Ta.add(e))),e.modifiedDocuments.forEach((e=>{})),e.removedDocuments.forEach((e=>this.Ta=this.Ta.delete(e))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Si(),this.Ra.forEach((e=>{this.Sa(e.key)&&(this.da=this.da.add(e.key))}));const t=[];return e.forEach((e=>{this.da.has(e)||t.push(new Kc(e))})),this.da.forEach((n=>{e.has(n)||t.push(new zc(n))})),t}ba(e){this.Ta=e.Ts,this.da=Si();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Oc.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,0===this.Ea,this.hasCachedResults)}}class Gc{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Wc{constructor(e){this.key=e,this.va=!1}}class Qc{constructor(e,t,n,s,r,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=i,this.Ca={},this.Fa=new mi((e=>ui(e)),li),this.Ma=new Map,this.xa=new Set,this.Oa=new Gs(Os.comparator),this.Na=new Map,this.La=new ga,this.Ba={},this.ka=new Map,this.qa=la.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return!0===this.Qa}}async function Yc(e,t,n=!0){const s=vl(e);let r;const i=s.Fa.get(t);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.Da()):r=await Xc(s,t,n,!0),r}async function Jc(e,t){const n=vl(e);await Xc(n,t,!0,!1)}async function Xc(e,t,n,s){const r=await function(e,t){const n=us(e);return n.persistence.runTransaction("Allocate target","readwrite",(e=>{let s;return n.Ur.getTargetData(e,t).next((r=>r?(s=r,Fs.resolve(s)):n.Ur.allocateTargetId(e).next((r=>(s=new ra(t,r,"TargetPurposeListen",e.currentSequenceNumber),n.Ur.addTargetData(e,s).next((()=>s)))))))})).then((e=>{const s=n.os.get(e.targetId);return(null===s||e.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(e.targetId,e),n._s.set(t,e.targetId)),e}))}(e.localStore,oi(t)),i=r.targetId,o=e.sharedClientState.addLocalQueryTarget(i,n);let a;return s&&(a=await async function(e,t,n,s,r){e.Ka=(t,n,s)=>async function(e,t,n,s){let r=t.view.ma(n);r.ns&&(r=await xa(e.localStore,t.query,!1).then((({documents:e})=>t.view.ma(e,r))));const i=s&&s.targetChanges.get(t.targetId),o=s&&null!=s.targetMismatches.get(t.targetId),a=t.view.applyChanges(r,e.isPrimaryClient,i,o);return hl(e,t.targetId,a.wa),a.snapshot}(e,t,n,s);const i=await xa(e.localStore,t,!0),o=new Hc(t,i.Ts),a=o.ma(i.documents),c=_o.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==e.onlineState,r),l=o.applyChanges(a,e.isPrimaryClient,c);hl(e,n,l.wa);const u=new Gc(t,n,o);return e.Fa.set(t,u),e.Ma.has(n)?e.Ma.get(n).push(t):e.Ma.set(n,[t]),l.snapshot}(e,t,i,"current"===o,r.resumeToken)),e.isPrimaryClient&&n&&nc(e.remoteStore,r),a}async function Zc(e,t,n){const s=us(e),r=s.Fa.get(t),i=s.Ma.get(r.targetId);if(i.length>1)return s.Ma.set(r.targetId,i.filter((e=>!li(e,t)))),void s.Fa.delete(t);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Pa(s.localStore,r.targetId,!1).then((()=>{s.sharedClientState.clearQueryState(r.targetId),n&&sc(s.remoteStore,r.targetId),ll(s,r.targetId)})).catch($s)):(ll(s,r.targetId),await Pa(s.localStore,r.targetId,!0))}async function el(e,t){const n=us(e),s=n.Fa.get(t),r=n.Ma.get(s.targetId);n.isPrimaryClient&&1===r.length&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),sc(n.remoteStore,s.targetId))}async function tl(e,t,n){const s=function(e){const t=us(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=il.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=ol.bind(null,t),t}(e);try{const e=await function(e,t){const n=us(e),s=Ss.now(),r=t.reduce(((e,t)=>e.add(t.key)),Si());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",(e=>{let a=vi(),c=Si();return n.cs.getEntries(e,r).next((e=>{a=e,a.forEach(((e,t)=>{t.isValidDocument()||(c=c.add(e))}))})).next((()=>n.localDocuments.getOverlayedDocuments(e,a))).next((r=>{i=r;const o=[];for(const e of t){const t=Ji(e,i.get(e.key).overlayedDocument);null!=t&&o.push(new eo(e.key,t,Cr(t.value.mapValue),Ki.exists(!0)))}return n.mutationQueue.addMutationBatch(e,s,o,t)})).next((t=>{o=t;const s=t.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,s)}))})).then((()=>({batchId:o.batchId,changes:_i(i)})))}(s.localStore,t);s.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let s=e.Ba[e.currentUser.toKey()];s||(s=new Gs(Es)),s=s.insert(t,n),e.Ba[e.currentUser.toKey()]=s}(s,e.batchId,n),await pl(s,e.changes),await gc(s.remoteStore)}catch(e){const t=Nc(e,"Failed to persist write");n.reject(t)}}async function nl(e,t){const n=us(e);try{const e=await Da(n.localStore,t);t.targetChanges.forEach(((e,t)=>{const s=n.Na.get(t);s&&(ls(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1),e.addedDocuments.size>0?s.va=!0:e.modifiedDocuments.size>0?ls(s.va):e.removedDocuments.size>0&&(ls(s.va),s.va=!1))})),await pl(n,e,t)}catch(e){await $s(e)}}function sl(e,t,n){const s=us(e);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const e=[];s.Fa.forEach(((n,s)=>{const r=s.view.Z_(t);r.snapshot&&e.push(r.snapshot)})),function(e,t){const n=us(e);n.onlineState=t;let s=!1;n.queries.forEach(((e,n)=>{for(const e of n.j_)e.Z_(t)&&(s=!0)})),s&&Vc(n)}(s.eventManager,t),e.length&&s.Ca.d_(e),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function rl(e,t,n){const s=us(e);s.sharedClientState.updateQueryState(t,"rejected",n);const r=s.Na.get(t),i=r&&r.key;if(i){let e=new Gs(Os.comparator);e=e.insert(i,Ar.newNoDocument(i,Cs.min()));const n=Si().add(i),r=new wo(Cs.min(),new Map,new Gs(Es),e,n);await nl(s,r),s.Oa=s.Oa.remove(i),s.Na.delete(t),fl(s)}else await Pa(s.localStore,t,!1).then((()=>ll(s,t,n))).catch($s)}async function il(e,t){const n=us(e),s=t.batch.batchId;try{const e=await function(e,t){const n=us(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(e=>{const s=t.batch.keys(),r=n.cs.newChangeBuffer({trackRemovals:!0});return function(e,t,n,s){const r=n.batch,i=r.keys();let o=Fs.resolve();return i.forEach((e=>{o=o.next((()=>s.getEntry(t,e))).next((t=>{const i=n.docVersions.get(e);ls(null!==i),t.version.compareTo(i)<0&&(r.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),s.addEntry(t)))}))})),o.next((()=>e.mutationQueue.removeMutationBatch(t,r)))}(n,e,t,r).next((()=>r.apply(e))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Si();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t)))).next((()=>n.localDocuments.getDocuments(e,s)))}))}(n.localStore,t);cl(n,s,null),al(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await pl(n,e)}catch(e){await $s(e)}}async function ol(e,t,n){const s=us(e);try{const e=await function(e,t){const n=us(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",(e=>{let s;return n.mutationQueue.lookupMutationBatch(e,t).next((t=>(ls(null!==t),s=t.keys(),n.mutationQueue.removeMutationBatch(e,t)))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,s))).next((()=>n.localDocuments.getDocuments(e,s)))}))}(s.localStore,t);cl(s,t,n),al(s,t),s.sharedClientState.updateMutationState(t,"rejected",n),await pl(s,e)}catch(n){await $s(n)}}function al(e,t){(e.ka.get(t)||[]).forEach((e=>{e.resolve()})),e.ka.delete(t)}function cl(e,t,n){const s=us(e);let r=s.Ba[s.currentUser.toKey()];if(r){const e=r.get(t);e&&(n?e.reject(n):e.resolve(),r=r.remove(t)),s.Ba[s.currentUser.toKey()]=r}}function ll(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const s of e.Ma.get(t))e.Fa.delete(s),n&&e.Ca.$a(s,n);e.Ma.delete(t),e.isPrimaryClient&&e.La.gr(t).forEach((t=>{e.La.containsKey(t)||ul(e,t)}))}function ul(e,t){e.xa.delete(t.path.canonicalString());const n=e.Oa.get(t);null!==n&&(sc(e.remoteStore,n),e.Oa=e.Oa.remove(t),e.Na.delete(n),fl(e))}function hl(e,t,n){for(const s of n)s instanceof zc?(e.La.addReference(s.key,t),dl(e,s)):s instanceof Kc?(rs("SyncEngine","Document no longer in limbo: "+s.key),e.La.removeReference(s.key,t),e.La.containsKey(s.key)||ul(e,s.key)):cs()}function dl(e,t){const n=t.key,s=n.path.canonicalString();e.Oa.get(n)||e.xa.has(s)||(rs("SyncEngine","New document in limbo: "+n),e.xa.add(s),fl(e))}function fl(e){for(;e.xa.size>0&&e.Oa.size<e.maxConcurrentLimboResolutions;){const t=e.xa.values().next().value;e.xa.delete(t);const n=new Os(Ns.fromString(t)),s=e.qa.next();e.Na.set(s,new Wc(n)),e.Oa=e.Oa.insert(n,s),nc(e.remoteStore,new ra(oi(ni(n.path)),s,"TargetPurposeLimboResolution",js.oe))}}async function pl(e,t,n){const s=us(e),r=[],i=[],o=[];s.Fa.isEmpty()||(s.Fa.forEach(((e,a)=>{o.push(s.Ka(a,t,n).then((e=>{var t;if((e||n)&&s.isPrimaryClient){const r=e?!e.fromCache:null===(t=null==n?void 0:n.targetChanges.get(a.targetId))||void 0===t?void 0:t.current;s.sharedClientState.updateQueryState(a.targetId,r?"current":"not-current")}if(e){r.push(e);const t=ka.Wi(a.targetId,e);i.push(t)}})))})),await Promise.all(o),s.Ca.d_(r),await async function(e,t){const n=us(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(e=>Fs.forEach(t,(t=>Fs.forEach(t.$i,(s=>n.persistence.referenceDelegate.addReference(e,t.targetId,s))).next((()=>Fs.forEach(t.Ui,(s=>n.persistence.referenceDelegate.removeReference(e,t.targetId,s)))))))))}catch(e){if(!Vs(e))throw e;rs("LocalStore","Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.os.get(t),s=e.snapshotVersion,r=e.withLastLimboFreeSnapshotVersion(s);n.os=n.os.insert(t,r)}}}(s.localStore,i))}async function ml(e,t){const n=us(e);if(!n.currentUser.isEqual(t)){rs("SyncEngine","User change. New user:",t.toKey());const e=await Na(n.localStore,t);n.currentUser=t,function(e,t){e.ka.forEach((e=>{e.forEach((e=>{e.reject(new ds(hs.CANCELLED,t))}))})),e.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await pl(n,e.hs)}}function gl(e,t){const n=us(e),s=n.Na.get(t);if(s&&s.va)return Si().add(s.key);{let e=Si();const s=n.Ma.get(t);if(!s)return e;for(const t of s){const s=n.Fa.get(t);e=e.unionWith(s.view.Va)}return e}}function vl(e){const t=us(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=nl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=gl.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=rl.bind(null,t),t.Ca.d_=$c.bind(null,t.eventManager),t.Ca.$a=Fc.bind(null,t.eventManager),t}class yl{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ha(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return function(e,t,n,s){return new Aa(e,t,n,s)}(this.persistence,new Ca,e.initialUser,this.serializer)}Ga(e){return new Ta(Ea.Zr,this.serializer)}Wa(e){return new Ma}async terminate(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}yl.provider={build:()=>new yl};class wl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>sl(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=ml.bind(null,this.syncEngine),await async function(e,t){const n=us(e);t?(n.L_.delete(2),await ec(n)):t||(n.L_.add(2),await tc(n),n.q_.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new xc}createDatastore(e){const t=Ha(e.databaseInfo.databaseId),n=function(e){return new za(e)}(e.databaseInfo);return function(e,t,n,s){return new Ja(e,t,n,s)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,s,r){return new Za(e,t,n,s,r)}(this.localStore,this.datastore,e.asyncQueue,(e=>sl(this.syncEngine,e,0)),$a.D()?new $a:new Ua)}createSyncEngine(e,t){return function(e,t,n,s,r,i,o){const a=new Qc(e,t,n,s,r,i);return o&&(a.Qa=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){const t=us(e);rs("RemoteStore","RemoteStore shutting down."),t.L_.add(5),await tc(t),t.k_.shutdown(),t.q_.set("Unknown")}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate(),null===(t=this.eventManager)||void 0===t||t.terminate()}}wl.provider={build:()=>new wl};
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class _l{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):is("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class bl{constructor(e,t,n,s,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=es.UNAUTHENTICATED,this.clientId=Is.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,(async e=>{rs("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e})),this.appCheckCredentials.start(n,(e=>(rs("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new fs;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Nc(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function Tl(e,t){e.asyncQueue.verifyOperationInProgress(),rs("FirestoreClient","Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let s=n.initialUser;e.setCredentialChangeListener((async e=>{s.isEqual(e)||(await Na(t.localStore,e),s=e)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e._offlineComponents=t}async function Il(e,t){e.asyncQueue.verifyOperationInProgress();const n=await async function(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){rs("FirestoreClient","Using user provided OfflineComponentProvider");try{await Tl(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===hs.FAILED_PRECONDITION||e.code===hs.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(n))throw n;os("Error using user provided cache. Falling back to memory cache: "+n),await Tl(e,new yl)}}else rs("FirestoreClient","Using default OfflineComponentProvider"),await Tl(e,new yl);return e._offlineComponents}(e);rs("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener((e=>kc(t.remoteStore,e))),e.setAppCheckTokenChangeListener(((e,n)=>kc(t.remoteStore,n))),e._onlineComponents=t}async function El(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(rs("FirestoreClient","Using user provided OnlineComponentProvider"),await Il(e,e._uninitializedComponentsProvider._online)):(rs("FirestoreClient","Using default OnlineComponentProvider"),await Il(e,new wl))),e._onlineComponents}async function kl(e){const t=await El(e),n=t.eventManager;return n.onListen=Yc.bind(null,t.syncEngine),n.onUnlisten=Zc.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Jc.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=el.bind(null,t.syncEngine),n}
/**
     * @license
     * Copyright 2023 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function Sl(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}const Cl=new Map;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Al(e,t,n){if(!n)throw new ds(hs.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Nl(e){if(!Os.isDocumentKey(e))throw new ds(hs.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Rl(e){if(Os.isDocumentKey(e))throw new ds(hs.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Dl(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":cs()}function Ol(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new ds(hs.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Dl(e);throw new ds(hs.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Pl{constructor(e){var t,n;if(void 0===e.host){if(void 0!==e.ssl)throw new ds(hs.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new ds(hs.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,s){if(!0===t&&!0===s)throw new ds(hs.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Sl(null!==(n=e.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new ds(hs.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new ds(hs.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new ds(hs.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class xl{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Pl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ds(hs.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new ds(hs.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Pl(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new ms;switch(e.type){case"firstParty":return new ws(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new ds(hs.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Cl.get(e);t&&(rs("ComponentProvider","Removing Datastore"),Cl.delete(e),t.terminate())}(this),Promise.resolve()}}function Ll(e,t,n,s={}){var r;const i=(e=Ol(e,xl))._getSettings(),o=`${t}:${n}`;if("firestore.googleapis.com"!==i.host&&i.host!==o&&os("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),s.mockUserToken){let t,n;if("string"==typeof s.mockUserToken)t=s.mockUserToken,n=es.MOCK_USER;else{t=function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",s=e.iat||0,r=e.sub||e.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},e);return[vt(JSON.stringify({alg:"none",type:"JWT"})),vt(JSON.stringify(i)),""].join(".")}(s.mockUserToken,null===(r=e._app)||void 0===r?void 0:r.options.projectId);const i=s.mockUserToken.sub||s.mockUserToken.user_id;if(!i)throw new ds(hs.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new es(i)}e._authCredentials=new gs(new ps(t,n))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ml{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Ml(this.firestore,e,this._query)}}class Ul{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new $l(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ul(this.firestore,e,this._key)}}class $l extends Ml{constructor(e,t,n){super(e,t,ni(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ul(this.firestore,null,new Os(e))}withConverter(e){return new $l(this.firestore,e,this._path)}}function Fl(e,t,...n){if(e=Lt(e),Al("collection","path",t),e instanceof xl){const s=Ns.fromString(t,...n);return Rl(s),new $l(e,null,s)}{if(!(e instanceof Ul||e instanceof $l))throw new ds(hs.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child(Ns.fromString(t,...n));return Rl(s),new $l(e.firestore,null,s)}}function Vl(e,t,...n){if(e=Lt(e),1===arguments.length&&(t=Is.newId()),Al("doc","path",t),e instanceof xl){const s=Ns.fromString(t,...n);return Nl(s),new Ul(e,null,new Os(s))}{if(!(e instanceof Ul||e instanceof $l))throw new ds(hs.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child(Ns.fromString(t,...n));return Nl(s),new Ul(e.firestore,e instanceof $l?e.converter:null,new Os(s))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class jl{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Ga(this,"async_queue_retry"),this.Vu=()=>{const e=Ka();e&&rs("AsyncQueue","Visibility state changed to "+e.visibilityState),this.t_.jo()},this.mu=e;const t=Ka();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Ka();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new fs;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(0!==this.Pu.length){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Vs(e))throw e;rs("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((e=>{this.Eu=e,this.du=!1;const t=function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e);throw is("INTERNAL UNHANDLED ERROR: ",t),e})).then((e=>(this.du=!1,e))))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=Ac.createAndSchedule(this,e,t,n,(e=>this.yu(e)));return this.Tu.push(s),s}fu(){this.Eu&&cs()}verifyOperationInProgress(){}async wu(){let e;do{e=this.mu,await e}while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((e,t)=>e.targetTimeMs-t.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Bl(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const e of t)if(e in n&&"function"==typeof n[e])return!0;return!1}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e,["next","error","complete"])}class ql extends xl{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new jl,this._persistenceKey=(null==s?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new jl(e),this._firestoreClient=void 0,await e}}}function zl(e){if(e._terminated)throw new ds(hs.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,n,s;const r=e._freezeSettings(),i=function(e,t,n,s){return new cr(e,t,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Sl(s.experimentalLongPollingOptions),s.useFetchStreams)}(e._databaseId,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,r);e._componentsProvider||(null===(n=r.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(s=r.localCache)||void 0===s?void 0:s._onlineComponentProvider)&&(e._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),e._firestoreClient=new bl(e._authCredentials,e._appCheckCredentials,e._queue,i,e._componentsProvider&&function(e){const t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e),e._firestoreClient}class Kl{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Kl(er.fromBase64String(e))}catch(e){throw new ds(hs.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Kl(er.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Hl{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new ds(hs.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ds(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Gl{constructor(e){this._methodName=e}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Wl{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new ds(hs.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new ds(hs.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Es(this._lat,e._lat)||Es(this._long,e._long)}}
/**
     * @license
     * Copyright 2024 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ql{constructor(e){this._values=(e||[]).map((e=>e))}toArray(){return this._values.map((e=>e))}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Yl=/^__.*__$/;class Jl{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new eo(e,this.data,this.fieldMask,t,this.fieldTransforms):new Zi(e,this.data,t,this.fieldTransforms)}}class Xl{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new eo(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Zl(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw cs()}}class eu{constructor(e,t,n,s,r,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,void 0===r&&this.vu(),this.fieldTransforms=r||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new eu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),s=this.Fu({path:n,xu:!1});return s.Ou(e),s}Nu(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),s=this.Fu({path:n,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return fu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return void 0!==this.fieldMask.find((t=>e.isPrefixOf(t)))||void 0!==this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(0===e.length)throw this.Bu("Document fields must not be empty");if(Zl(this.Cu)&&Yl.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class tu{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Ha(e)}Qu(e,t,n,s=!1){return new eu({Cu:e,methodName:t,qu:n,path:Ds.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function nu(e){const t=e._freezeSettings(),n=Ha(e._databaseId);return new tu(e._databaseId,!!t.ignoreUndefinedProperties,n)}class su extends Gl{_toFieldTransform(e){if(2!==e.Cu)throw 1===e.Cu?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof su}}class ru extends Gl{_toFieldTransform(e){return new qi(e.path,new Li)}isEqual(e){return e instanceof ru}}class iu extends Gl{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new Vi(e.serializer,Ri(e.serializer,this.$u));return new qi(e.path,t)}isEqual(e){return e instanceof iu&&this.$u===e.$u}}function ou(e,t){if(cu(e=Lt(e)))return lu("Unsupported field value:",t,e),au(e,t);if(e instanceof Gl)return function(e,t){if(!Zl(t.Cu))throw t.Bu(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Bu(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.xu&&4!==t.Cu)throw t.Bu("Nested arrays are not supported");return function(e,t){const n=[];let s=0;for(const r of e){let e=ou(r,t.Lu(s));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),s++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=Lt(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Ri(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=Ss.fromDate(e);return{timestampValue:Po(t.serializer,n)}}if(e instanceof Ss){const n=new Ss(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Po(t.serializer,n)}}if(e instanceof Wl)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Kl)return{bytesValue:xo(t.serializer,e._byteString)};if(e instanceof Ul){const n=t.databaseId,s=e.firestore._databaseId;if(!s.isEqual(n))throw t.Bu(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Uo(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Ql)return function(e,t){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:e.toArray().map((e=>{if("number"!=typeof e)throw t.Bu("VectorValues must only contain numeric values.");return Ai(t.serializer,e)}))}}}}}}(e,t);throw t.Bu(`Unsupported field value: ${Dl(e)}`)}(e,t)}function au(e,t){const n={};return Hs(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ks(e,((e,s)=>{const r=ou(s,t.Mu(e));null!=r&&(n[e]=r)})),{mapValue:{fields:n}}}function cu(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof Ss||e instanceof Wl||e instanceof Kl||e instanceof Ul||e instanceof Gl||e instanceof Ql)}function lu(e,t,n){if(!cu(n)||!function(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}(n)){const s=Dl(n);throw"an object"===s?t.Bu(e+" a custom object"):t.Bu(e+" "+s)}}function uu(e,t,n){if((t=Lt(t))instanceof Hl)return t._internalPath;if("string"==typeof t)return du(e,t);throw fu("Field path arguments must be of type string or ",e,!1,void 0,n)}const hu=new RegExp("[~\\*/\\[\\]]");function du(e,t,n){if(t.search(hu)>=0)throw fu(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Hl(...t.split("."))._internalPath}catch(s){throw fu(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function fu(e,t,n,s,r){const i=s&&!s.isEmpty(),o=void 0!==r;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new ds(hs.INVALID_ARGUMENT,a+e+c)}function pu(e,t){return e.some((e=>e.isEqual(t)))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class mu{constructor(e,t,n,s,r){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Ul(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new gu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(vu("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class gu extends mu{data(){return super.data()}}function vu(e,t){return"string"==typeof t?du(e,t):t instanceof Hl?t._internalPath:t._delegate._internalPath}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class yu{}class wu extends yu{}class _u extends wu{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new _u(e,t,n)}_apply(e){const t=this._parse(e);return Eu(e._query,t),new Ml(e.firestore,e.converter,ai(e._query,t))}_parse(e){const t=nu(e.firestore),n=function(e,t,n,s,r,i,o){let a;if(r.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new ds(hs.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on documentId().`);if("in"===i||"not-in"===i){Iu(o,i);const t=[];for(const n of o)t.push(Tu(s,e,n));a={arrayValue:{values:t}}}else a=Tu(s,e,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||Iu(o,i),a=function(e,t,n,s=!1){return ou(n,e.Qu(s?4:3,t))}(n,t,o,"in"===i||"not-in"===i);return Lr.create(r,i,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}class bu extends yu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new bu(e,t)}_parse(e){const t=this._queryConstraints.map((t=>t._parse(e))).filter((e=>e.getFilters().length>0));return 1===t.length?t[0]:Mr.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const s=t.getFlattenedFilters();for(const e of s)Eu(n,e),n=ai(n,e)}(e._query,t),new Ml(e.firestore,e.converter,ai(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function Tu(e,t,n){if("string"==typeof(n=Lt(n))){if(""===n)throw new ds(hs.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!ri(t)&&-1!==n.indexOf("/"))throw new ds(hs.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const s=t.path.child(Ns.fromString(n));if(!Os.isDocumentKey(s))throw new ds(hs.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return wr(e,new Os(s))}if(n instanceof Ul)return wr(e,n._key);throw new ds(hs.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Dl(n)}.`)}function Iu(e,t){if(!Array.isArray(e)||0===e.length)throw new ds(hs.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Eu(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new ds(hs.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new ds(hs.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class ku{convertValue(e,t="none"){switch(hr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return sr(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(rr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw cs()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Ks(e,((e,s)=>{n[e]=this.convertValue(s,t)})),n}convertVectorValue(e){var t,n,s;const r=null===(s=null===(n=null===(t=e.fields)||void 0===t?void 0:t.value.arrayValue)||void 0===n?void 0:n.values)||void 0===s?void 0:s.map((e=>sr(e.doubleValue)));return new Ql(r)}convertGeoPoint(e){return new Wl(sr(e.latitude),sr(e.longitude))}convertArray(e,t){return(e.values||[]).map((e=>this.convertValue(e,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=or(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ar(e));default:return null}}convertTimestamp(e){const t=nr(e);return new Ss(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Ns.fromString(e);ls(sa(n));const s=new lr(n.get(1),n.get(3)),r=new Os(n.popFirst(5));return s.isEqual(t)||is(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Su{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Cu extends mu{constructor(e,t,n,s,r,i){super(e,t,n,s,i),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Au(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(vu("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class Au extends Cu{data(e={}){return super.data(e)}}class Nu{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Su(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Au(this._firestore,this._userDataWriter,n.key,n,new Su(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new ds(hs.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map((n=>{const s=new Au(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Su(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:s,oldIndex:-1,newIndex:t++}}))}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter((e=>t||3!==e.type)).map((t=>{const s=new Au(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Su(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let r=-1,i=-1;return 0!==t.type&&(r=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),i=n.indexOf(t.doc.key)),{type:Ru(t.type),doc:s,oldIndex:r,newIndex:i}}))}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Ru(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return cs()}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Du(e){e=Ol(e,Ul);const t=Ol(e.firestore,ql);return function(e,t,n={}){const s=new fs;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,s,r){const i=new _l({next:a=>{i.Za(),t.enqueueAndForget((()=>Uc(e,o)));const c=a.docs.has(n);!c&&a.fromCache?r.reject(new ds(hs.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&s&&"server"===s.source?r.reject(new ds(hs.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):r.resolve(a)},error:e=>r.reject(e)}),o=new qc(ni(n.path),i,{includeMetadataChanges:!0,_a:!0});return Mc(e,o)}(await kl(e),e.asyncQueue,t,n,s))),s.promise}(zl(t),e._key).then((n=>Lu(t,e,n)))}class Ou extends ku{constructor(e){super(),this.firestore=e}convertBytes(e){return new Kl(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ul(this.firestore,null,t)}}function Pu(e,...t){var n,s,r;e=Lt(e);let i={includeMetadataChanges:!1,source:"default"},o=0;"object"!=typeof t[o]||Bl(t[o])||(i=t[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Bl(t[o])){const e=t[o];t[o]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[o+1]=null===(s=e.error)||void 0===s?void 0:s.bind(e),t[o+2]=null===(r=e.complete)||void 0===r?void 0:r.bind(e)}let c,l,u;if(e instanceof Ul)l=Ol(e.firestore,ql),u=ni(e._key.path),c={next:n=>{t[o]&&t[o](Lu(l,e,n))},error:t[o+1],complete:t[o+2]};else{const n=Ol(e,Ml);l=Ol(n.firestore,ql),u=n._query;const s=new Ou(l);c={next:e=>{t[o]&&t[o](new Nu(l,s,n,e))},error:t[o+1],complete:t[o+2]},function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new ds(hs.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query)}return function(e,t,n,s){const r=new _l(s),i=new qc(t,r,n);return e.asyncQueue.enqueueAndForget((async()=>Mc(await kl(e),i))),()=>{r.Za(),e.asyncQueue.enqueueAndForget((async()=>Uc(await kl(e),i)))}}(zl(l),u,a,c)}function xu(e,t){return function(e,t){const n=new fs;return e.asyncQueue.enqueueAndForget((async()=>tl(await function(e){return El(e).then((e=>e.syncEngine))}(e),t,n))),n.promise}(zl(e),t)}function Lu(e,t,n){const s=n.docs.get(t._key),r=new Ou(e);return new Cu(e,r,t._key,s,new Su(n.hasPendingWrites,n.fromCache),t.converter)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Mu{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=nu(e)}set(e,t,n){this._verifyNotCommitted();const s=Uu(e,this._firestore),r=function(e,t,n){let s;return s=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,s}(s.converter,t,n),i=function(e,t,n,s,r,i={}){const o=e.Qu(i.merge||i.mergeFields?2:0,t,n,r);lu("Data must be an object, but it was:",o,s);const a=au(s,o);let c,l;if(i.merge)c=new Xs(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const e=[];for(const s of i.mergeFields){const r=uu(t,s,n);if(!o.contains(r))throw new ds(hs.INVALID_ARGUMENT,`Field '${r}' is specified in your field mask but missing from your input data.`);pu(e,r)||e.push(r)}c=new Xs(e),l=o.fieldTransforms.filter((e=>c.covers(e.field)))}else c=null,l=o.fieldTransforms;return new Jl(new Sr(a),c,l)}(this._dataReader,"WriteBatch.set",s._key,r,null!==s.converter,n);return this._mutations.push(i.toMutation(s._key,Ki.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const r=Uu(e,this._firestore);let i;return i="string"==typeof(t=Lt(t))||t instanceof Hl?function(e,t,n,s,r,i){const o=e.Qu(1,t,n),a=[uu(t,s,n)],c=[r];if(i.length%2!=0)throw new ds(hs.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<i.length;e+=2)a.push(uu(t,i[e])),c.push(i[e+1]);const l=[],u=Sr.empty();for(let e=a.length-1;e>=0;--e)if(!pu(l,a[e])){const t=a[e];let n=c[e];n=Lt(n);const s=o.Nu(t);if(n instanceof su)l.push(t);else{const e=ou(n,s);null!=e&&(l.push(t),u.set(t,e))}}const h=new Xs(l);return new Xl(u,h,o.fieldTransforms)}(this._dataReader,"WriteBatch.update",r._key,t,n,s):function(e,t,n,s){const r=e.Qu(1,t,n);lu("Data must be an object, but it was:",r,s);const i=[],o=Sr.empty();Ks(s,((e,s)=>{const a=du(t,e,n);s=Lt(s);const c=r.Nu(a);if(s instanceof su)i.push(a);else{const e=ou(s,c);null!=e&&(i.push(a),o.set(a,e))}}));const a=new Xs(i);return new Xl(o,a,r.fieldTransforms)}(this._dataReader,"WriteBatch.update",r._key,t),this._mutations.push(i.toMutation(r._key,Ki.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Uu(e,this._firestore);return this._mutations=this._mutations.concat(new ro(t._key,Ki.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new ds(hs.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Uu(e,t){if((e=Lt(e)).firestore!==t)throw new ds(hs.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}function $u(){return new ru("serverTimestamp")}function Fu(e){return new iu("increment",e)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Vu(e){return zl(e=Ol(e,ql)),new Mu(e,(t=>xu(e,t)))}!function(e,t=!0){!function(e){ts=e}(kn),_n(new Mt("firestore",((e,{instanceIdentifier:n,options:s})=>{const r=e.getProvider("app").getImmediate(),i=new ql(new vs(e.getProvider("auth-internal")),new bs(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new ds(hs.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new lr(e.options.projectId,t)}(r,n),r);return s=Object.assign({useFetchStreams:t},s),i._setSettings(s),i}),"PUBLIC").setMultipleInstances(!0)),An(Zn,"4.7.3",e),An(Zn,"4.7.3","esm2017")}();function ju(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(s=Object.getOwnPropertySymbols(e);r<s.length;r++)t.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(e,s[r])&&(n[s[r]]=e[s[r]])}return n}function Bu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
An("firebase","10.14.1","app"),"function"==typeof SuppressedError&&SuppressedError;const qu=Bu,zu=new At("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),Ku=new Kt("@firebase/auth");function Hu(e,...t){Ku.logLevel<=Vt.ERROR&&Ku.error(`Auth (${kn}): ${e}`,...t)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Gu(e,...t){throw Ju(e,...t)}function Wu(e,...t){return Ju(e,...t)}function Qu(e,t,n){const s=Object.assign(Object.assign({},qu()),{[t]:n});return new At("auth","Firebase",s).create(t,{appName:e.name})}function Yu(e){return Qu(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ju(e,...t){if("string"!=typeof e){const n=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=e.name),e._errorFactory.create(n,...s)}return zu.create(e,...t)}function Xu(e,t,...n){if(!e)throw Ju(t,...n)}function Zu(e){const t="INTERNAL ASSERTION FAILED: "+e;throw Hu(t),new Error(t)}function eh(e,t){e||Zu(t)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function th(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function nh(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function sh(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==nh()&&"https:"!==nh()&&!function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&!("connection"in navigator)||navigator.onLine}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class rh{constructor(e,t){this.shortDelay=e,this.longDelay=t,eh(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(kt())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return sh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ih(e,t){eh(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class oh{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void Zu("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void Zu("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void Zu("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const ah={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},ch=new rh(3e4,6e4);
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function lh(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function uh(e,t,n,s,r={}){return hh(e,r,(async()=>{let r={},i={};s&&("GET"===t?i=s:r={body:JSON.stringify(s)});const o=Ot(Object.assign({key:e.config.apiKey},i)).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c=Object.assign({method:t,headers:a},r);return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="no-referrer"),oh.fetch()(fh(e,e.config.apiHost,n,o),c)}))}async function hh(e,t,n){e._canInitEmulator=!1;const s=Object.assign(Object.assign({},ah),t);try{const t=new ph(e),r=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const i=await r.json();if("needConfirmation"in i)throw mh(e,"account-exists-with-different-credential",i);if(r.ok&&!("errorMessage"in i))return i;{const t=r.ok?i.errorMessage:i.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw mh(e,"credential-already-in-use",i);if("EMAIL_EXISTS"===n)throw mh(e,"email-already-in-use",i);if("USER_DISABLED"===n)throw mh(e,"user-disabled",i);const a=s[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw Qu(e,a,o);Gu(e,a)}}catch(t){if(t instanceof Ct)throw t;Gu(e,"network-request-failed",{message:String(t)})}}async function dh(e,t,n,s,r={}){const i=await uh(e,t,n,s,r);return"mfaPendingCredential"in i&&Gu(e,"multi-factor-auth-required",{_serverResponse:i}),i}function fh(e,t,n,s){const r=`${t}${n}?${s}`;return e.config.emulator?ih(e.config,r):`${e.config.apiScheme}://${r}`}class ph{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise(((e,t)=>{this.timer=setTimeout((()=>t(Wu(this.auth,"network-request-failed"))),ch.get())}))}clearNetworkTimeout(){clearTimeout(this.timer)}}function mh(e,t,n){const s={appName:e.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=Wu(e,t,s);return r.customData._tokenResponse=n,r}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */async function gh(e,t){return uh(e,"POST","/v1/accounts:lookup",t)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function vh(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}function yh(e){return 1e3*Number(e)}function wh(e){const[t,n,s]=e.split(".");if(void 0===t||void 0===n||void 0===s)return Hu("JWT malformed, contained fewer than 3 sections"),null;try{const e=yt(n);return e?JSON.parse(e):(Hu("Failed to decode base64 JWT payload"),null)}catch(e){return Hu("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}function _h(e){const t=wh(e);return Xu(t,"internal-error"),Xu(void 0!==t.exp,"internal-error"),Xu(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */async function bh(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof Ct&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}class Th{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout((async()=>{await this.iteration()}),t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ih{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=vh(this.lastLoginAt),this.creationTime=vh(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */async function Eh(e){var t;const n=e.auth,s=await e.getIdToken(),r=await bh(e,gh(n,{idToken:s}));Xu(null==r?void 0:r.users.length,n,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const o=(null===(t=i.providerUserInfo)||void 0===t?void 0:t.length)?kh(i.providerUserInfo):[],a=(c=e.providerData,l=o,[...c.filter((e=>!l.some((t=>t.providerId===e.providerId)))),...l]);var c,l;const u=e.isAnonymous,h=!(e.email&&i.passwordHash||(null==a?void 0:a.length)),d=!!u&&h,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Ih(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(e,f)}function kh(e){return e.map((e=>{var{providerId:t}=e,n=ju(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}}))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Sh{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Xu(e.idToken,"internal-error"),Xu(void 0!==e.idToken,"internal-error"),Xu(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):_h(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Xu(0!==e.length,"internal-error");const t=_h(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(Xu(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:r}=await async function(e,t){const n=await hh(e,{},(async()=>{const n=Ot({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:r}=e.config,i=fh(e,s,"/v1/token",`key=${r}`),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",oh.fetch()(i,{method:"POST",headers:o,body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,s,Number(r))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:r}=t,i=new Sh;return n&&(Xu("string"==typeof n,"internal-error",{appName:e}),i.refreshToken=n),s&&(Xu("string"==typeof s,"internal-error",{appName:e}),i.accessToken=s),r&&(Xu("number"==typeof r,"internal-error",{appName:e}),i.expirationTime=r),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Sh,this.toJSON())}_performRefresh(){return Zu("not implemented")}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Ch(e,t){Xu("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Ah{constructor(e){var{uid:t,auth:n,stsTokenManager:s}=e,r=ju(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Th(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Ih(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await bh(this,this.stsTokenManager.getToken(this.auth,e));return Xu(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=Lt(e),s=await n.getIdToken(t),r=wh(s);Xu(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i="object"==typeof r.firebase?r.firebase:void 0,o=null==i?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:vh(yh(r.auth_time)),issuedAtTime:vh(yh(r.iat)),expirationTime:vh(yh(r.exp)),signInProvider:o||null,signInSecondFactor:(null==i?void 0:i.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=Lt(e);await Eh(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(Xu(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((e=>Object.assign({},e))),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ah(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Xu(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Eh(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Tn(this.auth.app))return Promise.reject(Yu(this.auth));const e=await this.getIdToken();return await bh(this,async function(e,t){return uh(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((e=>Object.assign({},e))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,s,r,i,o,a,c,l;const u=null!==(n=t.displayName)&&void 0!==n?n:void 0,h=null!==(s=t.email)&&void 0!==s?s:void 0,d=null!==(r=t.phoneNumber)&&void 0!==r?r:void 0,f=null!==(i=t.photoURL)&&void 0!==i?i:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,m=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,g=null!==(c=t.createdAt)&&void 0!==c?c:void 0,v=null!==(l=t.lastLoginAt)&&void 0!==l?l:void 0,{uid:y,emailVerified:w,isAnonymous:_,providerData:b,stsTokenManager:T}=t;Xu(y&&T,e,"internal-error");const I=Sh.fromJSON(this.name,T);Xu("string"==typeof y,e,"internal-error"),Ch(u,e.name),Ch(h,e.name),Xu("boolean"==typeof w,e,"internal-error"),Xu("boolean"==typeof _,e,"internal-error"),Ch(d,e.name),Ch(f,e.name),Ch(p,e.name),Ch(m,e.name),Ch(g,e.name),Ch(v,e.name);const E=new Ah({uid:y,auth:e,email:h,emailVerified:w,displayName:u,isAnonymous:_,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:I,createdAt:g,lastLoginAt:v});return b&&Array.isArray(b)&&(E.providerData=b.map((e=>Object.assign({},e)))),m&&(E._redirectEventId=m),E}static async _fromIdTokenResponse(e,t,n=!1){const s=new Sh;s.updateFromServerResponse(t);const r=new Ah({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Eh(r),r}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];Xu(void 0!==s.localId,"internal-error");const r=void 0!==s.providerUserInfo?kh(s.providerUserInfo):[],i=!(s.email&&s.passwordHash||(null==r?void 0:r.length)),o=new Sh;o.updateFromIdToken(n);const a=new Ah({uid:s.localId,auth:e,stsTokenManager:o,isAnonymous:i}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Ih(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash||(null==r?void 0:r.length))};return Object.assign(a,c),a}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Nh=new Map;function Rh(e){eh(e instanceof Function,"Expected a class definition");let t=Nh.get(e);return t?(eh(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Nh.set(e,t),t)}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Dh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Dh.type="NONE";const Oh=Dh;
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Ph(e,t,n){return`firebase:${e}:${t}:${n}`}class xh{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:r}=this.auth;this.fullUserKey=Ph(this.userKey,s.apiKey,r),this.fullPersistenceKey=Ph("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ah._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new xh(Rh(Oh),e,n);const s=(await Promise.all(t.map((async e=>{if(await e._isAvailable())return e})))).filter((e=>e));let r=s[0]||Rh(Oh);const i=Ph(n,e.config.apiKey,e.name);let o=null;for(const n of t)try{const t=await n._get(i);if(t){const s=Ah._fromJSON(e,t);n!==r&&(o=s),r=n;break}}catch(e){}const a=s.filter((e=>e._shouldAllowMigration));return r._shouldAllowMigration&&a.length?(r=a[0],o&&await r._set(i,o.toJSON()),await Promise.all(t.map((async e=>{if(e!==r)try{await e._remove(i)}catch(e){}}))),new xh(r,e,n)):new xh(r,e,n)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Lh(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Fh(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Mh(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(jh(t))return"Blackberry";if(Bh(t))return"Webos";if(Uh(t))return"Safari";if((t.includes("chrome/")||$h(t))&&!t.includes("edge/"))return"Chrome";if(Vh(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function Mh(e=kt()){return/firefox\//i.test(e)}function Uh(e=kt()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function $h(e=kt()){return/crios\//i.test(e)}function Fh(e=kt()){return/iemobile/i.test(e)}function Vh(e=kt()){return/android/i.test(e)}function jh(e=kt()){return/blackberry/i.test(e)}function Bh(e=kt()){return/webos/i.test(e)}function qh(e=kt()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function zh(){return function(){const e=kt();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function Kh(e=kt()){return qh(e)||Vh(e)||Bh(e)||jh(e)||/windows phone/i.test(e)||Fh(e)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Hh(e,t=[]){let n;switch(e){case"Browser":n=Lh(kt());break;case"Worker":n=`${Lh(kt())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${kn}/${s}`}
/**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Gh{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise(((n,s)=>{try{n(e(t))}catch(e){s(e)}}));n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(const e of t)try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}
/**
     * @license
     * Copyright 2023 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Wh{constructor(e){var t,n,s,r;const i=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=i.minPasswordLength)&&void 0!==t?t:6,i.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=i.maxPasswordLength),void 0!==i.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=i.containsLowercaseCharacter),void 0!==i.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=i.containsUppercaseCharacter),void 0!==i.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=i.containsNumericCharacter),void 0!==i.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=i.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(s=null===(n=e.allowedNonAlphanumericCharacters)||void 0===n?void 0:n.join(""))&&void 0!==s?s:"",this.forceUpgradeOnSignin=null!==(r=e.forceUpgradeOnSignin)&&void 0!==r&&r,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,s,r,i,o;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=null===(t=a.meetsMinPasswordLength)||void 0===t||t),a.isValid&&(a.isValid=null===(n=a.meetsMaxPasswordLength)||void 0===n||n),a.isValid&&(a.isValid=null===(s=a.containsLowercaseLetter)||void 0===s||s),a.isValid&&(a.isValid=null===(r=a.containsUppercaseLetter)||void 0===r||r),a.isValid&&(a.isValid=null===(i=a.containsNumericCharacter)||void 0===i||i),a.isValid&&(a.isValid=null===(o=a.containsNonAlphanumericCharacter)||void 0===o||o),a}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Qh{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Jh(this),this.idTokenSubscription=new Jh(this),this.beforeStateQueue=new Gh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=zu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Rh(t)),this._initializationPromise=this.queue((async()=>{var n,s;if(!this._deleted&&(this.persistenceManager=await xh.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(s=this.currentUser)||void 0===s?void 0:s.uid)||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await gh(this,{idToken:e}),n=await Ah._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Tn(this.app)){const e=this.app.settings.authIdToken;return e?new Promise((t=>{setTimeout((()=>this.initializeCurrentUserFromIdToken(e).then(t,t)))})):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,i=null==s?void 0:s._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==i||!(null==o?void 0:o.user)||(s=o.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(e){s=n,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(e)))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Xu(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Eh(e)}catch(e){if("auth/network-request-failed"!==(null==e?void 0:e.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Tn(this.app))return Promise.reject(Yu(this));const t=e?Lt(e):null;return t&&Xu(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Xu(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue((async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()}))}async signOut(){return Tn(this.app)?Promise.reject(Yu(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Tn(this.app)?Promise.reject(Yu(this)):this.queue((async()=>{await this.assertedPersistence.setPersistence(Rh(e))}))}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return uh(e,"GET","/v2/passwordPolicy",lh(e,t))}
/**
     * @license
     * Copyright 2023 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(this),t=new Wh(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new At("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise(((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged((()=>{n(),e()}),t)}}))}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return uh(e,"POST","/v2/accounts:revokeToken",lh(e,t))}(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Rh(e)||this._popupRedirectResolver;Xu(t,this,"argument-error"),this.redirectPersistenceManager=await xh.create(this,[Rh(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(e)))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const r="function"==typeof t?t:t.next.bind(t);let i=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(Xu(o,this,"internal-error"),o.then((()=>{i||r(this.currentUser)})),"function"==typeof t){const r=e.addObserver(t,n,s);return()=>{i=!0,r()}}{const n=e.addObserver(t);return()=>{i=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Xu(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Hh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await(null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){Ku.logLevel<=Vt.WARN&&Ku.warn(`Auth (${kn}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function Yh(e){return Lt(e)}class Jh{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new Pt(e,t);return n.subscribe.bind(n)}((e=>this.observer=e))}get next(){return Xu(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let Xh={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Zh(e,t,n){const s=Yh(e);Xu(s._canInitEmulator,s,"emulator-config-failed"),Xu(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const r=!!(null==n?void 0:n.disableWarnings),i=ed(t),{host:o,port:a}=function(e){const t=ed(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const e=r[1];return{host:e,port:td(s.substr(e.length+1))}}{const[e,t]=s.split(":");return{host:e,port:td(t)}}}(t),c=null===a?"":`:${a}`;s.config.emulator={url:`${i}//${o}${c}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})}),r||function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */()}function ed(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function td(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class nd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Zu("not implemented")}_getIdTokenResponse(e){return Zu("not implemented")}_linkToIdToken(e,t){return Zu("not implemented")}_getReauthenticationResolver(e){return Zu("not implemented")}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */async function sd(e,t){return dh(e,"POST","/v1/accounts:signInWithIdp",lh(e,t))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class rd extends nd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new rd(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Gu("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:s}=t,r=ju(t,["providerId","signInMethod"]);if(!n||!s)return null;const i=new rd(n,s);return i.idToken=r.idToken||void 0,i.accessToken=r.accessToken||void 0,i.secret=r.secret,i.nonce=r.nonce,i.pendingToken=r.pendingToken||null,i}_getIdTokenResponse(e){return sd(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,sd(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,sd(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ot(t)}return e}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class id{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class od extends id{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ad extends od{constructor(){super("facebook.com")}static credential(e){return rd._fromParams({providerId:ad.PROVIDER_ID,signInMethod:ad.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ad.credentialFromTaggedObject(e)}static credentialFromError(e){return ad.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return ad.credential(e.oauthAccessToken)}catch(e){return null}}}ad.FACEBOOK_SIGN_IN_METHOD="facebook.com",ad.PROVIDER_ID="facebook.com";
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class cd extends od{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return rd._fromParams({providerId:cd.PROVIDER_ID,signInMethod:cd.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return cd.credentialFromTaggedObject(e)}static credentialFromError(e){return cd.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return cd.credential(t,n)}catch(e){return null}}}cd.GOOGLE_SIGN_IN_METHOD="google.com",cd.PROVIDER_ID="google.com";
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class ld extends od{constructor(){super("github.com")}static credential(e){return rd._fromParams({providerId:ld.PROVIDER_ID,signInMethod:ld.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ld.credentialFromTaggedObject(e)}static credentialFromError(e){return ld.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return ld.credential(e.oauthAccessToken)}catch(e){return null}}}ld.GITHUB_SIGN_IN_METHOD="github.com",ld.PROVIDER_ID="github.com";
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class ud extends od{constructor(){super("twitter.com")}static credential(e,t){return rd._fromParams({providerId:ud.PROVIDER_ID,signInMethod:ud.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ud.credentialFromTaggedObject(e)}static credentialFromError(e){return ud.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return ud.credential(t,n)}catch(e){return null}}}ud.TWITTER_SIGN_IN_METHOD="twitter.com",ud.PROVIDER_ID="twitter.com";
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class hd{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const r=await Ah._fromIdTokenResponse(e,n,s),i=dd(n);return new hd({user:r,providerId:i,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=dd(n);return new hd({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function dd(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */async function fd(e){var t;if(Tn(e.app))return Promise.reject(Yu(e));const n=Yh(e);if(await n._initializationPromise,null===(t=n.currentUser)||void 0===t?void 0:t.isAnonymous)return new hd({user:n.currentUser,providerId:null,operationType:"signIn"});const s=
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */await async function(e,t){return dh(e,"POST","/v1/accounts:signUp",lh(e,t))}(n,{returnSecureToken:!0}),r=await hd._fromIdTokenResponse(n,"signIn",s,!0);return await n._updateCurrentUser(r.user),r}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class pd extends Ct{constructor(e,t,n,s){var r;super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,pd.prototype),this.customData={appName:e.name,tenantId:null!==(r=e.tenantId)&&void 0!==r?r:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new pd(e,t,n,s)}}function md(e,t,n,s){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw pd._fromErrorAndOperation(e,n,t,s);throw n}))}const gd="__sak";
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class vd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(gd,"1"),this.storage.removeItem(gd),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class yd extends vd{constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Kh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys(((e,t,n)=>{this.notifyListeners(e,n)}));const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},r=this.storage.getItem(n);zh()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,10):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}yd.type="LOCAL";const wd=yd;
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class _d extends vd{constructor(){super((()=>window.sessionStorage),"SESSION")}_addListener(e,t){}_removeListener(e,t){}}_d.type="SESSION";const bd=_d;
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Td{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find((t=>t.isListeningto(e)));if(t)return t;const n=new Td(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:r}=t.data,i=this.handlersMap[s];if(!(null==i?void 0:i.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const o=Array.from(i).map((async e=>e(t.origin,r))),a=await function(e){return Promise.all(e.map((async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}})))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function Id(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */Td.receivers=[];class Ed{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,i;return new Promise(((o,a)=>{const c=Id("",20);s.port1.start();const l=setTimeout((()=>{a(new Error("unsupported_event"))}),n);i={messageChannel:s,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(l),r=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(r),o(t.data.response);break;default:clearTimeout(l),clearTimeout(r),a(new Error("invalid_response"))}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])})).finally((()=>{i&&this.removeMessageHandler(i)}))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function kd(){return window}
/**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function Sd(){return void 0!==kd().WorkerGlobalScope&&"function"==typeof kd().importScripts}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const Cd="firebaseLocalStorageDb",Ad="firebaseLocalStorage",Nd="fbase_key";class Rd{constructor(e){this.request=e}toPromise(){return new Promise(((e,t)=>{this.request.addEventListener("success",(()=>{e(this.request.result)})),this.request.addEventListener("error",(()=>{t(this.request.error)}))}))}}function Dd(e,t){return e.transaction([Ad],t?"readwrite":"readonly").objectStore(Ad)}function Od(){const e=indexedDB.open(Cd,1);return new Promise(((t,n)=>{e.addEventListener("error",(()=>{n(e.error)})),e.addEventListener("upgradeneeded",(()=>{const t=e.result;try{t.createObjectStore(Ad,{keyPath:Nd})}catch(e){n(e)}})),e.addEventListener("success",(async()=>{const n=e.result;n.objectStoreNames.contains(Ad)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(Cd);return new Rd(e).toPromise()}(),t(await Od()))}))}))}async function Pd(e,t,n){const s=Dd(e,!0).put({[Nd]:t,value:n});return new Rd(s).toPromise()}function xd(e,t){const n=Dd(e,!0).delete(t);return new Rd(n).toPromise()}class Ld{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await Od()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Sd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Td._getInstance(Sd()?self:null),this.receiver._subscribe("keyChanged",(async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)}))),this.receiver._subscribe("ping",(async(e,t)=>["keyChanged"]))}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}(),!this.activeServiceWorker)return;this.sender=new Ed(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Od();return await Pd(e,gd,"1"),await xd(e,gd),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite((async()=>(await this._withRetries((n=>Pd(n,e,t))),this.localCache[e]=t,this.notifyServiceWorker(e))))}async _get(e){const t=await this._withRetries((t=>async function(e,t){const n=Dd(e,!1).get(t),s=await new Rd(n).toPromise();return void 0===s?null:s.value}(t,e)));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite((async()=>(await this._withRetries((t=>xd(t,e))),delete this.localCache[e],this.notifyServiceWorker(e))))}async _poll(){const e=await this._withRetries((e=>{const t=Dd(e,!1).getAll();return new Rd(t).toPromise()}));if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:s,value:r}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Ld.type="LOCAL";const Md=Ld;new rh(3e4,6e4);
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Ud extends nd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return sd(e,this._buildIdpRequest())}_linkToIdToken(e,t){return sd(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return sd(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function $d(e){
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
return async function(e,t,n=!1){if(Tn(e.app))return Promise.reject(Yu(e));const s="signIn",r=await md(e,s,t),i=await hd._fromIdTokenResponse(e,s,r);return n||await e._updateCurrentUser(i.user),i}(e.auth,new Ud(e),e.bypassAuthState)}function Fd(e){const{auth:t,user:n}=e;return Xu(n,t,"internal-error"),
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
async function(e,t,n=!1){const{auth:s}=e;if(Tn(s.app))return Promise.reject(Yu(s));const r="reauthenticate";try{const i=await bh(e,md(s,r,t,e),n);Xu(i.idToken,s,"internal-error");const o=wh(i.idToken);Xu(o,s,"internal-error");const{sub:a}=o;return Xu(e.uid===a,s,"user-mismatch"),hd._forOperation(e,r,i)}catch(e){throw"auth/user-not-found"===(null==e?void 0:e.code)&&Gu(s,"user-mismatch"),e}}(n,new Ud(e),e.bypassAuthState)}async function Vd(e){const{auth:t,user:n}=e;return Xu(n,t,"internal-error"),async function(e,t,n=!1){const s=await bh(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return hd._forOperation(e,"link",s)}(n,new Ud(e),e.bypassAuthState)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class jd{constructor(e,t,n,s,r=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}}))}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:r,error:i,type:o}=e;if(i)return void this.reject(i);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return $d;case"linkViaPopup":case"linkViaRedirect":return Vd;case"reauthViaPopup":case"reauthViaRedirect":return Fd;default:Gu(this.auth,"internal-error")}}resolve(e){eh(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){eh(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Bd=new rh(2e3,1e4);class qd extends jd{constructor(e,t,n,s,r){super(e,t,s,r),this.provider=n,this.authWindow=null,this.pollId=null,qd.currentPopupAction&&qd.currentPopupAction.cancel(),qd.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Xu(e,this.auth,"internal-error"),e}async onExecution(){eh(1===this.filter.length,"Popup operations only handle one event");const e=Id();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((e=>{this.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(e=>{e||this.reject(Wu(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(Wu(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qd.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(Wu(this.auth,"popup-closed-by-user"))}),8e3):this.pollId=window.setTimeout(e,Bd.get())};e()}}qd.currentPopupAction=null;
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const zd="pendingRedirect",Kd=new Map;class Hd extends jd{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Kd.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return Ph(zd,e.config.apiKey,e.name)}(t),s=function(e){return Rh(e._redirectPersistence)}(e);if(!await s._isAvailable())return!1;const r="true"===await s._get(n);return await s._remove(n),r}(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Kd.set(this.auth._key(),e)}return this.bypassAuthState||Kd.set(this.auth._key(),(()=>Promise.resolve(null))),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function Gd(e,t){Kd.set(e._key(),t)}async function Wd(e,t,n=!1){if(Tn(e.app))return Promise.reject(Yu(e));const s=Yh(e),r=
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function(e,t){return t?Rh(t):(Xu(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}(s,t),i=new Hd(s,r,n),o=await i.execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,t)),o}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Qd{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Jd(e);default:return!1}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Jd(e)){const s=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(Wu(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Yd(e))}saveEventToCache(e){this.cachedEventUids.add(Yd(e)),this.lastProcessedEventTime=Date.now()}}function Yd(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((e=>e)).join("-")}function Jd({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const Xd=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Zd=/^https?/;async function ef(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return uh(e,"GET","/v1/projects",t)}(e);for(const e of t)try{if(tf(e))return}catch(e){}Gu(e,"unauthorized-domain")}function tf(e){const t=th(),{protocol:n,hostname:s}=new URL(t);if(e.startsWith("chrome-extension://")){const r=new URL(e);return""===r.hostname&&""===s?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&r.hostname===s}if(!Zd.test(n))return!1;if(Xd.test(e))return s===e;const r=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}
/**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const nf=new rh(3e4,6e4);function sf(){const e=kd().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}function rf(e){return new Promise(((t,n)=>{var s,r,i,o;function a(){sf(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{sf(),n(Wu(e,"network-request-failed"))},timeout:nf.get()})}if(null===(r=null===(s=kd().gapi)||void 0===s?void 0:s.iframes)||void 0===r?void 0:r.Iframe)t(gapi.iframes.getContext());else{if(!(null===(i=kd().gapi)||void 0===i?void 0:i.load)){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return kd()[t]=()=>{gapi.load?a():n(Wu(e,"network-request-failed"))},(o=`${Xh.gapiScript}?onload=${t}`,Xh.loadJS(o)).catch((e=>n(e)))}a()}})).catch((e=>{throw of=null,e}))}let of=null;
/**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const af=new rh(5e3,15e3),cf="__/auth/iframe",lf="emulator/auth/iframe",uf={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},hf=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function df(e){const t=e.config;Xu(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?ih(t,lf):`https://${e.config.authDomain}/${cf}`,s={apiKey:t.apiKey,appName:e.name,v:kn},r=hf.get(e.config.apiHost);r&&(s.eid=r);const i=e._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Ot(s).slice(1)}`}async function ff(e){const t=await function(e){return of=of||rf(e),of}(e),n=kd().gapi;return Xu(n,e,"internal-error"),t.open({where:document.body,url:df(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:uf,dontclear:!0},(t=>new Promise((async(n,s)=>{await t.restyle({setHideOnLeave:!1});const r=Wu(e,"network-request-failed"),i=kd().setTimeout((()=>{s(r)}),af.get());function o(){kd().clearTimeout(i),n(t)}t.ping(o).then(o,(()=>{s(r)}))}))))}
/**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const pf={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class mf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function gf(e,t,n,s=500,r=600){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c=Object.assign(Object.assign({},pf),{width:s.toString(),height:r.toString(),top:i,left:o}),l=kt().toLowerCase();n&&(a=$h(l)?"_blank":n),Mh(l)&&(t=t||"http://localhost",c.scrollbars="yes");const u=Object.entries(c).reduce(((e,[t,n])=>`${e}${t}=${n},`),"");if(function(e=kt()){var t;return qh(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(l)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t||"",a),new mf(null);const h=window.open(t||"",a,u);Xu(h,e,"popup-blocked");try{h.focus()}catch(e){}return new mf(h)}const vf="__/auth/handler",yf="emulator/auth/handler",wf=encodeURIComponent("fac");async function _f(e,t,n,s,r,i){Xu(e.config.authDomain,e,"auth-domain-config-required"),Xu(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:kn,eventId:r};if(t instanceof id){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(i||{}))o[e]=t}if(t instanceof od){const e=t.getScopes().filter((e=>""!==e));e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const e of Object.keys(a))void 0===a[e]&&delete a[e];const c=await e._getAppCheckToken(),l=c?`#${wf}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${vf}`;return ih(e,yf)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e)}?${Ot(a).slice(1)}${l}`}const bf="webStorageSupport";const Tf=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=bd,this._completeRedirectFn=Wd,this._overrideRedirectResult=Gd}async _openPopup(e,t,n,s){var r;eh(null===(r=this.eventManagers[e._key()])||void 0===r?void 0:r.manager,"_initialize() not called before _openPopup()");return gf(e,await _f(e,t,n,th(),s),Id())}async _openRedirect(e,t,n,s){await this._originValidation(e);return function(e){kd().location.href=e}(await _f(e,t,n,th(),s)),new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(eh(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await ff(e),n=new Qd(e);return t.register("authEvent",(t=>{Xu(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(bf,{type:bf},(n=>{var s;const r=null===(s=null==n?void 0:n[0])||void 0===s?void 0:s[bf];void 0!==r&&t(!!r),Gu(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ef(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Kh()||Uh()||qh()}};var If="@firebase/auth",Ef="1.7.9";
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class kf{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Xu(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const Sf=It("authIdTokenMaxAge")||300;let Cf=null;var Af;Xh={loadJS:e=>new Promise(((t,n)=>{const s=document.createElement("script");var r,i;s.setAttribute("src",e),s.onload=t,s.onerror=e=>{const t=Wu("internal-error");t.customData=e,n(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(i=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==i?i:document).appendChild(s)})),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},Af="Browser",_n(new Mt("auth",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:i,authDomain:o}=n.options;Xu(i&&!i.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:i,authDomain:o,clientPlatform:Af,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Hh(Af)},c=new Qh(n,s,r,a);return function(e,t){const n=(null==t?void 0:t.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Rh);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(s,null==t?void 0:t.popupRedirectResolver)}(c,t),c}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{e.getProvider("auth-internal").initialize()}))),_n(new Mt("auth-internal",(e=>(e=>new kf(e))(Yh(e.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),An(If,Ef,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(Af)),An(If,Ef,"esm2017");const Nf={apiKey:"AIzaSyB_hkTBhFY0Xnmawr23VYaTzPFic-Wv7Us",authDomain:"poller-bear-sadams.firebaseapp.com",projectId:"poller-bear-sadams",storageBucket:"poller-bear-sadams.firebasestorage.app",messagingSenderId:"889081307370",appId:"1:889081307370:web:2063d78b588ee071577793"};Nf.projectId||console.warn("Firebase is not configured. Copy frontend/.env.example to frontend/.env.");const Rf=Sn(Nf),Df=function(e=Cn()){const t=bn(e,"auth");if(t.isInitialized())return t.getImmediate();const n=
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function(e,t){const n=bn(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(Rt(n.getOptions(),null!=t?t:{}))return e;Gu(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:Tf,persistence:[Md,wd,bd]}),s=It("authTokenSyncURL");if(s&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(s,location.origin);if(location.origin===e.origin){const t=(r=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Sf)return;const s=null==t?void 0:t.token;Cf!==s&&(Cf=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))});!function(e,t,n){Lt(e).beforeAuthStateChanged(t,n)}(n,t,(()=>t(n.currentUser))),function(e,t,n,s){Lt(e).onIdTokenChanged(t,n,s)}(n,(e=>t(e)))}}var r;const i=bt("auth");return i&&Zh(n,`http://${i}`),n}(Rf),Of=function(e,t){const n="string"==typeof e?e:t||"(default)",s=bn("object"==typeof e?e:Cn(),"firestore").getImmediate({identifier:n});if(!s._initialized){const e=(e=>{const t=bt(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const s=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),s]:[t.substring(0,n),s]})("firestore");e&&Ll(s,...e)}return s}(Rf);async function Pf(){if(Df.currentUser)return Df.currentUser;return(await fd(Df)).user}function xf(e){return e?Ss.fromMillis(Date.now()+60*Number(e)*60*1e3):null}function Lf(e,t,n){return Pu(Vl(Of,"polls",e),(e=>t(function(e){return e.exists()?{id:e.id,...e.data()}:null}(e))),n)}function Mf(e,t,n,s){return Pu(function(e,t,...n){let s=[];t instanceof yu&&s.push(t),s=s.concat(n),function(e){const t=e.filter((e=>e instanceof bu)).length,n=e.filter((e=>e instanceof _u)).length;if(t>1||t>0&&n>0)throw new ds(hs.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(s);for(const t of s)e=t._apply(e);return e}(Fl(Of,"polls",e,t)),(e=>{n(e.docs.map((e=>({id:e.id,...e.data()}))))}),s)}function Uf(e,t=Date.now()){if(!e)return"closed";const n=e.submissionClosesAt&&e.submissionClosesAt.toMillis(),s=e.votingClosesAt&&e.votingClosesAt.toMillis();return"video_collab"===e.type&&n&&t<n?"submission":s&&t>=s?"closed":"voting"}function $f(e,t,n){const s=e.slice();return s[22]=t[n],s[23]=t,s[24]=n,s}function Ff(e){let t,n,s,r,o,a,c,l,u,h,d,f,p,m,g,v,y,w,_,b,T,I,k,S,O,x,F,V,j,B=e[1].filter(Hf).length+"",q=[],z=new Map,K=e[1];const H=e=>e[24];for(let t=0;t<K.length;t+=1){let n=$f(e,K,t),s=H(n);z.set(s,q[t]=Bf(s,n))}return{c(){t=N("div"),n=N("div"),s=N("span"),s.textContent="Response options",r=D(),o=N("span"),a=R(B),c=R(" / "),l=R(Kf),u=R(" options"),h=D(),d=N("div");for(let e=0;e<q.length;e+=1)q[e].c();f=D(),p=N("div"),m=N("span"),m.textContent="Poll settings",g=D(),v=N("div"),y=N("label"),w=N("input"),_=D(),b=N("span"),b.innerHTML='<span class="checkbox-title svelte-mr9wuk">Limit votes to one per user</span> \n                <span class="checkbox-description svelte-mr9wuk">Prevents users from voting multiple times</span>',T=D(),I=N("div"),k=N("label"),k.textContent="Poll duration (optional)",S=D(),O=N("input"),x=D(),F=N("span"),F.textContent="Leave empty for polls that never expire",L(s,"class","section-label svelte-mr9wuk"),L(o,"class","options-count svelte-mr9wuk"),L(n,"class","options-header svelte-mr9wuk"),L(d,"class","options-list svelte-mr9wuk"),L(t,"class","form-section svelte-mr9wuk"),L(m,"class","section-label svelte-mr9wuk"),L(w,"type","checkbox"),L(w,"name","limit-votes"),L(w,"class","svelte-mr9wuk"),L(b,"class","checkbox-text svelte-mr9wuk"),L(y,"class","checkbox-row svelte-mr9wuk"),L(k,"class","sub-label svelte-mr9wuk"),L(k,"for","duration-input"),L(O,"id","duration-input"),L(O,"type","number"),L(O,"min","1"),L(O,"max",e[10]),L(O,"placeholder","Duration in hours (e.g., 24 for 1 day)"),L(O,"class","duration-input"),L(F,"class","checkbox-description svelte-mr9wuk"),L(I,"class","duration-setting svelte-mr9wuk"),L(v,"class","settings-content svelte-mr9wuk"),L(p,"class","form-section svelte-mr9wuk")},m(i,A){C(i,t,A),E(t,n),E(n,s),E(n,r),E(n,o),E(o,a),E(o,c),E(o,l),E(o,u),E(t,h),E(t,d);for(let e=0;e<q.length;e+=1)q[e]&&q[e].m(d,null);C(i,f,A),C(i,p,A),E(p,m),E(p,g),E(p,v),E(v,y),E(y,w),w.checked=e[6],E(y,_),E(y,b),E(v,T),E(v,I),E(I,k),E(I,S),E(I,O),$(O,e[2]),E(I,x),E(I,F),V||(j=[P(w,"change",e[20]),P(O,"input",e[21])],V=!0)},p(e,t){2&t&&B!==(B=e[1].filter(Hf).length+"")&&U(a,B),2050&t&&(K=e[1],q=Ie(q,t,H,1,e,K,z,d,be,Bf,null,$f)),64&t&&(w.checked=e[6]),4&t&&M(O.value)!==e[2]&&$(O,e[2])},d(e){e&&A(t);for(let e=0;e<q.length;e+=1)q[e].d();e&&A(f),e&&A(p),V=!1,i(j)}}}function Vf(e){let t,n,s,r,o,a,c,l,u,h,d,f,p,m,g,v,y,w,_;return{c(){t=N("div"),n=N("span"),n.textContent="Submission & voting windows",s=D(),r=N("div"),o=N("div"),a=N("label"),a.textContent="Submissions close in (hours)",c=D(),l=N("input"),u=D(),h=N("span"),h.textContent="Anyone with the link can submit a YouTube video until this closes",d=D(),f=N("div"),p=N("label"),p.textContent="Voting closes in (hours from now)",m=D(),g=N("input"),v=D(),y=N("span"),y.textContent="Must be later than the submission close time",L(n,"class","section-label svelte-mr9wuk"),L(a,"class","sub-label svelte-mr9wuk"),L(a,"for","submission-duration-input"),L(l,"id","submission-duration-input"),L(l,"type","number"),L(l,"min","1"),L(l,"max",e[10]),L(l,"placeholder","e.g., 48 for 2 days"),L(l,"class","duration-input"),L(h,"class","checkbox-description svelte-mr9wuk"),L(o,"class","duration-setting svelte-mr9wuk"),L(p,"class","sub-label svelte-mr9wuk"),L(p,"for","voting-duration-input"),L(g,"id","voting-duration-input"),L(g,"type","number"),L(g,"min","1"),L(g,"max",e[10]),L(g,"placeholder","e.g., 96 for 4 days"),L(g,"class","duration-input"),L(y,"class","checkbox-description svelte-mr9wuk"),L(f,"class","duration-setting svelte-mr9wuk"),L(r,"class","settings-content svelte-mr9wuk"),L(t,"class","form-section svelte-mr9wuk")},m(i,b){C(i,t,b),E(t,n),E(t,s),E(t,r),E(r,o),E(o,a),E(o,c),E(o,l),$(l,e[4]),E(o,u),E(o,h),E(r,d),E(r,f),E(f,p),E(f,m),E(f,g),$(g,e[2]),E(f,v),E(f,y),w||(_=[P(l,"input",e[16]),P(g,"input",e[17])],w=!0)},p(e,t){16&t&&M(l.value)!==e[4]&&$(l,e[4]),4&t&&M(g.value)!==e[2]&&$(g,e[2])},d(e){e&&A(t),w=!1,i(_)}}}function jf(e){let t,n,s;function r(){return e[19](e[24])}return{c(){t=N("button"),t.textContent="×",L(t,"type","button"),L(t,"class","remove-option svelte-mr9wuk"),L(t,"title","Remove this option"),L(t,"aria-label","Remove option")},m(e,i){C(e,t,i),n||(s=P(t,"click",r),n=!0)},p(t,n){e=t},d(e){e&&A(t),n=!1,s()}}}function Bf(e,t){let n,s,r,i,o,a,c,l,u,h,d,f=t[24]+1+"",p=t[1].length>2&&(t[24]<t[1].length-1||""!==t[1][t[24]].trim());function m(){t[18].call(o,t[24])}let g=p&&jf(t);return{key:e,first:null,c(){n=N("div"),s=N("div"),r=R(f),i=D(),o=N("input"),l=D(),g&&g.c(),u=D(),L(s,"class","option-number svelte-mr9wuk"),L(o,"type","text"),L(o,"name",a="response-option-"+t[24]),L(o,"aria-label","Response Option Field"),L(o,"placeholder",c=0===t[24]?"First option...":1===t[24]?"Second option...":`Option ${t[24]+1}...`),L(o,"class","option-input svelte-mr9wuk"),L(n,"class","option-row svelte-mr9wuk"),V(n,"is-last",t[24]===t[1].length-1),this.first=n},m(e,a){C(e,n,a),E(n,s),E(s,r),E(n,i),E(n,o),$(o,t[1][t[24]]),E(n,l),g&&g.m(n,null),E(n,u),h||(d=P(o,"input",m),h=!0)},p(e,s){t=e,2&s&&f!==(f=t[24]+1+"")&&U(r,f),2&s&&a!==(a="response-option-"+t[24])&&L(o,"name",a),2&s&&c!==(c=0===t[24]?"First option...":1===t[24]?"Second option...":`Option ${t[24]+1}...`)&&L(o,"placeholder",c),2&s&&o.value!==t[1][t[24]]&&$(o,t[1][t[24]]),2&s&&(p=t[1].length>2&&(t[24]<t[1].length-1||""!==t[1][t[24]].trim())),p?g?g.p(t,s):(g=jf(t),g.c(),g.m(n,u)):g&&(g.d(1),g=null),2&s&&V(n,"is-last",t[24]===t[1].length-1)},d(e){e&&A(n),g&&g.d(),h=!1,d()}}}function qf(e){let t,n;return{c(){t=N("div"),n=R(e[8]),L(t,"class","error-notification svelte-mr9wuk")},m(e,s){C(e,t,s),E(t,n)},p(e,t){256&t&&U(n,e[8])},d(e){e&&A(t)}}}function zf(t){let n,s,r,o,a,c,l,u,h,d,f,p,m,g,v,y,w,_,b,T,I,k,S,O,M,F,j=t[9]?"Creating poll…":"Create poll";function B(e,t){return e[5]?Vf:Ff}let q=B(t),z=q(t),K=t[8]&&qf(t);return{c(){n=N("div"),s=N("div"),r=N("div"),r.innerHTML='<h1 class="page-title svelte-mr9wuk">Create a new poll</h1> \n      <p class="page-subtitle svelte-mr9wuk">Ask a question, add some options, and share the link.</p>',o=D(),a=N("form"),c=N("div"),l=N("span"),l.textContent="Poll type",u=D(),h=N("div"),d=N("button"),d.textContent="Standard poll",f=D(),p=N("button"),p.textContent="Collaborative video poll",m=D(),g=N("div"),v=N("label"),v.textContent="Question",y=D(),w=N("input"),_=D(),z.c(),b=D(),K&&K.c(),T=D(),I=N("div"),k=N("button"),S=R(j),L(r,"class","card-header svelte-mr9wuk"),L(l,"class","section-label svelte-mr9wuk"),L(d,"type","button"),L(d,"class","poll-type-option svelte-mr9wuk"),V(d,"active","standard"===t[3]),L(p,"type","button"),L(p,"class","poll-type-option svelte-mr9wuk"),V(p,"active","video_collab"===t[3]),L(h,"class","poll-type-toggle svelte-mr9wuk"),L(h,"role","group"),L(h,"aria-label","Poll type"),L(c,"class","form-section svelte-mr9wuk"),L(v,"class","section-label svelte-mr9wuk"),L(v,"for","question-input"),L(w,"id","question-input"),L(w,"type","text"),L(w,"aria-label","Question Field"),L(w,"placeholder","e.g., What's your favorite programming language?"),L(w,"class","question-input svelte-mr9wuk"),L(g,"class","form-section svelte-mr9wuk"),L(k,"type","submit"),k.disabled=O=!t[7]||t[9],L(k,"class","create-button svelte-mr9wuk"),L(I,"class","submit-section svelte-mr9wuk"),L(a,"class","poll-form svelte-mr9wuk"),L(s,"class","create-poll-card svelte-mr9wuk"),L(n,"class","create-poll-container svelte-mr9wuk")},m(e,i){C(e,n,i),E(n,s),E(s,r),E(s,o),E(s,a),E(a,c),E(c,l),E(c,u),E(c,h),E(h,d),E(h,f),E(h,p),E(a,m),E(a,g),E(g,v),E(g,y),E(g,w),$(w,t[0]),E(a,_),z.m(a,null),E(a,b),K&&K.m(a,null),E(a,T),E(a,I),E(I,k),E(k,S),M||(F=[P(d,"click",t[13]),P(p,"click",t[14]),P(w,"input",t[15]),P(a,"submit",x(t[12]))],M=!0)},p(e,[t]){8&t&&V(d,"active","standard"===e[3]),8&t&&V(p,"active","video_collab"===e[3]),1&t&&w.value!==e[0]&&$(w,e[0]),q===(q=B(e))&&z?z.p(e,t):(z.d(1),z=q(e),z&&(z.c(),z.m(a,b))),e[8]?K?K.p(e,t):(K=qf(e),K.c(),K.m(a,T)):K&&(K.d(1),K=null),512&t&&j!==(j=e[9]?"Creating poll…":"Create poll")&&U(S,j),640&t&&O!==(O=!e[7]||e[9])&&(k.disabled=O)},i:e,o:e,d(e){e&&A(n),z.d(),K&&K.d(),M=!1,i(F)}}}const Kf=10,Hf=e=>e.trim();function Gf(e,t,n){let s;let r="",i=["",""],o=!1,a=null,c="standard",l=null,u=!1,h="",d=!1;function f(e){i.length>2&&n(1,i=i.filter(((t,n)=>n!==e)))}return e.$$.update=()=>{8&e.$$.dirty&&n(5,s="video_collab"===c),2&e.$$.dirty&&i[i.length-1]&&i.length<Kf&&n(1,i=[...i,""]),55&e.$$.dirty&&n(7,u=s?Boolean(r.trim()&&l>0&&a>0&&Number(l)<Number(a)):Boolean(r.trim()&&i.filter((e=>e.trim())).length>=2))},[r,i,a,c,l,s,o,u,h,d,8760,f,async function(){if(u){n(8,h=""),n(9,d=!0);try{const e=i.filter((e=>Boolean(e.trim()))),t=await async function({question:e,type:t,options:n=[],limitVotes:s=!1,submissionDurationHours:r,votingDurationHours:i}){const o=await Pf(),a=$u(),c=Vl(Fl(Of,"polls")),l=Vu(Of),u=xf(i),h={question:e.trim(),type:t,createdAt:a,createdBy:o.uid,limitVotes:"video_collab"===t||Boolean(s),submissionCount:0,submissionClosesAt:"video_collab"===t?xf(r):null,votingClosesAt:u};return l.set(c,h),"standard"===t&&n.forEach((e=>{const t=Vl(Fl(c,"options"));l.set(t,{text:e.trim(),votes:0})})),await l.commit(),c.id}({question:r,type:c,options:e,limitVotes:o,submissionDurationHours:s?Number(l):null,votingDurationHours:a?Number(a):null});st(`/polls/${t}`)}catch(e){n(8,h=e.message||"Unable to create the poll. Please try again."),console.error("Error creating poll:",e)}finally{n(9,d=!1)}}else n(8,h=s?"Please enter a question and valid submission/voting durations (submissions must close before voting does).":"Please enter a question and at least two options.")},()=>n(3,c="standard"),()=>n(3,c="video_collab"),function(){r=this.value,n(0,r)},function(){l=M(this.value),n(4,l)},function(){a=M(this.value),n(2,a)},function(e){i[e]=this.value,n(1,i)},e=>f(e),function(){o=this.checked,n(6,o)},function(){a=M(this.value),n(2,a)}]}class Wf extends Re{constructor(e){super(),Ne(this,e,Gf,zf,a,{})}}function Qf(e){let t,n,s,r,i,o,a,c,u;return{c(){t=N("button"),n=N("img"),i=D(),o=N("span"),o.textContent="▶",l(n.src,s=e[2]||e[4])||L(n,"src",s),L(n,"alt",r=e[1]||"Video thumbnail"),L(n,"class","thumbnail-image svelte-1duup12"),L(n,"loading","lazy"),L(o,"class","play-overlay svelte-1duup12"),L(o,"aria-hidden","true"),L(t,"type","button"),L(t,"class","thumbnail-button svelte-1duup12"),L(t,"aria-label",a="Play "+(e[1]||"video"))},m(s,r){C(s,t,r),E(t,n),E(t,i),E(t,o),c||(u=P(t,"click",e[5]),c=!0)},p(e,i){20&i&&!l(n.src,s=e[2]||e[4])&&L(n,"src",s),2&i&&r!==(r=e[1]||"Video thumbnail")&&L(n,"alt",r),2&i&&a!==(a="Play "+(e[1]||"video"))&&L(t,"aria-label",a)},d(e){e&&A(t),c=!1,u()}}}function Yf(e){let t,n,s,r;return{c(){t=N("div"),n=N("iframe"),l(n.src,s="https://www.youtube.com/embed/"+e[0]+"?autoplay=1")||L(n,"src",s),L(n,"title",r=e[1]||"YouTube video player"),L(n,"frameborder","0"),L(n,"allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"),n.allowFullscreen=!0,L(n,"class","svelte-1duup12"),L(t,"class","player-wrapper svelte-1duup12")},m(e,s){C(e,t,s),E(t,n)},p(e,t){1&t&&!l(n.src,s="https://www.youtube.com/embed/"+e[0]+"?autoplay=1")&&L(n,"src",s),2&t&&r!==(r=e[1]||"YouTube video player")&&L(n,"title",r)},d(e){e&&A(t)}}}function Jf(e){let t,n;return{c(){t=N("p"),n=R(e[1]),L(t,"class","video-title svelte-1duup12")},m(e,s){C(e,t,s),E(t,n)},p(e,t){2&t&&U(n,e[1])},d(e){e&&A(t)}}}function Xf(t){let n,s;function r(e,t){return e[3]?Yf:Qf}let i=r(t),o=i(t),a=t[1]&&Jf(t);return{c(){n=N("div"),o.c(),s=D(),a&&a.c(),L(n,"class","video-embed svelte-1duup12")},m(e,t){C(e,n,t),o.m(n,null),E(n,s),a&&a.m(n,null)},p(e,[t]){i===(i=r(e))&&o?o.p(e,t):(o.d(1),o=i(e),o&&(o.c(),o.m(n,s))),e[1]?a?a.p(e,t):(a=Jf(e),a.c(),a.m(n,null)):a&&(a.d(1),a=null)},i:e,o:e,d(e){e&&A(n),o.d(),a&&a.d()}}}function Zf(e,t,n){let s,{videoId:r}=t,{title:i=""}=t,{thumbnailUrl:o=""}=t,a=!1;return e.$$set=e=>{"videoId"in e&&n(0,r=e.videoId),"title"in e&&n(1,i=e.title),"thumbnailUrl"in e&&n(2,o=e.thumbnailUrl)},e.$$.update=()=>{1&e.$$.dirty&&n(4,s=r?`https://i.ytimg.com/vi/${r}/hqdefault.jpg`:"")},[r,i,o,a,s,function(){n(3,a=!0)}]}class ep extends Re{constructor(e){super(),Ne(this,e,Zf,Xf,a,{videoId:0,title:1,thumbnailUrl:2})}}const tp=/^[A-Za-z0-9_-]{11}$/;function np(e,t,n){const s=e.slice();return s[30]=t[n],s[32]=n,s}function sp(t){let n;return{c(){n=N("div"),n.innerHTML='<div class="card-content svelte-sc6mhv"><p class="error-title svelte-sc6mhv">Something went wrong loading this poll.</p></div>',L(n,"class","status-card svelte-sc6mhv")},m(e,t){C(e,n,t)},p:e,i:e,o:e,d(e){e&&A(n)}}}function rp(e){let t,n,s,r,i,o,a,c,l,u,h,d,f,p,m,g,v=e[0].question+"",y=e[0].limitVotes&&ap(),w=e[8]&&cp(e);const _=[dp,hp,up,lp],b=[];function T(e,t){return e[2]&&"submission"===e[9]?0:e[2]&&"closed"===e[9]?1:e[0].limitVotes&&e[4]?2:3}return d=T(e),f=b[d]=_[d](e),{c(){t=N("div"),n=N("div"),s=N("div"),r=N("h1"),i=R(v),o=D(),y&&y.c(),a=D(),c=N("div"),l=N("button"),l.textContent="Share",u=D(),w&&w.c(),h=D(),f.c(),L(r,"class","poll-question svelte-sc6mhv"),L(s,"class","poll-title-section svelte-sc6mhv"),L(l,"class","secondary-button svelte-sc6mhv"),L(c,"class","poll-actions svelte-sc6mhv"),L(n,"class","poll-header svelte-sc6mhv"),L(t,"class","main-poll-card svelte-sc6mhv")},m(f,v){C(f,t,v),E(t,n),E(n,s),E(s,r),E(r,i),E(s,o),y&&y.m(s,null),E(n,a),E(n,c),E(c,l),E(t,u),w&&w.m(t,null),E(t,h),b[d].m(t,null),p=!0,m||(g=P(l,"click",e[19]),m=!0)},p(e,n){(!p||1&n[0])&&v!==(v=e[0].question+"")&&U(i,v),e[0].limitVotes?y||(y=ap(),y.c(),y.m(s,null)):y&&(y.d(1),y=null),e[8]?w?w.p(e,n):(w=cp(e),w.c(),w.m(t,h)):w&&(w.d(1),w=null);let r=d;d=T(e),d===r?b[d].p(e,n):(me(),ye(b[r],1,1,(()=>{b[r]=null})),ge(),f=b[d],f?f.p(e,n):(f=b[d]=_[d](e),f.c()),ve(f,1),f.m(t,null))},i(e){p||(ve(f),p=!0)},o(e){ye(f),p=!1},d(e){e&&A(t),y&&y.d(),w&&w.d(),b[d].d(),m=!1,g()}}}function ip(t){let n;return{c(){n=N("div"),n.innerHTML='<div class="card-content svelte-sc6mhv"><div class="loading-spinner svelte-sc6mhv"></div> \n        <p class="loading-text svelte-sc6mhv">Loading your poll…</p></div>',L(n,"class","status-card svelte-sc6mhv")},m(e,t){C(e,n,t)},p:e,i:e,o:e,d(e){e&&A(n)}}}function op(t){let n,s,r,i,o,a,c,l,u,h;return{c(){n=N("div"),s=N("div"),r=N("p"),r.textContent="Something went wrong",i=D(),o=N("p"),a=R(t[6]),c=D(),l=N("button"),l.textContent="Try again",L(r,"class","error-title svelte-sc6mhv"),L(o,"class","error-description svelte-sc6mhv"),L(l,"class","primary-button svelte-sc6mhv"),L(s,"class","card-content svelte-sc6mhv"),L(n,"class","status-card svelte-sc6mhv")},m(e,d){C(e,n,d),E(n,s),E(s,r),E(s,i),E(s,o),E(o,a),E(s,c),E(s,l),u||(h=P(l,"click",t[21]),u=!0)},p(e,t){64&t[0]&&U(a,e[6])},i:e,o:e,d(e){e&&A(n),u=!1,h()}}}function ap(e){let t;return{c(){t=N("span"),t.textContent="One vote per person",L(t,"class","badge svelte-sc6mhv")},m(e,n){C(e,t,n)},d(e){e&&A(t)}}}function cp(e){let t,n;return{c(){t=N("div"),n=R(e[8]),L(t,"class","share-notification svelte-sc6mhv")},m(e,s){C(e,t,s),E(t,n)},p(e,t){256&t[0]&&U(n,e[8])},d(e){e&&A(t)}}}function lp(e){let t,n,s,r,o,a,c,l,u,h,d,f,p,m=[],g=new Map,v=e[1];const y=e=>e[30].id;for(let t=0;t<v.length;t+=1){let n=np(e,v,t),s=y(n);g.set(s,m[t]=mp(s,n))}let w=e[5]&&gp(e);return{c(){t=N("form"),n=N("div");for(let e=0;e<m.length;e+=1)m[e].c();s=D(),w&&w.c(),r=D(),o=N("div"),a=N("button"),c=R("Cast your vote"),u=D(),h=N("button"),h.textContent="View results",L(n,"class","options-container svelte-sc6mhv"),V(n,"video-options",e[2]),L(a,"type","submit"),a.disabled=l=!e[3]||e[4],L(a,"class","primary-button vote-button svelte-sc6mhv"),L(h,"type","button"),L(h,"class","secondary-button svelte-sc6mhv"),L(o,"class","action-buttons svelte-sc6mhv"),L(t,"class","poll-form svelte-sc6mhv")},m(i,l){C(i,t,l),E(t,n);for(let e=0;e<m.length;e+=1)m[e]&&m[e].m(n,null);E(t,s),w&&w.m(t,null),E(t,r),E(t,o),E(o,a),E(a,c),E(o,u),E(o,h),d=!0,f||(p=[P(h,"click",e[18]),P(t,"submit",x(e[16]))],f=!0)},p(e,s){14&s[0]&&(v=e[1],me(),m=Ie(m,s,y,1,e,v,g,n,Te,mp,null,np),ge()),(!d||4&s[0])&&V(n,"video-options",e[2]),e[5]?w?w.p(e,s):(w=gp(e),w.c(),w.m(t,r)):w&&(w.d(1),w=null),(!d||24&s[0]&&l!==(l=!e[3]||e[4]))&&(a.disabled=l)},i(e){if(!d){for(let e=0;e<v.length;e+=1)ve(m[e]);d=!0}},o(e){for(let e=0;e<m.length;e+=1)ye(m[e]);d=!1},d(e){e&&A(t);for(let e=0;e<m.length;e+=1)m[e].d();w&&w.d(),f=!1,i(p)}}}function up(t){let n,s,r,i,o,a;return{c(){n=N("div"),s=N("p"),s.textContent="Thanks for voting! Your response has been recorded.",r=D(),i=N("button"),i.textContent="View results",L(s,"class","voted-text svelte-sc6mhv"),L(i,"class","primary-button svelte-sc6mhv"),L(n,"class","voted-state svelte-sc6mhv")},m(e,c){C(e,n,c),E(n,s),E(n,r),E(n,i),o||(a=P(i,"click",t[18]),o=!0)},p:e,i:e,o:e,d(e){e&&A(n),o=!1,a()}}}function hp(t){let n,s,r,i,o,a;return{c(){n=N("div"),s=N("p"),s.textContent="Voting has closed for this poll.",r=D(),i=N("button"),i.textContent="View results",L(s,"class","voted-text svelte-sc6mhv"),L(i,"class","primary-button svelte-sc6mhv"),L(n,"class","voted-state svelte-sc6mhv")},m(e,c){C(e,n,c),E(n,s),E(n,r),E(n,i),o||(a=P(i,"click",t[18]),o=!0)},p:e,i:e,o:e,d(e){e&&A(n),o=!1,a()}}}function dp(e){let t,n,s,r,i,o,a,c,l,u,h=1===e[11]?"submission":"submissions";const d=[yp,vp],f=[];function p(e,t){return e[10]?0:1}return n=p(e),s=f[n]=d[n](e),{c(){t=N("div"),s.c(),r=D(),i=N("p"),o=R(e[11]),a=D(),c=R(h),l=R(" so far — no peeking until voting opens!"),L(i,"class","submission-count-text svelte-sc6mhv"),L(t,"class","submission-phase svelte-sc6mhv")},m(e,s){C(e,t,s),f[n].m(t,null),E(t,r),E(t,i),E(i,o),E(i,a),E(i,c),E(i,l),u=!0},p(e,i){let a=n;n=p(e),n===a?f[n].p(e,i):(me(),ye(f[a],1,1,(()=>{f[a]=null})),ge(),s=f[n],s?s.p(e,i):(s=f[n]=d[n](e),s.c()),ve(s,1),s.m(t,r)),(!u||2048&i[0])&&U(o,e[11]),(!u||2048&i[0])&&h!==(h=1===e[11]?"submission":"submissions")&&U(c,h)},i(e){u||(ve(s),u=!0)},o(e){ye(s),u=!1},d(e){e&&A(t),f[n].d()}}}function fp(t){let n,s,r=t[30].text+"";return{c(){n=N("span"),s=R(r),L(n,"class","option-text svelte-sc6mhv")},m(e,t){C(e,n,t),E(n,s)},p(e,t){2&t[0]&&r!==(r=e[30].text+"")&&U(s,r)},i:e,o:e,d(e){e&&A(n)}}}function pp(e){let t,n,s;return n=new ep({props:{videoId:e[30].videoId,title:e[30].title}}),{c(){t=N("div"),ke(n.$$.fragment),L(t,"class","video-option-content svelte-sc6mhv")},m(e,r){C(e,t,r),Se(n,t,null),s=!0},p(e,t){const s={};2&t[0]&&(s.videoId=e[30].videoId),2&t[0]&&(s.title=e[30].title),n.$set(s)},i(e){s||(ve(n.$$.fragment,e),s=!0)},o(e){ye(n.$$.fragment,e),s=!1},d(e){e&&A(t),Ce(n)}}}function mp(e,t){let n,s,r,i,o,a,c,l,u,h,d,f,p,m,g=!1;const v=[pp,fp],y=[];function w(e,t){return e[2]?0:1}return l=w(t),u=y[l]=v[l](t),f=function(e){let t;return{p(...n){t=n,t.forEach((t=>e.push(t)))},r(){t.forEach((t=>e.splice(e.indexOf(t),1)))}}}(t[24][0]),{key:e,first:null,c(){n=N("label"),s=N("input"),i=D(),o=N("div"),a=N("div"),c=D(),u.c(),h=D(),L(s,"type","radio"),s.__value=r=t[30].id,s.value=s.__value,L(s,"class","hidden-radio svelte-sc6mhv"),L(a,"class","option-indicator svelte-sc6mhv"),L(o,"class","option-content svelte-sc6mhv"),L(n,"class","poll-option svelte-sc6mhv"),V(n,"selected",t[3]===t[30].id),f.p(s),this.first=n},m(e,r){C(e,n,r),E(n,s),s.checked=s.__value===t[3],E(n,i),E(n,o),E(o,a),E(o,c),y[l].m(o,null),E(n,h),d=!0,p||(m=P(s,"change",t[23]),p=!0)},p(e,i){t=e,(!d||2&i[0]&&r!==(r=t[30].id))&&(s.__value=r,s.value=s.__value,g=!0),(g||10&i[0])&&(s.checked=s.__value===t[3]);let a=l;l=w(t),l===a?y[l].p(t,i):(me(),ye(y[a],1,1,(()=>{y[a]=null})),ge(),u=y[l],u?u.p(t,i):(u=y[l]=v[l](t),u.c()),ve(u,1),u.m(o,null)),(!d||10&i[0])&&V(n,"selected",t[3]===t[30].id)},i(e){d||(ve(u),d=!0)},o(e){ye(u),d=!1},d(e){e&&A(n),y[l].d(),f.r(),p=!1,m()}}}function gp(e){let t,n;return{c(){t=N("div"),n=R(e[5]),L(t,"class","error-notification svelte-sc6mhv")},m(e,s){C(e,t,s),E(t,n)},p(e,t){32&t[0]&&U(n,e[5])},d(e){e&&A(t)}}}function vp(t){let n,s,r,o,a,c,l,u,h,d,f=t[14]?"Submitting…":"Submit video",p=t[13]&&wp(t);return{c(){n=N("form"),s=N("label"),s.textContent="Paste a YouTube link",r=D(),o=N("input"),a=D(),p&&p.c(),c=D(),l=N("button"),u=R(f),L(s,"class","sub-label"),L(s,"for","video-url-input"),L(o,"id","video-url-input"),L(o,"type","text"),L(o,"placeholder","https://www.youtube.com/watch?v=..."),L(o,"class","video-url-input svelte-sc6mhv"),L(l,"type","submit"),l.disabled=t[14],L(l,"class","primary-button svelte-sc6mhv"),L(n,"class","submit-video-form svelte-sc6mhv")},m(e,i){C(e,n,i),E(n,s),E(n,r),E(n,o),$(o,t[12]),E(n,a),p&&p.m(n,null),E(n,c),E(n,l),E(l,u),h||(d=[P(o,"input",t[22]),P(n,"submit",x(t[17]))],h=!0)},p(e,t){4096&t[0]&&o.value!==e[12]&&$(o,e[12]),e[13]?p?p.p(e,t):(p=wp(e),p.c(),p.m(n,c)):p&&(p.d(1),p=null),16384&t[0]&&f!==(f=e[14]?"Submitting…":"Submit video")&&U(u,f),16384&t[0]&&(l.disabled=e[14])},i:e,o:e,d(e){e&&A(n),p&&p.d(),h=!1,i(d)}}}function yp(e){let t,n,s,r,i=e[15]&&_p(e);return{c(){t=N("p"),t.textContent="Thanks for your submission! Voting opens once the submission window closes.",n=D(),i&&i.c(),s=O(),L(t,"class","voted-text svelte-sc6mhv")},m(e,o){C(e,t,o),C(e,n,o),i&&i.m(e,o),C(e,s,o),r=!0},p(e,t){e[15]?i?(i.p(e,t),32768&t[0]&&ve(i,1)):(i=_p(e),i.c(),ve(i,1),i.m(s.parentNode,s)):i&&(me(),ye(i,1,1,(()=>{i=null})),ge())},i(e){r||(ve(i),r=!0)},o(e){ye(i),r=!1},d(e){e&&A(t),e&&A(n),i&&i.d(e),e&&A(s)}}}function wp(e){let t,n;return{c(){t=N("div"),n=R(e[13]),L(t,"class","error-notification svelte-sc6mhv")},m(e,s){C(e,t,s),E(t,n)},p(e,t){8192&t[0]&&U(n,e[13])},d(e){e&&A(t)}}}function _p(e){let t,n,s;return n=new ep({props:{videoId:e[15].videoId,title:e[15].title}}),{c(){t=N("div"),ke(n.$$.fragment),L(t,"class","own-submission svelte-sc6mhv")},m(e,r){C(e,t,r),Se(n,t,null),s=!0},p(e,t){const s={};32768&t[0]&&(s.videoId=e[15].videoId),32768&t[0]&&(s.title=e[15].title),n.$set(s)},i(e){s||(ve(n.$$.fragment,e),s=!0)},o(e){ye(n.$$.fragment,e),s=!1},d(e){e&&A(t),Ce(n)}}}function bp(e){let t,n,s,r;const i=[op,ip,rp,sp],o=[];function a(e,t){return e[6]?0:e[7]?1:e[0]?2:3}return n=a(e),s=o[n]=i[n](e),{c(){t=N("div"),s.c(),L(t,"class","poll-container svelte-sc6mhv")},m(e,s){C(e,t,s),o[n].m(t,null),r=!0},p(e,r){let c=n;n=a(e),n===c?o[n].p(e,r):(me(),ye(o[c],1,1,(()=>{o[c]=null})),ge(),s=o[n],s?s.p(e,r):(s=o[n]=i[n](e),s.c()),ve(s,1),s.m(t,null))},i(e){r||(ve(s),r=!0)},o(e){ye(s),r=!1},d(e){e&&A(t),o[n].d()}}}function Tp(e,t,n){let s,r,i,o,{id:a}=t,c=null,l=[],u=!1,h="",d="",f=!0,p="",m="voting",g=!1,v=0,y="",w="",_=!1,b=()=>{},T=()=>{};async function I(){try{n(4,u=await async function(e){const t=await Pf();return(await Du(Vl(Of,"polls",e,"votes",t.uid))).exists()}(a)),b=Lf(a,(async e=>{if(!e)return n(6,d="Poll not found. It may have been deleted or the link is incorrect."),void n(7,f=!1);if(n(0,c=e),n(9,m=Uf(e)),T(),"video_collab"===e.type&&"submission"===m){const t=await async function(e){const t=await Pf(),n=await Du(Vl(Of,"polls",e,"submissions",t.uid));return n.exists()?{id:n.id,...n.data()}:null}(a);n(10,g=Boolean(t)),n(1,l=t?[t]:[]),n(11,v=e.submissionCount||0)}else{const t="video_collab"===e.type?"submissions":"options";T=Mf(a,t,(e=>{n(1,l=e),n(11,v=e.length)}),E)}n(7,f=!1)}),E)}catch(e){n(6,d=e.message||"Unable to load this poll."),console.error("Error loading poll:",e)}finally{n(7,f=!1)}}function E(e){n(6,d=e.message||"Unable to load this poll."),n(7,f=!1)}Q((()=>{I(),o=window.setInterval((()=>{c&&Uf(c)!==m&&window.location.reload()}),3e4)})),Y((()=>{b(),T(),window.clearInterval(o)}));return e.$$set=e=>{"id"in e&&n(20,a=e.id)},e.$$.update=()=>{1&e.$$.dirty[0]&&n(2,s=c&&"video_collab"===c.type),6&e.$$.dirty[0]&&n(15,r=s&&l.length>0?l[0]:null)},[c,l,s,i,u,h,d,f,p,m,g,v,y,w,_,r,async function(){try{n(5,h=""),await async function(e,t,n){const s=await Pf();Vl(Of,"polls",e);const r=Vl(Of,"polls",e,t,n),i=Vl(Of,"polls",e,"votes",s.uid),o=Vu(Of);o.update(r,{votes:Fu(1)}),o.set(i,{choiceId:n,choiceCollection:t,votedAt:$u()}),await o.commit()}(a,s?"submissions":"options",i),n(4,u=!0),st(`/polls/${a}/r`)}catch(e){n(5,h=e.message||"Unable to submit your vote."),console.error("Error:",e)}},async function(){if(y.trim()){n(13,w=""),n(14,_=!0);try{const e=function(e){try{const t=new URL(e);if("https:"!==t.protocol)return null;let n;return"youtu.be"===t.hostname&&(n=t.pathname.slice(1)),t.hostname.endsWith("youtube.com")&&(n=t.searchParams.get("v")||(t.pathname.startsWith("/embed/")?t.pathname.split("/")[2]:null)),n&&tp.test(n)?n:null}catch{return null}}(y.trim());if(!e)throw new Error("Enter a supported HTTPS YouTube URL.");const t=await async function(e){const t=await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${e}&format=json`);if(!t.ok)throw new Error("This video is unavailable.");const n=await t.json();return String(n.title||e).trim().slice(0,256)||e}(e);await async function(e,t,n){const s=await Pf(),r=Vu(Of);r.set(Vl(Of,"polls",e,"submissions",s.uid),{videoId:t,title:n.slice(0,256),votes:0,submittedAt:$u()}),r.update(Vl(Of,"polls",e),{submissionCount:Fu(1)}),await r.commit()}(a,e,t),n(10,g=!0),n(1,l=[{id:e,videoId:e,title:t,votes:0}]),n(11,v+=1),n(12,y="")}catch(e){n(13,w=e.message||"Unable to submit this video."),console.error("Error:",e)}finally{n(14,_=!1)}}else n(13,w="Please paste a YouTube link.")},async function(){st(`/polls/${a}/r`)},async function(){try{const e=window.location.href;await navigator.clipboard.writeText(e),n(8,p="Poll link copied to clipboard!"),setTimeout((()=>n(8,p="")),3e3)}catch(e){n(8,p="Failed to copy link. Please copy the URL manually."),setTimeout((()=>n(8,p="")),5e3)}},a,()=>window.location.reload(),function(){y=this.value,n(12,y)},function(){i=this.__value,n(3,i)},[[]]]}class Ip extends Re{constructor(e){super(),Ne(this,e,Tp,bp,a,{id:20},null,[-1,-1])}}function Ep(e,t,n){const s=e.slice();return s[10]=t[n],s[12]=n,s}function kp(t){let n;return{c(){n=N("div"),n.innerHTML='<div class="loading-content svelte-14fy8w9"><div class="loading-spinner svelte-14fy8w9"></div> \n        <p class="loading-text svelte-14fy8w9">Loading poll results…</p></div>',L(n,"class","loading-card svelte-14fy8w9")},m(e,t){C(e,n,t)},p:e,i:e,o:e,d(e){e&&A(n)}}}function Sp(e){let t,n,s,r,o,a,c,l,u,h,d,f,p,m,g,v,y,w,_,b,T,I,k,S,O,x,M,$,F=e[0].question+"",V=1===e[1]?"vote":"votes",j=[],B=new Map,q=e[2]&&Cp(e),z=e[3].slice().sort(Pp);const K=e=>e[10].id;for(let t=0;t<z.length;t+=1){let n=Ep(e,z,t),s=K(n);B.set(s,j[t]=Rp(s,n))}let H=0===e[1]&&Dp(e);return{c(){t=N("div"),n=N("div"),s=N("div"),r=N("h1"),o=R(F),a=D(),c=N("div"),l=N("span"),u=R(e[1]),h=R(" total "),d=R(V),f=D(),p=N("span"),p.textContent="Live results",m=D(),g=N("div"),v=N("button"),v.textContent="Share",y=D(),w=N("button"),w.textContent="Back to poll",_=D(),q&&q.c(),b=D(),T=N("div"),I=N("div");for(let e=0;e<j.length;e+=1)j[e].c();k=D(),H&&H.c(),S=D(),O=N("div"),O.textContent="Results update live",L(r,"class","poll-question svelte-14fy8w9"),L(l,"class","badge badge-accent svelte-14fy8w9"),L(p,"class","badge svelte-14fy8w9"),L(c,"class","poll-stats svelte-14fy8w9"),L(s,"class","header-content svelte-14fy8w9"),L(v,"class","secondary-button svelte-14fy8w9"),L(w,"class","secondary-button svelte-14fy8w9"),L(g,"class","header-actions svelte-14fy8w9"),L(n,"class","results-header svelte-14fy8w9"),L(I,"class","results-grid svelte-14fy8w9"),L(O,"class","results-footer svelte-14fy8w9"),L(T,"class","results-content svelte-14fy8w9"),L(t,"class","results-card svelte-14fy8w9")},m(i,A){C(i,t,A),E(t,n),E(n,s),E(s,r),E(r,o),E(s,a),E(s,c),E(c,l),E(l,u),E(l,h),E(l,d),E(c,f),E(c,p),E(n,m),E(n,g),E(g,v),E(g,y),E(g,w),E(t,_),q&&q.m(t,null),E(t,b),E(t,T),E(T,I);for(let e=0;e<j.length;e+=1)j[e]&&j[e].m(I,null);E(T,k),H&&H.m(T,null),E(T,S),E(T,O),x=!0,M||($=[P(v,"click",e[6]),P(w,"click",e[5])],M=!0)},p(e,n){(!x||1&n)&&F!==(F=e[0].question+"")&&U(o,F),(!x||2&n)&&U(u,e[1]),(!x||2&n)&&V!==(V=1===e[1]?"vote":"votes")&&U(d,V),e[2]?q?q.p(e,n):(q=Cp(e),q.c(),q.m(t,b)):q&&(q.d(1),q=null),26&n&&(z=e[3].slice().sort(Pp),me(),j=Ie(j,n,K,1,e,z,B,I,Te,Rp,null,Ep),ge()),0===e[1]?H?H.p(e,n):(H=Dp(e),H.c(),H.m(T,S)):H&&(H.d(1),H=null)},i(e){if(!x){for(let e=0;e<z.length;e+=1)ve(j[e]);x=!0}},o(e){for(let e=0;e<j.length;e+=1)ye(j[e]);x=!1},d(e){e&&A(t),q&&q.d();for(let e=0;e<j.length;e+=1)j[e].d();H&&H.d(),M=!1,i($)}}}function Cp(e){let t,n;return{c(){t=N("div"),n=R(e[2]),L(t,"class","share-notification svelte-14fy8w9")},m(e,s){C(e,t,s),E(t,n)},p(e,t){4&t&&U(n,e[2])},d(e){e&&A(t)}}}function Ap(t){let n,s,r=t[10].text+"";return{c(){n=N("p"),s=R(r),L(n,"class","option-text svelte-14fy8w9")},m(e,t){C(e,n,t),E(n,s)},p(e,t){8&t&&r!==(r=e[10].text+"")&&U(s,r)},i:e,o:e,d(e){e&&A(n)}}}function Np(e){let t,n,s;return n=new ep({props:{videoId:e[10].videoId,title:e[10].title}}),{c(){t=N("div"),ke(n.$$.fragment),L(t,"class","result-video svelte-14fy8w9")},m(e,r){C(e,t,r),Se(n,t,null),s=!0},p(e,t){const s={};8&t&&(s.videoId=e[10].videoId),8&t&&(s.title=e[10].title),n.$set(s)},i(e){s||(ve(n.$$.fragment,e),s=!0)},o(e){ye(n.$$.fragment,e),s=!1},d(e){e&&A(t),Ce(n)}}}function Rp(e,t){let n,s,r,i,o,a,c,l,u,h,d,f,p,m,g,v,y,w,_,b,T,I,k,S,O=t[12]+1+"",P=t[10].votes+"",x=1===t[10].votes?"vote":"votes",M=(t[1]>0?Math.round(t[10].votes/t[1]*100):0)+"";const $=[Np,Ap],j=[];function B(e,t){return e[4]?0:1}return l=B(t),u=j[l]=$[l](t),{key:e,first:null,c(){n=N("div"),s=N("div"),r=N("div"),i=R("#"),o=R(O),a=D(),c=N("div"),u.c(),h=D(),d=N("div"),f=N("span"),p=R(P),m=D(),g=R(x),v=D(),y=N("span"),w=R(M),_=R("%"),b=D(),T=N("div"),I=N("div"),k=D(),L(r,"class","result-ranking svelte-14fy8w9"),L(f,"class","vote-count-label svelte-14fy8w9"),L(y,"class","percentage svelte-14fy8w9"),L(d,"class","vote-count svelte-14fy8w9"),L(c,"class","result-text svelte-14fy8w9"),L(s,"class","result-header svelte-14fy8w9"),L(I,"class","progress-bar svelte-14fy8w9"),F(I,"width",(t[1]>0?t[10].votes/t[1]*100:0)+"%"),V(I,"winner-bar",0===t[12]&&t[10].votes>0),L(T,"class","progress-container svelte-14fy8w9"),L(n,"class","result-item svelte-14fy8w9"),V(n,"winner",0===t[12]&&t[10].votes>0),this.first=n},m(e,t){C(e,n,t),E(n,s),E(s,r),E(r,i),E(r,o),E(s,a),E(s,c),j[l].m(c,null),E(c,h),E(c,d),E(d,f),E(f,p),E(f,m),E(f,g),E(d,v),E(d,y),E(y,w),E(y,_),E(n,b),E(n,T),E(T,I),E(n,k),S=!0},p(e,s){t=e,(!S||8&s)&&O!==(O=t[12]+1+"")&&U(o,O);let r=l;l=B(t),l===r?j[l].p(t,s):(me(),ye(j[r],1,1,(()=>{j[r]=null})),ge(),u=j[l],u?u.p(t,s):(u=j[l]=$[l](t),u.c()),ve(u,1),u.m(c,h)),(!S||8&s)&&P!==(P=t[10].votes+"")&&U(p,P),(!S||8&s)&&x!==(x=1===t[10].votes?"vote":"votes")&&U(g,x),(!S||10&s)&&M!==(M=(t[1]>0?Math.round(t[10].votes/t[1]*100):0)+"")&&U(w,M),(!S||10&s)&&F(I,"width",(t[1]>0?t[10].votes/t[1]*100:0)+"%"),(!S||8&s)&&V(I,"winner-bar",0===t[12]&&t[10].votes>0),(!S||8&s)&&V(n,"winner",0===t[12]&&t[10].votes>0)},i(e){S||(ve(u),S=!0)},o(e){ye(u),S=!1},d(e){e&&A(n),j[l].d()}}}function Dp(t){let n,s,r,i,o,a,c,l;return{c(){n=N("div"),s=N("p"),s.textContent="No votes yet",r=D(),i=N("p"),i.textContent="Be the first to vote on this poll.",o=D(),a=N("button"),a.textContent="Vote now",L(s,"class","no-votes-title svelte-14fy8w9"),L(i,"class","no-votes-description svelte-14fy8w9"),L(a,"class","primary-button svelte-14fy8w9"),L(n,"class","no-votes svelte-14fy8w9")},m(e,u){C(e,n,u),E(n,s),E(n,r),E(n,i),E(n,o),E(n,a),c||(l=P(a,"click",t[5]),c=!0)},p:e,d(e){e&&A(n),c=!1,l()}}}function Op(e){let t,n,s,r;const i=[Sp,kp],o=[];function a(e,t){return e[0]?0:1}return n=a(e),s=o[n]=i[n](e),{c(){t=N("div"),s.c(),L(t,"class","results-container svelte-14fy8w9")},m(e,s){C(e,t,s),o[n].m(t,null),r=!0},p(e,[r]){let c=n;n=a(e),n===c?o[n].p(e,r):(me(),ye(o[c],1,1,(()=>{o[c]=null})),ge(),s=o[n],s?s.p(e,r):(s=o[n]=i[n](e),s.c()),ve(s,1),s.m(t,null))},i(e){r||(ve(s),r=!0)},o(e){ye(s),r=!1},d(e){e&&A(t),o[n].d()}}}const Pp=(e,t)=>t.votes-e.votes;function xp(e,t,n){let s,{id:r}=t,i=null,o=0,a="",c=[],l=()=>{},u=()=>{};return Q((()=>{l=Lf(r,(e=>{n(0,i=e),u(),!e||"video_collab"===e.type&&"submission"===Uf(e)?n(3,c=[]):u=Mf(r,"video_collab"===e.type?"submissions":"options",(e=>{n(3,c=e),n(1,o=e.reduce(((e,t)=>e+t.votes),0))}))}))})),Y((()=>{l(),u()})),e.$$set=e=>{"id"in e&&n(7,r=e.id)},e.$$.update=()=>{1&e.$$.dirty&&n(4,s=i&&"video_collab"===i.type)},[i,o,a,c,s,function(){st(`/polls/${r}`)},async function(){try{const e=window.location.origin+`/polls/${r}`;await navigator.clipboard.writeText(e),n(2,a="Poll link copied to clipboard!"),setTimeout((()=>n(2,a="")),3e3)}catch(e){n(2,a="Failed to copy link. Please copy the URL manually."),setTimeout((()=>n(2,a="")),5e3)}},r]}class Lp extends Re{constructor(e){super(),Ne(this,e,xp,Op,a,{id:7})}}function Mp(e){let t;return{c(){t=N("a"),t.textContent="New poll",L(t,"href","/"),L(t,"class","nav-button svelte-1h7tks1")},m(e,n){C(e,t,n)},d(e){e&&A(t)}}}function Up(t){let n,s,r,i,o=t[0]&&Mp();return{c(){n=N("header"),s=N("div"),r=N("a"),r.innerHTML='<span class="brand-mark svelte-1h7tks1">PB</span> \n      <span class="brand-text svelte-1h7tks1"><span class="brand-name svelte-1h7tks1">Poller Bear</span> \n        <span class="brand-tagline svelte-1h7tks1">Quick polls, real results</span></span>',i=D(),o&&o.c(),L(r,"href","/"),L(r,"class","brand-link svelte-1h7tks1"),L(s,"class","header-container svelte-1h7tks1"),L(n,"class","site-header svelte-1h7tks1")},m(e,t){C(e,n,t),E(n,s),E(s,r),E(s,i),o&&o.m(s,null)},p(e,[t]){e[0]?o||(o=Mp(),o.c(),o.m(s,null)):o&&(o.d(1),o=null)},i:e,o:e,d(e){e&&A(n),o&&o.d()}}}function $p(e,t,n){let s,r;const i=X(De);return h(e,i,(e=>n(2,r=e))),e.$$.update=()=>{4&e.$$.dirty&&n(0,s=!(!r||!r.pathname)&&r.pathname.startsWith("/polls/"))},[s,i,r]}class Fp extends Re{constructor(e){super(),Ne(this,e,$p,Up,a,{})}}function Vp(t){let n;return{c(){n=N("footer"),n.innerHTML='<div class="footer-container svelte-lkw22u"><div class="footer-content svelte-lkw22u"><div class="footer-brand svelte-lkw22u"><span class="footer-name svelte-lkw22u">Poller Bear</span> \n        <p class="footer-description svelte-lkw22u">Create polls in seconds, get results instantly. Simple, fast polling for everyone.</p></div> \n\n      <div class="footer-links svelte-lkw22u"><a class="footer-link svelte-lkw22u" href="https://www.github.com/SteveHNH/poller-bear" target="_blank" rel="noreferrer">GitHub</a> \n        <a class="footer-link svelte-lkw22u" href="https://ko-fi.com/F1F61IKDJT" target="_blank" rel="noreferrer">Buy me a coffee</a></div></div> \n\n    <div class="footer-bottom svelte-lkw22u"><div class="footer-divider svelte-lkw22u"></div> \n      <div class="bottom-content svelte-lkw22u"><span class="footer-meta svelte-lkw22u">© 2025 Poller Bear</span> \n        <span class="footer-meta svelte-lkw22u">Open source. Patches welcome.</span></div></div></div>',L(n,"class","site-footer svelte-lkw22u")},m(e,t){C(e,n,t)},p:e,i:e,o:e,d(e){e&&A(n)}}}class jp extends Re{constructor(e){super(),Ne(this,e,null,Vp,a,{})}}function Bp(e){let t,n;return t=new Ip({props:{id:e[0].id}}),{c(){ke(t.$$.fragment)},m(e,s){Se(t,e,s),n=!0},p(e,n){const s={};1&n&&(s.id=e[0].id),t.$set(s)},i(e){n||(ve(t.$$.fragment,e),n=!0)},o(e){ye(t.$$.fragment,e),n=!1},d(e){Ce(t,e)}}}function qp(e){let t,n;return t=new Lp({props:{id:e[0].id}}),{c(){ke(t.$$.fragment)},m(e,s){Se(t,e,s),n=!0},p(e,n){const s={};1&n&&(s.id=e[0].id),t.$set(s)},i(e){n||(ve(t.$$.fragment,e),n=!0)},o(e){ye(t.$$.fragment,e),n=!1},d(e){Ce(t,e)}}}function zp(e){let t,n,s,r,i,o;return t=new Je({props:{path:"/",component:Wf}}),s=new Je({props:{path:"/polls/:id",$$slots:{default:[Bp,({params:e})=>({0:e}),({params:e})=>e?1:0]},$$scope:{ctx:e}}}),i=new Je({props:{path:"/polls/:id/r",$$slots:{default:[qp,({params:e})=>({0:e}),({params:e})=>e?1:0]},$$scope:{ctx:e}}}),{c(){ke(t.$$.fragment),n=D(),ke(s.$$.fragment),r=D(),ke(i.$$.fragment)},m(e,a){Se(t,e,a),C(e,n,a),Se(s,e,a),C(e,r,a),Se(i,e,a),o=!0},p(e,t){const n={};3&t&&(n.$$scope={dirty:t,ctx:e}),s.$set(n);const r={};3&t&&(r.$$scope={dirty:t,ctx:e}),i.$set(r)},i(e){o||(ve(t.$$.fragment,e),ve(s.$$.fragment,e),ve(i.$$.fragment,e),o=!0)},o(e){ye(t.$$.fragment,e),ye(s.$$.fragment,e),ye(i.$$.fragment,e),o=!1},d(e){Ce(t,e),e&&A(n),Ce(s,e),e&&A(r),Ce(i,e)}}}function Kp(e){let t,n,s,r,i,o,a,c,l,u;return s=new Fp({}),a=new ft({props:{$$slots:{default:[zp]},$$scope:{ctx:e}}}),l=new jp({}),{c(){t=D(),n=N("div"),ke(s.$$.fragment),r=D(),i=N("main"),o=N("div"),ke(a.$$.fragment),c=D(),ke(l.$$.fragment),document.title="Poller Bear",L(o,"class","container svelte-ldu9oe"),L(i,"class","main-content svelte-ldu9oe"),L(n,"class","app-layout svelte-ldu9oe")},m(e,h){C(e,t,h),C(e,n,h),Se(s,n,null),E(n,r),E(n,i),E(i,o),Se(a,o,null),E(n,c),Se(l,n,null),u=!0},p(e,[t]){const n={};2&t&&(n.$$scope={dirty:t,ctx:e}),a.$set(n)},i(e){u||(ve(s.$$.fragment,e),ve(a.$$.fragment,e),ve(l.$$.fragment,e),u=!0)},o(e){ye(s.$$.fragment,e),ye(a.$$.fragment,e),ye(l.$$.fragment,e),u=!1},d(e){e&&A(t),e&&A(n),Ce(s),Ce(a),Ce(l)}}}return new class extends Re{constructor(e){super(),Ne(this,e,null,Kp,a,{})}}({target:document.getElementById("app")})}();
//# sourceMappingURL=bundle.js.map
