import * as express from 'express';
import errorMiddleware from './middlewares/erro-middleware';
import TeamsRouter from './routers/Teams.router';
import UserRouter from './routers/User.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.Routers();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private Routers():void {
    this.app.use('/login', UserRouter);
    this.app.use('/teams', TeamsRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
