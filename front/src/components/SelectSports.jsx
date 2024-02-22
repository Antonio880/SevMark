import { useEffect, useState } from "react";

export default function SelectSports({ handleSelectSports, handleRemoveSport, selectedSport }) {
    const [sportsOptions, setSportsOptions] = useState([]);

    useEffect(() => {
        setSportsOptions([
          {
            id: 1,
            name: "Vôlei"
          },
          {
            id: 2,
            name: "Futebol"
          },
          {
            id: 3,
            name: "Futevôlei"
          },
          {
            id: 4,
            name: "BeachTennis"
          },
        ])
      }, []);

    return (
        <div className="flex my-2">
            <label htmlFor="sport" className="my-2 pr-3 text-lg font-medium text-gray-900">
                Sport:
            </label>
            <select
                id="sport"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-orange-200 focus:border-orange-200 p-2.5`}
                onChange={handleSelectSports}
            >
                <option defaultValue={""}>Choose a Sport</option>
                 {sportsOptions && sportsOptions.map((sport) => (
                    <option key={sport.id} value={sport.name}>
                        {sport.name}
                    </option>
                 ))}
            </select>
            {selectedSport.name != "" &&
                <div className="flex items-center bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-md mx-1 mb-2 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-60 duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                    {selectedSport}
                    <div className="w-5 flex pl-2 items-center">
                        <img src="xIcon.png" alt="fecha icone" onClick={() => {handleRemoveSport()}} />
                    </div>
                </div>
            }
        </div>
    )
}