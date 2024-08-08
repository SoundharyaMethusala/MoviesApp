import { ShimmerCircularImage, ShimmerThumbnail,ShimmerTitle } from "react-shimmer-effects";

const shimmerMovieCard=()=>{
    return(
        <>
        <div className="relative rounded-[1rem] relative m-4 rounded overflow-hidden shadow-lg">
            <ShimmerThumbnail height={320} width={192}></ShimmerThumbnail>
        <p className="absolute bottom-2 translate-x-[-50%] left-[50%] w-full p-2">
            <ShimmerTitle line={2}></ShimmerTitle>
        </p>
        <div className="absolute top-2 right-2 bg-white h-8 w-8 flex items-center justify-center rounded-xl opacity-70">
        <ShimmerCircularImage size={50}></ShimmerCircularImage>
        
        </div>
        </div>
        </>
    )
}

export default shimmerMovieCard;