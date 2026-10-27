# PetCare (React + Vite + Firebase)

## Configuración de Firebase

La configuración de Firebase ya **no** está escrita directamente en el código: se lee desde un archivo `.env` que no se sube a GitHub. Para que el login/registro funcione hay dos partes:

### Parte 1 — Obtener la configuración nueva (solo quien tiene acceso al proyecto en Firebase)

1. Abre https://console.firebase.google.com en el navegador.
2. Inicia sesión con la cuenta de Google que es dueña del proyecto **petcare-85310**.
3. En la página principal verás tarjetas con los proyectos. Haz clic en la que dice **petcare-85310** (o PetCare).
   - ⚠️ Si el proyecto **no aparece** en la lista, fue borrado. Avisa en el grupo: hay que crear uno nuevo (ver "Si el proyecto ya no existe" más abajo).
4. En el menú de la izquierda, arriba del todo, junto a "Descripción general del proyecto", haz clic en el **engranaje ⚙️** y luego en **Configuración del proyecto**.
5. Quédate en la pestaña **General** y baja hasta la sección **Tus apps**.
6. Haz clic en la app web (el ícono **`</>`**).
7. En "SDK de Firebase" / "Configuración y SDK" marca la opción **Config**. Verás un bloque como este:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "petcare-85310.firebaseapp.com",
     ...
   };
   ```
8. Copia **todos** esos valores (sobre todo el `apiKey`, que es el que cambió) y pásalos a quien va a correr el proyecto.
9. De paso, en el menú de la izquierda haz clic en **Compilación > Authentication**, luego en la pestaña **Sign-in method**, y verifica que **Correo electrónico/contraseña** diga "Habilitado". Si no, haz clic encima, activa el interruptor y guarda.

### Parte 2 — Configurar el proyecto en tu computador

1. Abre la carpeta del proyecto en VS Code (**Archivo > Abrir carpeta**, elige la carpeta que clonaste).
2. Abre una terminal dentro de VS Code: menú **Terminal > Nueva terminal**.
3. Trae los cambios más recientes escribiendo esto y presionando Enter:
   ```
   git checkout main
   git pull
   ```
4. En el explorador de archivos de VS Code (panel izquierdo), entra a la carpeta `vitejs-vite-fetborrm[2]` y busca el archivo **`.env.example`**.
5. Haz clic derecho sobre `.env.example` > **Copiar**, luego clic derecho en la misma carpeta > **Pegar**. Renombra la copia a exactamente **`.env`** (clic derecho > Cambiar nombre; borra todo y escribe `.env`, con el punto al inicio y sin `.example`).
6. Abre el archivo `.env` y pega el valor nuevo del `apiKey` después de `VITE_FIREBASE_API_KEY=`, sin comillas y sin espacios. Ejemplo:
   ```
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
   Compara también los demás valores con los que te pasaron y corrígelos si cambiaron.
7. En la terminal, entra a la carpeta del proyecto e instala las dependencias:
   ```
   cd "vitejs-vite-fetborrm[2]"
   npm install
   ```
8. Arranca la app:
   ```
   npm run dev
   ```
9. Abre en el navegador la dirección que aparece en la terminal (normalmente http://localhost:5173) y prueba el login/registro.
10. ⚠️ Si el servidor ya estaba corriendo cuando editaste el `.env`, detenlo con **Ctrl+C** en la terminal y vuelve a ejecutar `npm run dev` — Vite solo lee el `.env` al arrancar.

### Si el proyecto ya no existe

Crea uno nuevo en la consola de Firebase (botón **Agregar proyecto**), agrégale una app web (ícono `</>` en la página principal del proyecto), habilita **Authentication > Correo electrónico/contraseña** y crea la base de datos en **Firestore Database > Crear base de datos** (modo de prueba para la clase). Luego usa los valores de esa app nueva en el `.env` (todos, no solo el `apiKey`).

> Nota: la API key fue probada directamente contra `identitytoolkit.googleapis.com` el 2026-10-27 y Google respondió `400 API_KEY_INVALID`, es decir, la key que estaba en el repositorio ya no existe (fue eliminada/regenerada o el proyecto fue borrado). No es un error de correo/contraseña.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
