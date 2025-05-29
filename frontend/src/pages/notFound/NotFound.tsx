import { FC } from 'react'

interface NotFoundProps {
  
}

const NotFound: FC<NotFoundProps> = ({  }) => {
  return (
    <div className='flex justify-center items-center h-screen text-red-700'>
     <p>Error. Page is not found, 404 Status</p>
    </div>
  )
}

export default NotFound;