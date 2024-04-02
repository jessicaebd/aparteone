export interface EnvironmentInterface {
  production: boolean;
  baseApiUrl: string;
  apiPrefix: string;
  apiStoredProcedure: string;
  apiTasks: string,
  apiSmartObject: string;
  apiTable: string;
  apiAction: string;
  apiWorkflow: string;
  apiAttachment: string;
  apiTableList: string;
  apiTestConnection: string;

  modules: {
    general: GeneralEnvironment;
    bankControl: BankControlEnvironment;
  };

  renewSession: {
    idle: number;
    timeout: number;
  };
}

export interface BankControlEnvironment {
  workflowId: string,
  tableMaster: string,
  tableCatatan: string,
  tableAttachment: string,
  hcpFolder: string,
  oprBankControl: string,
  actionKirim: string,
  soBankControl: string,
  tasklistBankControl: string
}

export interface GeneralEnvironment {
  table: GeneralTableEnvironment,
  sp: GeneralSPEnvironment,
  so: GeneralSOEnvironment,
}

export interface GeneralTableEnvironment {
  user: string
}

export interface GeneralSPEnvironment {
  getBranchByUserID: string
}

export interface GeneralSOEnvironment {
  
}