import express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
import * as bodyparser from 'body-parser';
import debug from 'debug';
import { RoutesConfigBase } from './app/common/routes-config-base';
import { UsersRoutes } from './app/users/users.routes';
import { TeamsRoutes } from './app/teams/teams.routes';
import { CountersRoutes } from './app/counters/counters.routes';
import cors from 'cors';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 5000;
const routes: RoutesConfigBase[] = [];
const debugLog: debug.IDebugger = debug('app');
app.use(cors());
app.use(bodyparser.json());

app.use(express.static(__dirname + '/assets'));
routes.push(new UsersRoutes(app));
routes.push(new TeamsRoutes(app));
routes.push(new CountersRoutes(app));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: RoutesConfigBase) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});