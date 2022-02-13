import React, {ReactElement} from "react";
import Navbar from "./navbar/navbar";

interface layoutProp {
    header?: ReactElement | null,
    children?: ReactElement
}

function Layout ({header, children} : layoutProp) {
    return <>
        <div className="min-h-full">
            <div className="bg-indigo-600 pb-32">
                <Navbar />
                {header}
            </div>
            <main className="-mt-32">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    </>
}

export default Layout