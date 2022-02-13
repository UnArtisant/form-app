import {Prisma} from "@prisma/client";
import Link from "next/link"
import Swal from "sweetalert2"

interface SurveyCardProps {
    survey : Prisma.SurveySelect,
    key?: number
}

export const SurveyCard = ({survey}: SurveyCardProps) => {

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    return <div
        className="flex rounded flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
    >
        <img
            src={'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
            alt="survey.title"
            className="w-full h-48 object-cover"
        />
        <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
        <div className="overflow-hidden flex-1">{survey.description}</div>

        <div className="flex justify-between items-center mt-3">
            <Link
                href={`/survey/edit/${survey.id}`}
            >
                <a className="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                    Edit
                </a>
            </Link>
            <div className="flex items-center">
                <Link href={`/survey/edit/${survey.id}`}>
                    <a
                        className="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm
                text-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </a>
                </Link>
                <button onClick={handleDelete}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>
</div>
}