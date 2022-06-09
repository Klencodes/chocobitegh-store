import { ResponseOjbect } from "./network-response-object.model"
export type ICallback = (error?: any, result?: ResponseOjbect<any> | any) => void;
