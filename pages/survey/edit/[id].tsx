import {isProtected} from "../../../src/auth/helper/isProtected";
import Layout from "../../../src/app/component/layout";
import prisma from "../../../lib/prisma";
import SurveyForm from "../../../src/survey/components/survey.form";
import React from "react";
import {USER_COOKIES} from "../../../src/auth/constant/cookie";
import {Prisma} from "@prisma/client";

interface EditProps {
    survey: Prisma.SurveySelect
}

function Edit({survey}: EditProps) {
    return <Layout>
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
            }
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