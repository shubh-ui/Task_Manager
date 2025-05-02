import { Button } from "@/components/ui/button"
import { ProjectContext } from "@/context/projectContext"
import { useContext } from "react"

const SideBar = () => {
        const {userProjects, setCurrentSelectedProject , currentSelectedProject} = useContext(ProjectContext)
        const ImgIcons = ['Piper_.jpg','Mobile_loop.png', 'Project.png']
    
    return (
        <>
            <div className="w-[16%] flex flex-col gap-16 border border-gray-200">
                <div className="ml-2 w-full flex flex-col gap-4 pr-2 items-start">
                    <h2 className="text-[16px] font-medium ml-2.5 mt-2">Projects</h2>
                    <div className="px-3 mr-1 flex flex-col gap-y-3 w-full">
                        {
                            userProjects.length  > 0 ? userProjects.map((project:any, index: number) => (
                                <Button key={index} variant={`${currentSelectedProject == project.name ? "default" : "outline"}`} className="flex items-center w-full justify-start cursor-pointer" onClick={() => setCurrentSelectedProject(project?.name)}>
                                <img src={`../../../public/Icons/${ImgIcons[index]}`} style={{ width: '20px', height: '`20px' }} alt="Project-png" />
                                <p className="text-[13px]">{ //@ts-ignore 
                                 project?.name}</p>
                            </Button>
                            )) : <>No Project</>
                        }
                       
                    </div>
                </div>

                <div className="ml-2 w-full flex flex-col gap-4 pr-2 items-start">
                    <h2 className="text-[16px] font-medium ml-2.5 mt-2">Team Members</h2>
                    <div className="px-3 mr-1 flex flex-col gap-y-3 w-full">
                        <Button variant="outline" className="flex items-center w-full justify-start">
                            <img src="../../../public/Icons/male pic.avif" style={{ width: '30px', height: '`30px' }} alt="Project-png" />
                            <p className="text-[13px]">John Doe</p>
                        </Button>

                        <Button variant="outline" className="flex items-center w-full justify-start">
                            <img src="../../../public/Icons/male pic.avif" style={{ width: '30px', height: '`30px' }} alt="Project-png" />
                            <p className="text-[13px]">Shivam P</p>
                        </Button>

                        <Button variant="outline" className="flex items-center justify-start">
                            <img src="../../../public/Icons/male pic.avif" style={{ width: '30px', height: '`30px' }} alt="Project-png" />

                            <p className="text-[13px]">Shubham Patil</p>

                        </Button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default SideBar