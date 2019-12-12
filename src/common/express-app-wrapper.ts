import { Environment } from "../environment";

const express = require('express')

export class  ExpressAppWrapper {
    constructor(private expressApp){
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: true }));
    }

    public delete(route: string, asyncMiddleware: (req, res, next) => Promise<any>) {
        this.expressApp.delete(route, async (req, res, next) => {
            try {
                const result = await asyncMiddleware(req, res, next);

                res.json(result);    
            } catch (error) {
                //todo log error
                next(error);
            }
        });
    }
    
    public get(route: string, asyncMiddleware: (req, res, next) => Promise<any>) {
        this.expressApp.get(route, async (req, res, next) => {
            try {
                const result = await asyncMiddleware(req, res, next);

                res.json(result);    
            } catch (error) {
                //todo log error
                next(error);
            }
        });
    }

    public post(route: string, asyncMiddleware: (req, res, next) => Promise<any>) {
        this.expressApp.post(route, async (req, res, next) => {
            try {
                const result = await asyncMiddleware(req, res, next);

                res.json(result);    
            } catch (error) {
                //todo log error
                next(error);
            }
        });
    }
}