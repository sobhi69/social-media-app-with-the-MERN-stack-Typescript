import { FC, useEffect, useState } from 'react'

import SearchDiv from './SearchDiv';
import SuggestedPeaps from './SuggestedPeaps';
import SideProfile from './SideProfile';
import ProfileInfo from './ProfileInfo';
import useGetData from '../../hooks/useFetch';
import AccountProfile from '../../interfaces/AccountProfile';
import { axiosInstance } from '../../api/axiosInstance';
import useAuth from '../../hooks/useAuth';
interface SidebarProps {
    curPage: "home" | 'profile'
}


const Sidebar: FC<SidebarProps> = ({ curPage }) => {
    const { setCurUser } = useAuth()
    const [keySearch, setKeySearch] = useState('')
    const initalVal: AccountProfile[] = []
    const { getData, data: suggestedPeaps, setData: setSuggestedPeaps } = useGetData('/account/get-all', initalVal)
    useEffect(() => {
        getData()
    }, [])


    const followAcc = async (curId: string, targetId: string) => {
        let curFollowingArr
        let targetFollowersArr
        const updatedState = suggestedPeaps.map(acc => {
            if (acc._id == targetId) {
                targetFollowersArr = [...acc.followers, curId]
                return { ...acc, followers: targetFollowersArr }
            }
            if (acc._id == curId) {
                curFollowingArr = [...acc.following, targetId]
                return { ...acc, following: curFollowingArr }
            } else {
                return acc
            }
        })
        setSuggestedPeaps(updatedState)


        try {
            const response = await axiosInstance.put('/account/toggle-follow', { curId, targetId, curFollowingArr, targetFollowersArr, noteType: "newFollower" })
            setCurUser(response.data)
            localStorage.setItem('curUser', JSON.stringify(response.data))
        } catch (error) {
            alert(error)
        }
    }

    const unfollowAcc = async (curId: string, targetId: string) => {
        const confirm = window.confirm(`are you sure to unfollow this account!`)
        if (!confirm) {
            return
        }
        const curFollowingArr = suggestedPeaps.find(acc => acc._id == curId)?.
            following.filter(foll => foll != targetId)

        const targetFollowersArr = suggestedPeaps.find(acc => acc._id == targetId)?.
            followers.filter(foll => foll != curId)

        const updatedState = suggestedPeaps.map(acc => {
            if (acc._id == targetId) {
                return { ...acc, followers: !targetFollowersArr ? acc.followers : targetFollowersArr }
            }
            if (acc._id == curId) {
                return { ...acc, following: !curFollowingArr ? acc.following : curFollowingArr }
            } else {
                return acc
            }
        })
        setSuggestedPeaps(updatedState)

        try {
            const response = await axiosInstance.put('/account/toggle-follow', { curId, targetId, curFollowingArr, targetFollowersArr, noteType: "unfollow" })
            setCurUser(response.data)
            localStorage.setItem('curUser', JSON.stringify(response.data))
        } catch (error) {
            alert(error)
        }

    }

    return (
        <div className='w-[17rem] sidebar mr-10 fixed'>
            <SearchDiv setKeySearch={setKeySearch} />
            {curPage == 'home' ? (
                <SideProfile />
            ) : (
                <ProfileInfo />
            )}
            <SuggestedPeaps
                keySearch={keySearch}
                suggestedPeaps={suggestedPeaps}
                followAcc={followAcc}
                unfollowAcc={unfollowAcc}
            />
        </div>
    )
}

export default Sidebar;
// keySearch setKeySearch