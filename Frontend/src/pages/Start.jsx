import React from 'react'
import {Link} from 'react-router-dom' //the react router dom is used to create links in the application
// this is the home page

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-no-repeat bg-left h-screen w-full flex justify-between flex-col 
         bg-[url(https://plus.unsplash.com/premium_vector-1725618157818-7caf8a85d280?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]'>
            <img className='w-44' src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8zMFwvYXNzZXRzXC85YlwvNTY1MVwvNDIyYjg2M2Q0MzM4N2ViY2ZmNTY3YzA3Mjg2YTUzODctMTYyMDcyMDE1OS5wbmcifQ:postmates:ir-b-5p1SGaVUd55NTLXM6NSXc6vdTy9tnblu39wr_8?width={width}" alt="" />
            
            <div className='bg-white py-5 px-5 pb-5'>
                <h2 className='text-3xl font-bold '>Get Started with Uber</h2>
                <Link to='/login' className=' flex items-center justify-center bg-black text-white w-full py-3  rounded mt-4 text-xl'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start