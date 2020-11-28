/*
@license

dhtmlxGantt v.6.1.5 Professional Evaluation
This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.

*/
Gantt.plugin(function(t){!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var e=n();for(var o in e)("object"==typeof exports?exports:t)[o]=e[o]}}(window,function(){return function(t){var n={};function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(o,i,function(n){return t[n]}.bind(null,i));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/codebase/",e(e.s=213)}({213:function(n,e){t.config.undo_steps=10,t.config.undo=!0,t.config.redo=!0,t.undo=function(){this._undo.undo()},t.getUndoStack=function(){return this._undo._undoStack},t.getRedoStack=function(){return this._undo._redoStack},t.clearUndoStack=function(){this._undo._undoStack=[]},t.clearRedoStack=function(){this._undo._redoStack=[]},t.redo=function(){this._undo.redo()},t.config.undo_types={link:"link",task:"task"},t.config.undo_actions={update:"update",remove:"remove",add:"add",move:"move"},t._undo={_undoStack:[],_redoStack:[],maxSteps:10,undo_enabled:!0,redo_enabled:!0,_push:function(n,e){if(e.commands.length){var o=n===this._undoStack?"onBeforeUndoStack":"onBeforeRedoStack";if(!1!==t.callEvent(o,[e])&&e.commands.length){for(n.push(e);n.length>this.maxSteps;)n.shift();return e}}},_pop:function(t){return t.pop()},_reorderCommands:function(t){var n={any:0,link:1,task:2},e={move:1,any:0};t.commands.sort(function(t,o){if("task"==t.entity&&"task"==o.entity)return t.type!=o.type?(e[o.type]||0)-(e[t.type]||0):"move"==t.type&&t.oldValue&&o.oldValue&&o.oldValue.parent==t.oldValue.parent?t.$index-o.$index:0;var i=n[t.entity]||n.any;return(n[o.entity]||n.any)-i})},undo:function(){if(this.updateConfigs(),this.undo_enabled){var n=this._pop(this._undoStack);if(n&&this._reorderCommands(n),!1!==t.callEvent("onBeforeUndo",[n])&&n)return this._applyAction(this.action.invert(n)),this._push(this._redoStack,t.copy(n)),void t.callEvent("onAfterUndo",[n]);t.callEvent("onAfterUndo",[null])}},redo:function(){if(this.updateConfigs(),this.redo_enabled){var n=this._pop(this._redoStack);if(n&&this._reorderCommands(n),!1!==t.callEvent("onBeforeRedo",[n])&&n)return this._applyAction(n),this._push(this._undoStack,t.copy(n)),void t.callEvent("onAfterRedo",[n]);t.callEvent("onAfterRedo",[null])}},_applyAction:function(n){var e=null,o=this.command.entity,i=this.command.type,a={};a[o.task]={add:"addTask",update:"updateTask",remove:"deleteTask",move:"moveTask",isExists:"isTaskExists"},a[o.link]={add:"addLink",update:"updateLink",remove:"deleteLink",isExists:"isLinkExists"},t.batchUpdate(function(){for(var o=0;o<n.commands.length;o++){e=n.commands[o];var s=a[e.entity][e.type],d=a[e.entity].isExists;e.type==i.add?t[s](e.oldValue,e.oldValue.parent,e.oldValue.$index):e.type==i.remove?t[d](e.value.id)&&t[s](e.value.id):e.type==i.update?t[s](e.value.id,e.value):e.type==i.move&&t[s](e.value.id,e.value.$index,e.value.parent)}})},logAction:function(t){this._push(this._undoStack,t),this._redoStack=[]},action:{create:function(t){return{commands:t?t.slice():[]}},invert:function(n){for(var e=t.copy(n),o=t._undo.command,i=0;i<n.commands.length;i++){var a=e.commands[i]=o.invert(e.commands[i]);if(a.type==o.type.update||a.type==o.type.move){var s=a.value;a.value=a.oldValue,a.oldValue=s}}return e}},command:{create:function(n,e,o,i){return{entity:i,type:o,value:t.copy(n),oldValue:t.copy(e||n)}},invert:function(n){var e=t.copy(n);return e.type=this.inverseCommands(n.type),e},entity:null,type:null,inverseCommands:function(n){switch(n){case this.type.update:return this.type.update;case this.type.remove:return this.type.add;case this.type.add:return this.type.remove;case this.type.load:return this.type.clear;case this.type.clear:return this.type.load;case this.type.move:return this.type.move;default:return t.assert(!1,"Invalid command "+n),null}}},monitor:{_batchAction:null,_batchMode:!1,_ignore:!1,_ignoreMoveEvents:!1,isMoveEventsIgnored:function(){return this._ignoreMoveEvents},toggleIgnoreMoveEvents:function(t){this._ignoreMoveEvents=t||!1},startIgnore:function(){this._ignore=!0},stopIgnore:function(){this._ignore=!1},startBatchAction:function(){this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){t._undo.monitor.stopBatchAction()},10),this._ignore||this._batchMode||(this._batchMode=!0,this._batchAction=t._undo.action.create())},stopBatchAction:function(){if(!this._ignore){var n=t._undo;this._batchAction&&n.logAction(this._batchAction),this._batchMode=!1,this._batchAction=null}},_storeCommand:function(n){var e=t._undo;if(e.updateConfigs(),e.undo_enabled)if(this._batchMode)this._batchAction.commands.push(n);else{var o=e.action.create([n]);e.logAction(o)}},_storeEntityCommand:function(n,e,o,i){var a=t._undo.command.create(n,e,o,i);this._storeCommand(a)},_storeTaskCommand:function(n,e){this._storeEntityCommand(n,this.getInitialTask(n.id),e,t._undo.command.entity.task)},_storeLinkCommand:function(n,e){this._storeEntityCommand(n,this.getInitialLink(n.id),e,t._undo.command.entity.link)},onTaskAdded:function(n){this._ignore||this._storeTaskCommand(n,t._undo.command.type.add)},onTaskUpdated:function(n){this._ignore||this._storeTaskCommand(n,t._undo.command.type.update)},onTaskMoved:function(n){this._ignore||this._storeEntityCommand(n,this.getInitialTask(n.id),t._undo.command.type.move,t._undo.command.entity.task)},onTaskDeleted:function(n){if(!this._ignore){if(this._storeTaskCommand(n,t._undo.command.type.remove),this._nestedTasks[n.id])for(var e=this._nestedTasks[n.id],o=0;o<e.length;o++)this._storeTaskCommand(e[o],t._undo.command.type.remove);if(this._nestedLinks[n.id]){var i=this._nestedLinks[n.id];for(o=0;o<i.length;o++)this._storeLinkCommand(i[o],t._undo.command.type.remove)}}},onLinkAdded:function(n){this._ignore||this._storeLinkCommand(n,t._undo.command.type.add)},onLinkUpdated:function(n){this._ignore||this._storeLinkCommand(n,t._undo.command.type.update)},onLinkDeleted:function(n){this._ignore||this._storeLinkCommand(n,t._undo.command.type.remove)},_initialTasks:{},_nestedTasks:{},_nestedLinks:{},_getLinks:function(t){return t.$source.concat(t.$target)},setNestedTasks:function(n,e){for(var o=null,i=[],a=this._getLinks(t.getTask(n)),s=0;s<e.length;s++)o=this.setInitialTask(e[s]),a=a.concat(this._getLinks(o)),i.push(o);var d={};for(s=0;s<a.length;s++)d[a[s]]=!0;var r=[];for(var s in d)r.push(this.setInitialLink(s));this._nestedTasks[n]=i,this._nestedLinks[n]=r},setInitialTask:function(n,e){if(e||!this._initialTasks[n]||!this._batchMode){var o=t.copy(t.getTask(n));o.$index=t.getTaskIndex(n),this.setInitialTaskObject(n,o)}return this._initialTasks[n]},getInitialTask:function(t){return this._initialTasks[t]},clearInitialTasks:function(){this._initialTasks={}},setInitialTaskObject:function(t,n){this._initialTasks[t]=n},_initialLinks:{},setInitialLink:function(n){return this._initialLinks[n]&&this._batchMode||(this._initialLinks[n]=t.copy(t.getLink(n))),this._initialLinks[n]},getInitialLink:function(t){return this._initialLinks[t]}}},t._undo.updateConfigs=function(){t._undo.maxSteps=t.config.undo_steps,t._undo.command.entity=t.config.undo_types,t._undo.command.type=t.config.undo_actions,t._undo.undo_enabled=!!t.config.undo,t._undo.redo_enabled=!!t.config.undo&&!!t.config.redo},function(){var n=t._undo.monitor,e={onBeforeUndo:"onAfterUndo",onBeforeRedo:"onAfterRedo"};for(var o in e)t.attachEvent(o,function(){return n.startIgnore(),!0}),t.attachEvent(e[o],function(){return n.stopIgnore(),!0});var i=["onTaskDragStart","onAfterTaskUpdate","onAfterTaskDelete","onBeforeBatchUpdate"];for(o=0;o<i.length;o++)t.attachEvent(i[o],function(){return n.startBatchAction(),!0});function a(e){return n.setInitialTask(e),t.eachTask(function(t){n.setInitialTask(t.id)},e),!0}t.attachEvent("onBeforeTaskDrag",a),t.attachEvent("onLightbox",a),t.attachEvent("onBeforeTaskAutoSchedule",function(t){return a(t.id),!0});var s=null;function d(){s||(s=setTimeout(function(){s=null}),n.clearInitialTasks(),t.eachTask(function(t){n.setInitialTask(t.id)}))}t.attachEvent("onBeforeTaskDelete",function(e){a(e);var o=[];return d(),t.eachTask(function(t){o.push(t.id)},e),n.setNestedTasks(e,o),!0}),t.ext.inlineEditors&&t.ext.inlineEditors.attachEvent("onEditStart",function(t){a(t.id)}),t.attachEvent("onAfterTaskAdd",function(t,e){n.setInitialTask(t,!0),n.onTaskAdded(e)}),t.attachEvent("onAfterTaskUpdate",function(t,e){n.onTaskUpdated(e)}),t.attachEvent("onAfterTaskDelete",function(t,e){n.onTaskDeleted(e)}),t.attachEvent("onAfterLinkAdd",function(t,e){n.onLinkAdded(e)}),t.attachEvent("onAfterLinkUpdate",function(t,e){n.onLinkUpdated(e)}),t.attachEvent("onAfterLinkDelete",function(t,e){n.onLinkDeleted(e)});var r=t.getDatastore("task");function u(n){return t.copy(t.getTask(n))}function c(t,n,e){t&&(t.id==n&&(t.id=e),t.parent==n&&(t.parent=e))}function l(t,n,e){c(t.value,n,e),c(t.oldValue,n,e)}function f(t,n,e){t&&(t.source==n&&(t.source=e),t.target==n&&(t.target=e))}function h(t,n,e){f(t.value,n,e),f(t.oldValue,n,e)}function m(n,e,o){for(var i=t._undo,a=0;a<n.length;a++)for(var s=n[a],d=0;d<s.commands.length;d++)s.commands[d].entity==i.command.entity.task?l(s.commands[d],e,o):s.commands[d].entity==i.command.entity.link&&h(s.commands[d],e,o)}function _(n,e,o){for(var i=t._undo,a=0;a<n.length;a++)for(var s=n[a],d=0;d<s.commands.length;d++){var r=s.commands[d];r.entity==i.command.entity.link&&(r.value&&r.value.id==e&&(r.value.id=o),r.oldValue&&r.oldValue.id==e&&(r.oldValue.id=o))}}r.attachEvent("onBeforeItemMove",function(t,e,o){return n.isMoveEventsIgnored()||d(),!0}),r.attachEvent("onAfterItemMove",function(t,e,o){return n.isMoveEventsIgnored()||n.onTaskMoved(u(t)),!0}),t.attachEvent("onRowDragStart",function(t,e,o){return n.toggleIgnoreMoveEvents(!0),d(),!0}),t.attachEvent("onRowDragEnd",function(t,e){return n.onTaskMoved(u(t)),n.toggleIgnoreMoveEvents(),!0}),t.attachEvent("onTaskIdChange",function(n,e){var o=t._undo;m(o._undoStack,n,e),m(o._redoStack,n,e)}),t.attachEvent("onLinkIdChange",function(n,e){var o=t._undo;_(o._undoStack,n,e),_(o._redoStack,n,e)}),t.attachEvent("onGanttReady",function(){t._undo.updateConfigs()})}()}})})});