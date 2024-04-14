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
            request: "request",
            update: "update",
            detail: "detail",
            add: "add",
        },
        feature: {
            announcement: "announcement",
            maintenance: "maintenance",
            paymentProof: "payment",
            facility: "facility",
            mailbox: "mailbox",
            payment: "billing",
            apartment: "apartment",
            resident: "resident",
        },
    },
};
