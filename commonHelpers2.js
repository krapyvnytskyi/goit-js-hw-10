import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as r}from"./assets/vendor-77e16229.js";const c=document.querySelector(".form");c.addEventListener("submit",i=>{i.preventDefault();const m=document.querySelector(".delay-form"),e=parseInt(m.value),o=document.querySelector(".state-form:checked"),s=o?o.value:null;if(!e||!s){r.error({title:"Error",message:"Please select a delay and state."});return}new Promise((t,l)=>{s==="fulfilled"?setTimeout(()=>{t(e)},e):s==="rejected"&&setTimeout(()=>{l(e)},e)}).then(t=>{r.success({title:"Success",message:`✅ Fulfilled promise in ${t}ms`})}).catch(t=>{r.error({title:"Error",message:`❌ Rejected promise in ${t}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
