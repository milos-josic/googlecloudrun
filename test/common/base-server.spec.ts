import { assert, expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import { BaseServer } from "../../src/common/base-server";

use(chaiAsPromised);

describe("http/base/base-server.ts", () => {
    let testExpressApp: any;
    let msg = "Please implement me.";

    class TestServer extends BaseServer {
        constructor(expressApp: any) {
            super(expressApp);
        }
        public validateUserContext(req: any, res: any, next: any) {
            return;
        }
        public getPort(): number {
            return;
        }
        public getServiceName(): string {
            return;
        }
        public registerRoutes(): void {
            return;
        }
    }

    let testServer: TestServer;
    beforeEach(() => {
        testExpressApp = {
            disable: sinon.stub(),
            use: sinon.stub(),
            listen: sinon.stub()
        };
        testServer = new TestServer(testExpressApp);
    });

    it("shall be instantiated", () => {
        expect(testServer).to.be.instanceOf(BaseServer);
    });

    it("shall throw Http Server Start error when testExpress disable() introduce error", async () => {
        testExpressApp.disable.throws();
        await expect(testServer.start()).to.eventually.be.rejected;
        sinon.assert.calledOnce(testExpressApp.use);
        sinon.assert.calledOnce(testExpressApp.disable);
        sinon.assert.notCalled(testExpressApp.listen);
    });

    it("shall throw Http Server Start error when testExpress use() introduce error", async () => {
        testExpressApp.use.throws();
        await expect(testServer.start()).to.eventually.be.rejected;
        sinon.assert.calledOnce(testExpressApp.use);
        sinon.assert.notCalled(testExpressApp.disable);
        sinon.assert.notCalled(testExpressApp.listen);
    });

    it("shall throw Http Server Start error when testExpress listen() introduce error", async () => {
        testExpressApp.listen.throws();
        await expect(testServer.start()).to.eventually.be.rejected;
    });
});
