import { useContext } from "react";
import PaginationContext from "../Context/PaginationContext";
import { useSelector,useDispatch } from "react-redux";
import paginationSlice from "../redux/paginationSlice";

const action=paginationSlice.actions;

export default function Pagination(){
    const {pageno}=useSelector((store)=>store.paginationState);
    const dispatch=useDispatch();
    return(
        <div className="flex justify-center gap-8 text-3xl h-[4rem] w-screen bg-slate-400 items-center">
            <div className="cursor-pointer" onClick={()=>dispatch(action.handlePrev())}> <i class="fa-solid fa-arrow-left"></i> </div>
            <div>{pageno}</div>
            <div className="cursor-pointer" onClick={()=>dispatch(action.handleNext())}><i class="fa-solid fa-arrow-right"></i></div>
        </div>
    );
}