import React, { useEffect, useState } from 'react'
import axios from 'axios'
const UserTeam = () => {

const [userTeamDetails, setUserTeamDetails]= useState();   
const apiUrl= `http://localhost:3000`


    useEffect(()=>{
  const fetchUserTeam= async()=>{

    try {

        const userAuthDetails= localStorage.getItem('userAuth');
        const userData= JSON.parse(userAuthDetails)

 const token= userData?.token
        const config={
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
        const response= await axios.get(`${apiUrl}/users/getUserTeam`,config);

        const teamData=response.data.getUserTeam.userTeam

        setUserTeamDetails(teamData);

       } catch (error) {
        console.log(error);
        alert(error.response.data)
       }
  }

  fetchUserTeam()

    },[userTeamDetails])

    const removeUserDetails=async(id)=>{
        try {
            const response= await axios.delete(`${apiUrl}/users/removeUser/${id}`)
            alert(response.data.message)
        } catch (error) {
            alert(error.response.data);
            console.log(error);
        }
    }

  return (
   <>
  <div className=' w-full h-[auto] bg-slate-700 flex flex-col justify-start items-center gap-[3rem]'>


  <h1 className=' text-[25px]  font-[500] text-white'>Check All Users</h1>
  <ul className=' w-full flex flex-wrap p-[0.3rem] gap-2  xs:grid xs:grid-cols-3'>
            {userTeamDetails && userTeamDetails ? ( userTeamDetails?.map((user, index)=>(
        <li className=' border rounded-[1rem] w-[100%] flex justify-center h-[auto] box-border p-[0.3rem]' key={index}>
        <span className='flex gap-x-[1rem]'><img src= {user.avatar} className='xl:w-[95%] xl:h-[50%] border w-[85%] h-[40%] rounded-[50%]' alt="user_image" /></span>
        <span className='xl:text-[18px] lg:text-[17px]  md:text-[14px] sm:text-[13px] xs:text-[12px] flex flex-col justify-start box-border text-white  w-[50%] p-[0.2rem] text-[13px] font-[400] gap-y-[0.5rem]'>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <p className=' break-words '>{user.email}</p>
            <p>{user.gender}</p>
            <p>{user.domain}</p>
            {  user.available==='true' ?( <p>I Am Currently Available</p>):( <p>Currently I Am Not Available</p>)}
            <button onClick={() => removeUserDetails(user._id)} className='xl:text-[20px] xl:w-[14rem] lg:text-[16px] lg:w-[10rem] md:text-[14px] md:w-[7.5rem] sm:text-[12px] sm:w-[6rem] xs:text-[11px] xs:w-[4.5rem] text-[10px] border mt-[10%] rounded-[1rem] text-white cursor-pointer  '>
Remove User
</button>

            </span>
    </li>
           ))
        
        ):(<h1>No User Found! Start Adding User</h1>)}
        </ul>
   </div>
   </>
  )
}

export default UserTeam
