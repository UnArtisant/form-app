import Layout from "../src/app/component/layout";
import {NextPageContext} from "next";
import {isProtected} from "../src/auth/helper/isProtected";

function Home() {
    return (
        <Layout>
            <div>
                hey
            </div>
        </Layout>
    )
}

export function getServerSideProps({req, res}: NextPageContext) {
    isProtected(res, req)
    return {
        props: {}
    }
}


export default Home
