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
  facility: string,
  apartment: string,
  resident: string,
}

export interface GeneralEnvironment {
  dashboard: string,
  request: string,
  update: string,
  detail: string,
}