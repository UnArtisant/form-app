import Link from "next/link";
import {REGISTER_ROUTE} from "../src/app/constant/route"
import LoginForm from "../src/auth/component/login.form";
import ThirdPartyAuth from "../src/auth/component/third.party.auth";
import {NextPageContext} from "next";
import {userLoggedIn} from "../src/auth/helper/userLoggedIn";


function Login() {
    return <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don't have an account ? Register
                    {' '}
                    <Link href={REGISTER_ROUTE}>
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        here
                    </a>
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <LoginForm />
                    <ThirdPartyAuth />
                </div>
            </div>
        </div>
    </>
}

export async function getServerSideProps({req, res}: NextPageContext) {
    userLoggedIn(res,req, "/")
    return {
        props: {}
    }
}


export default Login