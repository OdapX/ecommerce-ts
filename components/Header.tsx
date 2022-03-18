import { useSession, signIn, signOut } from "next-auth/react"
import { SelectProducts } from "../Reduxstore/BasketSlice"
import { useAppSelector } from "../Reduxstore/Hooks"
function Header() {
    const Items = useAppSelector(SelectProducts)
    const { data: session } = useSession()
  return (
      <div className="sticky top-0 z-20 bg-[#121923] px-2 py-2 "> 
    <div className=" flex  items-center justify-between py-5 space-x-5 ">
           <p className="font-bold text-3xl text-white">FAKESTORE</p>
           <div className="hidden relative  rounded-lg lg:flex flex-grow  group h-11 space-x-2 focus:ring focus:ring-green-600">
               <input type="text" className="flex flex-grow flex-shrink focus:ring  focus:ring-yellow-400 focus:outline-none p-2 rounded-lg"/>
               <div className="p-2 px-4 cursor-pointer absolute  bg-yellow-500 rounded-r-lg right-0 h-full">  
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div> 
          </div>
          <div className="flex items-center space-x-3 text-white">
              {session ? (<div className="hidden lg:block">
                    <p className="text-sm ">Signed in as {session?.user?.name } </p>
                    <button className="font-bold text-sm lg:text-lg" onClick={()=>signOut()}>Logout</button>
                </div>) :
                  (<div className="hidden lg:block">
                    <p className="text-sm "> Not signed in</p>
                    <button className="font-bold text-sm lg:text-lg" onClick={()=>signIn()}>Accounts and lists</button>
                </div>)
                 }
                
                <div  className="hidden lg:block">
                   <p className="text-sm ">Lorem ipsum dolor sit.</p>
                    <p className="font-bold text-sm lg:text-lg">Lorem, ipsum dolor.</p>
                </div>
                 <div  className="block  lg:hidden">
                   <p className="text-lg font-bold">Login</p>
                   
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative  ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full text-xs font-bold px-1">{Items.length || 0}</span>
                    </div>
                    <p className="hidden lg:flex font-bold">Basket</p>
                </div>
          </div>
    </div>
    <div className="lg:hidden relative  rounded-lg flex flex-grow   h-11 space-x-2 focus:ring focus:ring-green-600">
               <input type="text" className="flex flex-grow flex-shrink focus:ring  focus:ring-yellow-400 focus:outline-none p-2 rounded-lg"/>
               <div className="p-2 px-4 cursor-pointer absolute  bg-yellow-500 rounded-r-lg right-0 h-full">  
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div> 
          </div>
    </div>
  )
}

export default Header