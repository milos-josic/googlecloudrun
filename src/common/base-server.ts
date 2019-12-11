/* istanbul ignore next */
import cors = require("cors");
import { Environment } from "../environment";

export abstract class BaseServer {
    private httpServer: any;
    constructor(protected readonly expressApp) {}

    public async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            const app = this.expressApp;

            app.use(cors());

            app.disable("etag");
            app.disable("x-powered-by");

            app.use(this.initUserContext);

            app.use(this.validateUserContext);

            app.get("/", (req, res) => {
                res.send("service_running");
            });

            this.registerRoutes();

            this.handle404Error(); //This should be at last but one call of use

            this.handleAllErrors(); //This should be last call of use

            this.httpServer = app.listen(this.getPort(), () => {
                console.log(`${this.getServiceName()} Service started on port ${this.getPort()}`);
                resolve();
            });
        });
    }

   

    private initUserContext(req: any, res: any, next: any) {
        let context = {userId: '21'};
        req.context = context;
        next();
    }   

    validateUserContext(req, res, next) {
        if (!req.context) {
            return next(new Error("Context not initialized"));
        } else {
            return next();
        }
    }

    protected abstract getPort(): number;
    protected abstract getServiceName(): string;
    protected abstract registerRoutes(): void;

    public close(exit: (code?: number) => never) {
        this.httpServer.close(() => {
            exit(1);
        });
    }

    private handle404Error(): void {
        this.expressApp.use((req, res) => {
            res.status(404).send("msg_page_not_found");
        });
    }

    private handleAllErrors(): void {
        this.expressApp.use((error, req, res, next) => {
            const response: any = {
                message: (error && error.message) || "Internal Server Error.",
                stack: (!Environment.isProductionMode(process) && error && error.stack) || ""
            };

            res.status(error.statusCode || 500).send(response);
        });
    }
}
