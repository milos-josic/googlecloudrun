
import * as express from 'express';
import { AppServer } from './server/app-server';
import { AppBootstrapper } from './server/app-bootstrapper';

(async () => {
     
    console.log('App Service HTTP API running');
    await AppBootstrapper.init();
    const server: AppServer = new AppServer(express());
    await server.start();
})();
