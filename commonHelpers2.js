import"./assets/modulepreload-polyfill-ec808ebb.js";import{i}from"./assets/vendor-651d7991.js";const o=document.querySelector(".form");o.addEventListener("submit",m);function m(s){s.preventDefault();const t=o.delay.value,r=o.state.value;new Promise((e,n)=>{r==="fulfilled"?setTimeout(()=>{e(t)},t):r==="rejected"&&setTimeout(()=>{n(t)},t)}).then(e=>{i.show({message:`✅ Fulfilled promise in ${e}ms`,position:"topCenter",color:"green"})}).catch(e=>{i.show({message:`❌ Rejected promise in ${e}ms`,position:"topCenter",color:"red"})}),s.currentTarget.reset()}
//# sourceMappingURL=commonHelpers2.js.map
