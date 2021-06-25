export interface UserEditDataModel {
  id: number | null;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  isActive: boolean;
}

export interface UserEditModel {
  isLoaded: boolean;
  data: UserEditDataModel;
}

