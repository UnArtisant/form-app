import {USER_COOKIES} from "../constant/cookie";
import {redirect} from "next/dist/server/api-utils";
import {LOGIN_ROUTE} from "../../app/constant/route";

export const isProtected = (res: any, req: any, to = LOGIN_ROUTE): void => {
    const {cookies} = req
    if (!cookies || !cookies?.[USER_COOKIES]) {
        redirect(res, 307, to)
    }

}