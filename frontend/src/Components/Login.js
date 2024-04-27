import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { API_END_POINT } from "../utils/constant";
import { setLoading, setUser } from "../redux/userSlice";
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoading = useSelector(store=> store.app.isLoading)

    let display;
    let method;
    isLogin ? display = "" : display = "hidden";
    isLogin ? method = "Sign in" : method = "Sign up"

    let input="h-14 block w-full border border-gray-500 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500 bg-gray-700"

    const loginHandler = () => {
        setIsLogin(!isLogin)
    }

    const getInputData = async(e) => {
        e.preventDefault();
        const user = {email, password};
        dispatch(setLoading(true))
        // console.log(<MoonLoader/>)
        if(isLogin){
            try {
                const res = await axios.post(`${API_END_POINT}/login`,user, {
                    headers:{
                        "Content-Type":'application/json'
                    },
                    withCredentials:true
                });
                // console.log(res);
                if(res.data.success){
                    toast.success(res.data.message)
                    // console.log("tt",res.data.message)
                }
                // console.log(res.data)
                dispatch(setUser(res.data.user));
                navigate("/browse");
            } catch (error) {
                toast.error(error.response.data.message)
                console.log("Error in Login", error)
            } finally {dispatch(setLoading(false))}
        } else {
            user.fullName = fullName
            dispatch(setLoading(true))
            if(password !== confirmPassword ){
                toast.error("Passwords don't match")
            }
            try {
                const res = await axios.post(`${API_END_POINT}/signup`,user, {
                    headers:{
                        "Content-Type":'application/json'
                    },
                    withCredentials:true
                });
                // console.log(res);
                if(res.data.success){
                    toast.success(res.data.message)
                }
                console.log(res.data)
                dispatch(setUser(res.data.user));
                navigate("/browse")
            } catch (error) {
                toast.error(error.response.data.message)
                console.log("Error in Login", error)
            } finally {dispatch(setLoading(false))}
        }
        setEmail('');
        setFullName('');
        setPassword('');
        setConfirmPassword('');
    }
    return (
        <>
            <Header />
            <div className="bg-black">
                <img className="absolute z-0 w-[100vw] h-[100vh]" src="https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="banner" />
                <form className="min-w-[450px] max-w-[450px] absolute z-10 flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-16 bg-black bg-opacity-70 align-center justify-center gap-2 w-3/12 text-white" onSubmit={getInputData}>
                    <h2 className="text-2xl font-bold mb-3">{`${method}`}</h2>
                    { !isLogin &&
                    <input type="text" id="fullName" name="fullName" value={fullName} onChange={(e)=>setFullName(e.target.value)} className={`${input}`} placeholder="Enter Full name" />
                    }
                    <input type="text" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className={`${input}`} placeholder="Enter email or phone number" />
                    <input type="password" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className={`${input}`} placeholder={`${isLogin ? "password" : "Create new password"}`} />
                    {
                        !isLogin && <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} name="confirmPassword" className={`${input}`} placeholder="Re-enter password" />
                    }
                    <button type="submit" className={` w-full mt-2 bg-red-400 text-white py-2 rounded-md`}>{isLoading ? <BeatLoader color="#D81F26" size={12} margin={3} /> : method}</button>
                    {
                    }

                        <p className={`text-center ${display}`}>OR</p>
                    <button className={`${display} w-full bg-[#373B39] text-white py-2 rounded-md`}>Use a sign-in code</button>
                    <Link to="/reset" className={`${display}`}>Forgot Password?</Link>
                    <div className={`${display} flex items-center`}>
                        <input type="checkbox" id="rememberMe" name="rememberMe" className="mr-2" />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <p className="text-gray-300">{`${isLogin ? "New to Netflix?" : "Already have an account?"}`} <Link to="/" onClick={loginHandler} className="text-white">{`Sign ${isLogin? 'up' : 'in'} now.`}</Link></p>
                    <p className="text-gray-300">This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="https://policies.google.com/privacy" className="text-blue-600 underline">Learn more.</a></p>
                </form>
            </div>
        </>
    );
};

export default Login;
