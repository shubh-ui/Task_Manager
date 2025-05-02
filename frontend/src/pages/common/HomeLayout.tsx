import HandlerPage from "@/components/HandlerPage"
import SideBar from "@/components/SideBar"
import { Input } from "@/components/ui/input"
import { UserContext } from "@/context/userContext"
import { Bell, Search, Settings } from "lucide-react"
import { useContext } from "react"

const HomeLayout = () => {
    const {user} = useContext(UserContext)
  return (
    <>
            <div className="flex h-screen">

            <SideBar />

                <div className="w-[84%] bg-white/85 border border-gray-200">
                    <div className="flex flex-col">
                        <div className="w-full h-[66px] flex items-center justify-between p-[50px] border border-gray-200">
                            <div className="w-[400px] relative">
                                <Search size={20}  className="absolute top-2 left-2"/>
                                
                                <Input type="text" placeholder="Search" className=" outline-none border-none bg-[#f0f0f0] pl-10" />
                            </div>
                            <div className="flex gap-8 items-center">
                                <Settings size={20} />

                                <Bell size={20} />

        
                                <div className="flex items-center">
                                 <img src="../../../public/Icons/male pic.avif" className="w-[40px] h-[40px]" alt="profile" />
                                 <p className="text-[13px]">{ //@ts-ignore
                                 user.name}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <HandlerPage />
                        </div>
                    </div>
                </div>
            </div>

        </>
  )
}

export default HomeLayout