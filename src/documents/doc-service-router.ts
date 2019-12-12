import { ExpressAppWrapper } from "../common/express-app-wrapper";
const dateStart = Date.now();

export class DocumentServiceRouter {
  constructor(private readonly expressApp: ExpressAppWrapper) {}

  public registerRoutes(): void {
    this.expressApp.get('', async (req, res, next) => 'Service is running.');

    this.expressApp.get('/info', async (req, res, next) => {
        const today = new Date();

        res.json({
          date: today,
          up: `${(Date.now() - dateStart) / 1000} seg.`,
          headers: req.headers
        });
    });
  }
}