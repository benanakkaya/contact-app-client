import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/Login';
import jwt_decode from "jwt-decode";
import { getLoggedUserData, setLogged } from '../redux/Users/userSlice';
import NewContact from '../components/NewContact';
import ConfirmModal from '../components/ConfirmModal';
import CreateGroup from '../components/CreateGroup';
import ContactList from '../components/ContactList';
import GroupList from '../components/GroupList';
import GroupMemberList from '../components/GroupMemberList';
import { AiOutlineLoading3Quarters } from "react-icons/ai"


const Homepage = () => {

    const dispatch = useDispatch();
    const { logged, status } = useSelector((state) => state.user);
    const [searchInput, setSearchInput] = useState("");
    const [activeTab, setActiveTab] = useState("contacts");

    useEffect(() => {
        const time = new Date().getTime() / 1000;
        const token = JSON.parse(localStorage.getItem("token"));

        if (token !== null) {
            var decoded = jwt_decode(token);

            if (time - decoded.exp < 0) {
                dispatch(setLogged(true));
                dispatch(getLoggedUserData(decoded.userID));
            }
        }

    }, [])

    const handleTab = (tabName) => {
        setActiveTab(tabName);
        setSearchInput("");
    }



    return (

        <div className='container px-6 py-3 md:px-12 md:py-6'>
            <GroupMemberList />
            <NewContact />
            <ConfirmModal />
            <CreateGroup />
            {logged === false &&
                <Login />
            }
            {logged &&
                <>
                    {status === "succeeded" ?
                        <div className='flex flex-col gap-5'>
                            <div className='flex items-end justify-between h-16 border-b-2 border-lightBlue'>
                                <ul className='h-full flex items-end'>
                                    <li onClick={() => handleTab("contacts")} className={`p-2 cursor-pointer text-xs md:text-sm rounded-tl-md rounded-tr-2xl flex items-center ${activeTab === "contacts" ? "bg-body" : "bg-lightBlue"} `}>Contacts</li>
                                    <li onClick={() => handleTab("groups")} className={`p-2 cursor-pointer text-xs md:text-sm  rounded-tl-md rounded-tr-2xl flex items-center ${activeTab === "groups" ? "bg-body" : "bg-lightBlue"}`}>Groups</li>
                                </ul>
                                <input defaultValue={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" className='px-2 py-1 w-32 md:w-auto text-xs md:text-sm mb-1 rounded-md text-primary' placeholder={`Search a ${activeTab === "contacts" ? "contact" : "group"}...`} />
                            </div>
                            {activeTab === "contacts" ? <ContactList searchInput={searchInput} activeTab={activeTab} /> : <GroupList searchInput={searchInput} activeTab={activeTab} />
                            }
                        </div>
                        :
                        <div className='h-96 w-full flex items-center justify-center'>
                            <AiOutlineLoading3Quarters className='animate-spin text-4xl' />
                        </div>
                    }
                </>
            }
        </div>


    )
}

export default Homepage
