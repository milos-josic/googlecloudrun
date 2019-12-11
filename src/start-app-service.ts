
const express = require('express');

(async () => {
     
    console.log('App Service HTTP API running');
    await DocumentServiceHttpApiBootstrapper.init();
    const server: DocumentServiceServer = new DocumentServiceServer(express());
    await server.start();
})();
