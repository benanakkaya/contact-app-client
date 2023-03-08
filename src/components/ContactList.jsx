import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ContactCard from './ContactCard';
import { FaUsersSlash, FaUserPlus } from "react-icons/fa";
import { setModalVisibility } from '../redux/Users/userSlice';

const ContactList = ({searchInput, activeTab}) => {

    const dispatch = useDispatch();
    const { loggedUser } = useSelector((state) => state.user);

    console.log(loggedUser);

    return (
        <>
            {loggedUser.contacts?.length > 0 ?
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {loggedUser.contacts?.slice().reverse().filter((con) => (con.nickname?.toLowerCase().includes(searchInput.toLowerCase()) || con.name?.toLowerCase().includes(searchInput.toLowerCase()))).map((contact) => (
                        <ContactCard key={contact._id} contact={contact} />
                    ))}
                </div>
                :
                <div className='flex items-center justify-center p-40'>
                    <div className='flex flex-col items-center justify-center gap-3'>
                        <FaUsersSlash className='text-6xl text-white' />
                        <h2>Your contact list is empty!</h2>
                        <button onClick={() => dispatch(setModalVisibility(true))} className='flex gap-2 items-center px-2 py-1 bg-body rounded-lg w-full justify-center'><FaUserPlus /> New Contact</button>
                    </div>
                </div>
            }
        </>
    )
}

export default ContactList
