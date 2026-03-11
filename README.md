# 💻 Portfolio Personal Moderno

Este repositorio contiene el código fuente de mi portfolio profesional. Es una Single Page Application (SPA) diseñada con un enfoque en el rendimiento, la interactividad visual y la optimización UX/UI.

---

## 🚀 Tecnologías Utilizadas

* **Frontend:** HTML5 semántico, CSS3 (Custom Properties y Grid/Flexbox) y JavaScript Vanilla (ES6+).
* **Interactividad:** * Fondo dinámico interactivo renderizado mediante **HTML5 Canvas**.
    * Animaciones de entrada activadas por scroll (Scroll Reveal logic).
* **Integraciones:**
    * **EmailJS:** Gestión de envío de formularios sin necesidad de un backend propio.
    * **Google reCAPTCHA v2:** Sistema de seguridad implementado para la prevención de spam en el contacto.
* **Tipografía:** Google Fonts (**Syne** para titulares y **DM Sans** para cuerpo de texto).
* **Iconografía:** Font Awesome 6.0.

---

## 🛠️ Características Técnicas

* **Responsive Design:** Adaptabilidad total a dispositivos móviles, tablets y escritorio mediante Media Queries.
* **Efectos Visuales:** Sistema de partículas en el fondo para una experiencia inmersiva sin sacrificar rendimiento.
* **Formulario Validado:** Validación de campos en tiempo real y feedback visual tras el envío mediante la API de EmailJS.
* **Arquitectura de Archivos:**
    * `/img`: Activos visuales y favicon circular personalizado.
    * `/js`: Lógica del portfolio y configuración de EmailJS.
    * `/style`: Hojas de estilo modulares.

---

## 📦 Instalación y Despliegue Local

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/tu-usuario/nombre-repo.git](https://github.com/tu-usuario/nombre-repo.git)
    ```
2.  Abre el archivo `index.html` en tu navegador.
3.  **Nota:** Para que el formulario funcione en local, asegúrate de configurar tus propias claves de EmailJS y reCAPTCHA en `js/portfolio.js` y el dashboard de Google.

---

## 🌐 Despliegue

El proyecto está configurado para ser desplegado automáticamente a través de **GitHub Pages**.

---
