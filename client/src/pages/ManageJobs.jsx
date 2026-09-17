import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
const ManageJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState(false)
  const {backendUrl, companyToken}= useContext(AppContext)
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs', { headers: { token: companyToken } })
      if (data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const changeJobVisiblity = async (id) => {
    try {
      const {data}= await axios.post(backendUrl+'/api/company/change-visibility', {id}, {headers:{token:companyToken}})
      if (data.success) {
        toast.success(data.message)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
    toast.error(error.message)
    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])
  return jobs ? jobs.length === 0 ? <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>no jobs available or posted</p>
  </div>: (
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-green-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>job title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>location</th>
              <th className='py-2 px-4 border-b text-center'>applicants</th>
              <th className='py-2 px-4 border-b text-left'>visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job, index) => (
              <tr className='text-gray-700' key={index}>
                <td className='py-2 px-4 border-b max-sm:hidden'>{index + 1}</td>
                <td  className='py-2 px-4 border-b'>{job.title}</td>
                <td  className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td  className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                <td  className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td  className='py-2 px-4 border-b'>
                  <input className='slace-125 ml-4' type='checkbox'
                    onChange={() => changeJobVisiblity(job._id)} checked={job.visible}
                    ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
      <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>add new job</button>
      </div>
    </div>
  ):(<Loading></Loading>)
}

export default ManageJobs

