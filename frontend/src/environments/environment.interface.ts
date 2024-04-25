export interface EnvironmentInterface {
  production: boolean;
  baseApiUrl: string;
  apiTestConnection: string;

  modules: {
    general: GeneralEnvironment;
    feature: FeatureEnvironment;
  };

  renewSession: {
    idle: number;
    timeout: number;
  };
}

export interface FeatureEnvironment {
  announcement: string,
  maintenance: string,
  paymentProof: string,
  checkout: string,
  facility: string,
  time: string,
  mailbox: string,
  billing: string,
  merchant: string,
  product: string,
  cart: string,
  transaction: string,
  apartment: string,
  resident: string,
}

export interface GeneralEnvironment {
  dashboard: string,
  request: string,
  update: string,
  detail: string,
  add: string,
  search: string,
  delete: string,
  verify: string,
  approve: string,
  addCategory: string,
  updateStatus: string,
}