import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdGroupAdd, MdGroupOff } from "react-icons/md"
import { setConfirmModalType, setConfirmModalVisibility, setGroupEditMode, setGroupEditValues, setGroupModalVisibility, setMemberListModal, setMemberListValues } from '../redux/Users/userSlice';

const GroupList = ({ searchInput, activeTab }) => {

    const { loggedUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const handleEdit = (group) => {
        dispatch(setGroupEditValues(group));
        dispatch(setGroupEditMode(true));
        dispatch(setGroupModalVisibility(true));
    }

    const handleDelete = (group) => {
        dispatch(setConfirmModalType("group"));
        dispatch(setConfirmModalVisibility(true));
        dispatch(setGroupEditValues(group));
    }

    const handleShowMembers = (group) => {
        dispatch(setMemberListValues(group));
        dispatch(setMemberListModal(true));
    }

    return (
        <>
            {loggedUser.groups?.length > 0 ?
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {loggedUser.groups?.slice().reverse().filter((gr) => (gr.title?.toLowerCase().includes(searchInput.toLowerCase()))).map((group) => (
                        <div key={group._id} className='flex flex-col justify-between p-5 bg-primary gap-2 items-center rounded-md h-40 group shadow-sm shadow-lightBlue cursor-pointer '>
                            <strong className='text-xl'>{group.title}</strong>
                            <div>Total Member: <strong>{group.members.length}</strong></div>
                            <div className="flex gap-2 md:gap-5 justify-center items-center">
                                <button onClick={() => handleShowMembers(group)} className="px-2 text-sm py-1 rounded-md bg-orange-400">Show Members</button>
                                <button onClick={() => handleEdit(group)} className="px-2 text-sm py-1 rounded-md bg-body">Edit</button>
                                <button onClick={() => handleDelete(group)} className="px-2 text-sm py-1 rounded-md bg-customRed">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className='flex items-center justify-center p-40'>
                    <div className='flex flex-col items-center justify-center gap-3'>
                        <MdGroupOff className='text-6xl text-white' />
                        <h2>You don't have any created groups yet!</h2>
                        <button onClick={() => dispatch(setGroupModalVisibility(true))} className='flex gap-2 items-center px-2 py-1 bg-orange-400 rounded-lg w-full justify-center'><MdGroupAdd /> New Group</button>
                    </div>
                </div>
            }
        </>
    )
}



export default GroupList;