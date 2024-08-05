import { useContext } from "react";
import PaginationContext from "../Context/PaginationContext";
export default function Pagination(){
    const {pageno,handlenext,handleprev}=useContext(PaginationContext)
    return(
        <div className="flex justify-center gap-8 text-3xl h-[4rem] w-screen bg-slate-400 items-center">
            <div className="cursor-pointer" onClick={handleprev}> <i class="fa-solid fa-arrow-left"></i> </div>
            <div>{pageno}</div>
            <div className="cursor-pointer" onClick={handlenext}><i class="fa-solid fa-arrow-right"></i></div>
        </div>
    );
}