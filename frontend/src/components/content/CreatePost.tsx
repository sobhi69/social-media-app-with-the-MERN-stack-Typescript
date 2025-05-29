import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { IoMdPhotos } from 'react-icons/io';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { FaXmark } from "react-icons/fa6";
import Popup from '../popup/Popup';
import PostForm from '../../interfaces/PostForm';
import useAuth from '../../hooks/useAuth';
import PopupMess from '../popupMess/PopupMess';

interface CreatePostProps {
    createPost: (postData: PostForm) => void,
    loading:boolean
}

const CreatePost: FC<CreatePostProps> = ({ createPost,loading }) => {
    const [postPopup, setPostPopup] = useState(false)
    const popInput = useRef<HTMLInputElement | null>(null)
    const [postForm, setPostForm] = useState<PostForm>({
        caption: "",
        account: ""
    })
    const curUser = useAuth().curUser


    useEffect(() => {
        popInput.current?.focus()
        setPostForm(prev => {
            return { ...prev, photo: undefined, video: undefined }
        })
    }, [postPopup])

    const submitPost = (e: FormEvent) => {
        e.preventDefault()

        if (!postForm.caption && !postForm.photo && !postForm.video) {
            alert('please add a caption!')
            return
        }

        createPost(postForm)
        setPostPopup(false)
    }

    const updateForm = (prop: any) => {
        setPostForm(prev => {
            return { ...prev, ...prop }
        })
    }
    const handleChangeFile = (e: FormEvent, file: "photo" | 'video' | 'delete') => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }

        if (file == 'photo') {
            if (!target.files[0].type.startsWith('image')) {
                alert('please choose a photo!')
                return
            }
            setPostForm(prev => {
                return { ...prev, photo: target.files[0], video: undefined }
            })
        }
        if (file == 'delete') {

            setPostForm(prev => {
                return { ...prev, photo: undefined, video: undefined }
            })
        }

        
        if (file == 'video') {
            if (!target.files[0].type.startsWith('video')) {
                alert('please choose a video!')
                return
            }

            setPostForm(prev => {
                return { ...prev, video: target.files[0], photo: undefined }
            })
        }
    }

    return (
        <>
            <PopupMess isOpen={loading}/>
            <div className='p-3 rounded-lg bg-white'>
                <div className='flex items-center mb-4'>
                    <img
                        className='mr-3 rounded-full w-8 h-8'
                        src={curUser?.profileImg} alt="" />
                    <input
                        onClick={() => setPostPopup(true)}
                        className='w-full'
                        type="text"
                        placeholder='Write a cation..' />
                </div>
                <div className='flex justify-end items-center'>
                    <div>
                        <input
                            onClick={() => {
                                if (!postPopup) {
                                    setPostPopup(true)
                                }
                            }}
                            style={{ display: "none" }}
                            onChange={(e) => handleChangeFile(e, 'photo')}
                            type="file" id="photo" />
                        <label className='flex items-center cursor-pointer text-green-400' htmlFor="photo">
                            <IoMdPhotos />
                            <p>Photos</p>
                        </label>
                    </div>
                    <div className='ml-4 lg:ml-10'>
                        <input
                            onClick={() => {
                                if (!postPopup) {
                                    setPostPopup(true)
                                }
                            }}
                            style={{ display: "none" }} type="file" id="video" />
                        <label className='flex items-center cursor-pointer text-purple-700' htmlFor="video">
                            <IoPlayCircleOutline />
                            <p>Video</p>
                        </label>
                    </div>

                    <button
                        onClick={() => {
                            if (!postPopup) {
                                setPostPopup(true)
                            }
                        }}
                        className='btn mx-4 lg:ml-8 lg:mr-4'>Share </button>
                </div>
            </div>
            <Popup onClose={() => setPostPopup(false)} isOpen={postPopup}>
                <form onSubmit={(e) => submitPost(e)}>
                    <div className='flex items-center mb-4'>
                        <img
                            className='mr-3 rounded-full w-8 h-8'
                            src={curUser?.profileImg} alt="" />
                        <input
                            ref={popInput}
                            onClick={() => setPostPopup(true)}
                            onChange={(e) => updateForm({ caption: e.target.value })}
                            className='h-auto text-wrap min-w-96'
                            type="text"
                            placeholder='Write a cation..' />
                    </div>
                    <div className='flex justify-end items-center mr-4'>
                        <label className='flex items-center cursor-pointer text-green-400' htmlFor="photo">
                            <IoMdPhotos />
                            <p>Photos</p>
                        </label>
                        <input
                            onChange={(e) => handleChangeFile(e, 'photo')}
                            style={{ display: "none" }} type="file" id="photo" />

                        <div className='ml-4 lg:ml-10'>
                            <label
                             className='flex items-center cursor-pointer text-purple-700' htmlFor="postVideo">
                                <IoPlayCircleOutline  />
                                <p >Video</p>
                            </label>
                           <input type="file" style={{display:"none"}} name="" id="postVideo" />
                        </div>

                        <button className='btn mx-4 lg:ml-8 lg:mr-4'>Share</button>
                    </div>
                </form>
                {postForm.photo && (
                    <div className="relative my-2 w-full h-72">
                        <img src={URL.createObjectURL(postForm.photo)} className='my-4 w-full h-full object-scale-down' alt="" />
                        <FaXmark className='absolute -top-1 right-0 cursor-pointer text-lg' onClick={(e) => handleChangeFile(e, 'delete')} />
                    </div>
                )}
                {postForm.video && (
                    <div className=' w-[37rem] relative'>
                        <video controls className='mt-4 w-full' src={URL.createObjectURL(postForm.video)}></video>
                        <FaXmark className='absolute -top-1 right-0 cursor-pointer text-lg'  onClick={(e) => handleChangeFile(e, 'delete')}/>
                    </div>
                )}
            </Popup>
        </>
    )
}

export default CreatePost;