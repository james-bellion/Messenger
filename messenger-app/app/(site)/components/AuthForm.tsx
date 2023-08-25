"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { BsGithub, BsGoogle } from "react-icons/bs";

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// *Types
// use this variant to define the possibilities of our use state function
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  // *states
  // default option of useStateVariant is 'LOGIN"
  // use isLoading/setLoading to disable our buttons & inputs after user submits the form
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  // check if currrent session is Authenticated
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]); //added to the dependency array to watch for changes

  // function to toggle between login and register
  // chage the variant depending on current state of variant
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  // React hook form submit function + other functions

  const {
    // extract functions: register, handle submit, form state > destructure errors
    // needed for the form state
    register,
    handleSubmit,
    formState: { errors },

    // useForm hook
  } = useForm<FieldValues>({
    // default possible values in the form
    // used to grab the data
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // on submit function
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data) // data = name, email & password api refers to '..api/register/route.ts
        .then(() => signIn("credentials", data)) // imediatly sign in once user registers
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      // how are we going to sign in? github prover, google provider and credentials provider?
      signIn("credentials", {
        ...data, // existing data that we also send in the register
        redirect: false, // spreading the data as we add another argument and set it to false
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials bro");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/users"); // redirect to /users when log in
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false }) // calling in the social action onclick sign in
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
     mt-8
     sm:mx-auto
     sm:w-full
     sm:max-w-md"
    >
      <div
        className="
         bg-white
         px-4
         py-8
         shadow
         sm:rounded-lg
         sm:px-10"
      >
        {/* - handelSubmit function is exported from useForm(see above)
            - our handelSubmit is going to wrap the onSubmit Function (see above)
            - this is how we get the data from this react hook form
            - need to pass in (onSubmit) so we can pass the data to use it and send to our server/ database */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* *using the Input component*
                        passing in the register prop: passing in the register that I destructued 
                        from the useForm.
                        -errors is from the destructured useForm state from the useForm Hook */}

          {/* only if we are registering we will show the name input,
               otherwise we will not show anything */}

          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input
            id="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div>
            {/* passing props to button > disabled if isLoading, fullWidth and
              type submit means: dont need an explicit onClick function for the button
              as the button is inside of our form element so when we click the button it will
             trigger the onSubmit function in place above  */}
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                      absolute
                      inset-0
                      flex
                      items-center
                      "
            >
              <div
                className="
                        w-full
                        border-t
                        border-gray-300"
              />
            </div>
            <div
              className="
                     relative
                     flex
                     justify-center
                     text-sm"
            >
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            {/* social buttons  */}
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />

            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div
          className="
         flex
         gap-2
         justify-center
         text-sm
         mt-6
         px-2
         text-gray-500
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

// Personal Dev Notes

// --.) added 'use client' to the top of the page as I want this page to be interacive
//     It Will contain inputs, buttons use effects ect.
//     **these are not compatible with server components so I have to define 'use-client' at the top
//     so Next.13 knows its a Client component.

// --.) packages added at this stage: npm install react-icons react-hook-form clsx

// Recap
//  1.) added the actions that I need to use to sign Up:
//    register, handleSubmit
// 2.) created the Input component that handels the react hook form
//
