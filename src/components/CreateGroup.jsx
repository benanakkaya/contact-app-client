import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUserData, setGroupEditMode, setGroupEditValues, setGroupModalVisibility } from '../redux/Users/userSlice';
import { MdGroupAdd } from "react-icons/md"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateGroup = () => {

    const { groupModalVisibility, loggedUser, groupEditValues, groupEditMode } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [members, setMembers] = useState([]);

    const closeModal = () => {
        dispatch(setGroupModalVisibility(false));
        dispatch(setGroupEditValues({}));
        dispatch(setGroupEditMode(false));
        setMembers([]);
        formik.resetForm();
    }

    const formik = useFormik({
        initialValues: {
            title: ""
        },
        onSubmit: async (values) => {
            const res = await axios.post(`http://localhost:5000/groups/${groupEditMode ? "edit" : "create"}`,
                groupEditMode ?
                    { title: values.title, members, owner: loggedUser._id, id: groupEditValues._id } :
                    { title: values.title, members, owner: loggedUser._id }).
                then((res) => {
                    toast.success(res.data.message);
                    dispatch(getLoggedUserData(loggedUser._id));
                    closeModal();
                }).
                catch((err) => {
                    toast.error(err.response.data.message);
                })
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Please enter a title!"),
        })
    });

    const handleSelect = (e, id) => {
        setMembers([...members, id]);
    }

    const handleDeselect = (e, id) => {
        const newMembers = members.filter((member) => member !== id);
        setMembers(newMembers);
    }

    useEffect(() => {
        setMembers([]);
        if (groupEditMode) {
            formik.setFieldValue("title", groupEditValues.title);
            let editMembers = [];
            groupEditValues.members.map((member) => {
                editMembers = [...editMembers, member._id];
            })
            setMembers(editMembers);
        }
    }, [groupEditValues])




    return (
        <>
            {groupModalVisibility &&
                <div className="fixed bottom-0 inset-x-0 px-4 pb-4 inset-0 flex items-center justify-center z-20" >
                    <div onClick={closeModal} className="fixed cursor-pointer inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                    </div>
                    <div className='flex flex-col gap-4 p-4 bg-primary z-30  absolute top-10  border-2 border-solid rounded-md'>
                        <div className="flex items-center justify-between">
                            <h1 className='text-lg  font-bold flex gap-2 items-center '><MdGroupAdd /> {groupEditMode ? "Edit" : "New"} Group</h1>
                            <button onClick={closeModal} className=' text-white hover:text-body font-bold w-4 h-4 flex items-center justify-center rounded-full p-1'>
                                X
                            </button>
                        </div>
                        <div className='bg-elements px-6 py-3 md:px-10 md:py-5 rounded-xl flex flex-col gap-2 justify-center items-center '>
                            <form method='POST' encType="multipart/form-data" onSubmit={formik.handleSubmit} className='flex flex-col gap-4 '>
                                <input defaultValue={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} className='text-background py-1 px-2 text-lg rounded-lg' type='text' placeholder='Title *' name='title' />
                                {formik.errors.title && formik.touched.title && <small className='text-customRed text-xs px-2'>{formik.errors.title}</small>}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-auto md:w-96'>
                                    <div className='col-span-1'>
                                        Add Member:
                                        <ul className='flex flex-col gap-1 h-40 overflow-auto bg-lightBlue p-2 mt-2 '>
                                            {loggedUser.contacts?.filter((con) => !members.includes(con._id)).map((contact) => (
                                                <li key={contact._id} className='flex gap-2 items-center '>
                                                    <AiFillPlusCircle className='text-green-400 cursor-pointer text-sm' onClick={(e) => handleSelect(e, contact._id)} />
                                                    <span>{contact.name} {contact.surname}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='col-span-1'>
                                        Current Members:
                                        <ul className='flex flex-col gap-1 h-40 overflow-auto bg-lightBlue p-2 mt-2 '>
                                            {loggedUser.contacts?.filter((con) => members.includes(con._id)).map((contact) => (
                                                <li key={contact._id} className='flex gap-2 items-center'>
                                                    <AiFillMinusCircle className='text-red-400 cursor-pointer text-sm' onClick={(e) => handleDeselect(e, contact._id)} />
                                                    <span>{contact.name} {contact.surname}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <button type="submit" className=' w-full bg-body py-1 rounded-md '>{groupEditMode ? "Edit" : "Create"}</button>
                            </form>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}

export default CreateGroup
