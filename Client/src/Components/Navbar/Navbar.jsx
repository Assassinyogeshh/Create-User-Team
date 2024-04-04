import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userAuth');
        alert('You Have Been Logged Out');
        navigate('/');
    };

    const user = localStorage.getItem('userAuth');
            const userData = JSON.parse(user);
    useEffect(() => {

             
                const userToken = userData?.token;
                if (userToken) {
                    const decodeToken = jwtDecode(userToken);
                    const currentTime = new Date().getTime();
                    if (decodeToken.exp * 1000 < currentTime) {
                        localStorage.removeItem('userAuth');
                        alert('You Have Been Logged Out');
                        navigate('/');
                    }
                }
    }, []);

    const handleUserTeam = () => {
        if (user) {
            navigate('/userTeam')
        } else {
            alert("Sign In Before Move To Team")
        }
    }

    return (
        <>
            <ul className='lg:p-[1.5rem] xs:p-[1rem] xs:justify-between w-full flex justify-evenly items-center gap-2 h-[7vh] bg-slate-700 border-b-[1px]'>
                <Link className='lg:text-[22px] sm:text-[20px] xs:text-[18px] text-white text-[11px] font-[500]' to='/'>
                    <li>Create Team</li>
                </Link>
                <li className='lg:text-[19px] sm:text-[16px] xs:text-[15px] text-white text-[8px] font-[500]' onClick={handleUserTeam}>My Team</li>
                <li>
                    {user ? (
                        <button onClick={handleLogout} className='lg:text-[16px] lg:w-[8rem] lg:h-[2.3rem] sm:text-[14px] sm:w-[6rem] sm-h-[1.9rem] xs:text-[13px] xs:w-[5rem] xs:h-[1.5rem] w-[2.2rem] h-[0.9rem] font-[400] p-1 text-[7px] bg-transparent border flex justify-center items-center text-white'>Logout</button>
                    ) : (
                        <span className='flex justify-center items-center gap-1'>
                            <Link className='lg:text-[16px] lg:w-[8rem] lg:h-[2.3rem] sm:text-[14px] sm:w-[6rem] sm-h-[1.9rem] xs:text-[13px] xs:w-[5rem] xs:h-[1.5rem] w-[2.2rem] h-[0.9rem] font-[400] p-1 text-[7px] bg-transparent border flex justify-center items-center text-white' to='/login'> 
                                <button>Sign In</button>
                            </Link>
                            <Link className='lg:text-[16px] lg:w-[8rem] lg:h-[2.3rem] sm:text-[14px] sm:w-[6rem] sm-h-[1.9rem] xs:text-[13px] xs:w-[5rem] xs:h-[1.5rem] w-[2.2rem] h-[0.9rem] font-[400] p-1 text-[7px] bg-transparent border flex justify-center items-center text-white' to='/register'>
                                <button>Sign Up</button>
                            </Link>
                        </span>
                    )}
                </li>
            </ul>
        </>
    );
};

export default Navbar;
