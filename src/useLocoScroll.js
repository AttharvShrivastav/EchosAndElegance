import { useEffect } from "react";
import LocomotiveScroll from 'locomotive-scroll'

export default function useLocoScroll(start){
    useEffect(()=>{
        if (!start) return;

        const scrollElement = document.querySelector("#main-container")
        const locoScroll = new LocomotiveScroll({
            el:scrollElement,
            smooth:true,
            multiplier: 1,
            class: 'is-reveal'

        })
    }, [start])
}