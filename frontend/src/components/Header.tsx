import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Header = () => {
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 flex justify-between items-center px-6">
                <div>
                    <h3 className="text-3xl font-extrabold">TaskZen <span className="text-blue-500">.</span></h3>
                </div>
                <div>
                    <div className="flex gap-4">
                        <Link to={"/login"}><Button className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">Sign up</Button></Link>
                        <Button className="cursor-pointer" variant={"secondary"}>Request Demo</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header