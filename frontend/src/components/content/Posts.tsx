import { FC, useMemo } from 'react'
import { GiRapidshareArrow } from 'react-icons/gi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoHeart } from 'react-icons/io5';
import { RiMessage2Line } from 'react-icons/ri';
import { FaXmark } from "react-icons/fa6";
import { Post } from '../../interfaces/Post';
import useAuth from '../../hooks/useAuth';

interface PostsProps {
    posts: Post[],
    isLoading: boolean,
    deletePost: (id: string) => Promise<void>
    addLike: (id: string) => Promise<void>
    deleteLike: (id: string) => Promise<void>
    curPage: "profile" | 'home'
}


const Posts: FC<PostsProps> = ({ posts, curPage, deletePost, isLoading, addLike, deleteLike }) => {
    const curUser = useAuth().curUser
    const postsToRender = useMemo(() => {
        return posts.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)).reverse()
    }, [posts])


    return (
        <>
            {isLoading ? 'loading...' : !isLoading && !postsToRender.length ?
                <div className='text-center mt-2'>No posts to show</div>
                : (
                    <>
                        {postsToRender.map((post, index) => (
                            <div className='bg-white p-4 my-4 flex flex-col justify-start rounded-lg' key={index}>
                                <div className='text-xl mb-2'>{post.caption}</div>
                                {curPage == 'profile' && (
                                    <FaXmark
                                        className='ml-auto cursor-pointer mb-2 text-xl text-red-500'
                                        onClick={() => deletePost(post._id)} />
                                )}
                                {post.photo && (
                                    <img className='w-full h-72 object-cover rounded-lg' src={post.photo || undefined} alt="" />
                                )}
                                <div className='flex items-center my-4 text-2xl'>
                                    <div>
                                        {post.likes.includes(curUser?._id || '')
                                            ? <IoHeart onClick={() => deleteLike(post._id)} className='w-full cursor-pointer text-gray-500' />
                                            : <IoMdHeartEmpty onClick={() => addLike(post._id)} className='w-full cursor-pointer text-gray-500 hover:scale-110 ease-in-out hover:text-gray-600' />
                                        }
                                    </div>
                                    <RiMessage2Line className='mx-5 cursor-pointer text-gray-500 hover:scale-110 ease-in-out hover:text-gray-600' />
                                    <GiRapidshareArrow className='cursor-pointer text-gray-500 hover:scale-110 ease-in-out hover:text-gray-600' />
                                </div>
                                <div className='text-gray-400 mb-4'>{!post.likes.length ? 0 : post.likes.length} {post.likes.length == 1 ? 'like' : "likes"}</div>

                            </div>
                        ))}
                    </>
                )}

        </>
    )
}

// alright the problem here is that 
// account, posts, likedPosts = ['id1','id2']
// posts = [id1,id3,id4,id2]
// once you're loged in the post like icon is turned to true 
// 
// alright 
// there are a few things you wnna get done here 
// get users and add them to the sidebar 
// 

export default Posts;