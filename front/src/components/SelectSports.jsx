export default function SelectSports(){
    return(
        <div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sports</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-200 focus:border-orange-200 block w-full p-2.5 ">
                <option selected>Choose a Sport</option>
                <option value="volei">Vôlei</option>
                <option value="futebol">Futebol</option>
                <option value="futevolei">Futevôlei</option>
                <option value="beach">Beach Tennis</option>
            </select>
        </div>
    )
}