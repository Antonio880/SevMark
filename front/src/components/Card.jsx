import axios from "axios";
import { useEffect, useState } from "react";
import DisplayMark from "./DisplayMark";
import { useUserContext } from "./ContextUser";

export default function Card({ data }) {
  const { locationName, description, price, id, usuario_id } = data;
  const { user } = useUserContext();
  const [sports, setSports] = useState([]);
  const [showDisplayMark, setShowDisplayMark] = useState(false);
  const [ showDeleteButton, setShowDeleteButton ] = useState(false);

  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          `http://localhost:3001/sports/busca?id=${id}`
        );
        setSports(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSports();
  }, []);

  return (
    <div  >
      <div   
        className={`relative mt-5 rounded-md w-[400px] sm:w-[590px] md:w-[700px] lg:w-[800px] flex shadow-md bg-slate-100 leading-6 transition ease-in-out cursor-pointer delay-150 hover:-translate-y-1  hover:scale-70 hover:bg-slate-200 ${user.id === usuario_id && "animate-fade"} duration-200 focus-visible:outline focus-visible:outline-2`}
        onClick={() => {
          setShowDisplayMark(!showDisplayMark);
        }}
        onMouseOver={() => user.id === usuario_id && setShowDeleteButton(true)}
        onMouseOut={() => user.id === usuario_id && setShowDeleteButton(false)}
      >
        <>
          <div className="">
            <img
              className="rounded-md h-full sm:w-[240px] md:w-40"
              src="https://source.unsplash.com/random/170x110"
              alt=""
            />
          </div>
          {
            showDeleteButton && (
              <div className="absolute left-[770px] top-2" >
                <img src="lixeiro.png" className="w-5" alt="" />
              </div> 
            )
          }
          <div className="w-[400px] sm:mx-3 mt-6 ">
            <p className="flex items-center justify-center text-sm font-semibold leading-6 text-gray-900">
              {locationName}
            </p>
            <p className="flex items-center justify-center truncate text-xs leading-5 text-gray-500">
              {description}
            </p>
          </div>
          <div className="pr-8">
            <p className="flex items-center pt-8 justify-center text-base font-semibold leading-6 text-gray-700">
              <strong>{price}</strong>
            </p>
            <div className="flex justify-center flex-wrap">
              {sports.length > 0 &&
                sports.map((sport, index) => (
                  <div
                    className="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md mx-1 mb-1 px-1 "
                    key={index}
                  >
                    {sport.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="absolute top-12 left-[370px] sm:left-[560px] md:left-[670px] lg:left-[770px] cursor w-4">
            <img src="./seta.png" alt="img seta" />
          </div>
        </>
    </div>
    {
        showDisplayMark && (
          <DisplayMark data={data} setShowDisplayMark={setShowDisplayMark} />
        )
      }
    </div>
  );
}
