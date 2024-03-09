import axios from "axios";
import { useEffect, useState } from "react";
import DisplayMark from "./DisplayMark";
import { TfiPencilAlt } from "react-icons/tfi";
import { useUserContext } from "../Context/ContextUser";
import { Link } from "react-router-dom";

export default function Card({ data, onRemove }) {
  const { locationName, description, price, id, usuario_id } = data;
  const { user } = useUserContext();
  const [sports, setSports] = useState([]);
  const [showDisplayMark, setShowDisplayMark] = useState(false);
  const [ showButton, setShowButton ] = useState(false);
  const [ images, setImages ] = useState([]);

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

    async function fetchImages() {
        await axios.get(`http://localhost:3001/images/busca?local_id=${id}`)
          .then(response => setImages(response.data))
          .catch(err => console.error(err));
    }

    fetchSports();
    fetchImages();
  }, []);

  const handleRemoveClick = () => {
    onRemove(id);
  };

  return (
    <div  >
      <div   
        className={`relative mt-5 rounded-md h-[150px] w-[400px] sm:w-[590px] md:w-[700px] lg:w-[1100px] flex shadow-md bg-slate-100 leading-6 transition ease-in-out cursor-pointer delay-150 hover:-translate-y-1  hover:scale-70 hover:bg-slate-200 ${user.id === usuario_id && "animate-fade"} duration-200 focus-visible:outline focus-visible:outline-2`}
        onClick={() => {
          setShowDisplayMark(!showDisplayMark);
        }}
        onMouseOver={() => user.id === usuario_id && setShowButton(true)}
        onMouseOut={() => user.id === usuario_id && setShowButton(false)}
      >
        <>
          <div className="">
            <img
              className="rounded-md h-full sm:w-[240px]"
              src={`${images[0]?.src}`}
              alt=""
            />
          </div>
          {
            showButton && (
              <div className="absolute left-[1060px] top-3" onClick={handleRemoveClick} >
                <img src="lixeiro.png" className="w-7" alt="" />
              </div> 
            )
          }
          {
            showButton && (
              <Link to={"/create-location"} state={{ data, sports }}>
                <div className="absolute left-[1000px] top-3">
                  <TfiPencilAlt size={28} />
                </div>
              </Link>
            )
          }
          <div className="w-[400px] sm:mx-3 mt-12 ">
            <p className="flex items-center justify-center text-xl font-semibold leading-6 text-gray-900">
              {locationName}
            </p>
            <p className="flex items-center justify-center truncate text-xl leading-5 text-gray-500">
              {description}
            </p>
          </div>
          <div className="">
            <p className="flex items-end h-16 mt-1 justify-center text-xl font-semibold leading-6 text-gray-700">
              <strong>{price}</strong>
            </p>
            <div className="flex justify-center flex-wrap">
              {sports.length > 0 &&
                sports.map((sport, index) => (
                  <div
                    className="flex bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md mx-1 mb-1 px-1 "
                    key={index}
                  >
                    {sport.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="absolute top-16 left-[370px] sm:left-[560px] md:left-[670px] lg:left-[1070px] cursor w-4">
            <img src="./seta.png" alt="img seta" />
          </div>
        </>
    </div>
    {
        showDisplayMark && (
          <DisplayMark data={data} images={images} setShowDisplayMark={setShowDisplayMark} />
        )
      }
    </div>
  );
}
