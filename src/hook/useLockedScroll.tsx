import React, { useLayoutEffect } from 'react'

export default function useLockedScroll(locked: boolean):void {
    useLayoutEffect(()=>{
        // 先將預設值取出
        const { overflow } = document.body.style
        if(locked) document.body.style.overflow = "hidden"
        return () =>{
            // 返還預設值
            document.body.style.overflow = overflow
        }
    }, [locked])
}
