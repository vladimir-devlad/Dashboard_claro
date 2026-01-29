# PowerBI Dashboard

Dashboard web para centralizar y visualizar reportes de Power BI de forma clara y organizada.

---

## 📦 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión LTS recomendada)
- **npm** (se instala junto con Node)

Puedes verificarlo con:

```bash
node -v
npm -v
```

---

## 🚀 Instalación y configuración

Sigue estos pasos después de clonar el repositorio:

### 1️⃣ Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd powerbi-dashboard
```

---

### 2️⃣ Instalar dependencias

```bash
npm install
```

Esto instalará **Sass** como dependencia de desarrollo.

---

### 3️⃣ Estructura esperada del proyecto

Asegúrate de tener esta estructura mínima:

```
powerbi-dashboard/
├── scss/
│   └── main.scss
├── css/
│   └── style.css   (se genera automáticamente)
├── index.html
├── package.json
```

> ⚠️ **No edites directamente el CSS**, siempre trabaja sobre los archivos `.scss`.

---

### 4️⃣ Ejecutar Sass (modo desarrollo)

```bash
npm run sass
```

Este comando:

- Compila SCSS a CSS
- Se queda observando cambios (`watch`)
- Actualiza automáticamente los estilos

---

## 🎨 Desarrollo de estilos

- Todos los estilos se escriben en la carpeta `scss/`
- `main.scss` es el archivo principal
- Los parciales se organizan por carpetas:

```
scss/
├── base/
├── layout/
├── components/
├── utilities/
└── main.scss
```

---

## 🌐 Uso en HTML

El HTML **siempre debe importar el CSS compilado**:

```html
<link rel="stylesheet" href="css/style.css" />
```

❌ Nunca importes archivos `.scss` directamente en el HTML.

---

## 🧠 Buenas prácticas

- Usar convención **BEM** para clases
- No fijar anchos globales (usar `max-width`)
- El layout se controla con **Grid y Flexbox**
- Las cards se adaptan mediante CSS Grid

Setup completo. Ya puedes empezar a desarrollar.
