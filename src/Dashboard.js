import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  Bars } from 'react-loader-spinner'
import { MdNoEncryptionGmailerrorred } from "react-icons/md"

function Dashboard() {

      const [users, setUsers] = useState([])
      const [loading, setloading] =useState(false)
      const [error, seterror] = useState(false)


        console.log(users)


  axios.defaults.withCredentials = true;
  useEffect(() => {
   axios.get("http://localhost:4000/api/form/dashboard").then(
    res => { 
      console.log(res.data)
      res.data === "error" ? setUsers([]) : setUsers(res.data)
      res.data === "error" ? seterror(true) : setUsers(res.data)
      setloading(true)
    } 
   ).catch (err => {
   console.log(err)
   })
  }, [])

  
  return (
    <div className='bg-[#f5f5f5] pb-[60px] [#2FB95D] font-Mulish text-[#182c25] w-full min-h-screen'>
     
     <h1 className='text-center sm:text-xl pt-5 pb-2  font-semibold'>Database</h1>
     <div className={`flex flex-col ${loading ? "" : "min-h-screen"} ${error ? "min-h-screen" : ""}  justify-center items-center`}>
        {/* table */}


  
  {loading ? <div></div>:<div className="flex  justify-center items-center text-xl font-bold"><Bars height="100" width="80" radius="10" color="#518300" ariaLabel="loading"/></div>}

  {error ? <div className="flex  justify-center items-center text-xl font-bold"><Bars height="100" width="80" radius="10" color="#518300" ariaLabel="loading"/></div>: <div></div>}

{


  error ? <div className="text-3xl flex flex-col justify-center items-center font-bold">
    <div className='text-6xl'><MdNoEncryptionGmailerrorred /></div>
      <div className='px-2 py-2 text-center'>You are not authorized to visit this page</div>
   </div> : <div></div>
   }

   
   

     <table className={`text-center ${error ? 'hidden':'block'} ${loading ? "block" : "hidden"} table-auto mx-2`}>
            <tbody>
            <tr>
                <th className="border border-b-[#717171]  text-sm pb-5 pt-2  px-2">S/N</th>
                <th className="border border-b-[#717171] text-sm  pb-5 pt-2  px-2">Username</th>
                <th className="border border-b-[#717171] text-sm pb-5 pt-2  px-2">Action</th>


            </tr>
       {users.map((info,i)=>
       <tr className=' 'key={i}>
                      <td className="border border-b-[#717171] px-2 text-sm pb-5 pt-2  text-[#717171]">{i+1}</td>
                      <td className="border border-b-[#717171] text-[#717171]  px-2 text-sm pb-5 pt-2 ">{info.Username}</td>
                      <td className="border border-b-[#717171] text-[#717171] px-2 text-sm  pb-5 pt-2 "><Link to={ {pathname:`/details/${info.Name}`}}  state={info}><button className='bg-[#518300] px-2 text-xs py-1 text-white rounded-sm'>View Profile</button></Link></td>
                     
           </tr>
       )}
            </tbody>
         </table>
  

     </div>

   
    </div>
  )
}

export default Dashboard
