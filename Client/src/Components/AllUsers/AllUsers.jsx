import React, { useEffect, useState } from 'react'
import axios from "axios"
const AllUsers = () => {

const [userDetails, setUserDetails]=useState([]);
const [pageNum, setPageNum]= useState(1);
const [pagination, setPagination]= useState(null);
const [userName, setUserName]= useState('');
const [activePage, setActivePage]= useState();
const [searchedData, setSearchedData]=useState([]);
const [searchedUser, setSearchedUser]= useState();
const [filteredDomain, setFilterDomain]=useState();
const apiUrl= `http://localhost:3000`

useEffect(()=>{
    const fetchUserApi= async()=>{
        try {

            const response= await axios.post(`${apiUrl}/users/userData?page=${pageNum<=0 || pageNum> pagination ? 1 : pageNum}`)
            const data= response.data
            const numOfPages= data.totalPages
            setUserDetails(data.showLimitedData)
            setPagination(numOfPages)
        } catch (error) {
            console.log(error);
        }
    }
    fetchUserApi()
},[pageNum])

const addUser= async(addUserData)=>{
  
    console.log(addUserData);
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
        const response= await axios.post(`${apiUrl}/users/addUser`, {addUserData} ,config);

        alert(response.data.message)
        
       } catch (error) {
        console.log(error);
        alert(error.response.data.message)
       }

}




useEffect(()=>{
    const fetchSearchData=async()=>{
        try {
            const response= await axios.post(`${apiUrl}/users/searchUser?name=${userName}`)
            const userDetails= response.data.userDetails
       console.log(userName);
             setSearchedData(userDetails);
            
        } catch (error) {
            console.log(error);
        }
    }
    fetchSearchData()
},[userName])

const getUserDetails= (data)=>{
    console.log(data);
    setUserName(data.first_name)
    setSearchedUser(data)

}

const filterUser= (e)=>{
const domainName= e.target.textContent

const filterDomain= userDetails.filter(user=> user.domain === domainName)
setFilterDomain(filterDomain);
}
const filterUserGender= (e)=>{
const genderName= e.target.textContent

const filterDomain= userDetails.filter(user=> user.gender === genderName)
setFilterDomain(filterDomain);
}

