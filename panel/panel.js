if (!document.getElementById('jobCleanerPanel')) {

  // Crear contenedor principal
  const panel = document.createElement('div');
  panel.id = 'jobCleanerPanel';
  Object.assign(panel.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    width: '320px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 18px rgba(0,0,0,0.15)',
    border: '5px solid rgba(54, 54, 54, 0.37)',
    zIndex: '9999',
    padding: '16px',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxSizing: 'border-box'
  });

  panel.innerHTML = `
    <h1 style="margin:0 0 12px 0; font-size:17px; font-weight:700;">JobCleaner</h1>
    <div style="display:flex; align-items:center; margin-bottom:12px; justify-content:space-between;">
      <span>Habilitar limpieza de ofertas</span>
      <label class="toggle">
        <input type="checkbox" id="toggleExtension">
        <span class="slider"></span>
      </label>
    </div>

    <label style="display:block; margin-bottom:12px;">
      Empresas bloqueadas:
      <textarea id="empresasInput" placeholder="Pon el nombre exacto de las empresas separadas por comas ','"></textarea>
    </label>
    <button id="guardarBtn" style="width:100%; padding:10px; background:#101010; color:white; border:none; border-radius:10px; cursor:pointer;">Guardar configuración</button>
    <button id="cerrarPanel" style="width:100%; padding:8px; margin-top:8px; background:#ccc; border:none; border-radius:10px; cursor:pointer;">Cerrar</button>
  `;

  const style = document.createElement('style');
  style.textContent = `
  .toggle {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 21px;
    margin-left: 10px;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    height: 21px; /* mismo que .toggle */
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #000; /* negro cuando está activo */
  }

  input:checked + .slider:before {
    transform: translateX(17px);
  }

  /* Text area */
  #empresasInput {
    width: 100%;
    min-height: 72px;
    max-height: 110px;
    resize: none;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 8px;
    padding: 8px;
    background: #fafafa;
    box-sizing: border-box;
    font-size: 13px;
    color: #111;
    overflow-y: auto; /* mostrar scroll cuando exceda el max-height */
  }

    /* Scroll para textarea */
    #empresasInput::-webkit-scrollbar {
    width: 6px;
  }

  #empresasInput::-webkit-scrollbar-track {
    border-radius: 3px;
  }

  #empresasInput::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  #empresasInput::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
  panel.appendChild(style);


  document.body.appendChild(panel);

  // Cargar configuración
  chrome.storage.sync.get(['enabled', 'empresasBloqueadas'], (data) => {
    document.getElementById('toggleExtension').checked = data.enabled ?? true;
    document.getElementById('empresasInput').value = data.empresasBloqueadas?.join(', ') || '';
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

  // Cerrar panel
  document.getElementById('cerrarPanel').addEventListener('click', () => {
    panel.remove();
  });

  // Ajuste dinámico de altura del textarea
  const textarea = document.getElementById('empresasInput');
  textarea.addEventListener('input', () => adjustTextareaHeight(textarea));

  function adjustTextareaHeight(el) {
    el.style.height = 'auto';
    const newHeight = Math.min(el.scrollHeight, 110);
    el.style.height = newHeight + 'px';
  }
}