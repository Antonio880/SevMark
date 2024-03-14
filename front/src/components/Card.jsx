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
  const [showButton, setShowButton] = useState(false);
  const [images, setImages] = useState([]);

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

    if (innerWidth <= 640)
      setShowButton(true)

    fetchSports();
    fetchImages();
  }, []);

  const handleRemoveClick = () => {
    onRemove(id);
  };

  return (
    <div  >
      <div
        className={`relative mt-5 rounded-md h-[90px] sm:h-[95px] md:h-[150px] w-[390px] sm:w-[640px] md:w-[800px] lg:w-[1000px] flex shadow-md bg-slate-100 leading-6 transition ease-in-out cursor-pointer delay-150 sm:hover:-translate-y-1  sm:hover:scale-70 sm:hover:bg-slate-200 ${user.id === usuario_id && "animate-fade"} duration-200 focus-visible:outline focus-visible:outline-2`}
        onClick={() => {
          setShowDisplayMark(!showDisplayMark);
        }}
        onMouseOver={() => user.id === usuario_id && setShowButton(true)}
        onMouseOut={() => user.id === usuario_id && setShowButton(false)}
      >
        <>

          {
            innerWidth >= 640 && (
              <div className="">
                <img
                  className="rounded-md md:h-full w-[140px] sm:w-[170px] md:w-[240px] lg:w-[280px]"
                  src={`${images[0]?.src.replace(/^.*\\uploads\\/, 'uploads\\')}`}
                  alt=""
                />
              </div>
            )
          }

          {
            showButton && (
              <div className="absolute left-[92%] sm:left-[607px] md:left-[758px] lg:left-[960px] top-2 sm:top-3" onClick={handleRemoveClick} >
                <img src="lixeiro.png" className="w-6 md:w-7 lg:w-8" alt="" />
              </div>
            )
          }
          {
            showButton && (
              <Link to={"/create-location"} state={{ data, sports }}>
                <div className="absolute left-[84%] sm:left-[577px] md:left-[714px] lg:left-[914px] top-2 sm:top-3">
                  <TfiPencilAlt size={`${innerWidth >= 640 ? "2rem" : "1.25rem"}`} />
                </div>
              </Link>
            )
          }
          <div className="w-1/2 sm:w-[180px] md:w-[270px] lg:w-[400px] text-sm md:text-xl lg:mx-3 mt-5 sm:mt-7 md:mt-12">
            <p className="flex items-center justify-center  font-semibold leading-6 text-gray-900">
              {locationName}
            </p>
            <div className="flex justify-center">
              <p className="flex items-center justify-center overflow-auto text-center text-gray-500">
                {description}
              </p>
            </div>
          </div>
          <div className="w-1/2 mt-6">
            <p className="flex text-sm items-end sm:pl-6 sm:h-8 md:h-12  justify-center md:text-lg lg:text-xl font-semibold leading-6 text-gray-700">
              <strong>{price}</strong>
            </p>
            <div className="flex justify-center  flex-wrap">
              {sports.length > 0 &&
                sports.map((sport, index) => (
                  <div
                    className="flex text-xs bg-gray-50 border border-gray-300 text-gray-900 md:text-base lg:text-lg rounded-md mx-[2px] sm:mx-1 mb-1 px-[2px] sm:px-1 "
                    key={index}
                  >
                    {sport.name}
                  </div>
                ))}
            </div>
          </div>
          {
            innerWidth >= 640 && (
              <div className="absolute sm:top-10 md:top-16 left-[370px] sm:left-[610px] md:left-[770px] lg:left-[970px] cursor w-4">
                <img src="./seta.png" alt="img seta" />
              </div>
            )
          }
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
