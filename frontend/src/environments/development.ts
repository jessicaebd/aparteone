import { EnvironmentInterface } from './environment.interface';

export const environment : EnvironmentInterface = {
    production: false,
    baseApiUrl: "http://10.27.3.195:80",
    // baseApiUrl: "http://10.20.200.85:50002",
    apiPrefix: "k2five-api-temp",
    // apiPrefix: "k2five-api",
    apiTasks: "v2/tasks",
    // apiTasks: "tasks",
    apiStoredProcedure: "sp",
    apiSmartObject: "so",
    apiTable: "tb",
    apiAction: "actions",
    apiWorkflow: "workflows",
    apiAttachment: "attachments",
    apiTableList: "tb-list",
    apiTestConnection: "test-connection",
    renewSession: {
        idle: 999999 * 60,
        timeout: 999999 * 60,
    },
    modules: {
        general: {
            table: {
                user: "User",
            },
            sp: {
                getBranchByUserID: "sp_GetBranchByUserID",
            },
            so: {
                
            }
        },
        bankControl: {
            workflowId: "2067",
            tableMaster: "BankControl",
            tableCatatan: "BankControlComment",
            tableAttachment: "BankControlAttachment",
            hcpFolder: "Bank Control",
            oprBankControl: "OPR Bank Control",
            actionKirim: "Kirim",
            soBankControl: "BankControls",
            tasklistBankControl: "sp_TasklistBankControl"
        },
    },
};
