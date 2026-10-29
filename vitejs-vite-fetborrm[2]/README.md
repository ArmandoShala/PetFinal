# PetCare (React + Vite + Firebase)

## Configuración de Firebase

> **Resumen en 3 líneas:** la API key de Firebase que estaba en el código **ya no existe** (Google la rechaza con `API_KEY_INVALID`), por eso el login/registro falla con `auth/api-key-not-valid`. Hace falta una key **nueva**, y **solo la persona dueña del proyecto de Firebase `petcare-85310` puede conseguirla**, desde la consola de Firebase (y, si hace falta, desde Google Cloud). El resto del grupo solo tiene que pegar esa key nueva en un archivo `.env` en su computador. No es un error del código ni de correo/contraseña.

### ¿Quién tiene que hacer qué?

| Si tú eres… | Te toca… | Dónde |
|---|---|---|
| **La persona que creó el proyecto en Firebase** (entras a https://console.firebase.google.com con tu cuenta de Google y ves el proyecto **petcare-85310**) | Conseguir la key nueva y pasársela al grupo → **Parte 1** (más abajo) | Consola de Firebase, y Google Cloud Console si la key sigue muerta |
| **Cualquier otra persona del grupo** | **No puedes generar la key tú.** Pídesela a quien creó el proyecto y luego configura tu `.env` → **Parte 2** (más abajo) | Tu computador (VS Code) |

- **¿No sabes quién creó el proyecto?** Es la persona que recibe en su Gmail los correos de Firebase / Google Cloud sobre `petcare-85310` (por ejemplo uno con asunto parecido a *"Publicly accessible Google API key for Google Cloud Platform project petcare-85310"*). Desde el código no se puede saber: pregúntalo en el grupo.
- **¿Esa persona no está disponible?** Puede darte acceso al proyecto en un minuto para que lo hagas tú: Consola de Firebase > engranaje ⚙️ > **Usuarios y permisos** > **Agregar miembro** > tu correo de Google > rol **Editor** > **Agregar miembro**. Con eso ya puedes hacer la Parte 1 con tu propia cuenta.
- **¿Nadie del grupo tiene acceso al proyecto?** Entonces hay que crear un proyecto nuevo (ver "Si el proyecto ya no existe" al final). Tarda 10 minutos y solo se pierden los datos de prueba.

### Parte 1 — Conseguir la key nueva (solo quien tiene acceso al proyecto en Firebase)

1. Abre https://console.firebase.google.com en el navegador.
2. Inicia sesión con la cuenta de Google que es dueña del proyecto **petcare-85310**.
3. En la página principal verás tarjetas con los proyectos. Haz clic en la que dice **petcare-85310** (o PetCare).
   - ⚠️ Si el proyecto **no aparece** en la lista, o fue borrado o estás con otra cuenta de Google. Prueba con tus otras cuentas; si en ninguna aparece, avisa en el grupo: hay que crear uno nuevo (ver "Si el proyecto ya no existe" más abajo).
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
8. **Mira bien el valor de `apiKey`** y compáralo con la key vieja, que ya no sirve: `AIzaSyCJ9x_Uqln18LnPhGr5czcrmphxSyskNxQ`.
   - Si el `apiKey` es **distinto** → esa es la key nueva. Sigue con el paso 9.
   - Si el `apiKey` es **exactamente la misma** key vieja → la consola te está mostrando una key que ya fue borrada. Hay que restaurarla o crear otra en Google Cloud: ve a la sección **"Crear o restaurar la key en Google Cloud"** más abajo y luego vuelve aquí.
   - Para salir de dudas, pega la key en esta dirección del navegador (cambia `TU_KEY` por la key):
     ```
     https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=TU_KEY
     ```
     Si la página dice `API key not valid` / `API_KEY_INVALID`, la key **no** sirve. Si muestra un texto con `"projectId": "petcare-85310"`, la key **sí** funciona.
9. Copia **todos** los valores del bloque (sobre todo el `apiKey`) y pásaselos al grupo **por mensaje privado** (WhatsApp, Discord, etc.). **No los subas a GitHub**: así se filtró la key anterior y por eso terminó borrada.
10. De paso, en el menú de la izquierda haz clic en **Compilación > Authentication**, luego en la pestaña **Sign-in method**, y verifica que **Correo electrónico/contraseña** diga "Habilitado". Si no, haz clic encima, activa el interruptor y guarda.

### Crear o restaurar la key en Google Cloud (solo si en la Parte 1 la consola seguía mostrando la key vieja)

La API key de Firebase es en realidad una "credencial" del proyecto en Google Cloud. Si alguien la borró (por ejemplo después de que Google avisara que estaba publicada en GitHub), la consola de Firebase no la arregla sola; se hace aquí:

1. Abre https://console.cloud.google.com/apis/credentials?project=petcare-85310 con la **misma cuenta de Google** de la Parte 1. Si pide aceptar los términos de Google Cloud, acéptalos (no cuesta nada).
2. Comprueba que arriba, en el selector de proyecto, esté seleccionado **petcare-85310**.
3. **Opción A — Restaurar la key borrada** (solo funciona hasta **30 días** después de borrarla):
   1. Encima de la lista de credenciales haz clic en **Restaurar credenciales eliminadas** (en inglés: *Restore deleted credentials*). Si ese botón no aparece, no hay nada borrado: pasa a la Opción B.
   2. Busca la key llamada **Browser key (auto created by Firebase)** y haz clic en **Restaurar** / *Restore*.
   3. Espera unos minutos (Google tarda en reactivarla). La key vuelve a ser la misma de antes (`AIzaSyCJ9x_...`), así que esa es la que va en el `.env`.
4. **Opción B — Crear una key nueva** (si la Opción A no se puede, o pasaron más de 30 días):
   1. Haz clic en **+ Crear credenciales** > **Clave de API** (*Create credentials > API key*).
   2. Aparece la key nueva (`AIza...`). **Cópiala** y guárdala: esa es la que va al `.env`.
   3. Según la versión de la consola, verás un botón **Restringir clave** / **Editar clave de API**, o un formulario antes de **Crear**. En cualquier caso: ponle un nombre (p. ej. `Browser key PetCare`) y en **Restricciones de API** deja **No restringir la clave** (lo más simple para la clase). Si prefieres restringirla, elige **Restringir clave** y marca como mínimo **Identity Toolkit API**, **Token Service API**, **Cloud Firestore API** y **Firebase Installations API**; si falta alguna, la app fallará con `API_KEY_SERVICE_BLOCKED` o `403`.
   4. **Guardar**.
5. Vuelve a la consola de Firebase (Parte 1, pasos 4 a 7) y recarga la página: el `apiKey` del bloque Config debería ser ahora la key nueva. Si Firebase sigue mostrando la vieja, no importa: **usa la key que acabas de crear o restaurar**, que es la que vale (cualquier key válida del proyecto sirve).
6. Comprueba la key con la dirección del paso 8 de la Parte 1 y luego sigue con el paso 9 (pásala al grupo).

### Parte 2 — Configurar el proyecto en tu computador

1. Abre la carpeta del proyecto en VS Code (**Archivo > Abrir carpeta**, elige la carpeta que clonaste).
2. Abre una terminal dentro de VS Code: menú **Terminal > Nueva terminal**.
3. Trae los cambios más recientes escribiendo esto y presionando Enter:
   ```
   git checkout main
   git pull
   ```
4. En el explorador de archivos de VS Code (panel izquierdo), entra a la carpeta `vitejs-vite-fetborrm[2]` y busca el archivo **`.env.example`** (está al lado de `package.json`).
5. Haz clic derecho sobre `.env.example` > **Copiar**, luego clic derecho en la misma carpeta > **Pegar**. Renombra la copia a exactamente **`.env`** (clic derecho > Cambiar nombre; borra todo y escribe `.env`, con el punto al inicio y sin `.example`). Tiene que quedar en la **misma carpeta** que `package.json`.
6. Abre el archivo `.env` y pega el valor nuevo del `apiKey` después de `VITE_FIREBASE_API_KEY=`, sin comillas y sin espacios. Ejemplo:
   ```
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
   Compara también los demás valores con los que te pasaron y corrígelos si cambiaron.
   - ⚠️ **No pegues la key vieja** `AIzaSyCJ9x_...` que aparece en el historial de GitHub: esa ya no funciona.
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

### Errores frecuentes

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| `auth/api-key-not-valid` o `API_KEY_INVALID` | La key del `.env` no existe (está muerta o mal pegada) | Parte 1 para conseguir la key nueva; en el `.env` va sin comillas ni espacios; reinicia `npm run dev` |
| `Falta la configuración de Firebase: copia .env.example a .env…` (pantalla en blanco, error en la consola del navegador) | No hay `.env`, está en la carpeta equivocada, o no reiniciaste el servidor | El `.env` va dentro de `vitejs-vite-fetborrm[2]`, al lado de `package.json`. Ctrl+C y `npm run dev` otra vez |
| `API_KEY_SERVICE_BLOCKED` o `403 Forbidden` | La key existe pero está restringida y le falta una API | Google Cloud > Credenciales > editar la key > Restricciones de API (ver "Crear o restaurar la key en Google Cloud") |
| `auth/operation-not-allowed` | El inicio de sesión con correo/contraseña está desactivado en Firebase | Parte 1, paso 10 |
| `auth/invalid-credential`, `auth/wrong-password`, `auth/user-not-found` | La key está bien; el correo o la contraseña están mal, o esa cuenta no existe en este proyecto | Regístrate de nuevo desde la app |

### Si el proyecto ya no existe (o nadie del grupo tiene acceso)

1. Entra a https://console.firebase.google.com y haz clic en **Agregar proyecto** / **Crear un proyecto**. Ponle un nombre (p. ej. `petcare`), desactiva Google Analytics si quieres (no hace falta) y crea el proyecto.
2. En la página principal del proyecto, haz clic en el ícono web **`</>`** para agregar una app web. Ponle un apodo (p. ej. `petcare-web`), **no** marques Firebase Hosting y haz clic en **Registrar app**. Copia el bloque `firebaseConfig` que aparece (todos los valores).
3. Menú izquierdo > **Compilación > Authentication** > **Comenzar** > **Correo electrónico/contraseña** > activa el interruptor > **Guardar**.
4. Menú izquierdo > **Compilación > Firestore Database** > **Crear base de datos** > elige una ubicación > **Iniciar en modo de prueba** > **Crear**.
5. Agrega al resto del grupo como miembros (⚙️ > **Usuarios y permisos** > **Agregar miembro**) para que esto no vuelva a depender de una sola persona.
6. Pásale al grupo **todos** los valores del `firebaseConfig` (no solo el `apiKey`): en el `.env` cambian también `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_AUTH_DOMAIN`, etc. Cada quien sigue la Parte 2.

> Nota: la key vieja (`AIzaSyCJ9x_...`) fue probada directamente contra `identitytoolkit.googleapis.com` el 2026-10-27 y otra vez el 2026-10-28; Google responde `400 API_KEY_INVALID`, es decir, la key ya no existe (fue eliminada/regenerada o el proyecto fue borrado). No es un error de correo/contraseña, y nadie puede arreglarlo desde el código sin acceso al proyecto de Firebase.

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
