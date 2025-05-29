import { FC, useMemo } from 'react'
import { matchsTwoStrings } from '../../utils/helpers'
import AccountProfile from '../../interfaces/AccountProfile'
import useAuth from '../../hooks/useAuth'

interface SuggestedPeapsProps {
    keySearch: string,
    suggestedPeaps: AccountProfile[],
    followAcc: (curId: string, targetId: string) => void
    unfollowAcc: (curId: string, targetId: string) => void
}

const SuggestedPeaps: FC<SuggestedPeapsProps> = ({ suggestedPeaps, keySearch, followAcc,unfollowAcc }) => {
    const curUser = useAuth().curUser
    const people = useMemo(() => {
        return suggestedPeaps.filter(person => {
            if (matchsTwoStrings(person.firstname.concat(person.lastname), keySearch) && person._id != curUser?._id) {
                return person
            }
        })
    }, [keySearch, suggestedPeaps])

    return (
        <div className='flex flex-col'>
            <h2 className='text-lg font-bold my-3'>Peaple you may Know...</h2>
            <div className=' h-60 overflow-y-auto pb-2 pt-1 pr-1'>
                {people.map((obj, index) => (
                    <div key={index} className='flex items-center justify-between my-1'>
                        <div className='flex items-center'>
                            <img
                                src={obj.profileImg || undefined}
                                className='rounded-full w-12 h-12 mr-4' alt="" />
                            <div>
                                <p className="font-bold">{obj.firstname}</p>
                                <p>{`@${obj.firstname} ${obj.lastname}`}</p>
                            </div>
                        </div>
                        {obj.followers.includes(curUser?._id || '') ? (
                            <button onClick={() => unfollowAcc(curUser?._id || '', obj._id)} className='btn'>Unfollow</button>
                        ) : (
                            <button onClick={() => followAcc(curUser?._id || '', obj._id)} className='btn'>Follow</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SuggestedPeaps;