
export interface ResponseBody<Payload = any> {
    status: number;
    message: string;
    payload: Payload;
}
