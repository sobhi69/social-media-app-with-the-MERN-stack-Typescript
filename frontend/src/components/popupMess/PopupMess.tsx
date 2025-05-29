import { FC } from 'react'
import './popupMess.css'
interface PopupMessProps {
    isOpen: boolean
}

const PopupMess: FC<PopupMessProps> = ({ isOpen }) => {
    return (
        <>
            {isOpen && (
                <div style={{ background: "rgba(0,0,0,0.50)" }} className='z-20 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                    <div className='text-xl text-nowrap pupup-mess' >loading .......................</div>
                </div>
            )}
        </>
    )
}

export default PopupMess;