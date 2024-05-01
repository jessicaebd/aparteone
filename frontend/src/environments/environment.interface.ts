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
  notification: string,
  apartment: string,
  unit: string,
  resident: string,
  chat: string,
  send: string,
  rooms: string,
  messages: string,
}

export interface GeneralEnvironment {
  auth: string,
  login: string,
  user: string,
  register: string,
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