import { BaseServer } from "../common/base-server";
import { Environment } from "../environment";
import { ExpressAppWrapper } from "../common/express-app-wrapper";
import { DocumentServiceRouter } from "../documents/doc-service-router";


export class AppServer extends BaseServer{
    constructor(readonly expressApp) {
        super(expressApp);
    }
     
    protected getPort(): number {
        return Environment.getPort();
    }

    protected getServiceName(): string {
        return Environment.getServiceName();
    }

    protected registerRoutes(): void {
        const expressWrapper = new ExpressAppWrapper(this.expressApp);
        const documentServiceRouter = new DocumentServiceRouter(expressWrapper);
        documentServiceRouter.registerRoutes();
    }
}