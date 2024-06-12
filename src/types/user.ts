import { NormalBackendRes } from "./login";

export interface UserNameCheckRes extends NormalBackendRes{
    userAvailablity:boolean;
}