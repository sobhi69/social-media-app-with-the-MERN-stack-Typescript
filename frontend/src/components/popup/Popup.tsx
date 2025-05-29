import { FC, ReactNode, useCallback, useEffect } from 'react'
import { FaXmark } from "react-icons/fa6";
interface PopupProps {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

const Popup: FC<PopupProps> = ({ children, isOpen, onClose }) => {
    const handleClickEscape = useCallback((event: KeyboardEvent) => {
        if (event.key == 'Escape') {
            onClose()
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleClickEscape)
        return () => {
            document.removeEventListener('keydown', handleClickEscape)
        }
    }, [handleClickEscape])

    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape') {
            onClose()
        }
    })

    return (
        <>
            {isOpen && (
                <div className='z-10 fixed left-0 right-0 top-0 bottom-0 flex justify-center items-start' style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <div className='z-12 flex flex-col bg-white p-4 rounded-lg mt-8 '>
                        <FaXmark className='cursor-pointer ml-auto mb-4' onClick={onClose} />
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Popup;