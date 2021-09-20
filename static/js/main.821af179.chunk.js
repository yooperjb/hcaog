(this.webpackJsonphcaog=this.webpackJsonphcaog||[]).push([[0],[,,,,,,,function(e,t,o){e.exports={"layer-toggle":"style_layer-toggle__1Ve87","layer-checkbox":"style_layer-checkbox__2k3sd",line:"style_line__WqDAE",ClassI:"style_ClassI__30Qrr",ClassII:"style_ClassII__2hfiF",ClassIII:"style_ClassIII__1lxDv",Trail:"style_Trail__2Cez4",Advanced:"style_Advanced__2zHBE",Intermediate:"style_Intermediate__1kIf6","Family-Friendly":"style_Family-Friendly__agi-i",Official:"style_Official__3OyHu",Alternative:"style_Alternative__1o_PS",icon:"style_icon__nJFy-"}},function(e,t,o){e.exports={sidebar:"style_sidebar__20YO8",hidden:"style_hidden__1XlB_",logo:"style_logo__1e-ND",summary:"style_summary__3lUAu"}},,,function(e,t,o){e.exports={"tooltip-wrapper":"style_tooltip-wrapper__3fm7M","tooltip-text":"style_tooltip-text__2NP0t",visible:"style_visible__1BmWb","tooltip-top":"style_tooltip-top__1aRl1"}},,function(e,t,o){e.exports={"popup-row":"style_popup-row__3NELi",popup:"style_popup__1Z3vc"}},function(e,t,o){e.exports={"layer-group-header":"style_layer-group-header__2VGaN"}},function(e,t,o){e.exports={"sidebar-toggle":"style_sidebar-toggle__30Ict"}},,,,,,,,,,,,,function(e,t,o){},function(e,t,o){},function(e,t,o){"use strict";o.r(t);var i=o(0),r=o.n(i),a=o(9),s=o.n(a),c=(o(20),o(6)),n=o(5),l=o(3),d=o(4),u=o(13),p=o.n(u);const b={latitude:40.745,longitude:-123.8695,zoom:8},y={get:e=>({...y[e],id:e}),"bike-points":{id:"bike-points",type:"vector",url:"mapbox://hcaog.4f94k5tj"},"bike-routes":{id:"bike-routes",type:"vector",url:"mapbox://hcaog.1nksq7lv"},connectors:{id:"connectors",type:"vector",url:"mapbox://hcaog.digdwntd"},pcb:{id:"pcb",type:"vector",url:"mapbox://hcaog.6vx5ufzz"}},h={"bike-points":"bike_points-0g9ncs","bike-routes":"bike_routes-4e3370",connectors:"connectors-7o42gn",pcb:"PCB_full-4s2gb0"},m=1,j=2,f=e=>["interpolate",["linear"],["zoom"],b.zoom,e,b.zoom+8,2*e,b.zoom+16,4*e],g=({type:e,sourceId:t,sourceLayerId:o,layout:i,paint:r,filter:a})=>({id:s,layerName:c,layout:n,paint:l})=>({id:s,type:e,source:t,"source-layer":h[o],layout:{...i,...n},paint:{...r,...l},filter:a(c)}),x=({sourceId:e,sourceLayerId:t,filter:o})=>g({type:"line",sourceId:e,sourceLayerId:t,layout:{"line-cap":"round","line-join":"round",visibility:"visible"},paint:{"line-width":f(j)},filter:o}),O=(({sourceId:e,sourceLayerId:t,filter:o})=>g({type:"symbol",sourceId:e,sourceLayerId:t,layout:{"icon-size":m,"icon-allow-overlap":!1,visibility:"visible"},paint:{},filter:o}))({sourceId:"bike-points",sourceLayerId:"bike-points",filter:e=>["==","Type",e]}),v=x({sourceId:"bike-routes",sourceLayerId:"bike-routes",filter:e=>["==","type_2021",e]}),_=x({sourceId:"connectors",sourceLayerId:"connectors",filter:e=>["==","Type",e]}),k=x({sourceId:"pcb",sourceLayerId:"pcb",filter:e=>["==","Status",e]}),I={source:y.get("bike-points"),layers:[{id:"bike-shops",layout:{"icon-image":"hcaog-bicycle-shop"},paint:{"icon-color":"black"},layerName:"Bicycle Shop"},{id:"rental",layout:{"icon-image":"hcaog-bicycle-rental-17"},paint:{"icon-color":"black"},layerName:"Rental"},{id:"tool-station",layout:{"icon-image":"hcaog-hardware-new"},layerName:"Tool Station"}].map(O),details:{"bike-shops":{name:"Bike Shop",icon:"dollar-sign",color:"white"},rental:{name:"Bike Rental",icon:"bicycle",color:"white"},"tool-station":{name:"Tool Station",icon:"wrench",color:"white"}}},w={source:y.get("bike-routes"),layers:[{id:"ClassI",paint:{"line-color":"#2fa021"},layerName:"Existing Class I"},{id:"ClassII",paint:{"line-color":"#103ca1"},layerName:"Existing Class II"},{id:"ClassIII",paint:{"line-color":"#fa8807"},layerName:"Existing Class III"},{id:"Trail",paint:{"line-color":"#baa77c","line-dasharray":[1,2]},layerName:"Existing Trail"}].map(v),details:{ClassI:{name:"Multi-use Path",description:"A separated paved path for bicycles and pedestrians."},ClassII:{name:"Bike Lane",description:"A restricted right-of-way for bicycles along the side of a street (typically 5 feet wide). A thick white line separates the auto and bike lanes. Motor vehicles may merge into these lanes to make turns."},ClassIII:{name:"Shared Road",description:"A travel lane shared by bicycles and motor vehicles designated only by signs or pavement markings. This type of facility mainly informs motorists of preferred cycling routes."},Trail:{name:"Natural Surface",description:"A dirt or gravel path that is often bicycle compatible"}}},C={source:y.get("connectors"),layers:[{id:"Family-Friendly",paint:{"line-color":"green","line-dasharray":[1,2]},layerName:"Family Friendly"},{id:"Intermediate",paint:{"line-color":"#2b47a1","line-dasharray":[1,2]},layerName:"Intermediate"},{id:"Advanced",paint:{"line-color":"#871f1f","line-dasharray":[1,2]},layerName:"Advanced"}].map(_),details:{"Family-Friendly":{name:"Mellow",description:"Lower traffic/speed streets; generally appropriate for children and for relaxed everyday use"},Intermediate:{name:"Confident",description:"Moderate traffic/speed with medium shoulder width streets; suitable for a range of bicyclists"},Advanced:{name:"Brave",description:"High traffic volume/speed; narrow or non-existent shoulder, and/or extreme topography (hills)"}}},N={source:y.get("pcb"),layers:[{id:"Official",paint:{"line-color":"black"},layerName:"Official"},{id:"Alternative",paint:{"line-color":"gray"},layerName:"Alternative"}].map(k),details:{Official:{name:"Official",description:"Official Pacific Coast Bike Route."},Alternative:{name:"Alternative",description:"Alternative Pacific Coast Bike Route segments."}}};var L=o(1);const T={"Bicycle Shop":"bike-shops",Rental:"rental","Tool Station":"tool-station"};var A=({type:e,info:t})=>{const o=Object(i.useMemo)((()=>"route"===e?"type_2021":"Type"),[e]),r=Object(i.useMemo)((()=>{if("icon"!==e)return;const{icon:i}=I.details[T[t[o]]];return Object(L.jsx)(d.a,{icon:i,color:"black"})}),[e,o]),a=Object(i.useMemo)((()=>{if("icon"===e)return Object(L.jsx)("a",{target:"_blank",href:t.Website,rel:"noreferrer",children:Object(L.jsx)(d.a,{icon:"external-link-alt"})})}),[e,t]),s=Object(i.useMemo)((()=>"icon"===e?Object(L.jsx)("p",{children:t.Location}):"route"===e&&"Existing Trail"===t[o]?Object(L.jsxs)("p",{children:[" Bikes Allowed: ",t.Bikes_Allo," "]}):void 0),[e,t]);return Object(L.jsxs)("div",{className:p.a.popup,children:[Object(L.jsxs)("h3",{children:[r,t[o]]}),t.Name&&Object(L.jsxs)("div",{className:p.a["popup-row"],children:[Object(L.jsx)("p",{children:t.Name}),a]}),s]})},S=o.p+"static/media/logo.3d93fbe4.png";const B=()=>{const{innerWidth:e,innerHeight:t}=window;return{width:e,height:t}},E=e=>({type:E,value:e}),F=()=>({type:F}),M=()=>({type:M}),P=()=>({type:P}),R=()=>({type:R});var z=(e,{type:t,value:o})=>{switch(t){case E:return{...e,focusedLayer:o};case F:return{...e,focusedLayer:void 0};case M:return{...e,showSidebar:!0};case P:return{...e,showSidebar:!1};case R:return{...e,showSidebar:!e.showSidebar}}};const{width:H}=B(),J={showSidebar:H>600,focusedLayer:"class1"},W=Object(i.createContext)(J),D=({children:e})=>{const[t,o]=Object(i.useReducer)(z,J);return Object(L.jsx)(W.Provider,{value:[t,o],children:e})},Z=()=>Object(i.useContext)(W);const q=e=>({type:q,value:e});var G=(e,{type:t,value:o})=>{switch(t){case q:return{...e,[o]:!e[o]}}};const V={ClassI:!0,ClassII:!0,ClassIII:!0,Trail:!0,rental:!0,"bike-shops":!0,"tool-station":!0,Official:!1,Alternative:!1},Y=Object(i.createContext)(V),U=({children:e})=>{const[t,o]=Object(i.useReducer)(G,V);return Object(L.jsx)(Y.Provider,{value:[t,o],children:e})},X=()=>Object(i.useContext)(Y);var Q=o(11),K=o.n(Q);const $=e=>e?document.documentElement.style.setProperty("--tooltip-offset","".concat(e,"px")):document.documentElement.style.removeProperty("--tooltip-offset");var ee=({text:e,direction:t,children:o})=>{const r=Object(i.useRef)();return Object(L.jsxs)("span",{className:"".concat(K.a["tooltip-wrapper"]," ").concat(K.a["tooltip-"+t]),onMouseEnter:()=>{if(!r.current)return;const e=r.current.getBoundingClientRect(),t=Math.floor(Math.min(0,window.innerWidth-e.right));$(t)},onMouseLeave:()=>$(0),children:[o,Object(L.jsx)("div",{className:K.a["tooltip-text"],ref:r,children:e})]})},te=o(7),oe=o.n(te);var ie=({layerId:e,details:{name:t,description:o},type:r="icon"})=>{const[,a]=Z(),[s,c]=X(),n=()=>a(E(e)),l=()=>a(F(e)),u=Object(i.useMemo)((()=>{if("icon"!==r)return;const{icon:t,color:o}=I.details[e];return Object(L.jsx)(d.a,{icon:t,color:o})}),[r]);return Object(L.jsxs)("div",{className:oe.a["layer-toggle"],children:[Object(L.jsxs)("span",{onClick:()=>c(q(e)),onMouseEnter:n,onMouseLeave:l,onTouchEnd:l,onTouchStart:n,onTouchCancel:l,children:[Object(L.jsx)("div",{className:oe.a["layer-checkbox"],children:Object(L.jsx)("input",{type:"checkbox",className:"".concat(oe.a[r]," ").concat(oe.a[e]),defaultChecked:s[e]})}),Object(L.jsxs)("label",{htmlFor:oe.a[e],children:[u&&Object(L.jsxs)("span",{children:[u," - "]})," ",t]})]}),o&&Object(L.jsx)(ee,{text:o,direction:"top",children:Object(L.jsx)(d.a,{icon:"info-circle",style:{color:"white"}})})]})},re=o(14),ae=o.n(re);var se=({header:e,children:t})=>Object(L.jsxs)(L.Fragment,{children:[e&&Object(L.jsx)("h3",{className:ae.a["layer-group-header"],children:e}),t]}),ce=o(8),ne=o.n(ce);var le=({show:e})=>{const t=[{details:w.details,header:"Existing Bike Routes",toggleType:"line"},{details:I.details},{details:C.details,header:"Connector Routes",toggleType:"line"},{details:N.details,header:"Pacific Coast Bike Route",toggleType:"line"}];return Object(L.jsx)(L.Fragment,{children:Object(L.jsxs)("div",{className:ne.a.sidebar+(e?"":" ".concat(ne.a.hidden)),children:[Object(L.jsx)("div",{className:ne.a.logo,children:Object(L.jsx)("img",{src:S,alt:"HCAGO Logo"})}),Object(L.jsxs)("div",{className:ne.a.summary,children:[Object(L.jsx)("p",{children:"Humboldt County offers incredible biking opportunities for visitors and residents alike. Find a new way to commute to work, explore the countryside, take an adventurous mountain bike ride, and more!"}),Object(L.jsxs)("p",{children:["To learn more about Humboldt County Bike Routes click",Object(L.jsx)("a",{target:"_blank",href:"https://www.hcaog.net/documents/humboldt-regional-bicycle-plan-2018",rel:"noreferrer",children:" here"}),"."]})]}),t.map((({header:e,details:t,toggleType:o},i)=>Object(L.jsx)(se,{header:e,children:Object.entries(t).map((([e,t])=>Object(L.jsx)(ie,{layerId:e,details:t,type:o},e)))},null!==e&&void 0!==e?e:i))),Object(L.jsxs)("div",{className:ne.a.summary,children:[Object(L.jsx)("h4",{children:"Public Transit Routes"}),Object(L.jsxs)("p",{children:["Note that most busses are equipped with bike racks. Plan your connection ",Object(L.jsx)("a",{href:"https://hta.org/",target:"_blank",rel:"noreferrer",children:"here"}),"."]})]})]})})};const de={symbol:1.5*m,line:2*j},ue=(e,t,o,r)=>{const a=Object(i.useMemo)((()=>e.filter((e=>t[e.id]))),[e,t]),s=Object(i.useMemo)((()=>a.map(((e,t)=>[t,e])).sort((([e,t],[i,r])=>t.id==o?-1:r.id==o?1:e-i)).map((([,e])=>e))),[a,o]);return Array.from(Object(i.useMemo)((()=>s.map(((e,t,o)=>{var i,a;return{...e,before:null!==(i=null===(a=o[t-1])||void 0===a?void 0:a.id)&&void 0!==i?i:r}}))),[s,r]))};o(28);var pe=992;const be=Object(i.createContext)(B());var ye=({children:e})=>{const[t,o]=Object(i.useState)(B());return Object(i.useEffect)((()=>{const e=()=>{o(B())};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[t]),Object(L.jsx)(be.Provider,{value:t,children:e})},he=o(15),me=o.n(he);var je=()=>{const[{showSidebar:e},t]=Z(),{width:o}=Object(i.useContext)(be),r=Object(i.useContext)(l.d),a=o<=pe;return Object(i.useEffect)((()=>{a||e||t(R())}),[a]),Object(i.useEffect)((()=>r.resize()),[e]),a?Object(L.jsx)("div",{className:me.a["sidebar-toggle"],children:Object(L.jsx)("div",{className:"mapboxgl-ctrl mapboxgl-ctrl-group",children:Object(L.jsx)("button",{className:"mapboxgl-ctrl-geolocate",onClick:()=>t(R()),children:Object(L.jsx)(d.a,{icon:"chevron-".concat(e?"right":"left")})})})}):Object(L.jsx)(L.Fragment,{})};const fe="mapbox://styles/hcaog/ckr3qf0ot95xh17linukv86ts";var ge=()=>{var e;const[t]=Z(),[o]=X(),[r,a]=Object(i.useState)(),[s,c]=Object(i.useState)(b),[n,d]=Object(i.useState)(),u=()=>d((()=>null)),p=e=>Object(i.useCallback)((({features:t,lngLat:o})=>{d((()=>{var i;return{type:e,...o,info:null===(i=t[0])||void 0===i?void 0:i.properties}}))}),[e]),y=p("route"),h=p("connector"),m=p("icon"),j=p("pcb"),g=()=>a(null),x=()=>a("pointer"),O=[{...w.source,layers:ue(w.layers,o,t.focusedLayer,null===(e=I.layers.slice(-1)[0])||void 0===e?void 0:e.id),onLayerClick:y},{...C.source,layers:ue(C.layers,o,t.focusedLayer),onLayerClick:h},{...N.source,layers:ue(N.layers,o,t.focusedLayer),onLayerClick:j},{...I.source,layers:ue(I.layers,o,t.focusedLayer),onLayerClick:m}];return Object(i.useEffect)(u,[o]),Object(L.jsxs)("div",{className:"container",children:[Object(L.jsxs)(l.h,{accessToken:"pk.eyJ1IjoiaGNhb2ciLCJhIjoiY2t0YTg3aTZxMWpocTJ1bzBlZjRlZ3JibiJ9.a9XIeW1dclDUiW_bDH-7_A",mapStyle:fe,onClick:u,onViewportChange:c,cursorStyle:r,attributionControl:!1,...s,children:[O.map((({layers:e,onLayerClick:o,...r})=>{const a=e.map((e=>t.focusedLayer===e.id?(e=>{switch(e.type){case"symbol":return{...e,layout:{...e.layout,"icon-size":de.symbol}};case"line":return{...e,paint:{...e.paint,"line-width":f(de.line)}}}})(e):e)).map((e=>Object(L.jsx)(l.c,{...e,onClick:o,onHover:x,onLeave:g},e.id)));return a.length?Object(i.createElement)(l.g,{...r,key:r.id},a):null})).filter((e=>e)),n&&Object(L.jsx)(l.f,{latitude:n.lat,longitude:n.lng,closeButton:!1,closeOnClick:!1,className:"selectedFeaturePopup",onClose:u,children:Object(L.jsx)(A,{...n})}),Object(L.jsx)(l.e,{showZoom:!0,position:"top-right"}),Object(L.jsx)(l.b,{}),Object(L.jsx)(l.a,{position:"bottom-right",customAttribution:"HCAOG",compact:!0}),Object(L.jsx)(je,{})]}),Object(L.jsx)(le,{show:t.showSidebar})]})};var xe=e=>{e&&e instanceof Function&&o.e(3).then(o.bind(null,31)).then((({getCLS:t,getFID:o,getFCP:i,getLCP:r,getTTFB:a})=>{t(e),o(e),i(e),r(e),a(e)}))};o(29);c.b.add(n.f,n.e,n.c,n.b,n.d,n.a,n.g),s.a.render(Object(L.jsx)(r.a.StrictMode,{children:Object(L.jsx)(D,{children:Object(L.jsx)(ye,{children:Object(L.jsx)(U,{children:Object(L.jsx)(ge,{})})})})}),document.getElementById("root")),xe()}],[[30,1,2]]]);
//# sourceMappingURL=main.821af179.chunk.js.map