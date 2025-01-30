# AvanceWebAPITest

## Configuración

## Base de datos

Existen dos formas de poder configurar la base de datos, ya sea ejecutando todos los scripts por separado o abrir el script que contiene toda la información, dicho script tiene como nombre `FullQuery.sql`

Es necesario que la base de datos se mantenga con el nombnre establecido `UserManagement` para evitar cualquier conflicto

## Backend

Para poder iniciar el backend en .NET es necesario abrir el proyecto, ya sea desde la aplicación de Visual Studio buscando el archivo de solución o abrir el archivo `WebAPITest.sln` que se encuentra al mismo nivel de la carpeta con el mismo nombre (sin incluir la extensión)

Una vez abierto el proyecto, dar clic sobre la tecla "F5", con eso se abrirá una ventana de Swagger, lo que permite la ejecución básica de los endpoints

## Frontend

Antes de ejecutar la solución de Angular, se debe verificar en qué puerto se encuentra corriendo el backend, ya que no se configuró dicho puerto, una vez identificada la información, ir a la siguiente ruta: `src/app/Settings/appSettings.ts`, dentro de este archivo de configuración modificar el puerto de la URL para que Angular identifique correctamente la dirección de la cual extraerá y manipulará información de los endpoints

abrir la carpeta donde se encuentra el proyecto de Angular, al nivel de las carpetas `public` y `src`, ejecutar el comando `npm install` para instalar todas las dependencias de Angular

Sin cerrar la consola dentro del proyecto de angular, ejecutar el comando `ng serve --open`


## Consideraciones

- El código no se encuentra documentado, ya que el motivo del test es entregarlo a la brevedad posible y documentar un proyecto así puede ser más tardado del tiempo limite
- Las presentes instrucciones pueden tomarse como una guia básica más no definitiva
