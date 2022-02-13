import Layout from "../../src/app/component/layout";
import {NextPageContext} from "next";
import {isProtected} from "../../src/auth/helper/isProtected";
import React from "react";
import SurveyForm from "../../src/survey/components/survey.form";

function New() {
    return <Layout>
        <div className="bg-gray-50">
         <SurveyForm />
        </div>
    </Layout>
}

export function getServerSideProps({req, res}: NextPageContext) {
    isProtected(res, req)
    return {
        props: {}
    }
}

export default New