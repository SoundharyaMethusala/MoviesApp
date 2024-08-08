import { ShimmerThumbnail,ShimmerTitle } from "react-shimmer-effects";

const ShimmerBanner=()=>{
    return (
        <>
            <div className="relative">
            <ShimmerThumbnail className="h-[45rem] w-[80rem] "/>
            <ShimmerTitle 
            className="absolute bottom-4 translate-x-[-50%] left-[50%] text-4xl object-cover">
            </ShimmerTitle>
        </div>
        </>
    )
}

export default ShimmerBanner;