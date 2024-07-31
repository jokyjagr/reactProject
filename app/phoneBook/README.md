# React + Vite

Servidor json para desarrollo:
    npm install -g json-server
Después de instalar, ejecuta el siguiente comando para ejecutar json-server. Por defecto, json-server se inicia en el puerto 3000; ahora definiremos un puerto alternativo 3001, para json-server. La opción --watch busca automáticamente cualquier cambio guardado en db.json.
    json-server --port 3001 --watch db.json
Sin embargo, no es necesaria una instalación global. Desde el directorio raíz de su aplicación, podemos ejecutar json-server usando el comando npx:
    npx json-server --port 3001 --watch db.json
