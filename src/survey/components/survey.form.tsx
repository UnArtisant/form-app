import React from "react";
import Input from "../../app/component/input";
import TextArea from "../../app/component/textarea";
import {Prisma} from "@prisma/client";
import {useForm} from "react-hook-form";

interface SurveyFormProps {
    survey?: Prisma.SurveySelect
}


function SurveyForm({survey}: SurveyFormProps) {

    const {register, handleSubmit, formState: {errors}} = useForm<Prisma.SurveySelect>({
        mode: "onBlur",
        //resolver: yupResolver(loginSchema)
    });

    return <form className="mt-20">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <div className="mt-1 flex items-center">
                        {survey?.image_url ? <img
                                src={survey.image_url}
                                alt="model.title"
                                className="w-64 h-48 object-cover"
                            /> :
                            <span
                                className="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[80%] w-[80%] text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                  <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                  />
                </svg>
              </span>}
                        <button
                            type="button"
                            className="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <input
                                type="file"
                                className="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                            />
                            Change
                        </button>
                    </div>
                </div>

                <Input type={"text"} name={"title"} label={"Title"}/>

                <TextArea placeholder={"describe your survey"} name={"description"} label={"Description"}/>

                <Input type="date"
                       name="expire_date"
                       id="expire_date"
                       label={"Expire Date"}/>

                <div className="flex items-start my-6">
                    <div className="h-5 flex items-center">
                        <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-medium text-gray-700">
                            Active
                        </label>
                    </div>
                </div>

            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </div>
        </div>
    </form>
}

export default SurveyForm