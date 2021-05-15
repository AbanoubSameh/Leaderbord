import express from 'express';
import { RoutesConfigBase } from '../common/routes-config-base';
import teamsController from './controllers/teams.controller';

export class TeamsRoutes extends RoutesConfigBase {
    constructor(app: express.Application) {
        super(app, 'TeamsRoutes');
    }

    configureRoutes() {
        this.app.route(`/teams`)
            .get( async (req: express.Request, res: express.Response) => {
                const response = await teamsController.getAll();
                res.status(200).send(response);
            })
            .post(async (req: express.Request, res: express.Response) => {
                const response = await teamsController.create(req.body);
                res.status(200).send(response);
            });

        this.app.route(`/teams/:id`)
            .get(async (req: express.Request, res: express.Response) => {
                const response = await teamsController.getById(req.params.id);
                res.status(200).send(response);
            })
            .put(async (req: express.Request, res: express.Response) => {
                const response = await teamsController.update(req.params.id,req.body);
                res.status(200).send(response);
            })
            .delete(async (req: express.Request, res: express.Response) => {
                const response = await teamsController.delete(req.params.id);
                res.status(200).send(response);
            });

        return this.app;
    }
}