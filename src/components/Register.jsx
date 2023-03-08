import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            const res = await axios.post("http://localhost:5000/users/register", values).then((res) => {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/");
            }).catch((err) => {
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })


        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Please enter your name!"),
            surname: yup.string().required("Please enter your surname!"),
            email: yup.string().email("Please enter a valid email address!").required("Please enter your email address!"),
            password: yup.string().required("Please enter a password!").min(5, "Your password must be at least 5 characters long!")
        })
    })

    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='bg-elements p-10 md:p-16 rounded-xl flex flex-col gap-4 justify-center items-center bg-primary'>
                <h1 className='text-xl font-bold'>Contact Register</h1>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='Name' name='name' />
                    {formik.errors.name && formik.touched.name && <small className='text-customRed text-xs px-2'>{formik.errors.name}</small>}
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='Surname' name='surname' />
                    {formik.errors.surname && formik.touched.surname && <small className='text-customRed text-xs px-2'>{formik.errors.surname}</small>}
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='email' placeholder='E-mail' name='email' />
                    {formik.errors.email && formik.touched.email && <small className='text-customRed text-xs px-2'>{formik.errors.email}</small>}
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='password' placeholder='Password' name='password' />
                    {formik.errors.password && formik.touched.password && <small className='text-customRed text-xs px-2'>{formik.errors.password}</small>}
                    <button type="submit" className='bg-body rounded-lg text-white text-lg'>Register</button>
                    <small className='w-full text-center'>Are you already a member? <Link to="/" className="text-body">Log in!</Link></small>
                </form>
            </div>
        </div>
    )
}


export default Register;