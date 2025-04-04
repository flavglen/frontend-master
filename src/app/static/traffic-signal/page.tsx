"use client"
import { useEffect, useMemo, useState } from "react"

export default function TrafficSignal() {
    const order = ['R', 'Y', 'G']

    const backGround = {
        G: 'green',
        R: 'red',
        Y: 'yellow'
    }
    const pattern = [
        { s1: 'G', s2: 'R' },
        { s1: 'Y', s2: 'R' },
        { s1: 'R', s2: 'G' },
        { s1: 'G', s2: 'Y' }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSignal = useMemo(() => pattern[currentIndex], [currentIndex])
    const [showTimer, setShowTimer] = useState(0);

    useEffect(() => {
        const current = pattern[currentIndex]

        const delay = (current.s1 === 'Y' || current.s2 === 'Y') ? 3000 : 10000
        let delay1 = delay;

        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % pattern.length)
        }, delay)

       const countdown =  setInterval(() => {
            delay1 = delay1 - 1000
            setShowTimer(delay1)
        }, 1000)


        return () => {
            clearTimeout(timer);
            clearInterval(countdown);
        } 
    }, [currentIndex])


    return (
        <>
        <div style={{border: '1px solid red'}}>
            <h1  style={{color: 'white', fontSize: '18px'}}>{showTimer / 1000}</h1>
        </div>
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
                {order.map((s, i) => (
                    <div key={'s' + i} style={{ 
                        width: '50px', 
                        height: '50px', 
                        border: '1px solid black', 
                        margin: 10, 
                        background: s == currentSignal.s1 ? backGround[currentSignal.s1] : 'grey' }}>
                        {s}
                    </div>
                ))}
            </div>

            <div style={{ width: '50%' }}>
                {order.map((s, i) => (
                    <div key={'l' + i} style={{ 
                        width: '50px', 
                        height: '50px', 
                        border: '1px solid black', 
                        margin: 10, 
                        background: s == currentSignal.s2 ? backGround[currentSignal.s2] : 'grey' }}>
                        {s}
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}