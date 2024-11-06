import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Protectedroute =({children})=>{
    const {user} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    useEffect(()=>{
        if(user === null || user.role !== 'recruiter'){
            navigate('/login')
        }
    },[]);
    return(
        <>
        {children}
        </>
    )

}
export default Protectedroute;