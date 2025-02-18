import { UserType } from "./auth.model";

export  class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    userTypeId: number;
    userType: UserType;
    isActive: boolean;
    isDeleted: boolean;
    isUniversal: boolean;
    isNewPassword: boolean;
    userTypeName: string;
    accessToken: string;
}