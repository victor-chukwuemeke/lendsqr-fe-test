import { useEffect } from 'react'

// https://usehooks.com/useOnClickOutside/

type Event = MouseEvent | TouchEvent

const useOnClickOutside = (
    ref: React.RefObject<HTMLElement>,
    handler: (event: Event) => void
) => {
    useEffect(() => {
        const listener = (event: Event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return
            }

            handler(event)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}

export default useOnClickOutside
