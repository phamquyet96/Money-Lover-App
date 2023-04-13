import icon from "../../img/icon.png"
import google from "../../img/google.jpg"

function Login() {
    return (
        <>
            <div>
                <div className="bg-green-600">
                    <div className="logo flex justify-center">
                        <img src={icon} alt="" className="w-[230px] h-[130px]"/>
                    </div>
                    <p className="text-center text-white text-4xl font-semibold">Money Lover</p>
                </div>
                <div
                    className="bg-blue-200 max-w-3xl max-h-96 rounded-[24px] overflow-hidden shadow-lg mr-auto ml-auto">
                    <div className="px-6 py-4">
                        <div className="font-bold text-2xl mb-2 text-center">Log In</div>
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-light">Using social networking accounts</p>
                                <button className="w-[280px] h-[43px] rounded-full border-2 border-red-400 text-red-600">
                                    <img src={google} className="w-[24px] mt-2 ml-2"/>Connect with Google
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Login;