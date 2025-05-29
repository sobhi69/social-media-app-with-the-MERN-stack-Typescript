import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { IoNotifications } from 'react-icons/io5';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import { MdDelete } from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import RecievedNotification from '../../interfaces/RecievedNotification';
import useGetData from '../../hooks/useFetch';
import Popup from '../popup/Popup';
import { axiosInstance } from '../../api/axiosInstance';

interface NotificationsProps {

}

const Notifications: FC<NotificationsProps> = ({ }) => {
    const curUser = useAuth().curUser
    const initalVal: RecievedNotification[] = []
    const [showNotifications, setShowNotifications] = useState(false)
    const { getData, data: myNotifications, setData: setMyNotifications } = useGetData(`/notification/my-notifications/${curUser?._id}`, initalVal)
    useEffect(() => {
        getData()

    }, [])


    const markAsSeen = async () => {
        const newNotifications = myNotifications.map(not => {
            return { ...not, seen: true }
        })

        setMyNotifications(newNotifications)

        try {
            await axiosInstance.put(`/notification/mark-notes-as-seen/${curUser?._id}`)
        } catch (error) {

        }
    }

    const unseenNotes = useMemo(() => {
        return myNotifications.filter(not => not.seen == false).length
    }, [myNotifications])


    const formatDate = useCallback((date: string) => {
        const first = date.slice(0, 10)
        const last = date.slice(11, 19)
        return { first, last }
    }, [myNotifications])

    const deleteAllNotes = async () => {
        const confirm = window.confirm('are you sure to delete all the notifications!')
        if (!confirm) {
            return
        }
        
        setMyNotifications([])
        try {
            await axiosInstance.delete(`/notification/delete-my-notifications/${curUser?._id}`)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <div className='relative'>
                <IoNotifications
                    onClick={() => setShowNotifications(true)}
                    className='cursor-pointer hover:text-purple-700 delay-75 hover:scale-125 text-2xl' />
                <div className="w-5 h-5 absolute bg-red-500 text-white text-center leading-[1.1rem] rounded-full text-[0.9rem] pointer-events-none p1 -top-2 left-2 font-bold">{unseenNotes}</div>
            </div>
            <Popup isOpen={showNotifications} onClose={() => setShowNotifications(false)} >
                {myNotifications.length ? (
                    <div>
                        <div className='flex items-center mb-2'>
                            <h2>Mark all as seen</h2>
                            <IoCheckmarkCircleOutline
                                onClick={markAsSeen}
                                className='ml-2 text-green-700 cursor-pointer text-2xl' />
                        </div>
                        <div className='flex items-center mb-2'>
                            <h2 className='text-lg'>delete all notifications</h2>
                            <MdDelete
                                onClick={deleteAllNotes}
                                className='ml-2 text-red-700 cursor-pointer text-xl' />
                        </div>
                    </div>
                ) : "no notifications!"}
                <div className='h-96 overflow-y-auto pr-4'>
                    {myNotifications.map((note, index) => (
                        <div key={index} className={`flex flex-col border-b ${note.seen && 'border-r'} border-gray-700 p-2 rounded-sm my-2`}>
                            <div className='flex items-center'>
                                <img src={note.toAcc.profileImg} className='w-12 h-12 mr-2 rounded-full' alt="" />
                                <h2>{note.toAcc.firstname} {note.toAcc.lastname} {note.noteType == 'newFollower' ? "followed you!" : 'unfollwed you'} </h2>
                            </div>
                            <div className='flex justify-between items-start mt-2'>
                                <div>
                                    <div className='ml-2 text-lg text-gray-500'>{formatDate(note.createdAt).first}</div>
                                    <div className='ml-2 text-sm text-gray-500'>{formatDate(note.createdAt).last}</div>
                                </div>
                                {!note.seen ? (
                                    <IoCheckmarkOutline />
                                ) : (
                                    <IoCheckmarkDoneOutline />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Popup>
        </div>
    )
}

export default Notifications;