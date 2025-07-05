import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { hideNav, showNav } from "../state/navHideSlice.js"
import { registerSchema } from "../validator/auth.validator.js"
import { toast, Bounce } from "react-toastify"
import { useRegister, useGoogleSignIn } from "../utils/query.util.js"
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "../state/authSlice.js";
import { CookieStorage } from "cookie-storage";


export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookieStorage = new CookieStorage();
  const registerMutation = useRegister();
  const googleMutation = useGoogleSignIn();

  useEffect(() => {
    dispatch(hideNav());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: firstName + " " + lastName,
      email,
      password
    }
    const newFormData = {
      firstName,
      email,
      password
    }
    const result = registerSchema.safeParse(newFormData)
    if (!result.success) {
      console.error("Validation failed:", result.error);
      toast.error(`Please write ${result.error.errors[0].path[0].toLowerCase()} properly`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    registerMutation.mutate(
      formData,
      {
        onSuccess: data => {
          console.log(data)
          setLoading(false);
          navigate("/login")
          toast.success('Register Successful', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        },
        onError: error => {
          toast.error(`${error.response.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setLoading(false);
        }
      }
    )
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      const { access_token } = res;
      console.log("Google Access Token:", access_token);
      
      googleMutation.mutate(
        {
          accessToken: access_token,
        },
        {
          onSuccess: (data) => {
            console.log("Google login data:", data);
            
            // Dispatch login action
            dispatch(
              login({
                user: data.data.data,
                accessToken: data.accessToken,
                refreshToken: cookieStorage.getItem("refreshToken"),
                profilePic: data.data.data.profilePicture,
              })
            );
            
            // Show nav and navigate
            dispatch(showNav());
            
            // Navigate to home
            navigate("/home", { replace: true });

            // Show success toast
            toast.success("Google Login Successful", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            
            // Reset loading state
            setLoading(false);
          },
          onError: (error) => {
            console.error("Google login failed:", error);
            const errorMessage = error?.response?.data?.message || "Google login failed. Please try again.";
            
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            setLoading(false);
          },
        }
      );
    },
    onError: (error) => {
      console.error("Google OAuth failed:", error);
      const errorMessage = error?.message || "Google login failed. Please try again.";
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
    },
  });

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    googleLogin();
  }

  const GoogleLogo = () => (
    <svg className="h-5 w-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.3H272v95.2h147.1c-6.4 34.4-25.4 63.5-54.3 83.1v68.9h87.9c51.5-47.4 81.8-117.2 81.8-197z"
      />
      <path
        fill="#34A853"
        d="M272 544.3c73.8 0 135.6-24.5 180.8-66.7l-87.9-68.9c-24.5 16.4-55.7 26.1-92.9 26.1-71.5 0-132-48.1-153.6-112.8H27.4v70.8c45.1 89.3 137.3 150.2 244.6 150.2z"
      />
      <path
        fill="#FBBC05"
        d="M118.4 321.9c-10.6-31.9-10.6-66.1 0-98l-70.8-70.8C-6.1 216.8-16.6 320.6 27.4 391.7l91-69.8z"
      />
      <path
        fill="#EA4335"
        d="M272 107.3c39.9-.6 78.1 14.5 107.3 41.4l80.2-80.2C418.5 24.1 346.4-2.8 272 0 164.7 0 72.5 60.9 27.4 150.2l91 70.8C140 155.5 200.5 107.3 272 107.3z"
      />
    </svg>
  );
  
  const text = "<";
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-zinc-50 p-6 sm:p-10">
      <Card className="w-full max-w-lg shadow-xl border border-zinc-200 bg-white p-6 rounded-lg relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-blue-700 hover:bg-gray-100"
          onClick={() => {
            navigate("/");
            dispatch(showNav());
          }}
          aria-label="Go to home"
        >
          <span className="text-2xl font-bold">{text}</span>
        </Button>
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-4xl text-center font-extrabold text-blue-700">Create account</CardTitle>
          <CardDescription className="text-center text-base text-zinc-600 mt-2">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-7">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text" placeholder="John" required className="w-full border-zinc-300 focus:border-blue-500 focus:ring-blue-500 text-zinc-800 p-2.5 rounded-md" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  type="text" placeholder="Doe" required className="w-full border-zinc-300 focus:border-blue-500 focus:ring-blue-500 text-zinc-800 p-2.5 rounded-md" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email" placeholder="john@example.com" required className="w-full border-zinc-300 focus:border-blue-500 focus:ring-blue-500 text-zinc-800 p-2.5 rounded-md" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"} placeholder="Create a password" required className="w-full pr-10 border-zinc-300 focus:border-blue-500 focus:ring-blue-500 text-zinc-800 p-2.5 rounded-md" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-zinc-500 hover:bg-zinc-100 rounded-r-md"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input id="confirmPassword"
                  onChange={e => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" required className="w-full pr-10 border-zinc-300 focus:border-blue-500 focus:ring-blue-500 text-zinc-800 p-2.5 rounded-md" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-zinc-500 hover:bg-zinc-100 rounded-r-md"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm font-normal text-zinc-700">
                I agree to the{' '}
                <Button variant="link" className="px-0 h-auto font-normal text-sm text-blue-600 hover:underline">Terms of Service</Button>{' '}and{' '}
                <Button variant="link" className="px-0 h-auto font-normal text-sm text-blue-600 hover:underline">Privacy Policy</Button>
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-md transition-colors duration-200 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          <div className="flex items-center gap-3 my-6">
            <Separator className="flex-1 bg-zinc-300" />
            <span className="text-sm text-zinc-600">Or continue with</span>
            <Separator className="flex-1 bg-zinc-300" />
          </div>
          <Button
            variant="outline"
            onClick={(e) => handleGoogleLogin(e)}
            className="w-full border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700 flex items-center justify-center gap-2 py-2.5 rounded-md transition-colors duration-200 ease-in-out"
            disabled={isLoading}
          >
            <GoogleLogo />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>
          <p className="text-center text-sm text-zinc-600 mt-4">
            Already have an account?{' '}
            <Button variant="link" className="px-0 h-auto font-normal text-sm text-blue-600 hover:underline" onClick={() => navigate('/login')}>
              Log in
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}