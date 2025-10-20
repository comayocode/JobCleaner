function limpiarOfertas(empresasBloqueadas) {
  const container = document.querySelector('#offersGridOfferContainer');
  if (!container) return;

  const contador = {};
  empresasBloqueadas.forEach(e => contador[e] = 0);

  const ofertas = container.querySelectorAll('article');
  ofertas.forEach(oferta => {
    const empresa = oferta.querySelector('a.fc_base.t_ellipsis')?.textContent?.trim();
    if (empresa && empresasBloqueadas.some(e => empresa.includes(e))) {
      oferta.remove();
      const clave = empresasBloqueadas.find(e => empresa.includes(e));
      contador[clave]++;
    }
  });

  const eliminadas = Object.entries(contador).filter(([_, n]) => n > 0);
  if (eliminadas.length > 0) {
    const mensaje = eliminadas.map(([empresa, n]) => `➜ ${n} ofertas de ${empresa}`).join('\n');
    setTimeout(() => {
      mostrarAlertaPersonalizada(mensaje, 'info', 'Ofertas eliminadas');
    }, 100);
  }
}
