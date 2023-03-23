import React, { useEffect, useRef, useState } from 'react'

const LazyLoad = ({ nextPage }) => {
    const [visible, setVisible] = useState(false)
    const elementRef = useRef()


    useEffect(() => {
        const onChange = (entries) => {
            console.log(visible);
            // console.log("ENTRIES----> ", entries);
            if (entries[0].isIntersecting) {
                console.log("EFECTO");
                nextPage();
                setVisible(entries[0].isIntersecting)
                // observer.disconnect()
                // console.log("EJECUTA DISCONECT");
            }
        }
        const observer = new IntersectionObserver(onChange, {
            rootMargin: '200px'
        })

        observer.observe(elementRef.current)

        console.log("LAZY LOAD RENDERIZADO");

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