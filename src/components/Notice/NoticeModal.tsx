import React, { useContext, useEffect, useRef } from 'react'
import useLockedScroll from '../../hook/useLockedScroll'
import Button from '../Button/Button'
import { DataContext } from '../../context/DataContext'
import { Fade } from 'react-awesome-reveal'

const NoticeModal = () => {
    const { openModal ,setOpenModal } = useContext(DataContext)
    const modalRef = useRef<HTMLDivElement | null>(null)
    useLockedScroll(openModal.isOpen)
    useEffect(()=>{
       if(openModal && modalRef.current) modalRef.current.focus()
    },[openModal])
  return (
    <section  className='notice fixed inset-0 z-70 bg-black/50 w-screen  flex items-start justify-center backdrop-blur-sm'>
        <Fade direction='up' duration={500}>
            <div ref={modalRef} className='bg-black ring-2 ring-white/50 rounded py-2 px-4 mt-20 w-[92vw] max-w-lg flex flex-col gap-4 '>
                <div className='flex justify-start'>
                    <h3 className='text-2xl font-bold' >{openModal.title}</h3>
                </div>
                <div className='modal min-h-30 border border-white/50 flex items-center justify-center px-4'>
                    <p className='text-xl'>{openModal.text}</p>
                </div>
                <div className='flex justify-end py-2'>
                    <Button 
                        label='Confirm' 
                        type="button" 
                        className={`hover:bg-white hover:scale-110 `}
                        onClick={()=> setOpenModal(false)} />
                </div>
            </div>
        </Fade>      
    </section>
  )
}


export default NoticeModal
