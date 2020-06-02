(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1298:function(e,t,n){"use strict";n.r(t);var r=n(60),i=n(3);r.addons.setConfig({theme:Object(i.create)({base:"light",brandTitle:"Vue examples"})})},1304:function(e,t,n){n(1305)},1305:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(n(0)),a=r(n(60)),o=n(38),c=r(n(419)),u=n(260);a.default.register(u.ADDON_ID,e=>{a.default.addPanel(u.PANEL_ID,{title:"Fixtures",render:({active:e,key:t})=>i.default.createElement(o.AddonPanel,{key:t,active:e},i.default.createElement(c.default,null)),paramKey:u.PARAM_KEY})})},1307:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.withFixtures=void 0;const c=o(n(220)),u=n(66),s=n(1308),l=a(n(60)),f=n(419),d=n(260);let m;function h(e={},t,n=0){const[r]=Object.entries(e)[0],i=Object.entries(e[t||r]),[,a]=i[n];return"string"!=typeof a?a:{}}t.withFixtures=l.makeDecorator({name:d.ADDON_ID,parameterName:d.PARAM_KEY,wrapper:(e,t,{options:n={},parameters:r={}})=>{const i=c.default.parse(window.location.search),a=Object.assign(Object.assign({},n),r),o=l.default.getChannel(),v=h(a,i.fixture,i.variant);function y({fixtures:e,sectionId:t,variantIdx:n}){m=h(e,t,n),o.emit(u.FORCE_RE_RENDER)}return s.useEffect(()=>(o.emit(d.Events.INIT,a),o.on(d.Events.CHANGE,y),i.fixture&&i.variant&&f.fetchRemotes(a).then(e=>{m=h(e,i.fixture,i.variant),o.emit(u.FORCE_RE_RENDER)}),()=>{o.off(d.Events.CHANGE,y)}),[]),e(Object.assign(Object.assign({},t),{fixture:m||v}))}})},260:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.Events=t.PANEL_ID=t.PARAM_KEY=t.ADDON_ID=void 0,t.ADDON_ID="storybook-fixtures",t.PARAM_KEY="fixtures",t.PANEL_ID=t.ADDON_ID+"/panel",t.Events={INIT:t.ADDON_ID+"/init",CHANGE:t.ADDON_ID+"/change"};var r=n(1307);Object.defineProperty(t,"withFixtures",{enumerable:!0,get:function(){return r.withFixtures}});var i=n(178);Object.defineProperty(t,"keyBy",{enumerable:!0,get:function(){return i.keyBy}}),e&&e.hot&&e.hot.decline&&e.hot.decline()}).call(this,n(111)(e))},419:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,a){function o(e){try{u(r.next(e))}catch(e){a(e)}}function c(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}u((r=r.apply(e,t||[])).next())}))},c=this&&this.__asyncValues||function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,i){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,i,(t=e[n](t)).done,t.value)}))}}},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.fetchRemotes=t.getEntries=void 0;const s=u(n(358)),l=a(n(0)),f=u(n(1306)),d=n(3),m=u(n(60)),h=n(92),v=n(38),y=n(260);function p(e={}){return Array.isArray(e)?e.map((e,t)=>["Variant "+(t+1),e]):s.default(e)?Object.entries(e):[]}function b(e){var t,n,r,i;return o(this,void 0,void 0,(function*(){const a=Object.entries(e),o={};try{for(var u,s=c(a);!(u=yield s.next()).done;){const[e,t]=u.value;o[e]={};const n=Object.entries(t),a=Array.isArray(t);try{for(var l,d=(r=void 0,c(n));!(l=yield d.next()).done;){const[t,n]=l.value,r=a?"Variant "+(Number(t)+1):t;if("string"==typeof n)try{o[e][r]=yield f.default(n).then(e=>(e.ok||console.error("Failed to fetch "+n),e.json()))}catch(e){throw new Error(e)}else o[e][r]=n}}catch(e){r={error:e}}finally{try{l&&!l.done&&(i=d.return)&&(yield i.call(d))}finally{if(r)throw r.error}}}}catch(e){t={error:e}}finally{try{u&&!u.done&&(n=s.return)&&(yield n.call(s))}finally{if(t)throw t.error}}return o}))}t.getEntries=p,t.fetchRemotes=b;const _=d.styled.menu`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-auto-rows: minmax(3rem, 10rem);
  grid-gap: 0.5rem;
  padding: 0.5rem;
  margin: 0;
`,E=d.styled.button`
  background: ${({theme:e})=>e.background.hoverable};
  border: 2px solid transparent;
  border-radius: 0.3rem;
  padding: 0.2rem;
  transition: 100ms border-color;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
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
    width: 100%;
    border-radius: 0.2rem;
    padding: 0.2rem;
    font-size: 0.6rem;
    background: #0001;
    flex: 1;
    max-width: 100%;
    overflow: hidden;
    white-space: pre;
    position: relative;
    mask-image: linear-gradient(to bottom, #000a, transparent);
  }

  .name {
    width: 100%;
    padding: 0.2rem;
  }
`,g=({active:e,fixtureContents:t,sectionId:n,selectedSectionId:r,onSelect:i})=>{const a=p(t),[o,c]=l.useState(0);function u(e){const[,t]=a[e];c(e),i({sectionId:n,variant:t,variantIdx:e})}return l.useEffect(()=>{e&&n===r&&u(o)},[r]),l.default.createElement(v.TabWrapper,{active:e,render:()=>l.default.createElement(_,null,a.map(([e,t],n)=>{const r=[o===n&&"active"].filter(Boolean).join(" "),i=JSON.stringify(t,null,2).trim().slice(0,300);return l.default.createElement(E,{key:e,type:"button",className:r,"data-id":e,onClick:()=>u(n)},l.default.createElement("span",{className:"preview"},i),l.default.createElement("span",{className:"name"},e))}))})};t.default=function(){const e=m.default.getChannel(),[t,n]=l.useState(),r=p(t),i=h.useStorybookApi();function a(e){return o(this,void 0,void 0,(function*(){try{const t=yield b(e);n(t)}catch(e){console.error("Some requests have failed.",e)}}))}function c({sectionId:n,variantIdx:r}){e.emit(y.Events.CHANGE,{fixtures:t,sectionId:n,variantIdx:r}),i.setQueryParams({fixture:n,variant:r})}return l.useEffect(()=>(e.on(y.Events.INIT,a),()=>{e.off(y.Events.INIT,a)}),[]),r.length?l.default.createElement(v.TabsState,{absolute:!0},r.map(([e,t])=>l.default.createElement("div",{id:e,title:e,key:e},({active:n})=>{const r=n?e:"";return l.default.createElement(g,{key:e,active:n,fixtureContents:t,sectionId:e,selectedSectionId:r,onSelect:c})}))):null}},436:function(e,t,n){n(437),n(620),n(1298),n(1299),e.exports=n(1304)},517:function(e,t){}},[[436,1,2]]]);