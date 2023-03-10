import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup"
import { setLogged, setLoggedUser, setDataStatus } from '../redux/Users/userSlice';
import { AiOutlineLoading3Quarters } from "react-icons/ai"


const Login = () => {

    const dispatch = useDispatch();

    const [status, setStatus] = useState("idle")

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            setStatus("pending")
            const res = await axios.post("https://contact-backend-dk27.onrender.com/users/login", values).then((res) => {
                setStatus("succeeded")
                toast.success(res.data.message);
                dispatch(setLogged(true));
                dispatch(setLoggedUser(res.data.user));
                dispatch(setDataStatus("succeeded"))
                localStorage.setItem("token", JSON.stringify(res.data.token));
            }).catch((err) => {
                setStatus("error")
                toast.error(err.response.data.message)
            })


        },
        validationSchema: yup.object().shape({
            email: yup.string().email("Please enter a valid email address!").required("Please enter your email address!"),
            password: yup.string().required("Please enter a password!")
        })
    })



    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='bg-elements p-10 md:p-16 rounded-xl flex flex-col gap-4 justify-center items-center bg-primary'>
                <h1 className='text-xl font-bold'>Contact Login</h1>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='E-mail' name='email' />
                    {formik.errors.email && formik.touched.email && <small className='text-customRed text-xs px-2'>{formik.errors.email}</small>}
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='password' placeholder='Password' name='password' />
                    {formik.errors.password && formik.touched.password && <small className='text-customRed text-xs px-2'>{formik.errors.password}</small>}
                    <button disabled={status === "pending" ? true : false} type='submit' className='bg-body rounded-lg text-white text-lg flex items-center justify-center gap-4'>
                        {status === "pending" && <AiOutlineLoading3Quarters className='animate-spin' />}
                        {status === "pending" ? "Logging on..." : "Login"}
                    </button>
                    <small className='w-full text-center'>Are you not a member yet? <Link to="/register" className="text-body">Sign up!</Link></small>
                </form>
            </div>
        </div>
    )
}


export default Login;