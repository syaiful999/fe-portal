/*
@license

dhtmlxGantt v.6.1.6 Professional
This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.

*/
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var a in n)("object"==typeof exports?exports:e)[a]=n[a]}}(window,function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/codebase/",n(n.s=211)}({211:function(e,t){!function(){gantt.ext||(gantt.ext={}),gantt.ext.overlay={};var e={};function t(){if(gantt.$task_data){gantt.event(gantt.$task_data,"scroll",function(e){gantt.ext.$overlay_area&&(gantt.ext.$overlay_area.style.top=e.target.scrollTop+"px")});var e=document.createElement("div");e.className="gantt_overlay_area",gantt.$task_data.appendChild(e),gantt.ext.$overlay_area=e,n()}}function n(){for(var t in e){var n=e[t];n.isAttached||a(n)}}function a(e){gantt.ext.$overlay_area.appendChild(e.node),e.isAttached=!0}function r(){gantt.ext.$overlay_area.style.display="block"}function o(){var t=!1;for(var n in e){if(e[n].isVisible){t=!0;break}}t||(gantt.ext.$overlay_area.style.display="none")}gantt.config.show_overlays=!0,gantt.attachEvent("onBeforeGanttRender",function(){gantt.ext.$overlay_area||t(),n(),o()}),gantt.attachEvent("onGanttReady",function(){t(),n(),o()}),gantt.ext.overlay.addOverlay=function(t,n){n=n||gantt.uid();return e[n]=function(e,t){var n=document.createElement("div");return n.setAttribute("data-overlay-id",e),n.className="gantt_overlay",n.style.display="none",{id:e,render:t,isVisible:!1,isAttached:!1,node:n}}(n,t),n},gantt.ext.overlay.deleteOverlay=function(t){return!!e[t]&&(delete e[t],o(),!0)},gantt.ext.overlay.getOverlaysIds=function(){var t=[];for(var n in e)t.push(n);return t},gantt.ext.overlay.refreshOverlay=function(t){r(),e[t].isVisible=!0,e[t].node.innerHTML="",e[t].node.style.display="block",e[t].render(e[t].node)},gantt.ext.overlay.showOverlay=function(e){r(),this.refreshOverlay(e)},gantt.ext.overlay.hideOverlay=function(t){e[t].isVisible=!1,e[t].node.style.display="none",o()},gantt.ext.overlay.isOverlayVisible=function(t){return!!t&&e[t].isVisible}}()}})});
//# sourceMappingURL=dhtmlxgantt_overlay.js.map