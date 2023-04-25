import React, { useEffect, useRef, useState } from 'react'

const LazyLoad = ({ debounceNextPage }) => {
    const [visible, setVisible] = useState(false)
    const elementRef = useRef()


    useEffect(() => {
        const onChange = (entries) => {
            // console.log(visible);
            if (entries[0].isIntersecting) {
                // console.log("EFECTO");
                debounceNextPage();
            }
        }
        const observer = new IntersectionObserver(onChange, {
            rootMargin: '600px'
        })

        observer.observe(elementRef.current)

        // console.log("LAZY LOAD RENDERIZADO");

    }, [])

    return (

        <div ref={elementRef}>
            {visible ?
                <p>
                    LAZY LOAD
                    LAZY LOAD
                    LAZY LOAD
                    LAZY LOAD
                    LAZY LOAD
                    LAZY LOAD
                </p>
                :
                null}

        </div>

    )
}

export default LazyLoad