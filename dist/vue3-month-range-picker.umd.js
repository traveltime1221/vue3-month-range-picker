!function(){"use strict";try{if("undefined"!=typeof document){var d=document.createElement("style");d.appendChild(document.createTextNode(".month-range-picker[data-v-71d16e4a]{position:relative}.month-range-picker .input-field input[data-v-71d16e4a]{padding:8px;border:1px solid #ddd;border-radius:5px;cursor:pointer;width:100%;background:#fff;text-align:left}.months-panel[data-v-71d16e4a]{max-width:250px;display:flex;flex-wrap:wrap;margin-top:5px;border:1px solid #ddd;padding:12px;border-radius:5px;position:absolute;background:#fff;z-index:10;box-shadow:0 2px 5px #0003;color:#000}.month[data-v-71d16e4a]{width:calc(33.3333333333% - 20px);text-align:center;padding:4px 10px;margin:0;cursor:pointer;border:0}.month.start-month[data-v-71d16e4a]{background-color:#007bff;color:#fff;border-top-left-radius:4px;border-bottom-left-radius:4px}.month.end-month[data-v-71d16e4a]{background-color:#007bff;color:#fff;border-top-right-radius:4px;border-bottom-right-radius:4px}.month.in-range[data-v-71d16e4a],.month.hover-range[data-v-71d16e4a]{background-color:#e0efff}.month[data-v-71d16e4a]:hover{background-color:#007bff;color:#fff;border-radius:4px}")),document.head.appendChild(d)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}}();
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("vue")):"function"==typeof define&&define.amd?define(["vue"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).vue3MonthRangePicker=t(e.Vue)}(this,(function(e){"use strict";const t={class:"input-field"},n=["placeholder"],o={class:"months-panel"},a=["onClick","onMouseover"];return((e,t)=>{const n=e.__vccOpts||e;for(const[o,a]of t)n[o]=a;return n})(e.defineComponent({__name:"MonthRangePicker",props:{placeholder:{type:String,default:""},startMonth:{type:String,default:""},endMonth:{type:String,default:""},monthFormat:{type:Array,default:()=>["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},emits:["update:startMonth","update:endMonth"],setup(d,{emit:i}){const l=i,r=d;let u=e.ref(!1),s=e.ref(!1),c=e.ref(!1),m=e.ref(null),h=e.ref(""),p=e.ref([{id:"01",name:"01"},{id:"02",name:"02"},{id:"03",name:"03"},{id:"04",name:"04"},{id:"05",name:"05"},{id:"06",name:"06"},{id:"07",name:"07"},{id:"08",name:"08"},{id:"09",name:"09"},{id:"10",name:"10"},{id:"11",name:"11"},{id:"12",name:"12"}]);const v=()=>{const e=p.value.find((e=>e.id===r.startMonth)),t=p.value.find((e=>e.id===r.endMonth));h.value=e&&t?`${e.name} - ${t.name}`:e?e.name:r.placeholder},M=()=>{u.value=!0,s.value=!0,setTimeout((()=>u.value=!1),200),document.addEventListener("click",f)},f=()=>{setTimeout((()=>{u.value||(s.value=!1)}),200)},k=e=>r.startMonth&&r.endMonth&&e>r.startMonth&&e<r.endMonth,g=e=>r.startMonth&&!r.endMonth&&e>r.startMonth&&e<=m.value,y=()=>{s.value=!1,E()},E=()=>{document.removeEventListener("click",f)},B=()=>{c.value=!1,m.value=null};e.watch((()=>r.monthFormat),(()=>{p.value=p.value.map(((e,t)=>({...e,name:String(r.monthFormat[t]||e.name)})))}),{immediate:!0});const{startMonth:C,endMonth:S}=e.toRefs(r);return e.watch([C,S],(([e,t],[n,o])=>v())),e.onMounted((()=>v())),e.onBeforeUnmount((()=>{document.removeEventListener("click",f)})),(i,s)=>(e.openBlock(),e.createElementBlock("div",{class:"month-range-picker",onClick:s[1]||(s[1]=e.withModifiers((()=>{}),["stop"]))},[e.createElementVNode("div",t,[e.withDirectives(e.createElementVNode("input",{type:"button","onUpdate:modelValue":s[0]||(s[0]=t=>e.isRef(h)?h.value=t:h=t),placeholder:d.placeholder,onClick:M,onBlur:f},null,40,n),[[e.vModelText,e.unref(h)]])]),e.createElementVNode("div",o,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(p),(t=>(e.openBlock(),e.createElementBlock("div",{key:t.id,class:e.normalizeClass(["month",{"start-month":t.id===r.startMonth,"end-month":t.id===r.endMonth,"in-range":k(t.id),"hover-range":e.unref(c)&&g(t.id)}]),onClick:e=>(e=>{u.value=!0,setTimeout((()=>u.value=!1),200),!r.startMonth||r.startMonth&&r.endMonth?(l("update:startMonth",e.id),l("update:endMonth",void 0)):r.endMonth||(e.id>=r.startMonth?l("update:endMonth",e.id):(l("update:startMonth",e.id),l("update:endMonth",r.startMonth)),y())})(t),onMouseover:e=>(e=>{c.value=!0,m.value=e})(t.id),onMouseleave:B},e.toDisplayString(t.name),43,a)))),128))])]))}}),[["__scopeId","data-v-71d16e4a"]])}));