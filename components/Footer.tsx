import Link from 'next/link'
import { FiUsers } from "react-icons/fi";
import { BsArrowUp } from "react-icons/bs";

const navTitles = [
  { title: 'Home', href:'/'},
  { title: 'Explore', href:'/'},
  { title: 'Profile', href:'/'},
  { title: 'MyNFTs', href:'/'}
]

const Footer = () => {

  return (
    <footer className={`w-full px-6 py-10 text-gray-700`}>
            {/* <span className='absolute w-20 left-0 top-full pt-20'><Line_2/></span> */}
        {/* <div className='absolute p-2'>
            <button 
            className='flex space-x-8 no-underline btnColor px-10 py-3 font-bold rounded-md text-gray-900 text-sm'>
                <div className='flex gap-2'>Community <FiUsers/></div>
                <span>coming soon...</span>
            </button>
        </div> */}
            {/* <span className='right-0 absolute '><Line_3/></span>            */}
        <div className='pt-12 flex lg:hidden justify-between px-20'>
            <div>
                <Link href="/" passHref>
                    <span className="py-6 w-full">
                        <img src="https://marketplace.sevendeadstars.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9356f04b.png&w=256&q=75" alt="" className='w-24 h-9 cursor-pointer'/>
                    </span>
                </Link> 
                <div className='block'>
                    <span>support@harmonicguild.io</span> <br />
                    <span>+2343878472983</span>
                </div>
            </div> 
            <div className='p-4 btnColor rounded-full w-10 h-10 cursor-pointer'>
                <BsArrowUp className='w-6 h-6 -mt-2 -ml-2'/>
            </div>
        </div>
        <div className='flex justify-around py-20'>
            <div className='lg:block hidden'>
                <Link href="/" passHref>
                <span className="py-6 w-full">
                    <img src="https://marketplace.sevendeadstars.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9356f04b.png&w=256&q=75" alt="" className='w-24 h-9 cursor-pointer'/>
                </span>
                </Link> 
                <div>
                    <span>support@harmonicguild.io</span> <br />
                    <span>+2343878472983</span>
                </div>
            </div>
            <div className='lg:text-xl text-sm'>
                <span className='font-bold '>Learn More</span>
                <li>About</li>
                <li>Merchat</li>
                <li>Partners</li>
                <li>Contact</li>
            </div>
            <div className='lg:text-xl text-sm'>
                <span className='font-bold '>Legal</span>
                <li>General Info</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
            </div>
            <div className='lg:text-xl text-sm'>
                <span className='font-bold '>Talk To Us</span>
                <li>Contact us</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
            </div>
            <div className='p-4 btnColor rounded-full w-10 h-10 lg:block hidden cursor-pointer'>
                <BsArrowUp className='w-6 h-6 -mt-2 -ml-2'/>
            </div>
        </div>
        <div className='text-center'>
            <span>&copy; {new Date().getFullYear()} HarmonicGuild. All right reserved.</span>
        </div>
    </footer>
  )
}

export default Footer
