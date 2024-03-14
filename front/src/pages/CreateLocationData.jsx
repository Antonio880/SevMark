import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/ContextUser";
import { useLocalContext } from "../Context/ContextLocation";
import axios, { Axios } from "axios";
import ChangeDay from "../components/ChangeDay";
import moment from "moment";

export default function CreateLocationData() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const { locals, setLocals } = useLocalContext();
  const [price, setPrice] = useState(0);
  const { user, setUser } = useUserContext();
  const [images, setImages] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [getNextSevenDays, setGetNextSevenDays] = useState([]);
  const [typeRequisition, setTypeRequisition] = useState("post");
  const [sportsBeforeLocal, setSportsBeforeLocal] = useState([]);
  const location = useLocation()?.state || null;
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

    setGetNextSevenDays([
      {
        id: 1,
        day: "Mon",
        startTime: "07:00",
        endTime: "23:00"
      },
      {
        id: 2,
        day: "Tue",
        startTime: "07:00",
        endTime: "23:00"
      },
      {
        id: 3,
        day: "Wed",
        startTime: "07:00",
        endTime: "23:00"
      },
      {
        id: 4,
        day: "Thu",
        startTime: "07:00",
        endTime: "23:00"
      },
      {
        id: 5,
        day: "Fri",
        startTime: "07:00",
        endTime: "23:00"
      },
      {
        id: 6,
        day: "Sat",
        startTime: "07:00",
        endTime: "23:00"
      },
      {
        id: 7,
        day: "Sun",
        startTime: "07:00",
        endTime: "23:00"
      },
    ])
    const fetchAvaliableTimesForLocal = async () => {
      await axios.get(
        `http://localhost:3001/avaliableTimes/busca?localId=${location.data.id}`
      )
        .then(response => {
          setGetNextSevenDays(response.data)
        });
    };

    const fetchImagesForLocal = async () => {
      await axios.get(
        `http://localhost:3001/images/busca?local_id=${location.data.id}`
      )
        .then(response => {
          setImages(response.data)
        });
    };
    if (location?.data) {
      setInputValue(new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(Number(location.data.price)));
      setSelectedSports(location.sports);
      setSportsBeforeLocal(location.sports);
      setTypeRequisition("put");
      fetchImagesForLocal();
      fetchAvaliableTimesForLocal();
    }
  }, []);

  // useEffect(() => {
  //   console.log(selectedSports, sportsOptions);
  // }, [selectedSports])

  const onSubmit = async (data) => {
    const numericPrice = Number(data.price.replace(/[^0-9]/g, ''));

    const dataWithUserId = {
      locationName: data.locationName,
      price: numericPrice * 0.01,
      description: data.description,
      obs: data.obs,
      usuario_id: user.id
      /* localImage: data.imageUpload */
    };

    try {

      let response;
      if (typeRequisition === "post") {
        response = await axios.post("http://localhost:3001/locals", dataWithUserId);
      } else if (typeRequisition === "put" && location?.data?.id) {
        response = await axios.put(`http://localhost:3001/locals/${location.data.id}`, dataWithUserId);
      }

      if (response.status === 201) {
        const returnLocal = await axios.get(`http://localhost:3001/locals/busca?name=${dataWithUserId.locationName}&description=${dataWithUserId.description}`)
          .catch(err => console.error(err));
        selectedSports.map(async (sportId) => {
          
          if (sportId) {
            const dataSport = {
              name: sportId.name,
              local_id: returnLocal.data[0].id,
            };
            // Requisição para criar o esporte associado ao local
            if (typeRequisition === 'post') {
              await axios.post("http://localhost:3001/sports", dataSport);
            }
            else if (typeRequisition === 'put' && selectedSports !== sportsBeforeLocal) {
              await axios.delete(`http://localhost:3001/sports/busca?local_id=${returnLocal.data[0].id}`);
              await axios.post("http://localhost:3001/sports", dataSport);
            }

          }
        });
        await Promise.all(images.map(async (image) => {

          var formData = new FormData();
          formData.append("file", image);
          formData.append("localId", returnLocal.data[0].id);

          return axios.post("http://localhost:3001/images", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
        }));
        const availableTimes = getNextSevenDays.map(day => ({
          id: day.id,
          day: day.day,
          startTime: day.startTime,
          endTime: day.endTime,
          local_id: returnLocal.data[0].id // Isso será preenchido posteriormente
        }));

        if (typeRequisition === "post") {
          await axios.post("http://localhost:3001/avaliableTimes", {
            availableTimes
          }).catch((e) => alert("Erro ao definir os Horários Disponíveis - " + e));
          setLocals([...locals, dataWithUserId]);
        } else if (typeRequisition === "put") {
          await axios.put("http://localhost:3001/avaliableTimes",
            availableTimes
          )
            .catch((e) => alert("Erro ao atualizar os Horários Disponíveis - " + e));
        }

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
    const selectedSport = sportsOptions.find((sport) => {
      return sport.name === selectedSportId;
    });
    
    console.log(selectedSport);
    if (!selectedSports.includes(selectedSportId)) {
      setSelectedSports([...selectedSports, selectedSportId]);
    }
  };

  const handleRemoveSport = (sportId) => {
    const updatedSports = selectedSports.filter((sport) => sport !== sportId);
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

  const handleDayClick = (day) => {
    if (selectedDay) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
  };

  const handleSelectTimeStart = (time) => {
    if (selectedDay) {
      const updatedDays = getNextSevenDays.map((day) =>
        day.day === selectedDay ? { ...day, startTime: time } : day
      );
      setGetNextSevenDays(updatedDays);
    }
  };

  const handleSelectTimeEnd = (time) => {
    if (selectedDay) {
      const updatedDays = getNextSevenDays.map((day) =>
        day.day === selectedDay ? { ...day, endTime: time } : day
      );
      setGetNextSevenDays(updatedDays);
    }
  };

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
                      defaultValue={location?.data ? location.data?.locationName : ""}
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
                          defaultValue={location?.data != null ? location.data?.description : ""}
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
                        <option key={sport.id} value={sport.name}>
                          {sport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div htmlFor="sports" className="flex items-center justify-center flex-wrap px-4 w-full md:w-[400px] my-2 text-sm font-medium text-gray-900">
                    {selectedSports.length > 0 &&
                      selectedSports.map((sportId, index) => (
                        <div className="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md mx-1 mb-2 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-60 duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" key={index}>
                          {typeRequisition === "post" ? sportsOptions.find((sport) => sport.name === sportId)?.name : sportId?.name}
                          <div className="w-5 flex pl-2 items-center">
                            <img src="xIcon.png" alt="fecha icone" onClick={() => { handleRemoveSport(sportId); }} />
                          </div>
                        </div>
                      ))}

                    {/* {location?.sports.length > 0 &&
                      location?.sports.map((sportId, index) => (
                        <div className="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md mx-1 mb-2 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-60 duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" key={index}>
                          {sportId?.name}
                          <div className="w-5 flex pl-2 items-center">
                            <img src="xIcon.png" alt="fecha icone" onClick={() => { handleRemoveSport(sportId.id) }} />
                          </div>
                        </div>
                      ))} */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row  md:w-full  col-span-full">
                <div className="basis-1/2">
                  <label
                    for="about"
                    className=" text-sm font-medium leading-6 text-gray-900 pl-[9.5vw]"
                  >
                    Obs:
                  </label>
                  <div className="mt-2 px-10 flex justify-center">
                    <textarea
                      id="about"
                      name="about"
                      rows="3"
                      className="flex justify-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
                      {...register("obs")}
                      defaultValue={location?.data ? location.data.obs : ""}
                    ></textarea>
                  </div>
                </div>
                <div className="lg:pl-16  basis-1/2">
                  <div className="">
                    <div className="flex flex-col md:flex-row">
                      <label htmlFor="Available Times" className="flex items-center my-2 pl-[9.5vw] md:pr-3 text-sm font-medium text-gray-900">
                        Horários Disponíveis:
                      </label>
                      <div class="flex bg-white w-[380px] sm:w-[550px] shadow-md justify-start md:justify-center rounded-lg overflow-x-auto mx-auto h-16 py-3 px-2  ">
                        {getNextSevenDays.map((day) => (
                          <ChangeDay
                            key={day.shortDay}
                            shortDay={day.day}
                            handleDayClick={handleDayClick}
                            selectedDay={selectedDay}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center items-center h-14">
                      {
                        selectedDay && (
                          <div className="flex justify-between w-[300px]">
                            <div className="flex">
                              <h3>Inicio:</h3>
                              <select
                                onChange={(e) => handleSelectTimeStart(e.target.value)}
                              >
                                {renderTimeSlots().map((data, index) => {
                                  if (getNextSevenDays.find(days => days.startTime === data && days.day === selectedDay)?.startTime) return <option key={index} value={data}>{data}</option>
                                })}
                                {renderTimeSlots().map((data, index) => (
                                  <option key={index} value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex">
                              <h3>Encerramento:</h3>
                              <select
                                onChange={(e) => handleSelectTimeEnd(e.target.value)}
                              >
                                {renderTimeSlots().map((data, index) => {
                                  if (getNextSevenDays.find(days => days.endTime === data && days.day === selectedDay)?.endTime) return <option key={index} value={data}>{data}</option>
                                })}
                                {renderTimeSlots().map((data, index) => (
                                  <option key={index} value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
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
                    {
                      location?.data && (
                        images.map((image) => {
                          <div className="w-[450px]">
                            <img src={image.src.replace(/\\/g, '/')} alt="" />
                          </div>
                        })
                      )
                    }
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
                        className="relative flex justify-center cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span className="">Coloque a imagem aqui</span>
                        <input
                          id="file-upload"
                          name="file"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            if (e.target.files[0])
                              setImages([...images, e.target.files[0]]);
                          }}
                        />

                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      Lembrando que a primeira imagem será a imagem padrão
                    </p>
                  </div>

                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-around sm:justify-end gap-x-6">
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
const renderTimeSlots = () => {
  const timeSlots = [];
  const startTime = moment().startOf("day").hour(1); // hora inicial
  const endTime = moment().startOf("day").hour(24); // hora final

  let currentTime = startTime.clone();
  while (currentTime.isBefore(endTime)) {
    const time = currentTime.format("HH:mm");
    // const isMarked = timeSelected.includes(time);
    // const isAvailable = !isMarked || selectedClockDay.includes(time);
    timeSlots.push(
      time
    );

    currentTime = currentTime.add(1, "hour");
  }

  return timeSlots;
};
