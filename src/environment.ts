
export class Environment{
    public static getServiceName(): string {
        return process.env.SERVICE_NAME || "app-service";
    }

    public static getPort(process?: NodeJS.Process): number {
        return parseInt((process && process.env.PORT) || "8100", 10);
    }

    public static isProductionMode(process: NodeJS.Process): boolean {
        return process.env.NODE_ENV === "production";
    }
}