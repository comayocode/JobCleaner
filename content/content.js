let empresasBloqueadas = [];
let extensionActiva = true;

// Cargar configuración desde almacenamiento
function cargarConfiguracion(callback) {
  chrome.storage.sync.get(['enabled', 'empresasBloqueadas'], (data) => {
    extensionActiva = data.enabled ?? true;
    empresasBloqueadas = data.empresasBloqueadas || [];
    if (callback) callback();
  });
}

// Observar cambios en las ofertas
function iniciarObservador() {
  const container = document.querySelector('#offersGridOfferContainer');
  if (!container) return;

  if (extensionActiva) limpiarOfertas(empresasBloqueadas);

  const observer = new MutationObserver(() => {
    if (extensionActiva) limpiarOfertas(empresasBloqueadas);
  });

  observer.observe(container, { childList: true, subtree: true });
}

// Inicialización principal
const interval = setInterval(() => {
  const container = document.querySelector('#offersGridOfferContainer');
  if (container) {
    clearInterval(interval);
    cargarConfiguracion(iniciarObservador);
  }
}, 1000);
