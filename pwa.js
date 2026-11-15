'use strict';
let installPrompt=null;const installButton=document.getElementById('installApp'),offlineStatus=document.getElementById('offlineStatus');
function updateNetwork(){let offline=!navigator.onLine;offlineStatus.hidden=!offline;document.body.classList.toggle('offline',offline)}
window.addEventListener('online',updateNetwork);window.addEventListener('offline',updateNetwork);updateNetwork();
const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;if(!standalone())installButton.hidden=false});
installButton.addEventListener('click',async()=>{if(installPrompt){let p=installPrompt;installPrompt=null;await p.prompt();await p.userChoice;installButton.hidden=true}else if(/iPad|iPhone|iPod/.test(navigator.userAgent))alert('請在 Safari 點選「分享」，再選擇「加入主畫面」。')});
window.addEventListener('appinstalled',()=>{installPrompt=null;installButton.hidden=true});if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!standalone())installButton.hidden=false;
if('serviceWorker'in navigator&&window.isSecureContext)window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').catch(()=>{offlineStatus.textContent='離線功能目前無法啟用，線上瀏覽仍可使用。';offlineStatus.hidden=false})});
