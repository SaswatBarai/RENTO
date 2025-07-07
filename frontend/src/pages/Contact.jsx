import React, { useState } from 'react'
import { showNav } from '../state/navHideSlice'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"



function Contact() {
  showNav();


  const [data , setData] = useState({
    name:"",
    email: "",
    message: ""
  })

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({
      ...data,
      [id]: value
    });
  }
  
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(data)
}

  return (
    <>
      <div className='h-screen flex items-center justify-center bg-[#0d1117]'>
        <div className="w-full max-w-2xl space-y-8 bg-[#131e33] p-8 m-3 rounded-3xl border border-[#3a81f2]">
          <div className="space-y-2 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-[#538fef]">Contact Us</h1>
            <p className="text-gray-400">Please fill in the form below to get in touch.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Name</Label>
              <Input id="name" 
              onChange={handleChange}
              value={data.name}
              placeholder="Enter your name" className="bg-[#0d1117] text-gray-300 border border-[#3a81f2] focus:ring-[#3a81f2] focus:border-[#3a81f2]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input id="email" 
              onChange={handleChange}
              value={data.email}
              placeholder="Enter your email" type="email" className="bg-[#0d1117] text-gray-300 border border-[#3a81f2] focus:ring-[#3a81f2] focus:border-[#3a81f2]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300">Message</Label>
              <Textarea 
              id="message" 
              onChange={handleChange}
              value={data.message}
              placeholder="Enter your message" 
              className="min-h-[100px] bg-[#0d1117] text-gray-300 border border-[#3a81f2] focus:ring-[#3a81f2] focus:border-[#3a81f2]" />
            </div>
            <div className='flex items-center justify-center'>
               <Button type="submit" className="bg-blue-500 h-8 w-1/3 rounded-3xl hover:bg-blue-600 text-white">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact