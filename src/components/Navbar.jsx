import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserPlus, FaSignOutAlt } from "react-icons/fa"
import { MdGroupAdd } from "react-icons/md"
import { AiOutlineMenu } from "react-icons/ai"
import { setGroupModalVisibility, setLogged, setModalVisibility } from '../redux/Users/userSlice';
import { useDispatch } from 'react-redux';


const Navbar = () => {

    const dispatch = useDispatch();

    const [mobileMenu, setMobileMenu] = useState(false);

    const handleLogout = () => {
        dispatch(setLogged(false));
        localStorage.setItem("token", JSON.stringify(null));
    }


    return (
        <div className='bg-primary relative'>
            <div className='container px-6 md:px-12 flex items-center justify-between h-20 '>
                <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-bold">ContactAPP</Link>
                <ul className="hidden sm:flex items-center justify-end gap-3 text-xs md:text-sm ">
                    <li onClick={() => dispatch(setGroupModalVisibility(true))} className=' h-full flex gap-2 bg-orange-400 px-2 py-1 rounded-lg text- items-center cursor-pointer hover:bg-opacity-60'>
                        <MdGroupAdd /> New Group
                    </li>
                    <li onClick={() => dispatch(setModalVisibility(true))} className=' h-full flex gap-2 bg-body px-2 py-1 rounded-lg text- items-center cursor-pointer hover:bg-opacity-60'>
                        <FaUserPlus /> New Contact
                    </li>
                    <li onClick={handleLogout} className=' h-full flex gap-2 items-center rounded-lg hover:bg-opacity-60 cursor-pointer bg-customRed px-2 py-1'>
                        <FaSignOutAlt /> Logout
                    </li>
                </ul>
                <button onClick={() => setMobileMenu(!mobileMenu)} className='sm:hidden text-xl'><AiOutlineMenu /></button>
                {mobileMenu &&
                    <div className='sm:hidden absolute -bottom-28 border-b border-solid border-white p-4 left-0 bg-primary w-full '>
                        <ul className="flex flex-col w-full items-center justify-end gap-3 text-xs md:text-sm  ">
                            <li onClick={() => dispatch(setGroupModalVisibility(true))} className=' h-full flex gap-2 bg-orange-400 px-2 py-1 rounded-lg text- items-center cursor-pointer hover:bg-opacity-60'>
                                <MdGroupAdd /> New Group
                            </li>
                            <li onClick={() => dispatch(setModalVisibility(true))} className=' h-full flex gap-2 bg-body px-2 py-1 rounded-lg text- items-center cursor-pointer hover:bg-opacity-60'>
                                <FaUserPlus /> New Contact
                            </li>
                            <li onClick={handleLogout} className=' h-full flex gap-2 items-center rounded-lg hover:bg-opacity-60 cursor-pointer bg-customRed px-2 py-1'>
                                <FaSignOutAlt /> Logout
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
