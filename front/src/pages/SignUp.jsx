import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserContext } from "../components/ContextUser";
import { useNavigate } from "react-router-dom";
import ButtonSign from "../components/ButtonSign";
import Input from "../components/Input";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [ typeUser, setTypeUser ] = useState("");
  const { user, setUser } = useUserContext();
  const BASE_URL = "http://localhost:3001/";
  // "https://chat-socket-eb53a2dd15bb.herokuapp.com/" ||
  const navigate = useNavigate();

  const onSubmit = async () => {
    const email = watch("email");
    const password = watch("password");
    const username = watch("username");
    const data = {
      // id: `${new Date().getTime()}`,
      username: username,
      email: email,
      password: password,
      typeUser: typeUser,
    };

    const response = await axios.post(`${BASE_URL}users`, data);
    console.log(response);
    
    if(response.status === 409){
      alert("Usuário ja Existe");
    }else if(response.status === 201){
      setUser(data);
      if(typeUser === "cliente"){
        navigate("/home");
      }else{
        navigate("/create-location");
      }
    }
  };

  const handleClick = (text) => {
    setTypeUser(text);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <Input type={"username"} register={register} />
              </div>
              {errors.username && <span>This field is required</span>}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input type={"email"} register={register} />
              </div>
              {errors.email && <span>This field is required</span>}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Input type={"password"} register={register} />
                {errors.password && (
                  <span className="text-orange-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                  type={"password"}
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  {...register("passwordConfirm", {
                    required: "Confirm Password is required",
                    validate: {
                      matchesPassword: (value) => {
                        const password = watch("password");
                        if (password && value !== password) {
                          return "Your passwords do not match";
                        }
                        return true;
                      },
                    },
                  })}
                />
                <p className="alerts">{errors.passwordConfirm?.message}</p>
              </div>
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  sx={{
                    backgroundColor: typeUser === "cliente" && "rgb(255, 124, 28)",
                    color: typeUser === "cliente" ? "white" : "rgb(255, 124, 28)",
                    "&:hover": {
                      backgroundColor: "rgb(255, 124, 28)",
                      color: "white", // Se desejar mudar a cor do texto no hover
                    },
                  }}
      
                  onClick={() => handleClick("cliente")}
                >
                  Cliente
                </Button>
                <Button
                  sx={{
                    backgroundColor: typeUser === "dono" && "rgb(255, 124, 28)",
                    color: typeUser === "dono" ? "white" : "rgb(255, 124, 28)",
                    "&:hover": {
                      backgroundColor: "rgb(255, 124, 28)",
                      color: "white", // Se desejar mudar a cor do texto no hover
                    },
                  }}

                  onClick={() => handleClick("dono")}
                >
                  Dono</Button>
              </ButtonGroup>
            </Box>
            <div>
              <ButtonSign text={"Sign Up"} />
            </div>
            <p className="flex justify-center pt-4">
              Já está cadastrado?{" "}
              <strong>
                <a
                  className="pl-2 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Clique aqui
                </a>
              </strong>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
