import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMemberListModal, setMemberListValues } from '../redux/Users/userSlice';
import { CgUserList } from "react-icons/cg"
import ContactCard from './ContactCard';

const GroupMemberList = () => {

    const dispatch = useDispatch();
    const { memberListModal, memberListValues, loggedUser } = useSelector((state) => state.user)

    const closeModal = () => {
        dispatch(setMemberListModal(false));
        dispatch(setMemberListValues([]));
    }






    return (
        <>
            {memberListModal &&
                <div className="fixed bottom-0 inset-x-0 px-4 pb-4 inset-0 flex items-center justify-center z-20" >
                    <div onClick={closeModal} className="fixed cursor-pointer inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                    </div>
                    <div className='flex flex-col gap-4 p-2 md:p-4 bg-primary z-30  absolute top-10  border-2 border-solid rounded-md'>
                        <div className="flex items-center justify-between">
                            <h1 className='text-lg  font-bold flex gap-2 items-center '><CgUserList /> Member List</h1>
                            <button onClick={closeModal} className=' text-white hover:text-body font-bold w-4 h-4 flex items-center justify-center rounded-full p-1'>
                                X
                            </button>
                        </div>
                        <div className='bg-elements p-3 md:p-5 w-full  rounded-xl flex flex-col gap-4 justify-center items-center '>
                            <form>
                                <label className='flex items-center gap-10'>
                                    Selected Group:
                                    <select defaultValue={memberListValues.title} onChange={(e) => dispatch(setMemberListValues(JSON.parse(e.target.value)))} className='text-primary px-2 '>
                                        {loggedUser.groups.map((group) => (
                                            <option value={JSON.stringify(group)} key={group._id}>{group.title}</option>
                                        ))}
                                    </select>
                                </label>
                            </form>
                            <div className='flex flex-col gap-1 w-full md:w-120 h-80 overflow-auto'>
                                {memberListValues.members.map((contact) => (
                                    <ContactCard contact={contact} key={contact._id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default GroupMemberList;