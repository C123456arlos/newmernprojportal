import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Applications = () => {
  const { user } = useUser()
  const {getToken}= useAuth()
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)
  const updateResume = async () => {
      try {
        const formData = new FormData
        formData.append('resume', resume)
        const token = await getToken()
        const { data } = await axios.post(backendUrl + '/api/users/update-resume', formData, { headers: { Authorization: `Bearer ${token}` } })
        if (data.success) {
          toast.success(data.message)
          await fetchUserData()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
        console.error(error.message)
    }
    setIsEdit(false)
    setResume(null)
  }
  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  },[user])
  return (
    <>
      <Navbar></Navbar>
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>you resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit  || userData && userData.resume === '' ? <>
              <label className='flex items-center' htmlFor='resumeUpload'>
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name:'select resume'}</p>
                <input type='file' hidden onChange={e=>setResume(e.target.files[0])} id='resumeUpload' accept='application/pdf'></input>
              <img src={assets.profile_upload_icon}></img>
              </label>
              <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>save</button>
            </> :
              <div className='flex gap-2'>
                <a   className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href={userData.resume} target='_blank'>resume</a>
                <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>edit</button>
              </div>
          }
        </div>
        <h2 className='text-xl font-semibold mb-4'>jobs applied</h2>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>company</th>
              <th className='py-2 px-4 border-b text-left'>job title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>location</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>date</th>
              <th className='py-2 px-4 border-b text-left'>status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job, index) => true ? (
              <tr key={index}>
                <td className='py-3 px-4 flex items-center gap-2 border-b'>
                  <img className='w-8 h-8' src={job.companyId.image}></img>
                  {job.companyId.name}
                </td>
                <td className='py-2 px-4 border-b'>{job.jobId.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId.location}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b'>
                  <span className={`${job.status==='Accepted'?'bg-green-100':job.status==='Rejected'?'bg-red-100':'bg-blue-100'} px-4 py-1.5 rounded-lg`}>{job.status}</span>
                </td>
            </tr>
            ):null)}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Applications
