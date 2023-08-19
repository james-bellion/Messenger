'use client'

import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Input from "@/app/components/inputs/Input"
import Button from "@/app/components/Button"

// *Types
// use this variant to define the possibilities of our use state function
type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

    // *states 
    // default option of useStateVariant is 'LOGIN"
    // use isLoading/setLoading to disable our buttons & inputs after user submits the form
    const [variant, setVariant] = useState<Variant>('LOGIN') 
    const [isLoading, setIsLoading] = useState(false)


    // function to toggle between login and register
    // chage the variant depending on current state of variant
    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    // React hook form submit function + other functions

    const {
        // extract functions: register, handle submit, form state > destructure errors
        // needed for the form state
        register,
        handleSubmit,
        formState: {
            errors
        }

        // useForm hook
    } = useForm<FieldValues>({
        // default possible values in the form
        // used to grab the data
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    // on submit function
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'REGISTER') {
            //Axios Registor
        }

        if (variant === 'LOGIN') {
            // NextAuth SignIn
        }
    }

    // 
    const socialAction = (action: string) => {
        setIsLoading(true)
    }

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
         shodow
         sm:rounded-lg
         sm:px-10"
         >

            {/* - handelSubmit function is exported from useForm(see above)
            - our handelSubmit is going to wrap the onSubmit Function (see above)
            - this is how we get the data from this react hook form
            - need to pass in (onSubmit) so we can pass the data to use it and send to our server/ database */}
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >


                {/* *using the Input component*
                        passing in the register prop: passing in the register that I destructued 
                        from the useForm.
                        -errors is from the destructured useForm state from the useForm Hook */}

              {/* only if we are registering we will show the name input,
               otherwise we will not show anything */}

                {variant === 'REGISTER' && (
                    <Input
                      id="name"
                      label="name"
                      register={register}
                      errors={errors}
                      />
                )}

                     <Input
                      id="email"
                      label="Email Address"
                      type="email"
                      register={register}
                      errors={errors}
                      />

                     <Input
                      id="password"
                      label="Password"
                      type="password"
                      register={register}
                      errors={errors}
                      />

                      <div>
                        <Button>
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                      </div>


            </form>

        </div>


    </div>
  )
}

export default AuthForm

// Personal Dev Notes

// 1.) added 'use client' to the top of the page as I want this page to be interacive 
//     It Will contain inputs, buttons use effects ect. 
//     **these are not compatible with server components so I have to define 'use-client' at the top
//     so Next.13 knows its a Client component. 

// 2.) packages added at this stage: npm install react-icons react-hook-form clsx