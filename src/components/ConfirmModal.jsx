import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUserData, setConfirmModalVisibility, setEditValues, setGroupEditValues } from '../redux/Users/userSlice';

const ConfirmModal = () => {

    const { confirmModalVisibility, editValues, confirmModalType, groupEditValues } = useSelector((state) => state.user);


    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setConfirmModalVisibility(false));
        dispatch(setEditValues({}));
        dispatch(setGroupEditValues({}));
    }

    const handleDelete = async () => {
        if (confirmModalType === "contact") {
            const res = await axios.post("https://contact-backend-dk27.onrender.com/contacts/deleteContact", { id: editValues._id });
            dispatch(setEditValues({}));
            dispatch(getLoggedUserData(editValues.owner));
        }
        if (confirmModalType === "group") {
            const res = await axios.post("https://contact-backend-dk27.onrender.com/groups/delete", { id: groupEditValues._id });
            dispatch(setGroupEditValues({}));
            dispatch(getLoggedUserData(groupEditValues.owner));
        }
        closeModal();
    }


    return (
        <>
            {confirmModalVisibility &&
                <div className="fixed bottom-0 inset-x-0 px-4 pb-4 inset-0 flex items-center justify-center z-20" >
                    <div onClick={closeModal} className="fixed cursor-pointer inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                    </div>
                    <div className='flex flex-col gap-4 p-6 md:p-10 bg-primary z-30  absolute top-15  border-2 border-solid rounded-md'>
                        <div className='bg-elements rounded-xl flex flex-col gap-4 justify-center items-center '>
                            <strong className='text-lg'>Are you sure you want to delete?</strong>
                            <div className='flex items-center justify-center gap-5'>
                                <button onClick={handleDelete} className='px-2 py-1 bg-customRed hover:bg-opacity-60 rounded-md'>Delete</button>
                                <button onClick={closeModal} className='px-2 py-1 bg-body hover:bg-opacity-60 rounded-md'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ConfirmModal
