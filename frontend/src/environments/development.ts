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
            search: "search",
            delete: "delete",
            verify: "verify",
            addCategory: "add-category",
            updateStatus: "update-status",
        },
        feature: {
            announcement: "announcement",
            maintenance: "maintenance",
            paymentProof: "payment",
            facility: "facility",
            time: "time",
            mailbox: "mailbox",
            payment: "billing",
            merchant: "merchant",
            product: "product",
            cart: "cart",
            apartment: "apartment",
            resident: "resident",
        },
    },
};
