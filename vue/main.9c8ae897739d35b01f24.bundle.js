(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1298:function(e,t,n){"use strict";n.r(t);var r=n(60),i=n(3);r.addons.setConfig({theme:Object(i.create)({base:"light",brandTitle:"Vue examples"})})},1304:function(e,t,n){n(1305)},1305:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(n(0)),o=r(n(60)),a=n(38),c=r(n(419)),s=n(260);o.default.register(s.ADDON_ID,e=>{o.default.addPanel(s.PANEL_ID,{title:"Fixtures",render:({active:e,key:t})=>i.default.createElement(a.AddonPanel,{key:t,active:e},i.default.createElement(c.default,null)),paramKey:s.PARAM_KEY})})},1307:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.withFixtures=void 0;const c=a(n(220)),s=n(66),u=n(1308),l=o(n(60)),f=n(419),d=n(260);let m;function h(e={},t,n=0){const r=Object.entries(e);if(!r.length)return{};const[i]=r[0],o=Object.entries(e[t||i]),[,a]=o[n];return"string"!=typeof a?a:{}}t.withFixtures=l.makeDecorator({name:d.ADDON_ID,parameterName:d.PARAM_KEY,wrapper:(e,t,{options:n={},parameters:r={}})=>{const i=c.default.parse(window.location.search),o=Object.assign(Object.assign({},n),r),a=l.default.getChannel();Object.keys(o).length||(m={});const v=h(o,i.fixture,i.variant);function y({fixtures:e,sectionId:t,variantIdx:n}){m=h(e,t,n),a.emit(s.FORCE_RE_RENDER)}return u.useEffect(()=>(a.emit(d.Events.INIT,o),a.on(d.Events.CHANGE,y),i.fixture&&i.variant&&f.fetchRemotes(o).then(e=>{m=h(e,i.fixture,i.variant),a.emit(s.FORCE_RE_RENDER)}),()=>{a.off(d.Events.CHANGE,y)}),[]),e(Object.assign(Object.assign({},t),{fixture:m||v}))}})},260:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.Events=t.PANEL_ID=t.PARAM_KEY=t.ADDON_ID=void 0,t.ADDON_ID="storybook-fixtures",t.PARAM_KEY="fixtures",t.PANEL_ID=t.ADDON_ID+"/panel",t.Events={INIT:t.ADDON_ID+"/init",CHANGE:t.ADDON_ID+"/change"};var r=n(1307);Object.defineProperty(t,"withFixtures",{enumerable:!0,get:function(){return r.withFixtures}});var i=n(178);Object.defineProperty(t,"keyBy",{enumerable:!0,get:function(){return i.keyBy}}),e&&e.hot&&e.hot.decline&&e.hot.decline()}).call(this,n(111)(e))},419:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{s(r.next(e))}catch(e){o(e)}}function c(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((r=r.apply(e,t||[])).next())}))},c=this&&this.__asyncValues||function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,i){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,i,(t=e[n](t)).done,t.value)}))}}},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.fetchRemotes=t.getEntries=void 0;const u=s(n(358)),l=o(n(0)),f=s(n(1306)),d=n(3),m=s(n(60)),h=n(92),v=n(38),y=n(260);function b(e={}){return Array.isArray(e)?e.map((e,t)=>["Variant "+(t+1),e]):u.default(e)?Object.entries(e):[]}function p(e){var t,n,r,i;return a(this,void 0,void 0,(function*(){const o=Object.entries(e),a={};try{for(var s,u=c(o);!(s=yield u.next()).done;){const[e,t]=s.value;a[e]={};const n=Object.entries(t),o=Array.isArray(t);try{for(var l,d=(r=void 0,c(n));!(l=yield d.next()).done;){const[t,n]=l.value,r=o?"Variant "+(Number(t)+1):t;if("string"==typeof n)try{a[e][r]=yield f.default(n).then(e=>(e.ok||console.error("Failed to fetch "+n),e.json()))}catch(e){throw new Error(e)}else a[e][r]=n}}catch(e){r={error:e}}finally{try{l&&!l.done&&(i=d.return)&&(yield i.call(d))}finally{if(r)throw r.error}}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=u.return)&&(yield n.call(u))}finally{if(t)throw t.error}}return a}))}t.getEntries=b,t.fetchRemotes=p;const _=d.styled.menu`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-auto-rows: minmax(3rem, 10rem);
  grid-gap: 0.5rem;
  padding: 0.5rem;
  margin: 0;
`,g=d.styled.button`
  background: ${({theme:e})=>e.background.hoverable};
  border: 2px solid transparent;
  border-radius: 0.3rem;
  padding: 0.2rem;
  transition: 100ms border-color;
  font-size: 0.8rem;
  display: block;
  position: relative;
  text-align: left;
  box-shadow: 0 1px #0003;
  color: ${({theme:e})=>e.color.defaultText};

  &:hover {
    filter: brightness(80%);
  }

  &:active {
    background-color: ${({theme:e})=>e.barBg};
  }

  &.active:not(:active) {
    border-color: ${({theme:e})=>e.color.secondary};
  }

  .preview {
    border-radius: 0.2rem;
    padding: 0.2rem;
    margin: 0.2rem;
    font-size: 0.6rem;
    background: #0001;
    overflow: hidden;
    white-space: pre;
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
  }
`,E=({active:e,fixtureContents:t,sectionId:n,selectedSectionId:r,onSelect:i})=>{const o=b(t),[a,c]=l.useState(0);function s(e){const[,t]=o[e];c(e),i({sectionId:n,variant:t,variantIdx:e})}return l.useEffect(()=>{e&&n===r&&s(a)},[r]),l.default.createElement(v.TabWrapper,{active:e,render:()=>l.default.createElement(_,null,o.map(([e,t],n)=>{const r=[a===n&&"active"].filter(Boolean).join(" "),i=JSON.stringify(t,null,2).trim().slice(0,300);return l.default.createElement(g,{key:e,type:"button",className:r,"data-id":e,onClick:()=>s(n)},l.default.createElement("span",{className:"preview"},i),l.default.createElement("span",{className:"name"},e))}))})};t.default=function(){const e=m.default.getChannel(),[t,n]=l.useState(),r=b(t),i=h.useStorybookApi();function o(e){return a(this,void 0,void 0,(function*(){try{const t=yield p(e);n(t)}catch(e){console.error("Some requests have failed.",e)}}))}function c({sectionId:n,variantIdx:r}){e.emit(y.Events.CHANGE,{fixtures:t,sectionId:n,variantIdx:r}),i.setQueryParams({fixture:n,variant:r})}return l.useEffect(()=>(e.on(y.Events.INIT,o),()=>{e.off(y.Events.INIT,o)}),[]),r.length?l.default.createElement(v.TabsState,{absolute:!0},r.map(([e,t])=>l.default.createElement("div",{id:e,title:e,key:e},({active:n})=>{const r=n?e:"";return l.default.createElement(E,{key:e,active:n,fixtureContents:t,sectionId:e,selectedSectionId:r,onSelect:c})}))):null}},436:function(e,t,n){n(437),n(620),n(1298),n(1299),e.exports=n(1304)},517:function(e,t){}},[[436,1,2]]]);