import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUserData, setEditMode, setEditValues, setModalVisibility } from '../redux/Users/userSlice';
import * as yup from "yup";
import { FaUserPlus } from "react-icons/fa"
import { AiFillFileImage } from "react-icons/ai"
import axios from 'axios';
import { toast } from 'react-toastify';
import ImagePreview from './ImagePreview';

const NewContact = () => {

    const dispatch = useDispatch();

    
    const fileRef = useRef(null);

    const { modalVisibility, loggedUser, editValues, editMode } = useSelector((state) => state.user);


    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            nickname: "",
            email: "",
            phone: "",
            image: "https://i0.wp.com/www.mnleadership.org/wp-content/uploads/2017/02/Anonymous-Avatar.png"
        },
        onSubmit: async (values) => {
            const { image } = values;
            const formData = new FormData();
            var newImageUrl = values.image;


            if (typeof values.image !== "string") {
                try {
                    formData.append("file", image);
                    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
                    const res = await axios.post(import.meta.env.VITE_UPLOAD_URL, formData).then((res) => {
                        newImageUrl = res.data.secure_url;
                    })
                } catch (error) {
                    toast.error("Please try to create a contact without a photo!");
                }
            }

            if (editMode === false) {
                const res = await axios.post("http://localhost:5000/contacts/newContact",
                    {
                        name: values.name,
                        surname: values.surname,
                        nickname: values.nickname,
                        email: values.email,
                        phone: values.phone,
                        owner: loggedUser._id,
                        image: newImageUrl
                    }).then((res) => {
                        toast.success(res.data.message);
                        dispatch(getLoggedUserData(loggedUser._id));
                        closeModal();
                    }).catch((err) => {
                        toast.success(err.response.data.message);
                    })
            } else {
                const res = await axios.post("http://localhost:5000/contacts/editContact",
                    {
                        name: values.name,
                        surname: values.surname,
                        nickname: values.nickname,
                        email: values.email,
                        phone: values.phone,
                        id: editValues._id,
                        image: newImageUrl
                    }).then((res) => {
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
                        dispatch(getLoggedUserData(loggedUser._id));
                        closeModal();
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
            }



        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Please enter your name!"),
            surname: yup.string().required("Please enter your surname!"),
            phone: yup.string().required("Please enter a phone number!").matches(phoneRegExp, 'Phone number is not valid').min(10, "Phone number is too short").max(10, "Phone number is too long"),
        })
    })

    const closeModal = () => {
        dispatch(setModalVisibility(false));
        formik.resetForm();
        dispatch(setEditMode(false));
        dispatch(setEditValues({}));
    }

    useEffect(() => {
        if (editMode) {
            formik.setValues(editValues)
        }

    }, [editValues])





    return (
        <>
            {modalVisibility &&
                <div className="fixed bottom-0 inset-x-0 px-4 pb-4 inset-0 flex items-center justify-center z-20" >
                    <div onClick={closeModal} className="fixed cursor-pointer inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                    </div>
                    <div className='flex flex-col gap-4 p-4 bg-primary z-30  absolute top-15  border-2 border-solid rounded-md'>
                        <div className="flex items-center justify-between">
                            <h1 className='text-lg  font-bold flex gap-2 items-center '><FaUserPlus /> {editMode ? "Edit" : "New"} Contact</h1>
                            <button onClick={closeModal} className=' text-white hover:text-body font-bold w-4 h-4 flex items-center justify-center rounded-full p-1'>
                                X
                            </button>
                        </div>
                        <div className='bg-elements p-8 md:p-16 rounded-xl flex flex-col gap-4 justify-center items-center '>
                            {typeof (formik.values.image) !== "string" ? <ImagePreview image={formik.values.image} /> : <img src={formik.values.image} className='w-20 h-20 rounded-full' alt="default" />}
                            <form method='POST' encType="multipart/form-data" onSubmit={formik.handleSubmit} className='flex flex-col gap-4 '>
                                <input defaultValue={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='Name *' name='name' />
                                {formik.errors.name && formik.touched.name && <small className='text-customRed text-xs px-2'>{formik.errors.name}</small>}
                                <input defaultValue={formik.values.surname} onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='Surname *' name='surname' />
                                {formik.errors.surname && formik.touched.surname && <small className='text-customRed text-xs px-2'>{formik.errors.surname}</small>}
                                <input defaultValue={formik.values.nickname} onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='Nickname' name='nickname' />
                                <input defaultValue={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='Phone * (5xxxxxxxxx)' name='phone' />
                                {formik.errors.phone && formik.touched.phone && <small className='text-customRed text-xs px-2'>{formik.errors.phone}</small>}
                                <input defaultValue={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='E-mail' name='email' />
                                <div className='flex items-center gap-2 justify-center w-full'>
                                    <div className='flex-1 flex items-center justify-center'>
                                        <input
                                            ref={fileRef}
                                            hidden
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                                        />
                                        <button className='flex items-center justify-center py-1 gap-2 bg-lightBlue rounded-md w-full' type='button' onClick={() => fileRef.current.click()}>
                                            <AiFillFileImage /> Select Image
                                        </button>
                                    </div>
                                </div>


                                <button type='submit' className='bg-body rounded-lg text-white text-lg'>{editMode ? "Edit" : "Create"}</button>

                            </form>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default NewContact

