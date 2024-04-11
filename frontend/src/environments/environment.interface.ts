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
  maintenance: string,
  request: string,
  apartment: string,
  resident: string,
}

export interface GeneralEnvironment {
  dashboard: string,
}