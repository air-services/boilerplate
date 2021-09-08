export interface ConstructorIcon {
  id: number;
  name: string;
}

export interface Application {
  name: string;
  description: string;
  url: string;
  icon: ConstructorIcon;
  modules: ApplicationModule[];
}

export interface ApplicationModule {
  id?: number;
  name: string;
  icon?: string | null | ConstructorIcon;
  url: string;
  api: string;
}
