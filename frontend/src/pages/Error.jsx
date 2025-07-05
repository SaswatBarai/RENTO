import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import {useNavigate} from "react-router-dom"

export function ErrorSection() {
    const navigate = useNavigate();
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8 bg-gradient-to-b from-blue-50 to-white">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto text-blue-600" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl text-blue-700"
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-600 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it. Please try refreshing
          the page or come back later.
        </Typography>
        <Button color="blue" className="w-full px-4 md:w-[8rem]" onClick={() => navigate("/home")} >
          Back Home
        </Button>
      </div>
    </div>
  );
}

