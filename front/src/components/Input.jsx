export default function Input({ type, register }){
    
    return(
        <input
            id={type}
            name={type}
            type={type}
            autoComplete={type}
            {...register(type, { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
        />
    );
}