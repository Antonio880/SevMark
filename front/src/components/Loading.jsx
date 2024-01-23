export default function Loading(){
    return(
        <div className="bg-orange-200 font-bold flex w-40 h-10 items-center justify-center rounded-md" disabled>
            <div className="h-6 w-6 border-4 mx-2 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-orange-500 animate-spin ease-linear rounded-full" />
            Processing...
        </div>
    );
}