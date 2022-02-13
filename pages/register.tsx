import RegisterForm from "../src/auth/component/register.form";
import ThirdPartyAuth from "../src/auth/component/third.party.auth";
import {NextPageContext} from "next";
import {userLoggedIn} from "../src/auth/helper/userLoggedIn";

function Register()  {
    return <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <RegisterForm/>
                    <ThirdPartyAuth/>
                </div>
            </div>
        </div>
    </>
}

export function getServerSideProps({req, res}: NextPageContext) {
    userLoggedIn(res,req, "/")
    return {
        props: {}
    }
}


export default Register