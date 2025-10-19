// Cargar estado inicial
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['enabled', 'empresasBloqueadas'], (data) => {
    document.getElementById('toggleExtension').checked = data.enabled ?? true;
    document.getElementById('empresasInput').value = data.empresasBloqueadas?.join(', ') || '';
  });
});

// Guardar configuración
document.getElementById('guardarBtn').addEventListener('click', () => {
  const enabled = document.getElementById('toggleExtension').checked;
  const empresasTexto = document.getElementById('empresasInput').value;
  const empresas = empresasTexto.split(',').map(e => e.trim()).filter(Boolean);

  chrome.storage.sync.set({ enabled, empresasBloqueadas: empresas }, () => {
    alert('✅ Configuración guardada');
  });
});
