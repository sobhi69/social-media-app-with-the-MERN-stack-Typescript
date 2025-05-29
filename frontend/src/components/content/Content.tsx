// بسم الله الرحمن الرحيم 
import { FC, useEffect, useMemo } from 'react'
import Posts from './Posts';
import { Post } from '../../interfaces/Post';
import WriteCaption from './CreatePost';
import useGetData from '../../hooks/useFetch';
import useAuth from '../../hooks/useAuth';
import PostForm from '../../interfaces/PostForm';
import { axiosInstance } from '../../api/axiosInstance';
interface ContentProps {
    curPage: "home" | "profile"
}


const Content: FC<ContentProps> = ({ curPage }) => {

    const initalVal: Post[] = []
    const { getData, data: posts, setData: setPosts, isLoading } = useGetData('/post/get-posts', initalVal)
    useEffect(() => {
        getData()
    }, [])

    const { curUser, setCurUser } = useAuth()
    const matchingPosts = useMemo(() => {
        return posts.filter(post => post.account == curUser?._id).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)).reverse()
    }, [posts])

    const createPost = async (postForm: PostForm) => {
        const formData = new FormData()

        formData.append('caption', postForm?.caption || '')
        if (postForm.photo) {
            formData.append('file', postForm.photo || '')
        }
        if (postForm.video) {
            formData.append('file', postForm.video || '')
        }
        formData.append('account', curUser?._id || '')

        try {
            const response = await axiosInstance.post('/post/create-post', formData, {
                headers: { Authorization: `Bearer ${curUser?.token}` }
            })

            const newPost = response.data.newPost
            setCurUser(response.data.updatedAccount)
            localStorage.setItem('curUser', JSON.stringify(response.data.updatedAccount))
            setPosts(prev => {
                return [newPost, ...prev]
            })
        } catch (error) {
            alert(error)
        }
    }

    const deletePost = async (id: string) => {
        const confirm = window.confirm('are you sure to delete that post?')

        if (!confirm) {
            return
        }

        try {
            const response =await axiosInstance.delete(`/post/delete-post?postId=${id}&userId=${curUser?._id}`, {
                headers: { Authorization: `Bearer ${curUser?.token}` }
            });
            
            setCurUser(response.data)
            localStorage.setItem('curUser',JSON.stringify(response.data))

            const newPosts = posts.filter(post => post._id != id)
            setPosts(newPosts)
        } catch (error) {
            alert(error)
        }
    }

    const addLike = async (id: string) => {
        let likesArr
        const updatedPosts = posts.map(post => {
            if (post._id == id) {
                likesArr = [...post.likes, curUser?._id || '']
                return { ...post, liked: true, likes: likesArr }
            } else {
                return post
            }
        })

        setPosts(updatedPosts)

        try {
            await axiosInstance.post('/post/toggle-like', { postId: id, likesArr })
        } catch (error) {
            alert(error)
        }
    }
    const deleteLike = async (id: string) => {
        const likesArr = posts.find(post => post._id == id)?.likes.filter(str => str != curUser?._id)

        const updatedPosts = posts.map(post => {
            if (post._id == id) {
                return { ...post, liked: !post.liked, likes: likesArr != undefined ? likesArr : post.likes }
            } else {
                return post
            }
        })

        setPosts(updatedPosts)
        try {
            await axiosInstance.post('/post/toggle-like', { postId: id, likesArr })
        } catch (error) {
            alert(error)
        }
    }


    return (
        <div className={`${curPage == 'home' ? 'ml-[18rem] w-2/3' : ""}`}>
            <WriteCaption createPost={createPost} />
            <Posts
                isLoading={isLoading}
                deletePost={deletePost}
                curPage={curPage}
                addLike={addLike}
                deleteLike={deleteLike}
                posts={curPage == 'home' ? posts : matchingPosts} />
        </div>
    )
}

// alright what's about the follow and unfollow 
// first we kida wanna send a note to the account that is being follwed 
// curId targetId
// curId follwing +1
// targetId followers +1 and a notifcation 
// notification 
// message 
// seen 
// from 
// 

export default Content;

