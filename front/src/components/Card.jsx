export default function Card({ data }){

    const { name, description, price } = data;

    return(
        <div className="mt-5 rounded-md w-[800px] flex shadow-md leading-6 transition ease-in-out cursor-pointer delay-150 hover:text-white hover:-translate-y-1 hover:scale-70 hover:bg-slate-100 duration-200 focus-visible:outline focus-visible:outline-2">
          <div className="">
            <img className="rounded-md" src="https://source.unsplash.com/random/170x110" alt="" />
          </div>
          <div className="w-[400px] mx-3 mt-6 ">
            <p className="flex items-center justify-center text-sm font-semibold leading-6 text-gray-900">{name}</p>
            <p className="flex items-center justify-center truncate text-xs leading-5 text-gray-500">{description}</p>
          </div>
          <div>
            <p className="flex items-center pt-8 justify-center text-base font-semibold leading-6 text-gray-700"><strong>{price}</strong></p>
          </div>
          {/* <div className="flex items-center justify-end cursor w-4">
            <img src="./seta.png" alt="img seta" />
          </div> */}
        </div>
    );
}