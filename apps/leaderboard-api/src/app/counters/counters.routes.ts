import express from 'express';
import { RoutesConfigBase } from '../common/routes-config-base';
import CountersController from './controllers/counters.controller';

export class CountersRoutes extends RoutesConfigBase {
    constructor(app: express.Application) {
        super(app, 'CountersRoutes');
    }

    configureRoutes() {
        this.app.route(`/counters`)
            .get( async (req: express.Request, res: express.Response) => {
                const response = await CountersController.getAll();
                res.status(200).send(response);
            })
            .post(async (req: express.Request, res: express.Response) => {
                const response = await CountersController.create(req.body);
                res.status(200).send(response);
            });

        this.app.route(`/counters/:id`)
            .get(async (req: express.Request, res: express.Response) => {
                const response = await CountersController.getById(req.params.id);
                res.status(200).send(response);
            })
            .put(async (req: express.Request, res: express.Response) => {
                const response = await CountersController.update(req.params.id,req.body);
                res.status(200).send(response);
            })
            .delete(async (req: express.Request, res: express.Response) => {
                const response = await CountersController.delete(req.params.id);
                res.status(200).send(response);
            });

            this.app.route(`/counters/:id/increment`)
            .put(async (req: express.Request, res: express.Response) => {
                const response = await CountersController.increment(req.params.id);
                res.status(200).send(response);
            })

        return this.app;
    }
}