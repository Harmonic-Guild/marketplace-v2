import Link from 'next/link'
import { BsArrowUp } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
  }

  return (
    <footer className="w-full px-6 py-10 text-gray-700 mt-20">
<<<<<<< HEAD
      <div className="flex justify-center items-center my-10">
=======
      {/* <div className="flex justify-center items-center my-10">
>>>>>>> eafec3f652cfde11d12433f70e59bcbd045215a3
        <button className="lg:flex lg:gap-10 text-center no-underline bg-yellow-500 px-10 py-3 font-bold rounded-md text-gray-900 text-lg">
          <div className="flex items-center justify-center gap-3">
            <div>Community</div>
            <div>
              <FiUsers />
            </div>
          </div>
<<<<<<< HEAD
          <div>Coming Soon</div>
        </button>
      </div>
=======
          <div>coming soon...</div>
        </button>
      </div> */}
>>>>>>> eafec3f652cfde11d12433f70e59bcbd045215a3
      <div className="flex flex-wrap justify-between p-10 gap-8">
        <div className="mb-5">
            <div>
                <Link href="/" passHref>
                    <span className="py-6 w-full">
                    <img
                        src="https://marketplace.sevendeadstars.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9356f04b.png&w=256&q=75"
                        alt=""
                        className="cursor-pointer mb-5"
                        />
                    </span>
                </Link>
                <div className="leading-loose">
                    <span>support@harmonicguild.io</span> <br />
                    <span>+2343878472983</span>
                </div>
            </div>
        </div>
        <div className="lg:text-xl text-sm">
          <span className="font-bold ">LEARN MORE</span>
          <ul className="leading-loose capitalize">
            <li>About</li>
            <li>Merchat</li>
            <li>Partners</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="lg:text-xl text-sm">
          <span className="font-bold ">LEGAL</span>
          <ul className="leading-loose capitalize ">
            <li>General Info</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="lg:text-xl text-sm">
          <span className="font-bold ">TALK TO US</span>
          <ul className="leading-loose capitalize ">
            <li>Contact us</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
            <li>Twitter</li>
          </ul>
        </div>
<<<<<<< HEAD
        <div onClick={() => scrollToTop()} className='p-4 btnColor rounded-full w-10 h-10 cursor-pointer'>
            <BsArrowUp className='w-6 h-6 -mt-2 -ml-2'/>
=======
        <div className='p-4 btnColor rounded-full w-10 h-10 cursor-pointer'>
          <a href="#nav">
            <BsArrowUp className='w-6 h-6 -mt-2 -ml-2'/>
          </a>
>>>>>>> eafec3f652cfde11d12433f70e59bcbd045215a3
        </div>
      </div>
      <div className="text-center">
        <span>
          &copy; {new Date().getFullYear()} HarmonicGuild. All right reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
