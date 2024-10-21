import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center mt-5'>
        <div className='flex flex-col gap-5 my-10'>

        <span className='mx-auto px-4 py-2 rounded-full bg-red-100 text-[#F83002] font-medium ' > No. 1 Job Hunt website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit iusto debitis pariatur saepe, ducimus quas assumenda dignissimos nam vel et ut ad repudiandae facere enim? Maxime veniam non aliquam aperiam ullam dolore laboriosam perspiciatis blanditiis recusandae eligendi quisquam facere doloremque, modi adipisci reprehenderit perferendis consequuntur similique. Iste laborum nam quis.</p>
        <div className=' flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto
        '>
            <input
            type="text"
            placeholder="Search for jobs"
            className="outline-none border-none w-full p-2"
            />
            <Button className="rounded-r-full bg-[#6A38C2] h-10">
                <Search className='h-8 w-5'/>
            </Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection