import { FC } from 'react'
import { FaTwitter } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';

interface SearchDivProps {
    setKeySearch:React.Dispatch<React.SetStateAction<string>>
}

const SearchDiv:FC<SearchDivProps> = ({setKeySearch}) => {
    return (
        <div className="flex items-center">
            <FaTwitter color="rgb(62, 30, 160)" className='mr-4' size={'3rem'} />
            <div className="flex items-center relative">
                <input 
                onChange={(e) => setKeySearch(e.target.value)}
                type='search' 
                placeholder='#Search' 
                className='outline-none ' />
                <IoMdSearch
                    className='text-3xl 
                  bg-purple-700
                     rounded-lg
                      text-white
                      absolute
                      right-1
                      p-1
                      cursor-pointer
                     font-bold'/>
            </div>
        </div>
    )
}

export default SearchDiv;