export interface BaseResponse<T> {
    statusCode: number;
    payload: T;
    message: string;
    status: boolean;
    errors: null;
}
