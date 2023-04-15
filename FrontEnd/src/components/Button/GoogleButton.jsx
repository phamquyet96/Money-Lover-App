import {GoogleLogin, useGoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import React from "react";
import {authActions} from "../../feature/auth/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function GoogleButton() {

    const dispatch = useDispatch()

    const navigate=useNavigate();

    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                // Gọi API lấy data user google
                const result = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo.email', {
                    headers: {
                        'Authorization': 'Bearer ' + response.access_token
                    }
                })

                // Gọi API xét login
                axios.post('http://localhost:8000/api/auth/login/google',result.data)
                    .then((res) => {
                        console.log("success")
                        navigate('/dashboard')
                    })
            } catch (err) {
                console.log(err)
            }
        }
    })

    return (
        <>

            <GoogleLogin onSuccess={()=>login()}>
            <button className="border-2 border-rose-500  hover:bg-red-400 hover:text-white text-red-400 font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50 w-full">Connect with Google</button>
            </GoogleLogin>
            </>
    )
}