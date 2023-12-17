export default function ButtonSign({ text }){
    return(
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm text-black font-semibold leading-6 transition ease-in-out delay-150 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {text}
        </button>
    );
}