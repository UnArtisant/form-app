import {isProtected} from "../../../src/auth/helper/isProtected";
import Layout from "../../../src/app/component/layout";
import prisma from "../../../lib/prisma";
import SurveyForm from "../../../src/survey/components/survey.form";
import React from "react";
import {USER_COOKIES} from "../../../src/auth/constant/cookie";
import {Prisma} from "@prisma/client";
import {resolver} from "../../../src/app/helper/resolver";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";

interface EditProps {
    survey: Prisma.SurveySelect
}


function Edit({survey}: EditProps) {

    const router = useRouter()

    const handleDelete = async (id: number) => {
        const res = await resolver(axios.delete(`http://localhost:3000/api/survey/${id}`))
        if(res.data) {
            toast.success("Survey successfully deleted")
            await router.push("/survey")
        }
    }

    const Header = (
        <header className="py-10">
            <div className="max-w-7xl flex justify-between ietms-center mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Survey</h1>
                {/** @ts-ignore*/}
                <button onClick={() => handleDelete(survey.id)} className="inline-flex items-center bg-red-500 text-white px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete Survey
                </button>
            </div>
        </header>
    )

    return <Layout header={Header}>
        <SurveyForm survey={survey} />
    </Layout>
}

//@ts-ignore
export async function getServerSideProps({req, res, params}: NextPageContext) {
    isProtected(res, req)
    //@ts-ignore
    const user = req.cookies[USER_COOKIES]
    const {id} = params
    const survey = await prisma.survey.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    id: true,
                }
            },
            surveyQuestions: true
        }
    })

    if (!survey) {
        return {
            notFound: true,
        }
    }

    if(survey.user.id !== user) {
        //handle access denied
    }

    return {
        props: {
            survey: JSON.parse(JSON.stringify(survey))
        }
    }
}

export default Edit