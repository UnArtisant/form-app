import Layout from "../../src/app/component/layout";
import {NextPageContext} from "next";
import {isProtected} from "../../src/auth/helper/isProtected";
import React from "react";
import Link from "next/link"
import SurveyList from "../../src/survey/components/survey.list";
import prisma from "../../lib/prisma";
import {USER_COOKIES} from "../../src/auth/constant/cookie";
import cookie from "cookie";
import {Prisma} from "@prisma/client";

interface SurveyProps {
    surveys: Prisma.SurveySelect[] | []
}

const Header = (<header className="py-10">
        <div className="max-w-7xl flex justify-between ietms-center mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Survey</h1>
            <Link
                href={"/survey/new"}
            >
                <a className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Survey
                </a>
            </Link>
        </div>
    </header>
)

function Survey({surveys}: SurveyProps) {
    return <Layout header={Header}>
        <SurveyList surveys={surveys} />
    </Layout>
}

export async function getServerSideProps({req, res}: NextPageContext) {
    isProtected(res, req)
    //@ts-ignore
    const user = cookie.parse(req.cookies[USER_COOKIES])
    const surveys = await prisma.survey.findMany({
        where: {
            userId: user
        }
    })
    return {
        props: {
            surveys: JSON.parse(JSON.stringify(surveys))
        }
    }
}

export default Survey