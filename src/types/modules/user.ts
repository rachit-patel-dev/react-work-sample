export interface IUserData {
    $id:string;
}

export interface IAccountData {
    email: string;
    password: string;
    name: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginFormData {
    email: string;
    password: string;
}

export interface ISignUpFormData {
    name: string;
    email: string;
    password: string;
}
