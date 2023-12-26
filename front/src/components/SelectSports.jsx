

export default function SelectSports({ register }) {
    return (
        <div className="flex my-2">
            <label htmlFor="sport" className="my-2 pr-3 text-sm font-medium text-gray-900">
                Sport:
            </label>
            <select
                id="sport"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-200 focus:border-orange-200 p-2.5`}
                {...register("sport")}
            >
                <option defaultValue={""}>Choose a Sport</option>
                <option value="Vôlei">Vôlei</option>
                <option value="Futebol">Futebol</option>
                <option value="Futevôlei">Futevôlei</option>
                <option value="Beach Tennis">Beach Tennis</option>
            </select>
        </div>
    )
}