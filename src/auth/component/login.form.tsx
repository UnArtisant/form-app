import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {USER_COOKIES} from "../constant/cookie";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {resolver} from "../../app/helper/resolver";
import axios from "axios";
import {RegisterRes} from "../../app/type/register.page.type";
import {errorApi} from "../../app/type/error.api.type";
import {toast} from "react-hot-toast";
import Input from "../../app/component/input";
import loginSchema from "../schema/login";

type Inputs = {
    email: string,
    password: string,
}

function LoginForm() {
    const router = useRouter()
    const [, setCookie] = useCookies([USER_COOKIES])

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        mode: "onBlur",
        //resolver: yupResolver(loginSchema)
    });


    const onSubmit : SubmitHandler<Inputs> = async (data) => {
        const res = await resolver(axios.post("http://localhost:3000/api/login", data).then(r => r.data))
        if (res.data) {
            const user: RegisterRes = res.data
            setCookie(USER_COOKIES, user.id, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
            await router.push("/")
        } else {
            const error: errorApi = res?.error
            //@ts-ignore
            toast.error(error?.message || "soemthing went wrong")
        }
    }

    return <form onClick={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mt-1">
            <Input
                ref={{...register('email', {required: true})}}
                error={!!errors?.email}
                errorMessage={errors?.email?.message}
                label={"Email address"}
                id="email"
                name="email"
                type="email"
                placeholder={"john@doe.com"}
            />
        </div>
        <div className="mt-1">
            <Input
                ref={{...register('password', {required: true})}}
                error={!!errors?.password}
                errorMessage={errors?.password?.message}
                label={"Password"}
                id="password"
                placeholder={"*********"}
                name="password"
                type="password"
            />
        </div>
        <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Sign in
            </button>
        </div>
    </form>
}

export default LoginForm