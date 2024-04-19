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
  facility: string,
  time: string,
  mailbox: string,
  payment: string,
  merchant: string,
  product: string,
  cart: string,
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
  addCategory: string,
  updateStatus: string,
}