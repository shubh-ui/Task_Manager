import { Button } from "./button"

const Header = () => {
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h3 className="text-3xl font-extrabold">TaskZen <span>.</span></h3>
                </div>
                <div>
                    <div className="flex gap-4">
                        <Button className="bg-blue-500 text-white hover:bg-blue-600">Sign up</Button>
                        <Button variant={"secondary"}>Request Demo</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header