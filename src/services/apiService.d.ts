import { User } from '../types';

export declare function registerUser(formData: FormData): Promise<any>;
export declare function loginUser(email: string, password: string): Promise<any>;
export declare function getMyProfile(token: string): Promise<User>;