import React, {useState} from "react";
import Input from "../../app/component/input";
import TextArea from "../../app/component/textarea";
import {Prisma} from "@prisma/client";
import {SubmitHandler, useForm, FormProvider} from "react-hook-form";
import {format} from "date-fns"
import QuestionEditor from "./question.editor";
import {toast} from "react-hot-toast";
import {resolver} from "../../app/helper/resolver";
import axios from "axios";

interface SurveyFormProps {
    survey?: Prisma.SurveySelect
}

type Inputs = {
    title: string,
    description: string,
    expireAt: string,
    status: boolean,
    questions: any
}

function SurveyForm({survey}: SurveyFormProps) {


    const methods = useForm<Inputs>({
        //@ts-ignore
        defaultValues: survey ? {
            title: survey.title,
            description: survey.description,
            //@ts-ignore
            expireAt: format(new Date(survey.expireAt), 'MM-dd-yyyy'),
            status: survey.status,
            questions : survey.surveyQuestions.map(item => {
               return {...item, data: JSON.parse(item.data)}
            })
        } : null
    });

    const {register, handleSubmit, formState: {errors}, reset} = methods

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await resolver(axios.post("http://localhost:3000/api/survey", {
            ...data,
            expireAt: new Date(data.expireAt),
            status: data.status ? 1 : 0
        }).then(r => r.data))
        if (res.data) {
            toast.success("Survey successfully posted")
            reset({
                title: "",
                description: "",
                expireAt: "",
                status: false,
            })
        } else {
            //could and this with set error
            //and specific message form the api
            toast.error("Something went wrong")
        }
    }

    const onUpdate: SubmitHandler<Inputs> = async data => {
        console.log(data)
    }


    return <FormProvider {...methods} >
        <form onSubmit={handleSubmit(survey ? onUpdate : onSubmit)} className="mt-20">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-10">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="mt-1 flex items-center">
                            {survey?.imageUrl ? <img
                                    //@ts-ignore
                                    src={survey.imageUrl}
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

                    <Input
                        ref={{...register('title', {required: true})}}
                        error={!!errors?.title}
                        errorMessage={errors?.title?.message}
                        type={"text"}
                        name={"title"}
                        label={"Title"}/>

                    <TextArea
                        ref={{...register('description')}}
                        error={!!errors?.description}
                        errorMessage={errors?.description?.message}
                        placeholder={"describe your survey"}
                        name={"description"}
                        label={"Description"}/>

                    <Input type="date"
                           ref={{...register('expireAt')}}
                           error={!!errors?.expireAt}
                           errorMessage={errors?.expireAt?.message}
                           name="expireAt"
                           id="expireAt"
                           label={"Expire Date"}/>

                    <div className="flex items-start my-6">
                        <div className="h-5 flex items-center">
                            <input
                                {...register('status')}
                                id="status"
                                name="status"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="status" className="font-medium text-gray-700">
                                Active
                            </label>
                        </div>
                    </div>

                    <QuestionEditor/>

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
    </FormProvider>
}

export default SurveyForm