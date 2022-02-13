import {ObjectSchema} from "yup";
import * as yup from "yup"

const loginSchema : ObjectSchema<any> = yup.object().shape({
    password: yup.string()
        .min(2, "Password can't be less than 2 caracters")
        .max(250, "Password can't be longer than 255 caracters"),
    email: yup.string().email('Must be a valid email').max(255)
})

export default loginSchema