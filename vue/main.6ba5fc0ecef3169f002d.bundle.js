(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{241:function(module){module.exports=JSON.parse('{"Variant #1":{"first_name":"Raleigh","last_name":"Pullan","email":"rpullan1@imgur.com","description":"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum."},"Variant #2":{"first_name":"Lannie","last_name":"Shortcliffe","email":"lshortcliffe8@shutterfly.com","description":"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus."},"Variant #3":{"first_name":"Aldrich","last_name":"Dunston","email":"adunston5@storify.com","description":"Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."}}')},383:function(module,exports,__webpack_require__){"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};exports.__esModule=!0,exports.createFixtureInput=exports.getSelectedFixture=void 0;var addon_knobs_1=__webpack_require__(374),INPUT_TYPES=["radio","inline-radio","select"];function getSelectedFixture(fixtureDefinition,selectAddon,optionLabelKey){var _a=function getOptionsFromFixture(fixture,optionLabelKey){if(void 0===optionLabelKey&&(optionLabelKey=function(val,key){return key}),!fixture)throw new Error("Fixture is required");var optionsArray=Array.isArray(fixture)?fixture.map((function(x,i){return["Variant "+(i+1),x]})):Object.entries(fixture);return{valuesObj:optionsArray.reduce((function(acc,_a,idx){var _b,key=_a[0],value=_a[1],label="function"==typeof optionLabelKey?optionLabelKey(value,key):value[optionLabelKey]||idx+1+": "+optionLabelKey+" not found";return __assign(__assign({},acc),((_b={})[label]=key,_b))}),{}),fixtureObj:optionsArray.reduce((function(acc,_a){var _b,key=_a[0],value=_a[1];return __assign(__assign({},acc),((_b={})[key]=value,_b))}),{})}}(fixtureDefinition,optionLabelKey),valuesObj=_a.valuesObj,fixtureObj=_a.fixtureObj,values=Object.values(valuesObj);return fixtureObj[selectAddon(valuesObj,values.length&&values[0])]}exports.getSelectedFixture=getSelectedFixture,exports.createFixtureInput=function createFixtureInput(fixture,optionLabelKey){return function createInput(fieldLabel,options){var _a=options||{},_b=_a.type,type=void 0===_b?"select":_b,initial=_a.initial;if(!fieldLabel)throw new Error("Field label is required");if(!INPUT_TYPES.includes(type))throw new Error("'"+type+"' is not a valid input type. Valid types: "+INPUT_TYPES.join(", ")+".");return getSelectedFixture(fixture,(function(valuesObj,initialKey){var selectedInput=initial||initialKey;switch(type){case INPUT_TYPES[0]:return addon_knobs_1.optionsKnob(fieldLabel,valuesObj,selectedInput,{display:"radio"},"Fixtures");case INPUT_TYPES[1]:return addon_knobs_1.optionsKnob(fieldLabel,valuesObj,selectedInput,{display:"inline-radio"},"Fixtures");default:return addon_knobs_1.select(fieldLabel,valuesObj,selectedInput,"Fixtures")}}),optionLabelKey)}}},386:function(module){module.exports=JSON.parse('[{"first_name":"Darnall","last_name":"Parlour","email":"dparlour0@linkedin.com","description":"Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."},{"first_name":"Raleigh","last_name":"Pullan","email":"rpullan1@imgur.com","description":"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum."},{"first_name":"Isabelita","last_name":"MacGebenay","email":"imacgebenay2@angelfire.com","description":"Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus."},{"first_name":"Galvan","last_name":"Betjes","email":"gbetjes3@odnoklassniki.ru","description":"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt."},{"first_name":"Jamie","last_name":"Clerc","email":"jclerc4@tuttocitta.it","description":"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat."},{"first_name":"Aldrich","last_name":"Dunston","email":"adunston5@storify.com","description":"Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},{"first_name":"Borden","last_name":"Ricker","email":"bricker6@un.org","description":"Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero."},{"first_name":"Marybelle","last_name":"Cush","email":"mcush7@shop-pro.jp","description":"Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus."},{"first_name":"Lannie","last_name":"Shortcliffe","email":"lshortcliffe8@shutterfly.com","description":"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus."},{"first_name":"Haze","last_name":"Isaq","email":"hisaq9@nhs.uk","description":"Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh."}]')},387:function(module,exports,__webpack_require__){__webpack_require__(388),__webpack_require__(573),__webpack_require__(574),__webpack_require__(669),module.exports=__webpack_require__(828)},470:function(module,exports){},574:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),element_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(384),element_ui__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_1__);__webpack_require__(662),__webpack_require__(667);vue__WEBPACK_IMPORTED_MODULE_0__.default.use(element_ui__WEBPACK_IMPORTED_MODULE_1___default.a)},667:function(module,exports,__webpack_require__){var api=__webpack_require__(317),content=__webpack_require__(668);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},668:function(module,exports,__webpack_require__){(exports=__webpack_require__(318)(!1)).push([module.i,"body {\n  font: 16px/1.4 Helvetica, sans-serif;\n}\n",""]),module.exports=exports},77:function(module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k),Object.defineProperty(o,k2,{enumerable:!0,get:function(){return m[k]}})}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]});exports.__esModule=!0,__createBinding(exports,__webpack_require__(383),"createFixtureInput");var remote_1=__webpack_require__(862);__createBinding(exports,remote_1,"useRemoteFixture"),__createBinding(exports,remote_1,"getRemoteFixture")},828:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(161);module._StorybookPreserveDecorators=!0,Object(_storybook_vue__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(858)],module)}.call(this,__webpack_require__(377)(module))},858:function(module,exports,__webpack_require__){var map={"./storybook-fixtures-remote.stories.js":859,"./storybook-fixtures.stories.js":865};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=858},859:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__(23),__webpack_require__(115),__webpack_require__(32),__webpack_require__(156),__webpack_require__(25),__webpack_require__(381),__webpack_require__(382),__webpack_require__(42),__webpack_require__(22),__webpack_require__(143),__webpack_require__(34),__webpack_require__(162);var _storybook_vue__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(161),storybook_fixtures__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(77),_UserCard_vue__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(88);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}var withSourceLoader=__webpack_require__(160).withSource,__STORY__=(__webpack_require__(160).addSource,"import { storiesOf } from '@storybook/vue';\nimport { createFixtureInput, getRemoteFixture } from 'storybook-fixtures';\nimport UserCard from './UserCard.vue';\n\n// Separate file for storiesOf required to use async props in Vue component.\n// This is due to currently unsupported mix of storiesOf and CSF in Storybook:\n//   \"Illegal mix of CSF default export and storiesOf calls in a single file\"\n// More info: https://github.com/storybookjs/storybook/issues/9196#issuecomment-568262252\n\n// Storybook requires knobs to be only initialised in props and due to the\n// async nature of the props there needs to be an async function level above.\n// Using storiesOf approach with async IIFE seems to be the only way to do it.\n\n// Storybook knobs must be defined in Vue props.\n// https://github.com/storybookjs/storybook/issues/4947\n// Add a story asynchronously in order to resolve the request and pass\n// it as a static prop.\n(async () => {\n  const collection = await getRemoteFixture('./mock-collection.json');\n  const knobInput = createFixtureInput(collection, 'first_name');\n\n  storiesOf('storybook-fixtures', module).add('Remote Fixture', () => {\n    return {\n      ...UserCard,\n      props: {\n        fixture: {\n          default: knobInput('Select variant', {\n            type: 'radio',\n          }),\n        },\n      },\n    };\n  });\n})();\n"),__ADDS_MAP__={"storybook-fixtures--remote-fixture":{startLoc:{col:46,line:22},endLoc:{col:3,line:33},startBody:{col:64,line:22},endBody:{col:3,line:33}}},__MODULE_DEPENDENCIES__=[],__LOCAL_DEPENDENCIES__={},__IDS_TO_FRAMEWORKS__={};!function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}(regeneratorRuntime.mark((function _callee(){var collection,knobInput;return regeneratorRuntime.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(storybook_fixtures__WEBPACK_IMPORTED_MODULE_13__.getRemoteFixture)("./mock-collection.json");case 2:collection=_context.sent,knobInput=Object(storybook_fixtures__WEBPACK_IMPORTED_MODULE_13__.createFixtureInput)(collection,"first_name"),Object(_storybook_vue__WEBPACK_IMPORTED_MODULE_12__.storiesOf)("storybook-fixtures",module).addParameters({storySource:{source:__STORY__,locationsMap:__ADDS_MAP__}}).addDecorator(withSourceLoader(__STORY__,__ADDS_MAP__,"/storybook-fixtures-remote.stories.js",__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__,"/home/runner/work/storybook-addons/storybook-addons/examples/vue",__IDS_TO_FRAMEWORKS__)).add("Remote Fixture",(function(){return _objectSpread(_objectSpread({},_UserCard_vue__WEBPACK_IMPORTED_MODULE_14__.a),{},{props:{fixture:{default:knobInput("Select variant",{type:"radio"})}}})}));case 5:case"end":return _context.stop()}}),_callee)})))()}.call(this,__webpack_require__(377)(module))},862:function(module,exports,__webpack_require__){"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__generator=this&&this.__generator||function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function step(op){if(f)throw new TypeError("Generator is already executing.");for(;_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};exports.__esModule=!0,exports.useRemoteFixture=exports.getRemoteFixture=void 0;var cross_fetch_1=__importDefault(__webpack_require__(863)),react_1=__webpack_require__(159),fixtures_1=__webpack_require__(383);exports.getRemoteFixture=function(url){return __awaiter(void 0,void 0,void 0,(function(){return __generator(this,(function(_a){return[2,cross_fetch_1.default(url).then((function(res){return res.json()}))]}))}))},exports.useRemoteFixture=function useRemoteFixture(url,optionLabelKey){var _a=react_1.useState({}),value=_a[0],setValue=_a[1],_b=react_1.useState(!1),loaded=_b[0],setLoaded=_b[1];return react_1.useEffect((function(){exports.getRemoteFixture(url).then((function(x){setValue(x),setLoaded(!0)}))}),[url]),loaded?fixtures_1.createFixtureInput(value,optionLabelKey):function(){}}},865:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"collectionFixture",(function(){return collectionFixture})),__webpack_require__.d(__webpack_exports__,"objectFixtureRadio",(function(){return objectFixtureRadio})),__webpack_require__.d(__webpack_exports__,"objectFixtureSelect",(function(){return objectFixtureSelect}));__webpack_require__(23),__webpack_require__(20),__webpack_require__(115),__webpack_require__(32),__webpack_require__(156),__webpack_require__(25),__webpack_require__(381),__webpack_require__(382),__webpack_require__(42),__webpack_require__(34);var storybook_fixtures__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(77),_fixtures_mock_collection_json__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(386),_fixtures_mock_object_json__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(241),_UserCard_vue__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(88);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__(160).withSource;var addSourceDecorator=__webpack_require__(160).addSource,__SOURCE_PREFIX__="/home/runner/work/storybook-addons/storybook-addons/examples/vue",__STORY__="import { createFixtureInput } from 'storybook-fixtures';\nimport mockCollection from '../__fixtures__/mock-collection.json';\nimport mockObject from '../__fixtures__/mock-object.json';\nimport UserCard from './UserCard.vue';\n\nexport default {\n  title: 'storybook-fixtures',\n};\n\nconst collectionFixtureInput = createFixtureInput(mockCollection);\nconst objectFixtureInput = createFixtureInput(mockObject);\nconst objectFixtureInput2 = createFixtureInput(\n  mockObject,\n  (variant, key) => `${key} - ${variant.last_name}`\n);\n\nexport const collectionFixture = () => ({\n  ...UserCard,\n  props: {\n    fixture: {\n      default: collectionFixtureInput('Select variant', {\n        type: 'radio',\n        initial: 'Variant 5',\n      }),\n    },\n  },\n});\n\nexport const objectFixtureRadio = () => ({\n  ...UserCard,\n  props: {\n    fixture: {\n      default: objectFixtureInput('Select variant', {\n        type: 'inline-radio',\n      }),\n    },\n  },\n});\n\nexport const objectFixtureSelect = () => ({\n  ...UserCard,\n  props: {\n    fixture: {\n      default: objectFixtureInput2('Select variant'),\n    },\n  },\n});\n",__ADDS_MAP__={"storybook-fixtures--collection-fixture":{startLoc:{col:33,line:17},endLoc:{col:2,line:27},startBody:{col:33,line:17},endBody:{col:2,line:27}},"storybook-fixtures--object-fixture-radio":{startLoc:{col:34,line:29},endLoc:{col:2,line:38},startBody:{col:34,line:29},endBody:{col:2,line:38}},"storybook-fixtures--object-fixture-select":{startLoc:{col:35,line:40},endLoc:{col:2,line:47},startBody:{col:35,line:40},endBody:{col:2,line:47}}},__MODULE_DEPENDENCIES__=[],__LOCAL_DEPENDENCIES__={},__IDS_TO_FRAMEWORKS__={};__webpack_exports__.default={parameters:{storySource:{source:"import { createFixtureInput } from 'storybook-fixtures';\nimport mockCollection from '../__fixtures__/mock-collection.json';\nimport mockObject from '../__fixtures__/mock-object.json';\nimport UserCard from './UserCard.vue';\n\nexport default {\n  title: 'storybook-fixtures',\n};\n\nconst collectionFixtureInput = createFixtureInput(mockCollection);\nconst objectFixtureInput = createFixtureInput(mockObject);\nconst objectFixtureInput2 = createFixtureInput(\n  mockObject,\n  (variant, key) => `${key} - ${variant.last_name}`\n);\n\nexport const collectionFixture = () => ({\n  ...UserCard,\n  props: {\n    fixture: {\n      default: collectionFixtureInput('Select variant', {\n        type: 'radio',\n        initial: 'Variant 5',\n      }),\n    },\n  },\n});\n\nexport const objectFixtureRadio = () => ({\n  ...UserCard,\n  props: {\n    fixture: {\n      default: objectFixtureInput('Select variant', {\n        type: 'inline-radio',\n      }),\n    },\n  },\n});\n\nexport const objectFixtureSelect = () => ({\n  ...UserCard,\n  props: {\n    fixture: {\n      default: objectFixtureInput2('Select variant'),\n    },\n  },\n});\n",locationsMap:{"storybook-fixtures--collection-fixture":{startLoc:{col:33,line:17},endLoc:{col:2,line:27},startBody:{col:33,line:17},endBody:{col:2,line:27}},"storybook-fixtures--object-fixture-radio":{startLoc:{col:34,line:29},endLoc:{col:2,line:38},startBody:{col:34,line:29},endBody:{col:2,line:38}},"storybook-fixtures--object-fixture-select":{startLoc:{col:35,line:40},endLoc:{col:2,line:47},startBody:{col:35,line:40},endBody:{col:2,line:47}}}}},title:"storybook-fixtures"};var collectionFixtureInput=Object(storybook_fixtures__WEBPACK_IMPORTED_MODULE_10__.createFixtureInput)(_fixtures_mock_collection_json__WEBPACK_IMPORTED_MODULE_11__),objectFixtureInput=Object(storybook_fixtures__WEBPACK_IMPORTED_MODULE_10__.createFixtureInput)(_fixtures_mock_object_json__WEBPACK_IMPORTED_MODULE_12__),objectFixtureInput2=Object(storybook_fixtures__WEBPACK_IMPORTED_MODULE_10__.createFixtureInput)(_fixtures_mock_object_json__WEBPACK_IMPORTED_MODULE_12__,(function(variant,key){return"".concat(key," - ").concat(variant.last_name)})),collectionFixture=addSourceDecorator((function(){return _objectSpread(_objectSpread({},_UserCard_vue__WEBPACK_IMPORTED_MODULE_13__.a),{},{props:{fixture:{default:collectionFixtureInput("Select variant",{type:"radio",initial:"Variant 5"})}}})}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/storybook-fixtures.stories.js",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__}),objectFixtureRadio=addSourceDecorator((function(){return _objectSpread(_objectSpread({},_UserCard_vue__WEBPACK_IMPORTED_MODULE_13__.a),{},{props:{fixture:{default:objectFixtureInput("Select variant",{type:"inline-radio"})}}})}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/storybook-fixtures.stories.js",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__}),objectFixtureSelect=addSourceDecorator((function(){return _objectSpread(_objectSpread({},_UserCard_vue__WEBPACK_IMPORTED_MODULE_13__.a),{},{props:{fixture:{default:objectFixtureInput2("Select variant")}}})}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/storybook-fixtures.stories.js",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__})},88:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(864);var UserCardvue_type_script_lang_js_={computed:{fullName:function fullName(){return[this.fixture.first_name,this.fixture.last_name].join(" ")}}},componentNormalizer=__webpack_require__(385),component=Object(componentNormalizer.a)(UserCardvue_type_script_lang_js_,(function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("el-card",{staticClass:"box-card"},[_c("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[_c("span",[_vm._v(_vm._s(_vm.fullName))])]),_vm._v(" "),_c("el-input",{attrs:{placeholder:"Please input",value:_vm.fixture.email}}),_vm._v(" "),_c("p",[_vm._v(_vm._s(_vm.fixture.description))]),_vm._v(" "),_c("el-button",[_vm._v("Save")])],1)}),[],!1,null,null,null);__webpack_exports__.a=component.exports}},[[387,1,2]]]);
//# sourceMappingURL=main.6ba5fc0ecef3169f002d.bundle.js.map