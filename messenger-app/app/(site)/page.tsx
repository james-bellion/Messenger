import Image from "next/image"
import AuthForm from "./components/AuthForm"

export default function Home() {
    return (
      <div
      className="
      flex
      min-h-full
      flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-gray-100
      ">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
            alt="logo"
            height="48"
            width="48"
            className="mx-auto w-auto"
            src="/images/logo.png"
            />

        <h2 className="
        mt-6
        text-center
        text-3xl
        font-bold
        tracking-tight
        text-gray-900">
            Sign in to your account
        </h2>
        </div>

        <AuthForm />

      </div>
     
    )
  }



  // Personal Dev Notes:

  // Styling: Tip: Hover over classNames to reveil what a tailwind class does in normal CSS !

  // Recap : 
  // 1.) used to have our page.tsx inside of app folder serving as a root file.
  // 2.) > moved the file inside new folder (site) for orginisation still treated as a root file.
  // 3.) added image logo