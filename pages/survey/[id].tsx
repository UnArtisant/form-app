import Layout from "../../src/app/component/layout";
import {NextPageContext} from "next";
import {isProtected} from "../../src/auth/helper/isProtected";
import prisma from "../../lib/prisma";

function Display() {
    return <Layout>
        <h1>heuy</h1>
    </Layout>
}

//@ts-ignore
export async function getServerSideProps({req, res, params}: NextPageContext) {
    isProtected(res, req)
    const {id} = params

    const survey = await prisma.survey.findUnique({
        where: {
            id
        },
    })

    if (!survey) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            survey: JSON.parse(JSON.stringify(survey))
        }
    }
}

export default Display