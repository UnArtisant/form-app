import {useEffect, useState} from "react";
import {USER_COOKIES} from "../constant/cookie";
import prisma from "../../../lib/prisma";
import {Prisma} from "@prisma/client"
import cookie from "cookie"
import {resolver} from "../../app/helper/resolver";
import axios from "axios";

export const useUser = () => {
    const [user, setUser] = useState<Prisma.UserSelect | null>(null)
    const [fetching, setFetching] = useState<boolean>(false)

    const handleUser = async () => {
        const {data} = await resolver(axios.get("http://localhost:3000/api/user").then(r => r.data))
        if(data) {
            setUser(data)
        } else {
            setUser(null)
        }
    }

    useEffect(() => {
        handleUser()
    }, [])


    return {user, fetching}
}