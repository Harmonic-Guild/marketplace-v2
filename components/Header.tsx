import Link from 'next/link'
import { useState } from 'react'
import { useWallet } from '../services/providers/MintbaseWalletContext';
import { BsMoonStars, BsSun, BsDot, BsLayoutTextSidebarReverse } from 'react-icons/bs'
import { FiMenu, FiX, FiUsers } from "react-icons/fi";
// import NavBreadCrumb from './NavBreadCrumb'
import Near from '../icons/near.svg'

const navTitles = [
  { title: 'Home', href:'/'},
  { title: 'Explore', href:'/explore'},
  { title: 'MyNFTs', href:'/myOwn'}
]

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(true)  
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const [toggleIcons, setToggleIcons] = useState<boolean>()
  const [activeTitle, setActiveTitle] = useState<boolean>(true)
  const { wallet, isConnected} = useWallet()
  
  return (
    <header className={`w-full px-6 text-gray-700`}>
      <div className="container flex mx-auto max-w-8xl md:flex justify-between items-center">
        <Link href="/" passHref>
          <span className="py-6 w-full">
            <img src="https://marketplace.sevendeadstars.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9356f04b.png&w=256&q=75" alt="" className='w-24 h-9 cursor-pointer'/>
          </span>
        </Link>        

        <div className='flex lg:hidden cursor-pointer'>
          {toggleMenu 
            ?<FiMenu className='w-6 h-6 text-yellow-400' onClick={() => setToggleMenu(false)}/>
            : <div className='w-1/2 h-full'>
              <FiX className='w-6 h-6 relative text-yellow-400' onClick={() => setToggleMenu(true)}/>
              <div className={`bg-white text-gray-900 absolute top-20 right-0 text-lg font-bold shadow-xl rounded-tl-xl rounded-bl-xl px-7 pt-8 h-screen w-4/5 z-10`}>
              {isConnected && (
                <p className="text-lg py-2 px-8 font-semibold text-black">
                  {wallet?.activeAccount?.accountId}
                </p>
              )}
                {navTitles.map((item, index) => (
                  <Link key={index} href={item.href} passHref><div className={`cursor-pointer`}>{item.title}</div></Link>
                ))}
                <div className='absolute bottom-0 mb-20'>
                  <div className='flex justify-between bg-purple-200 border border-indigo-900 opacity-100 my-4 text-md font-normal rounded-full p-4'>
                    <p className='flex pl'>Community <FiUsers className='px-1 w-6 h-6'/></p>
                    <p className='flex'><BsDot className='mt-1 text-green-400'/>100+ online</p>
                  </div>
                  <div className='flex justify-evenly'>
                  < div className='mt-4' onClick={() => setToggleIcons(!toggleIcons)}>
                      {toggleIcons 
                        ?<BsSun onClick={() => setToggleIcons(true)} className='cursor-pointer hover:text-yellow-400 w-6 h-6 transition duration-700'/>
                        :<BsMoonStars onClick={() => setDarkMode(false)} className='cursor-pointer hover:text-black text-gray-700 w-6 h-6 transition duration-700'/>
                      }
                    </div>
                    <div className='flex justify-between border border-indigo-900 opacity-700 text-md xs:text-sm font-normal rounded-3xl px-4 py-2 bg-purple-200'>
                      <span>News</span>
                      <BsLayoutTextSidebarReverse className='w-5 h-5  px-1 mt-1'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          
        </div>

        <div className="hidden lg:flex w-full lg:w-auto mb-6 lg:mb-0 text-center space-x-5 lg:text-right">
          <div className=' mt-2 flex justify-around gap-16 mx-12 text-lg font-bold'>
          {navTitles.map((item, index) => (
            <Link key={index} href={item.href} passHref>
                <div 
                    className={`cursor-pointer ${activeTitle? 'border-b border-yellow-600' : 'border-b border-red-600'}`} 
                    onClick={() => setActiveTitle(false)}
                >
                    {item.title}
                </div>
            </Link>
          ))}
          </div>
          <div className="flex flex-row items-center space-x-5">
            <div onClick={() => setToggleIcons(!toggleIcons)}>
            </div>
            <button 
              className='btnColor rounded-full font-semibold p-2 px-4 flex'
              onClick={
                isConnected
                ? () => {
                  wallet?.disconnect()
                  window.location.reload()
                }
                : () => {
                  wallet?.connect({ requestSignIn: true })
                } 
              }
              >
                {isConnected ? 'Disconnect' : 'Connect'}
                <span className='ml-2 mt-1'><Near className='w-4 h-4'/></span>
            </button>
          </div>         
        </div>
      </div>
      {/* <NavBreadCrumb/> */}
    </header>
  )
}

export default Header
