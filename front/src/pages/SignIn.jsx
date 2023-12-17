import Header from "../components/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserContext } from "../components/ContextUser";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import ButtonSign from "../components/ButtonSign";

export default function SignIn() {

  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/home");
    const email = watch("email");
    const password = watch("password");
    const data = {
      email: email,
      password: password,
    };
    setUser(data);
  };

  return (
    <div className="justify-center items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                {errors.password && <span>This field is required</span>}
              </div>
            </div>
            <div>
              <ButtonSign text={"Sign In"} />
            </div>
          </form>

          <p className="flex justify-center pt-4">
            Ainda não cadastrado?{" "}
            <strong>
              <a
                className="pl-2 cursor-pointer"
                onClick={() => navigate("/sign-up")}
              >
                Clique aqui
              </a>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
