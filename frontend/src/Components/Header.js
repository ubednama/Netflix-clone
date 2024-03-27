import React from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setToggle } from '../redux/movieSlice';

const Header = () => {
    const user = useSelector((store)=>store.app.user);
    const toggle = useSelector((store)=>store.movie.toggle)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(user)
    //const user = false;

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            console.log(res);
            if(res.data.success){
                toast.success(res.data.message)
            }
            dispatch(setUser(null));
            navigate('/')
        } catch (error) {
            console.log("Error at logoutHandler", error)
        }
    }

    const toggleSearch = () => {
        dispatch(setToggle())
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full">
            <div className="w-[95vw] mx-auto flex items-center justify-between py-4">
                <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix" />
                { user && 
                    <div className='flex gap-2 items-center'>
                        <IoIosArrowDropdownCircle size="24px" color='white' />
                        <h1 className='text-lg text-white'>{user.fullName}</h1>
                        <div className='flex gap-2 rounded-md'>
                            <button className='bg-red-800 text-white p-2 rounded-lg px-6' onClick={logoutHandler}>Logout</button>
                            <button onClick={toggleSearch} className='bg-red-800 text-white p-2 px-6 rounded-lg'>{toggle ? "Home" : "Search"}</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header