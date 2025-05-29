import { FC, FormEvent, useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import useAuth from '../../hooks/useAuth';
import Popup from '../popup/Popup';
import EditProfile from '../../interfaces/EditProfile';
import { Link } from 'react-router-dom';
import PopupMess from '../popupMess/PopupMess';
interface ProfileInfoProps {

}

const ProfileInfo: FC<ProfileInfoProps> = ({ }) => {
    const { curUser, logOut, updateUser, updateUserImg, updateUserCover } = useAuth()
    const [updateMode, setUpdateMode] = useState(false)
    const [form, setForm] = useState<EditProfile>({
        country: "",
        worksAt: "",
        livesIn: "",
        firstname: "",
        lastname: "",
        gender: "male",
        relationshipStatus: ''
    })

    const [loadingPopup, setLoadingPopup] = useState(false)

    useEffect(() => {
        if (curUser) {
            const {
                firstname, lastname,
                country, worksAt,
                gender, relationshipStatus,
                livesIn
            } = curUser
            setForm({
                firstname,
                lastname,
                country: country || '',
                worksAt: worksAt || '',
                gender,
                relationshipStatus: relationshipStatus || 'single',
                coverImg: form.profileImg,
                profileImg: form.coverImg,
                livesIn: livesIn || ''
            })
        }
    }, [updateMode])

    const updateForm = (prop: any) => {
        setForm(prev => {
            return { ...prev, ...prop }
        })
    }

    const handleChangeFile = (e: FormEvent, type: 'profile' | 'cover') => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }


        if (type == 'profile') {
            setForm(prev => {
                return { ...prev, profileImg: target.files[0] }
            })
        }
        if (type == 'cover') {
            setForm(prev => {
                return { ...prev, coverImg: target.files[0] }
            })
        }
    }



    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        updateUser(form)
        setLoadingPopup(true)


        if (form.profileImg) {
            updateUserImg(form.profileImg)
        }

        if (form.coverImg) {
            updateUserCover(form.coverImg)
        }

        setUpdateMode(false)
        setTimeout(() => {
            setLoadingPopup(false)
        }, 5000)
    }

    return (
        <div>
            <PopupMess isOpen={loadingPopup} />
            <div className='mt-3 rounded-2xl p-3 bg-gradient-to-b from-white to-slate-200 flex flex-col items-center'>
                <div className='flex justify-between items-center w-full'>
                    <h4 className='font-bold text-lg'>Profile Info</h4>
                    <MdEdit
                        onClick={() => setUpdateMode(true)}
                        className='cursor-pointer text-2xl my-4' />
                </div>
                <div className='flex justify-start flex-col w-full'>
                    <h2 className='font-bold'>Works at : <span className='font-medium'>{curUser?.worksAt || 'unkown'}</span></h2>
                    <h2 className='font-bold my-1'>Lives in : <span className='font-medium'>{curUser?.livesIn || 'unkown'}</span></h2>
                    <h2 className='font-bold'>Status : <span className='font-medium'>{curUser?.relationshipStatus || 'unkown'}</span></h2>
                    <h2 className='font-bold'>Gender : <span className='font-medium'>{curUser?.gender || 'unkown'}</span></h2>
                </div>
                <div className='flex justify-between w-full mt-20 '>
                    <Link to={'/'}><IoHomeSharp className='cursor-pointer text-2xl hover:text-purple-700 delay-75 hover:scale-125' /></Link>
                    <button className='btn ' onClick={logOut}>Log Out</button>
                </div>
            </div>
            <Popup isOpen={updateMode} onClose={() => setUpdateMode(false)}>
                <div className='flex flex-col items-center p-4'>
                    <h1 className='text-xl font-bold mb-4'>Update Your Info</h1>

                    <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-start'>
                        <div className='flex'>
                            <input
                                value={form.firstname}
                                onChange={(e) => updateForm({ firstname: e.target.value })}
                                type="text"
                                required
                                className='mr-2'
                                placeholder='First Name' />

                            <input
                                value={form.lastname}
                                onChange={(e) => updateForm({ lastname: e.target.value })}
                                required
                                type="text"
                                placeholder='Last Name' />
                        </div>
                        <input
                            value={form.worksAt}
                            onChange={(e) => updateForm({ worksAt: e.target.value })}
                            type="text"
                            className='w-1/2'
                            placeholder='WorksAt' />
                        <div className='flex items-center justify-between'>
                            <div>
                                <label className='mr-2' htmlFor="relationshipStatus">RelationshipStatus: </label>
                                <select
                                    onChange={(e) => updateForm({ relationshipStatus: e.target.value })}
                                    id='gender' className='my-1 p-2 rounded-sm'>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>
                            <div >
                                <label className='mr-2' htmlFor="gender">Gender: </label>
                                <select
                                    onChange={(e) => updateForm({ gender: e.target.value })}
                                    id='gender' className='my-1 p-2 rounded-sm'>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <input
                            value={form.livesIn}
                            onChange={(e) => updateForm({ livesIn: e.target.value })}
                            type="text"
                            placeholder='LivesIn' />
                        <input
                            value={form.country}
                            onChange={(e) => updateForm({ country: e.target.value })}
                            type="text"
                            placeholder='Country' />

                        <div className='flex flex-col items-center'>
                            <div>
                                <label htmlFor="profileImg">Profile Image: </label>
                                <input
                                    onChange={(e) => handleChangeFile(e, 'profile')}
                                    type="file" id="profileImg" />
                            </div>
                            <div>
                                <label htmlFor="coverImg">Cover Image: </label>
                                <input
                                    onChange={(e) => handleChangeFile(e, 'cover')}
                                    type="file" id="coverImg" />
                            </div>
                        </div>

                        <button className='btn mt-4 m-auto' type='submit'>Update</button>
                    </form>
                </div>
            </Popup>
        </div>
    )
}

export default ProfileInfo;