const filterUserAvailability = (isAvailable)=>{

    const checkIsUserAvailable= userDetails.filter(user=> isAvailable? user.available === 'true': user.available==='false');
    console.log(checkIsUserAvailable);
        setFilterDomain(checkIsUserAvailable);

}


  return (
 <>
 <div className=' w-full h-[auto] bg-slate-700 flex flex-col justify-start items-center gap-[3rem] '>

{/* // Searched User Section */}

    <div className=' pt-[2rem]'>
        <input type="text" placeholder='Search' value={userName} onChange={(e)=>setUserName(e.target.value)} className=' outline-none text-[13px] p-2' />
{userName && searchedData ? (
      <ul className={searchedData?.length <= 5 ? 'h-auto overflow-scroll w-[100%] mt-1 text-[15px] bg-white flex flex-col justify-start items-center' : 'h-[20rem] overflow-scroll w-[100%] mt-1 text-[15px] bg-white flex flex-col justify-start items-center'}>
             {searchedData ? (searchedData?.map((user, index)=>(

                   <li className='border-b-[1px] flex justify-center cursor-pointer border-black w-full' onClick={()=>getUserDetails(user)} key={index}><p className=''>{user.first_name}</p></li>
               
             ))):(<p className='hidden'></p>)}
        </ul>):(<ul className='hidden'></ul>)}
    </div>

 {/* // Filter Section */}
    <div className='w-full flex flex-col p-[2px] '>
        <h1 className='text-[20px] text-white border-b-[1px]'>Filters</h1>
        <span className=' flex xs:gap-[1rem] justify-center items-start flex-col w-full mt-4'>

            <ul className=' text-[10px]  flex xs:text-[14px] xs:gap-2 justify-start items-center text-white w-full xs:flex '>
                <p className='text-[12px] pr-[2px] xs:text-[14px]'>Domain: </p>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={filterUser}>Finance</li>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={filterUser}>Marketing</li>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={filterUser}>IT</li>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={filterUser}>Management</li>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={filterUser}>Sales</li>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={filterUser}>UI Designing</li>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={filterUser}>Business Development</li>
            
                
            </ul>
                
                <ul className=' text-[10px]  flex xs:text-[14px] xs:gap-2 justify-start items-center text-white w-full xs:flex '>
                <p className='text-[12px] pr-[2px] xs:text-[14px]'>Gender: </p>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center' onClick={filterUserGender}>Male</li>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center' onClick={filterUserGender}>Female</li>
               
                
            </ul>

                <ul className=' text-[10px]  flex xs:text-[14px] xs:gap-2 justify-start items-center text-white w-full xs:flex '>
                <p className='text-[12px] pr-[2px] xs:text-[14px]'>Availability: </p>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={()=>filterUserAvailability(true) }>User Available</li>
                <li className='border p-[5px] w-[20%] cursor-pointer flex justify-center items-center'
                onClick={()=>filterUserAvailability(false)}>User UnAvailable</li>    
            </ul>


                </span>
    </div>

 {/* // Selected Search Single User */}
  {searchedUser  ?( <div className=' flex-col flex w-full justify-center items-center'>
        <h1 className=' text-[25px]  font-[500] text-white'>Result Related To {userName}</h1>
        <ul className=' w-full flex flex-wrap p-[0.3rem] gap-2 '>
            {searchedData ? (
            <li className='border rounded-[1rem] w-[100%] flex justify-center h-[17rem] box-border p-[0.3rem]'>
                <span className='flex gap-x-[1rem]'><img src= {searchedUser.avatar} className='border w-[85%] h-[40%] rounded-[50%]' alt="user_image" /></span>
                <span className='flex flex-col justify-start box-border text-white  w-[50%] p-[0.2rem] text-[13px] font-[400] gap-y-[0.5rem]'>
                    <p>{searchedUser.first_name}</p>
                    <p>{searchedUser.last_name}</p>
                    <p className=' break-words '>{searchedUser.email}</p>
                    <p>{searchedUser.gender}</p>
                    <p>{searchedUser.domain}</p>
                    {  searchedUser.available==='true' ?( <p>I Am Currently Available</p>):( <p>Currently I Am Not Available</p>)}
                    <button onClick={()=>addUser(searchedUser)} className='text-[13px] border mt-[10%] rounded-[1rem] text-white cursor-pointer'>Add</button>
                    </span>
            </li>
        ):(<h1 className='h-[20rem] w-full flex justify-center items-center text-red text-[1.5rem] font-[500]'>Users Not Found</h1>)}
        </ul>

    </div>)

    :  filteredDomain?(  <div className=' w-full h-[auto] bg-slate-700 flex flex-col justify-start items-center gap-[3rem]'>


    <h1 className=' text-[25px]  font-[500] text-white'>Filtered Domain</h1>
    <ul className=' w-full flex flex-wrap p-[0.3rem] gap-2  xs:grid xs:grid-cols-3'>
              {filteredDomain && filteredDomain ? ( filteredDomain?.map((user, index)=>(
          <li className=' border rounded-[1rem] w-[100%] flex justify-center h-[auto] box-border p-[0.3rem]' key={index}>
          <span className='flex gap-x-[1rem]'><img src= {user.avatar} className='xl:w-[95%] xl:h-[50%] border w-[85%] h-[40%] rounded-[50%]' alt="user_image" /></span>
          <span className='xl:text-[18px] lg:text-[17px]  md:text-[14px] sm:text-[13px] xs:text-[12px] flex flex-col justify-start box-border text-white  w-[50%] p-[0.2rem] text-[13px] font-[400] gap-y-[0.5rem]'>
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
              <p className=' break-words '>{user.email}</p>
              <p>{user.gender}</p>
              <p>{user.domain}</p>
              {  user.available==='true' ?( <p>I Am Currently Available</p>):( <p>Currently I Am Not Available</p>)}
              <button onClick={() => addUser(user)} className='xl:text-[20px] xl:w-[14rem] lg:text-[16px] lg:w-[10rem] md:text-[14px] md:w-[7.5rem] sm:text-[12px] sm:w-[6rem] xs:text-[11px] xs:w-[4.5rem] text-[10px] border mt-[10%] rounded-[1rem] text-white cursor-pointer  '>
  Add
</button>
  
              </span>
      </li>
             ))
          
          ):(<h1>No Related User Domain Found</h1>)}
          </ul>
     </div>):
   
//  All User Details Fetched
  (<div className=' flex-col flex w-full justify-center items-center'>
        <h1 className=' text-[25px]  font-[500] text-white'>Check All Users</h1>
        <ul className=' w-full flex flex-wrap p-[0.3rem] gap-2  xs:grid xs:grid-cols-3'>
            {userDetails ? ( userDetails?.map((user, index)=>(
            <li className=' border rounded-[1rem] w-[100%] flex justify-center h-[auto] box-border p-[0.3rem]' key={index}>
                <span className='flex gap-x-[1rem]'><img src= {user.avatar} className='xl:w-[95%] xl:h-[50%] border w-[85%] h-[40%] rounded-[50%]' alt="user_image" /></span>
                <span className='xl:text-[18px] lg:text-[17px]  md:text-[14px] sm:text-[13px] xs:text-[12px] flex flex-col justify-start box-border text-white  w-[50%] p-[0.2rem] text-[13px] font-[400] gap-y-[0.5rem]'>
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                    <p className=' break-words '>{user.email}</p>
                    <p>{user.gender}</p>
                    <p>{user.domain}</p>
                    {  user.available==='true' ?( <p>I Am Currently Available</p>):( <p>Currently I Am Not Available</p>)}
                    <button onClick={() => addUser(user)} className='xl:text-[20px] xl:w-[14rem] lg:text-[16px] lg:w-[10rem] md:text-[14px] md:w-[7.5rem] sm:text-[12px] sm:w-[6rem] xs:text-[11px] xs:w-[4.5rem] text-[10px] border mt-[10%] rounded-[1rem] text-white cursor-pointer  '>
  Add
</button>

                    </span>
            </li>
           ))
        
        ):(<h1>User Details Not Found</h1>)}

        </ul>
        <div className='flex gap-2 justify-center items- ml-[-1rem]  w-[full] p-[1rem]'>
            <p className='text-white cursor-pointer'  onClick={()=>setPageNum((prevCount)=> prevCount-1)}> Previous</p>
      
            <button className='xs:w-[6rem] sm:w-[8rem] sm:h-[2rem] border w-[4rem] p-1 bg-white'>{pageNum}of{pagination}</button>

              
            
            <p className='text-white cursor-pointer' onClick={()=>setPageNum((prevCount)=> prevCount+1)}>Next</p>
        </div>
    </div>)}
 </div>
            
 </>
  )
}

export default AllUsers
