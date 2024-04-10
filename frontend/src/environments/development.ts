import { EnvironmentInterface } from './environment.interface';

export const environment : EnvironmentInterface = {
    production: false,
    baseApiUrl: "http://localhost:8081/api",
    apiTestConnection: "test-connection",
    renewSession: {
        idle: 999999 * 60,
        timeout: 999999 * 60,
    },
    modules: {
        general: {
            dashboard: "dashboard",
        },
        feature: {
            maintenance: "maintenance",
        },
    },
};
