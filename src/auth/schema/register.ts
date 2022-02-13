import {ObjectSchema} from "yup";
import * as yup from "yup"

const registerSchema : ObjectSchema<any> = yup.object().shape({
    password: yup.string()
        .min(2, "Password can't be less than 2 caracters")
        .max(250, "Password can't be longer than 255 caracters"),
    username: yup.string()
        .min(2, "Username can't be less than 2 chars")
        .max(250, "Username must be less than 250 chars")
        .required("Username is required"),
    email: yup.string().email('Must be a valid email').max(255)
})

export default registerSchema