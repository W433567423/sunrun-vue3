import {IUserItem} from "../store/modules/user/type";

interface IUserLisReqForm {
    page: number;
    limit: number;
}

interface IUserInfoReqForm {
    nickName: string
}

interface IUserIMEIReqForm {
    nickName: string
}

// 返回
interface IResData {
    message: string
    code: number
}

interface IUserListResData {
    count: number
    data: IUserItem[]
    message: string
    status: number
}

interface IPutForm {
    "IMEI": string,
    "authorName": string,
    "nickName": string,
    "runSpeed": number,
    "runTime": string,
    "stepCount": number
}

export type {IUserListResData, IPutForm, IUserLisReqForm, IResData, IUserInfoReqForm, IUserIMEIReqForm}