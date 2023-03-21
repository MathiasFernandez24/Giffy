import React, { useEffect, useRef, useState } from 'react'

const LazyLoad = () => {
    const [visible, setVisible] = useState(false)
    const elementRef = useRef()
    const [boton, setBoton] = useState(true)


    useEffect(() => {
        console.log("EFECTO");
        const onChange = (entries) => {
            console.log("ENTRIES----> ", entries);
            if (entries[0].isIntersecting) {
                setVisible(entries[0].isIntersecting)
                observer.disconnect()
                console.log("EJECUTA DISCONECT");
            }
        }
        const observer = new IntersectionObserver(onChange, {
            rootMargin: '200px'
        })

        observer.observe(elementRef.current)

        console.log("LAZY LOAD RENDERIZADO");

    }, [])
    console.log(visible);

    return (

        <div ref={elementRef}>
            <button onClick={() => setBoton(!boton)}>BOTONCITO</button>
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