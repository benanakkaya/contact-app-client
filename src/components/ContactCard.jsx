import React from 'react';
import { FaUserEdit, FaUserMinus } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { setConfirmModalType, setConfirmModalVisibility, setEditMode, setEditValues, setModalVisibility } from '../redux/Users/userSlice';

const ContactCard = ({ contact }) => {

    const dispatch = useDispatch();
    const { memberListModal } = useSelector((state) => state.user)


    const handleEdit = () => {
        dispatch(setEditMode(true));
        dispatch(setModalVisibility(true));
        dispatch(setEditValues(contact));
        dispatch(setConfirmModalType("contact"));
    }

    const handleDelete = async () => {
        dispatch(setConfirmModalVisibility(true));
        dispatch(setEditValues(contact));
        dispatch(setConfirmModalType("contact"));
    }


    return (
        <div className='flex flex-col lg:flex-row items-center gap-5 lg:gap-10  bg-primary rounded-md p-5 lg:p-8 lg:h-40 group shadow-sm shadow-lightBlue cursor-pointer '>
            <div className='flex flex-col items-center justify-between gap-3 lg:gap-1'>
                <img className='border-body border-2 border-solid w-20 h-20 md:w-24 md:h-24 rounded-full lg:group-hover:rounded-none transition-all duration-400' src={contact.image} alt={contact.name} />
                {memberListModal === false &&
                    <div className='flex flex-col gap-1 items-center text-xs'>
                        <button onClick={handleEdit} className='flex lg:hidden lg:group-hover:flex items-center gap-2 h-full bg-body hover:bg-opacity-60 rounded-lg px-2 w-full'><FaUserEdit /> Edit Contact</button>
                        <button onClick={handleDelete} className='flex lg:hidden lg:group-hover:flex items-center gap-2 h-full bg-customRed hover:bg-opacity-60 rounded-lg px-2'><FaUserMinus /> Delete Contact</button>
                    </div>
                }
            </div>
            <div >
                <ul className='flex flex-col gap-1 text-xs md:text-sm'>
                    <li className='text-body font-bold'>Name: <span className='text-white font-normal'>{contact.name}</span></li>
                    <li className='text-body font-bold'>Surname: <span className='text-white font-normal'>{contact.surname}</span></li>
                    <li className='text-body font-bold'>Nickname: <span className='text-white font-normal'>{contact.nickname}</span></li>
                    <li className='text-body font-bold'>Phone: <span className='text-white font-normal'>{contact.phone}</span></li>
                    <li className='text-body font-bold flex gap-1'>E-mail: <span className='text-white font-normal'>{contact.email}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default ContactCard
