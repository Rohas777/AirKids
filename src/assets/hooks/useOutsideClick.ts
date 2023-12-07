import React, { RefObject } from 'react'

export const useOutsideClick = (
        elementRef:RefObject<HTMLDivElement>, 
        handler: () => void, 
        attached: Boolean = true
    ) => { 
    React.useEffect(() => {
        if (!attached) return

        const handleClick = (event: MouseEvent) => {
            if (!elementRef.current) return
            if (!elementRef.current.contains(event.target as HTMLElement)) {
                handler()
            }
        }

        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }

    }, [elementRef, handler, attached])
}