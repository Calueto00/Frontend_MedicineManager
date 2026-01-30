import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function BackButton (){
    const navigate = useNavigate();
    return (
        <button
            
            onClick={()=> navigate(-1)}
            className=" px-6 py-2 rounded-md border bg-blue-400 text-white
            border-slate-200 shadow-slate-300 shadow hover:bg-blue-600 transition-all ease-in-out delay-150 cursor-pointer" 
        >Return</button>
    )
}