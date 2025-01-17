import { useState, useEffect } from "react";
import {useAuth} from "../Context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res= await axios.get('/api/auth/auth-admin'
            ,{
               
            })
            if (res.data.ok) {
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner/>
}
