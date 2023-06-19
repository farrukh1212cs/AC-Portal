
export interface RegisterDto {
    firstName: string;
    lastName?: string | null;
    email: string;
    companyName: string;
    password: string;
}
