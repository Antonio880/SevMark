import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/ContextUser";
import axios from "axios";

export default function CreateLocationData() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [ price, setPrice ] = useState(0);
  const { user } = useUserContext();
  const [ images, setImages ] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
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

  const onSubmit = async (data) => {
    console.log(data.imageUpload);
    const numericPrice = Number(data.price.replace(/[^0-9]/g, ''));
    const dataWithUserId = { 
      locationName: data.locationName,
      price: numericPrice * 0.01,
      description: data.description,
      obs: data.obs,
      usuario_id: user.id,
      /* localImage: data.imageUpload */
     };
     
    try {
      const response = await axios.post("http://localhost:3001/locals", dataWithUserId);
      
      if (response.status === 201) {
        const returnLocal = await axios.get(`http://localhost:3001/locals/busca?name=${dataWithUserId.locationName}&description=${dataWithUserId.description}`)
          .catch(err => console.error(err));
        const createSportPromises = selectedSports.map(async (sportId) => {
          const selectedSport = sportsOptions.find((sport) => sport.id == sportId);
        
          if (selectedSport) {
            const dataSport = {
              name: selectedSport.name,
              local_id: returnLocal.data.id,
            };
            // Requisição para criar o esporte associado ao local
            await axios.post("http://localhost:3001/sports", dataSport);
          }
        });
        /* data.imageUpload.map(async (image) => {
          const imageWithLocalId = {
            image,
            local_id: returnLocal.data.id
          }
          await axios.post("http://localhost:3001/images", image);
        }) */
        navigate("/home");
      } else {
        alert("Sua criação foi inválida");
      }
    } catch (error) {
      console.error("Deu o seguinte erro na requisição API:", error);
      alert("Erro ao criar o local");
    }
  };

  const handleSelectSports = (event) => {
    const selectedSportId = event.target.value;

    if (!selectedSports.includes(selectedSportId)) {
      setSelectedSports([...selectedSports, selectedSportId]);
    }
  };

  const handleRemoveSport = (sportId) => {
    const updatedSports = selectedSports.filter((id) => id !== sportId);
    setSelectedSports(updatedSports);
  };

  const handlePriceChange = (event) => {
    const rawValue = event.target.value;
    setPrice(event.target.value);
    // Remove todos os caracteres não numéricos
    const numericValue = rawValue.replace(/[^0-9]/g, '');

    // Formate o valor numérico
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(Number(numericValue) / 100);

    // Atualize o estado com o valor formatado
    setInputValue(formattedValue);
  };

  useEffect(() => {
    console.log(images)
  }, [images])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="pt-4">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="flex justify-center text-base font-semibold leading-7 text-gray-900">
              Cadastro do Local para ser Alugado
            </h2>

            <div className="mt-10 flex flex-col md:gap-x-6 md:gap-y-8 md:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  for="name"
                  className="flex justify-center text-sm font-medium leading-6 text-gray-900"
                >
                  Nome do Local
                </label>
                <div className="mt-2 flex justify-center">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                    <input
                      type="text"
                      name="locationName"
                      id="locationName"
                      autoComplete="locationName"
                      className="flex-1 border-0 w-60 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register("locationName", {
                        required: "Campo obrigatório",
                      })}
                    />
                  </div>
                </div>
                {errors.locationName && (
                  <p className="text-red-500  flex justify-center">{errors.locationName.message}</p>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-center">
                <div>
                  <div className="md:col-span-4">
                    <label
                      for="price"
                      className="text-sm flex justify-center md:justify-start font-medium leading-6 text-gray-900"
                    >
                      Preço por Hora
                    </label>
                    <div className="mt-2 flex justify-center md:justify-start">
                      <div className=" rounded-md w-28 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                        <input
                          type="text"
                          name="price"
                          id="price"
                          autoComplete="price"
                          className="flex-1 border-0 w-28 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          {...register("price", { required: "Campo obrigatório" })}
                          value={inputValue}
                          onChange={handlePriceChange}
                        />
                      </div>
                      {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <label
                      htmlFor="price"
                      className="flex justify-center text-sm font-medium leading-6 text-gray-900"
                    >
                      Endereço
                    </label>
                    <div className="flex justify-center ">
                      <div className="flex mt-2 rounded-md w-80 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                        <input
                          type="text"
                          name="price"
                          id="price"
                          autoComplete="price"
                          className="flex-1  border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          {...register("description", { required: "Campo obrigatório" })}
                        // onChange={formatarPreco}
                        />
                      </div>
                      {errors.location && (
                        <p className="text-red-500">{errors.location.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex my-3 justify-center">
                    <label htmlFor="sport" className="flex items-center my-2 pr-3 text-sm font-medium text-gray-900">
                      Sport:
                    </label>
                    <select
                      id="sport"
                      className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-200 focus:border-orange-200 p-2.5`}
                      {...register("sport", { required: "Campo obrigatório" })}
                      onChange={handleSelectSports}
                    >
                      <option defaultValue={""}>Choose a Sport</option>
                      {sportsOptions && sportsOptions.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div htmlFor="sports" className="flex items-center justify-center flex-wrap px-4 w-[400px] my-2 text-sm font-medium text-gray-900">
                    {selectedSports.length > 0 &&
                      selectedSports.map((sportId, index) => (
                        <div className="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md mx-1 mb-2 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-60 duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" key={index}>
                          {sportsOptions.find((sport) => sport.id == sportId)?.name}
                          <div className="w-5 flex pl-2 items-center">
                            <img src="xIcon.png" alt="fecha icone" onClick={() => {handleRemoveSport(sportId)}} />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="px-20 md:px-44 col-span-full">
                <label
                  for="about"
                  className=" text-sm font-medium leading-6 text-gray-900"
                >
                  Obs
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("obs")}
                  ></textarea>
                </div>
              </div>
              <div className="px-20 md:px-44">
                <label
                  for="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file"
                          type="file"
                          className="sr-only"
                          onClick={(e) => {
                            setImages([...images, e.target.files[0]])
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
            {
              images.map((image) => {
                <img src={"seta.png"} alt="" />
              })
            }
            <div className="mt-6 mr-44 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate("/home")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
