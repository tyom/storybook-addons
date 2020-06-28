(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1298:function(e,t,n){"use strict";n.r(t);var r=n(61),i=n(3);r.addons.setConfig({theme:Object(i.create)({base:"dark",brandTitle:"React examples"})})},1304:function(e,t,n){n(1305)},1305:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(n(0)),o=r(n(61)),a=n(38),c=r(n(419)),s=n(260);o.default.register(s.ADDON_ID,()=>{o.default.addPanel(s.PANEL_ID,{title:"Fixtures",render:({active:e,key:t})=>i.default.createElement(a.AddonPanel,{key:t,active:e},i.default.createElement(c.default,null)),paramKey:s.PARAM_KEY})})},1307:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.withFixtures=void 0;const c=a(n(220)),s=a(n(1308)),u=n(59),l=n(1309),d=o(n(61)),f=n(419),m=n(260);let h;function v(e={},t,n=0){const r=Object.entries(e);if(!r.length)return{};const[i]=r[0],o=Object.entries(e[t||i]),[,a]=o[n]||[];return a}t.withFixtures=d.makeDecorator({name:m.ADDON_ID,parameterName:m.PARAM_KEY,wrapper:(e,t,{options:n={},parameters:r={}})=>{const i={singleTab:!1},o=c.default.parse(window.location.search),a=Object.entries(Object.assign(Object.assign({},n),r)).reduceRight((e,[t,n])=>t.startsWith("__")?(i[t.replace("__","")]=n,e):Object.assign({[t]:n},e),{}),y=d.default.getChannel();Object.keys(a).length||(h={});const b=v(a,o.fixture,o.variant);function p({fixtures:e,sectionId:t,variantIdx:n}){h=v(e,t,n),y.emit(u.FORCE_RE_RENDER)}return l.useEffect(()=>(y.emit(m.Events.INIT,a,i),y.on(m.Events.CHANGE,p),o.fixture&&o.variant&&f.fetchRemotes(a).then(e=>{h=v(e,o.fixture,o.variant),y.emit(u.FORCE_RE_RENDER)}),()=>{y.off(m.Events.CHANGE,p),h=null,y.emit(m.Events.INIT,{})}),[]),e(Object.assign(Object.assign({},t),{fixture:s.default(h)?b:h}))}})},260:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.Events=t.PANEL_ID=t.PARAM_KEY=t.ADDON_ID=void 0,t.ADDON_ID="storybook-fixtures",t.PARAM_KEY="fixtures",t.PANEL_ID=t.ADDON_ID+"/panel",t.Events={INIT:t.ADDON_ID+"/init",CHANGE:t.ADDON_ID+"/change"};var r=n(1307);Object.defineProperty(t,"withFixtures",{enumerable:!0,get:function(){return r.withFixtures}});var i=n(178);Object.defineProperty(t,"keyBy",{enumerable:!0,get:function(){return i.keyBy}}),e&&e.hot&&e.hot.decline&&e.hot.decline()}).call(this,n(111)(e))},419:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{s(r.next(e))}catch(e){o(e)}}function c(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((r=r.apply(e,t||[])).next())}))},c=this&&this.__asyncValues||function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,i){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,i,(t=e[n](t)).done,t.value)}))}}},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.fetchRemotes=t.getEntries=void 0;const u=s(n(358)),l=o(n(0)),d=s(n(1306)),f=n(3),m=s(n(61)),h=n(92),v=n(38),y=n(59),b=n(260);function p(e={}){return Array.isArray(e)?e.map((e,t)=>["Variant "+(t+1),e]):u.default(e)?Object.entries(e):[]}function _(e){var t,n,r,i;return a(this,void 0,void 0,(function*(){const o=Object.entries(e),a={};try{for(var s,u=c(o);!(s=yield u.next()).done;){const[e,t]=s.value;a[e]={};const n=Object.entries(t),o=Array.isArray(t);try{for(var l,f=(r=void 0,c(n));!(l=yield f.next()).done;){const[t,n]=l.value,r=o?"Variant "+(Number(t)+1):t;if("string"==typeof n&&/^\.?\/|https?:\/\//.test(n))try{a[e][r]=yield d.default(n).then(e=>(e.ok||console.error("Failed to fetch "+n),e.json()))}catch(e){throw new Error(e)}else a[e][r]=n}}catch(e){r={error:e}}finally{try{l&&!l.done&&(i=f.return)&&(yield i.call(f))}finally{if(r)throw r.error}}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=u.return)&&(yield n.call(u))}finally{if(t)throw t.error}}return a}))}t.getEntries=p,t.fetchRemotes=_;const E=({active:e,fixtureContents:t,sectionId:n,selectedSectionId:r,onSelect:i})=>{const o=p(t),[a,c]=l.useState(0);function s(e){c(e),i({sectionId:n,variantIdx:e})}function u({event:e}){d(e)}function d({key:e}){let t=Number(e)-1;["k","j"].includes(e)&&(t="k"===e?a+1:a-1),t>=0&&t<o.length&&t<10&&s(t)}return l.useEffect(()=>{const t=m.default.getChannel();return e&&(t.on(y.PREVIEW_KEYDOWN,u),document.addEventListener("keydown",d)),()=>{e&&(t.off(y.PREVIEW_KEYDOWN,u),document.removeEventListener("keydown",d))}},[n,e,a]),l.useEffect(()=>{e&&n===r&&s(a)},[r]),l.default.createElement(v.TabWrapper,{active:e,render:()=>l.default.createElement(O,null,o.map(([e,t],n)=>{const r=[a===n&&"active"].filter(Boolean).join(" "),i=JSON.stringify(t,null,2).trim().slice(0,300),o=n+1;return l.default.createElement(w,{key:e,type:"button",className:r,title:o<10?`Press the ${o} key to select the variant (when focused in Preview)`:void 0,"data-id":e,onClick:()=>s(n)},o<10&&l.default.createElement("span",{className:"key"},o),l.default.createElement("span",{className:"preview"},i),l.default.createElement("span",{className:"name"},e))}))})};function g({id:e,content:t,active:n=!0,onSelect:r}){const i=n?e:"";return l.default.createElement(E,{key:e,active:n,fixtureContents:t,sectionId:e,selectedSectionId:i,onSelect:r})}t.default=function(){const e=m.default.getChannel(),[t,n]=l.useState({}),[r,i]=l.useState({}),o=Object.keys(t),[c,s]=l.useState(0),u=p(t),d=h.useStorybookApi();function f(e,t){return a(this,void 0,void 0,(function*(){try{const r=yield _(e);n(r),i(t)}catch(e){console.error("Some requests have failed.",e)}}))}function E({sectionId:n,variantIdx:r}){e.emit(b.Events.CHANGE,{fixtures:t,sectionId:n,variantIdx:r}),d.setQueryParams({fixture:n,variant:r})}function O({event:e}){w(e)}function w({key:e}){"l"===e&&c<o.length-1&&s(c+1),"h"===e&&c>0&&s(c-1)}if(l.useEffect(()=>(e.on(b.Events.INIT,f),o.length&&(s(c),e.on(y.PREVIEW_KEYDOWN,O),document.addEventListener("keydown",w)),()=>{e.off(b.Events.INIT,f),o.length&&(document.removeEventListener("keydown",w),e.off(y.PREVIEW_KEYDOWN,O))}),[JSON.stringify(o),c]),!u.length)return null;if(1===u.length&&!(null==r?void 0:r.singleTab)){const[[e,t]]=u;return g({id:e,content:t,active:!0,onSelect:E})}return l.default.createElement(v.Tabs,{id:"tabbed-fixture-sections",absolute:!0,bordered:!0,actions:{onSelect:function(e){const t=o.findIndex(t=>t===e);s(t)}},selected:o[c]},u.map(([e,t])=>l.default.createElement("div",{id:e,title:e,key:e},({active:n})=>g({id:e,content:t,active:n,onSelect:E}))))};const O=f.styled.menu`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-auto-rows: minmax(3rem, 8rem);
  grid-gap: 0.5rem;
  padding: 0.5rem;
  margin: 0;
`,w=f.styled.button`
  background: ${({theme:e})=>e.background.hoverable};
  border: 2px solid transparent;
  border-radius: 0.3rem;
  padding: 0.2rem;
  transition: 100ms border-color;
  font-size: 0.8rem;
  display: block;
  position: relative;
  text-align: left;
  box-shadow: 0 1px 2px #0005;
  color: ${({theme:e})=>e.color.defaultText};

  &:hover {
    filter: brightness(80%);
  }

  &:active {
    background-color: ${({theme:e})=>e.barBg};
  }

  &.active {
    border-color: ${({theme:e})=>e.color.secondary};
  }

  .key {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    z-index: 1;
    border-radius: 0.2rem;
    background-color: #0002;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.4rem;
    height: 1.4rem;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .preview {
    border-radius: 0.2rem;
    padding: 0.2rem 1.4rem 0.2rem 0.2rem;
    font-size: 0.6rem;
    background: #0001;
    overflow: hidden;
    white-space: pre-wrap;
    mask-image: linear-gradient(to bottom, #000a, transparent);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 1rem;
    left: 0;
  }

  .name {
    position: absolute;
    font-weight: 600;
    bottom: 0.2rem;
    left: 0.2rem;
    padding: 0.2rem;
    text-shadow: 0 1px 1px #0004;
  }
`},436:function(e,t,n){n(437),n(620),n(1298),n(1299),e.exports=n(1304)},517:function(e,t){}},[[436,1,2]]]);