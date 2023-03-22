# Backend ALL SALES

Backend del proyecto “ALL SALES”, un simulador de página e-commerce en la cuál los usuarios pueden crear perfiles, visualizar el perfil de otros usuarios, editar su información, crear y editar productos para la venta, filtra por categorías o palabras específicas, añadir comentarios a los diferentes productos, y simular una compra a través del servicio de carrito de compras.

## Aspectos básicos
Proyecto desarrollado con JavaScript en el entorno NodeJS, implementando el framework Express, en el cual se presenta una API que presta servicio al cliente a través de las diferentes rutas y métodos.

## Gestión sesión de usuario
Se implementa la creación de Tokens con JWT para controlar el inicio de sesión y el manejo de información confidencial, el token es enviado al cliente al momento de iniciar sesión y actúa como llave para la comunicación con el back en la solicitud de servicios. También se implementó la librería Bcrypt para el hash de las contraseñas de usuario antes de su almacenamiento.

## Cors
En la aplicación está configurado el Intercambio de Recursos de Origen Cruzado (CORS), para asegurar que la información sólo pueda ser compartida con una fuente (el frontend), al igual que solo se admiten solicitudes desde la misma.

## Validación de información
Se implementa la librería Joi, consolidando esquemas que actúan dentro de un middleware, para asegurarse que la información que llega en las solicitudes desde el lado del cliente sea la esperada y poder cumplir con cada servicio.

## Base de datos
La información de los usuarios y productos se encuentra almacenada en una base de datos de tipo PostgreSQL, desplegada en el servicio de Alwaysdata bajo el concepto de migraciones; de la mano con esto, en el proyecto se implementa el ORM Sequelize para la manipulación de la BD

## Gestión de archivos
Se implementa la librería multer para el procesamiento de las imágenes de usuarios y productos, luego de validar sus formatos y peso.

## Deploy
El proyecto está desplegado en el servicio de Railway, mientras el frontend se encuentra en la plataforma Vercel.
