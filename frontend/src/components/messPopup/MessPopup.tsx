import { FC } from 'react'

interface MessPopupProps {
    text:string
}

const MessPopup: FC<MessPopupProps> = ({ text }) => {
  return (
    <div>
     {text}
    </div>
  )
}

export default MessPopup;