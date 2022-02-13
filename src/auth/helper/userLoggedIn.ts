import {USER_COOKIES} from "../constant/cookie";
import {redirect} from "next/dist/server/api-utils";

export const userLoggedIn = (res: any, req: any, to = "/"): void => {
    const {cookies} = req
    if (cookies && cookies?.[USER_COOKIES]) {
        redirect(res, 307, "/")
    }
}