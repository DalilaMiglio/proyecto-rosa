# 📋 Gestor de Tareas con React, Firebase y AWS SES
## Descripción del proyecto
Este proyecto consiste en una aplicación web para la gestión de tareas personales desarrollada con React y TypeScript.
La aplicación permite a los usuarios registrarse, iniciar sesión, administrar sus propias tareas y recibir una notificación por correo electrónico cada vez que crean una nueva tarea.
Toda la información se almacena en Firebase Firestore y el envío de correos se realiza mediante Amazon SES a través de una Vercel Function.
El objetivo principal fue aplicar conceptos de desarrollo frontend moderno, persistencia en la nube, autenticación segura, arquitectura por capas e integración de servicios serverless.
## Tecnologías utilizadas
### Frontend
- React
- TypeScript
- React Router DOM
- CSS
### Backend Serverless
- Vercel Functions
### Base de datos
- Firebase Firestore
### Autenticación
- Firebase Authentication
### Servicio de correo electrónico
- AWS SES (Amazon Simple Email Service)
### Testing
- Vitest
- Testing Library
### Deploy
- Vercel
# Funcionalidades
## Autenticación
- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Protección de rutas privadas
## Gestión de tareas
- Crear tareas
- Listar tareas
- Actualizar estado de tareas
- Eliminar tareas
## Persistencia
- Almacenamiento en Firestore
- Filtrado automático por usuario autenticado
## Notificaciones por email
- Envío automático de correo al crear una tarea
- Integración con AWS SES
- Ejecución mediante Vercel Function
# Arquitectura del proyecto
Se utilizó una arquitectura por capas para separar responsabilidades y facilitar el mantenimiento del código.
```
src
├── components
├── features
│   ├── auth
│   └── tasks
├── hooks
├── pages
├── routes
├── services
├── tests
├── types
├── utils
└── api
### Components
Contiene componentes reutilizables de interfaz.
Ejemplo:
- TaskCard
- AuthForm
### pages
Contiene las páginas principales.
Ejemplo:
- Login
- Tasks
### Hooks
Contiene lógica reutilizable mediante custom hooks.
Ejemplo:
- useAuth
- useTasks
### Services
Contiene toda la comunicación con servicios externos.
Ejemplo:
- Firebase
- Firestore
### Types
Contiene los modelos TypeScript.
Ejemplo:
- Task
### API
Contiene las funciones serverless desplegadas en Vercel.
Ejemplo:
- send-task-email.ts
# Decisiones arquitectónicas
## Uso de Firebase
Se eligió Firebase porque permite implementar autenticación y persistencia de datos de forma rápida y segura.
## Uso de Firestore
Firestore permite almacenar las tareas de cada usuario en la nube y mantener sincronización sencilla con la interfaz.
## Uso de AWS SES
Se eligió AWS SES para implementar un servicio de correo real, escalable y utilizado en entornos profesionales.
## Uso de Vercel Functions
Las credenciales de AWS nunca se exponen en el frontend.
La función serverless recibe la solicitud desde React y ejecuta el envío del correo desde el servidor.
Esto mejora la seguridad y cumple con buenas prácticas de desarrollo.
## Componentes reutilizables

Se extrajo la representación visual de las tareas a un componente independiente (TaskCard) para evitar duplicación de código y mejorar la mantenibilidad.
# Flujo de envío de emails
1. El usuario inicia sesión.
2. El usuario crea una nueva tarea.
3. React guarda la tarea en Firestore.
4. Se realiza una petición HTTP a:
```txt
/api/send-task-email
```
5. La Vercel Function recibe la petición.
6. AWS SES procesa el envío.
7. El usuario recibe un correo electrónico de confirmación.
# Variables de entorno necesarias
## Firebase
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
## AWS SES
```env
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SES_FROM_EMAIL=
```
---
# Instalación local
Clonar repositorio
```bash
git clone https://github.com/DalilaMiglio/proyecto-rosa.git
```
Entrar al proyecto
```bash
cd proyecto-rosa
```
Instalar dependencias
```bash
npm install
```
Crear archivo `.env`
```bash
cp .env.example .env
```
Configurar variables de entorno.
Ejecutar aplicación
```bash
npm run dev
# Testing
Para ejecutar los tests:
```bash
npm run test
Para ejecutar una sola pasada:

```bash
npm run test:run
Pruebas implementadas:
- Validación de tareas
- Renderizado del componente TaskCard
# Deploy
Aplicación desplegada en Vercel:
https://proyecto-rosa.vercel.app
Repositorio GitHub:
https://github.com/DalilaMiglio/proyecto-rosa
# Commits realizados
Se utilizaron commits semánticos para mantener un historial claro del proyecto.
Ejemplos:
```txt
feat: create base React TypeScript project
feat: add Firebase authentication
feat: implement Firestore CRUD
feat: add AWS SES integration
refactor: extract reusable task card component
test: add Vitest task tests
fix: add Vercel SPA rewrite
# Uso de Inteligencia Artificial durante el desarrollo
La inteligencia artificial fue utilizada como herramienta de apoyo durante el desarrollo del proyecto.
Se utilizó principalmente para:
- Resolver errores de configuración.
- Comprender documentación técnica.
- Integrar AWS SES con Vercel Functions.
- Generar ideas para pruebas unitarias.
- Revisar estructura del proyecto.
- Mejorar la organización del código.
Sin embargo, todas las decisiones finales de implementación, pruebas y despliegue fueron verificadas manualmente.
## Aprendizajes obtenidos
Durante el desarrollo se identificaron varias buenas prácticas:
- Separar responsabilidades mediante arquitectura por capas.
- No exponer credenciales sensibles en el frontend.
- Utilizar funciones serverless para servicios externos.
- Crear componentes reutilizables.
- Implementar pruebas automatizadas para validar funcionalidades críticas.
- Utilizar commits semánticos para mejorar el seguimiento del proyecto.


La mayor parte del proceso de desarrollo se basó en los contenidos vistos en clase, las demostraciones realizadas por el profesor y la documentación oficial de las tecnologías utilizadas. La IA fue  útil para complementar esos conocimientos cuando me  surgían dudas técnicas o errores que requerían investigación adicional.
## Situaciones donde la IA fue más efectiva:
### Integración de AWS SES
La integración de Amazon SES fue una de las partes más complejas del proyecto. Utilicé la IA para comprender el proceso de verificación de identidades, la creación de credenciales IAM, la configuración de variables de entorno y la comunicación entre AWS SES y las Vercel Functions.
También fue útil para interpretar mensajes de error generados por AWS y comprender cómo solucionarlos de forma segura.
### Resolución de errores de despliegue
Durante el despliegue en Vercel aparecieron distintos errores relacionados con TypeScript, variables de entorno, configuración de Firebase y rutas de la aplicación. La IA me ayudó a interpretar esos errores y entender qué parte de la configuración debía corregir.
Sin embargo, cada solución fue probada manualmente antes de incorporarla al proyecto.
### Organización del código
Utilicé la IA para revisar la estructura del proyecto y obtener sugerencias sobre cómo separar responsabilidades entre componentes, hooks, servicios y páginas.
Gracias a ello fue posible mantener una arquitectura más limpia y fácil de mantener.
### Implementación de pruebas
La IA fue utilizada para comprender mejor el uso de Vitest y Testing Library, así como para proponer escenarios de prueba sobre componentes y validaciones importantes del sistema.
Posteriormente revisé y adapté esas pruebas para que se ajustaran al comportamiento real de la aplicación.
### Comprensión de documentación técnica
En varios momentos utilicé la IA como apoyo para interpretar documentación oficial de Firebase, AWS SES, React y Vercel, especialmente cuando la documentación incluía conceptos avanzados o configuraciones poco familiares.
## Buenas prácticas aprendidas
A partir del uso de IA durante el desarrollo identifiqué varias buenas prácticas que considero valiosas para proyectos futuros:
* Verificar siempre las respuestas antes de implementarlas.
* Comprender el funcionamiento del código antes de copiarlo o utilizarlo.
* Utilizar la IA como herramienta de apoyo y no como sustituto del aprendizaje.
* Mantener separadas las responsabilidades del proyecto mediante una arquitectura por capas.
* Evitar exponer credenciales o información sensible en el frontend.
* Utilizar funciones serverless para interactuar con servicios externos de manera segura.
* Crear componentes reutilizables para reducir duplicación de código.
* Implementar pruebas automatizadas para validar funcionalidades críticas.
* Mantener un historial de cambios mediante commits semánticos descriptivos.
