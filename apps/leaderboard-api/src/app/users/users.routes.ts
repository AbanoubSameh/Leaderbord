import * as express from 'express';
import { RoutesConfigBase } from '../common/routes-config-base';
import usersController from './controllers/users.controller';

export class UsersRoutes extends RoutesConfigBase {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        this.app.route(`/users`)
            .get( async (req: express.Request, res: express.Response) => {
                const response = await usersController.getAll(req.query.teamId as string);
                res.status(200).send(response);
            })
            .post(async (req: express.Request, res: express.Response) => {
                const response = await usersController.create(req.body);
                res.status(200).send(response);
            });

        this.app.route(`/users/:id`)
            .get(async (req: express.Request, res: express.Response) => {
                const response = await usersController.getById(req.params.id);
                res.status(200).send(response);
            })
            .put(async (req: express.Request, res: express.Response) => {
                const response = await usersController.update(req.params.id,req.body);
                res.status(200).send(response);
            })
            .delete(async (req: express.Request, res: express.Response) => {
                const response = await usersController.delete(req.params.id);
                res.status(200).send(response);
            });

        return this.app;
    }
}