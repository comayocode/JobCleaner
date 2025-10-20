if (!document.getElementById('jobCleanerPanel')) {

  // --- Crear panel ---
  const panel = document.createElement('div');
  panel.id = 'jobCleanerPanel';
  Object.assign(panel.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    width: '320px',
    background: 'rgba(234, 234, 234, 0.75)',
    backdropFilter: 'blur(8px)',
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

    <label  style="display:block; margin-bottom:12px;">
      <span class="input-title">Empresas bloqueadas: </span>
      <div id="empresasInput" class="badges-container"></div>
    </label>

    <button id="guardarBtn" style="width:100%; padding:10px; background:#101010; color:white; border:none; border-radius:10px; cursor:pointer;">Guardar configuración</button>
    <button id="cerrarPanel" style="width:100%; padding:8px; margin-top:8px; background:#ccc; border:none; border-radius:10px; cursor:pointer;">Cerrar</button>
  `;

  document.body.appendChild(panel);

  // --- Estilos ---
  const style = document.createElement('style');
  style.textContent = `
    .toggle {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 21px;
      margin-left: 10px;
    }

    .toggle input { opacity: 0; width: 0; height: 0; }

    .slider {
      height: 21px;
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

    input:checked + .slider { background-color: #000; }
    input:checked + .slider:before { transform: translateX(17px); }

    .input-title {
      display: inline-block;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .badges-container {
      width: 100%;
      min-height: 72px;
      max-height: 110px;
      padding: 8px;
      border: 1px solid rgba(0,0,0,0.12);
      border-radius: 10px;
      background: #fafafa;
      box-sizing: border-box;
      font-size: 13px;
      color: #111;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 4px;
      cursor: text;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 6px;
      background: #000;
      color: #fff;
      border-radius: 8px;
      font-size: 12px;
      line-height: 18px;
    }

    .badge .close-btn { margin-left: 4px; cursor: pointer; font-weight: bold; }

    .input {
      margin-top: 2px;
    }

    .badges-container::-webkit-scrollbar { width: 6px; }
    .badges-container::-webkit-scrollbar-track { border-radius: 3px; }
    .badges-container::-webkit-scrollbar-thumb { background: #888; border-radius: 3px; }
    .badges-container::-webkit-scrollbar-thumb:hover { background: #555; }
  `;
  panel.appendChild(style);

  // --- Elementos ---
  const container = document.getElementById('empresasInput');

  // --- Crear input interno (donde se escriben las empresas, siempre se ubica adelante del último badge) ---
  const input = document.createElement('span');
  input.className = 'input';
  input.contentEditable = 'true';
  container.appendChild(input);
  input.focus();

  // --- Crear etiquetas ---
  function crearBadge(nombre) {
    const existing = Array.from(container.querySelectorAll('.badge'))
      .some(b => b.firstChild.textContent.trim() === nombre);
    if (existing) return;

    const span = document.createElement('span');
    span.className = 'badge';
    span.contentEditable = 'false';
    span.innerHTML = `${nombre} <span class="close-btn">&times;</span>`;

    span.querySelector('.close-btn').addEventListener('click', () => {
      span.remove();
      colocarCursorFinal();
    });

    container.insertBefore(span, input);
  }

  // --- Permitir escribir al hacer clic en cualquier parte del contenedor ---
  container.addEventListener('click', (e) => {
    // Si se hace clic directamente en el contenedor o en un badge (no en el input)
    if (e.target === container || e.target.classList.contains('badge')) {
      colocarCursorFinal();
    }
  });

  // --- Mantener cursor en input adelante del último badge ---
  function colocarCursorFinal() {
    input.focus();
    const selection = window.getSelection();
    selection.selectAllChildren(input);
    selection.collapseToEnd();
  }

  // --- Cargar configuración ---
  chrome.storage.sync.get(['enabled', 'empresasBloqueadas'], (data) => {
    document.getElementById('toggleExtension').checked = data.enabled ?? true;
    const empresas = data.empresasBloqueadas || [];
    empresas.forEach(nombre => crearBadge(nombre));
  });

  // --- Detectar Enter y coma ---
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const partes = input.textContent.split(',');
      partes.forEach(p => {
        const text = p.trim();
        if (text) crearBadge(text);
      });
      input.textContent = '';
      colocarCursorFinal();
    }
  });

  // --- Guardar configuración ---
  document.getElementById('guardarBtn').addEventListener('click', () => {
    const enabled = document.getElementById('toggleExtension').checked;
    const empresas = Array.from(container.querySelectorAll('.badge'))
      .map(b => b.firstChild.textContent.trim());

    chrome.storage.sync.set({ enabled, empresasBloqueadas: empresas }, () => {
      mostrarAlertaPersonalizada('Refresca la página para ver los cambios', 'success', 'Configuración guardada');
    });
  });


  // --- Cerrar panel ---
  document.getElementById('cerrarPanel').addEventListener('click', () => {
    panel.remove();
  });
}