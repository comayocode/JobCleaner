# CleanJob — Extensión para limpiar resultados en CompuTrabajo

**CleanJob** es una extensión de navegador (para Google Chrome y navegadores basados en Chromium) que te permite **ocultar ofertas de empleo de empresas específicas** en [CompuTrabajo.com.co](https://www.computrabajo.com.co).

Su objetivo es ofrecer una experiencia más limpia y personalizada durante la búsqueda de empleo, eliminando resultados de empresas que el usuario decida no ver.

---

## Características principales

- **Filtra resultados** de ofertas laborales en CompuTrabajo según el nombre de la empresa.
- **Configuración flexible** desde el popup de la extensión.
- Guarda tus preferencias localmente (nombres de empresas bloqueadas, estado de activación).
- **Diseño minimalista y moderno**, con colores neutros (blanco y negro).
- **Transparente y seguro** — sin recopilación de datos, sin conexiones externas, sin rastreadores.

---

## ¿Cómo funciona?

Una vez habilitada, CleanJob analiza los resultados de búsqueda en CompuTrabajo y **elimina automáticamente las ofertas publicadas por las empresas que hayas añadido a tu lista de bloqueadas**.

Puedes gestionar esta lista directamente desde el panel de la extensión.

---

## Instalación manual (modo desarrollador)

1. Descarga o clona este repositorio:

   ```bash
   git clone [por definir]
   ```

2. Abre Google Chrome y entra en:

   ```bash
   chrome://extensions/
   ```

3. Activa el Modo Desarrollador (esquina superior derecha).

4. Haz clic en "Cargar descomprimida" y selecciona la carpeta del proyecto (cleanjob).

5. ¡Listo! Verás el ícono de CleanJob en tu barra de extensiones.

## Estructura del proyecto

_**TODO**: Completar árbol_

```bash
cleanjob/
│
└──
```

## Privacidad y transparencia

CleanJob:

- No recopila información del usuario.
- No envía datos a servidores externos.
- Solo modifica el contenido local de la página de CompuTrabajo en tu navegador.

Todo el código es 100% abierto para auditoría y revisión pública.

## Permisos del `manifest.json`

| Permiso                           | Motivo                                                 |
| --------------------------------- | ------------------------------------------------------ |
| `"activeTab"`                     | Permite actuar sobre la pestaña actual de CompuTrabajo |
| `"storage"`                       | Guarda la configuración local del usuario              |
| `"https://co.computrabajo.com/*"` | Limita la extensión a ese dominio                      |

> **Nota:** la extensión **solo se ejecuta en CompuTrabajo**, nunca en otros sitios web.

## Contribuciones

Las contribuciones son bienvenidas.
Si deseas mejorar el diseño, optimizar el código o agregar nuevas funciones:

1. Haz un fork del proyecto.

2. Crea una nueva rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Envía tu pull request con una descripción clara de los cambios.

## Licencia

Este proyecto está bajo la licencia MIT, lo que significa que puedes usarlo, modificarlo y distribuirlo libremente, siempre que mantengas el crédito al autor original.

## Contacto

- Proyecto desarrollado por comayocode
- Contacto: [por definir]
- GitHub: [por definir]

> Buscar trabajo no debería significar perder tiempo con empresas que no te interesan.
