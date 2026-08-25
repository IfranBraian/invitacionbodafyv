/* ============ CONFIGURACIÓN — editar acá ============ */
const WEDDING_DATE = new Date('2026-11-21T21:00:00-03:00'); // hora Argentina
const WHATSAPP_FEDE = '5493764825302'; // [EDITAR-WHATSAPP] número de Fede
const WHATSAPP_VALE = '5493764803794'; // [EDITAR-WHATSAPP] número de Vale
const MAPS_URL_CEREMONIA = '#'; // [EDITAR-UBICACION] link de Google Maps de la ceremonia
const MAPS_URL_RECEPCION = 'https://www.google.com/maps/place/Complejo+Recreativo+UDPM/@-27.4263693,-55.9011764,17z/data=!4m14!1m7!3m6!1s0x9457beb819c003bf:0xed4b52d52a1455c8!2sComplejo+Recreativo+UDPM!8m2!3d-27.4263693!4d-55.8986015!16s%2Fg%2F11c3tp_nm0!3m5!1s0x9457beb819c003bf:0xed4b52d52a1455c8!8m2!3d-27.4263693!4d-55.8986015!16s%2Fg%2F11c3tp_nm0?hl=es&entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D'; // [EDITAR-UBICACION] link de Google Maps de la recepción

document.getElementById('mapa-link-ceremonia').href = MAPS_URL_CEREMONIA;
document.getElementById('mapa-link-recepcion').href = MAPS_URL_RECEPCION;

// Countdown
function updateCountdown(){
  const now = new Date();
  let diff = WEDDING_DATE - now;
  if (diff < 0) diff = 0;
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById('cd-dias').textContent  = String(d).padStart(2,'0');
  document.getElementById('cd-horas').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-min').textContent   = String(m).padStart(2,'0');
  document.getElementById('cd-seg').textContent   = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// Vine draw-on-scroll
const vinePath = document.getElementById('vine-path');
if(vinePath){
  const len = vinePath.getTotalLength();
  vinePath.style.strokeDasharray = len;
  vinePath.style.strokeDashoffset = len;
  function updateVine(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    vinePath.style.strokeDashoffset = len - (len * progress);
  }
  window.addEventListener('scroll', updateVine, {passive:true});
  updateVine();
}

// RSVP -> WhatsApp
// Evita que el formulario recargue la página si tocan Enter
document.getElementById('rsvp-form').addEventListener('submit', (e)=> e.preventDefault());

function enviarWhatsapp(numero){
  const nombre = document.getElementById('nombre').value.trim();
  if(!nombre){
    alert('Por favor completá tu nombre antes de enviar.');
    return;
  }
  const acompanantes = document.getElementById('acompanantes').value;
  const asistencia = document.getElementById('asistencia').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  let texto = `¡Hola! Soy ${nombre}.%0AConfirmo asistencia a la boda: ${asistencia}.%0ACantidad de personas: ${acompanantes}.`;
  if(mensaje){ texto += `%0AMensaje: ${mensaje}`; }

  window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
}

document.getElementById('enviar-fede').addEventListener('click', ()=> enviarWhatsapp(WHATSAPP_FEDE));
document.getElementById('enviar-vale').addEventListener('click', ()=> enviarWhatsapp(WHATSAPP_VALE));

// Sobre interactivo: abrir/cerrar
const envelopeScene = document.getElementById('envelope-scene');
document.getElementById('seal-btn').addEventListener('click', ()=>{
  envelopeScene.classList.add('opened');
});
document.getElementById('close-envelope').addEventListener('click', ()=>{
  envelopeScene.classList.remove('opened');
});

// Popup de regalos
const regaloModal = document.getElementById('regalo-modal');
document.getElementById('open-regalo-modal').addEventListener('click', ()=>{
  regaloModal.showModal();
});
document.getElementById('close-regalo-modal').addEventListener('click', ()=>{
  regaloModal.close();
});
regaloModal.addEventListener('click', (e)=>{
  if(e.target === regaloModal){ regaloModal.close(); } // cerrar al tocar el fondo
});
