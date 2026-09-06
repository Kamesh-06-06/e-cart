import { useEffect, useState } from "react";

function AutoRotation(){
    const slides=[img1,img2];
    const [current,setCurrent]=useState(0);
    useEffect(()=>{
        const timer=setInterval(()=>{
            setCurrent((prev)=>(prev+1) % slides.length);
        },3000);
       return()=>clearInterval(timer);
    },[]);
}
export default AutoRotation