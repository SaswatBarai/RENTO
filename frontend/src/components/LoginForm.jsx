import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { hideNav, showNav } from "../state/navHideSlice.js"
import { useNavigate } from "react-router-dom"
import { loginSchema } from "../validator/auth.validator.js"
import { useLogin, useGoogleSignIn } from "../utils/query.util.js"
import { Spinner } from "./ui/Spinner.jsx";
import { toast, Bounce } from "react-toastify";
import { login } from "../state/authSlice.js"
import { Home } from "lucide-react";
import { CookieStorage } from "cookie-storage"
import { useGoogleLogin } from "@react-oauth/google"
import { SetSelectedCity } from "../utils/setselectedcity.localStorage.js"


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookieStorage = new CookieStorage();




  useEffect(() => {
    dispatch(hideNav());
  }, [dispatch])

  const loginMutation = useLogin();
  const googleMutation = useGoogleSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = {
      email,
      password
    };

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      console.error("Validation failed:", result.error.errors[0].message);
      toast.error(`${result.error.errors[0].message}`, {
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

    loginMutation.mutate(
      formData,
      {
        onSuccess: data => {
          console.log("Login data:", data);
          dispatch(login(
            {
              user: data.data.data,
              accessToken: data.accessToken,
              refreshToken: cookieStorage.getItem("refreshToken"),
              profilePic: data.data.data.profilePicture,
              
            }
          ))
          localStorage.setItem("user", JSON.stringify(data.data.data));
          localStorage.setItem("refreshToken", cookieStorage.getItem("refreshToken"));
          setLoading(false)
          let visibleLocationForm = data.data.data.visibleLocationForm;
          console.log("From vis",visibleLocationForm)
          if (visibleLocationForm) {
            navigate("/first/Setlocation")
            toast.info('Set Your Location', {
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
            return;
          }
        
          navigate("/home")
          SetSelectedCity();
          toast.success('Login Successfull', {
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
        onError: (error) => {
          console.log(error.response.data.message)
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
          setLoading(false)
        },
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
            console.log("USer  detail from form", data.data.data)
            console.log("Visible", data.data.data.visibleLocationForm)
            dispatch(
              login({
                user: data.data.data,
                accessToken: data.accessToken,
                refreshToken: cookieStorage.getItem("refreshToken"),
                profilePic: data.data.data.profilePicture,
                // isVisibleLocationForm:!data.data.data.isLocationSet
              })
            );
            localStorage.setItem("user", JSON.stringify(data.data.data));
            localStorage.setItem("selectedCity", data.data.data.location);
            setLoading(false);
            let visibleLocationForm = data.data.data.visibleLocationForm;
            if (visibleLocationForm) {
              console.log("hello",visibleLocationForm)
              navigate("/first/Setlocation")
              toast.success('Set Your Location', {
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
              return;
            }
            navigate("/home");
            dispatch(showNav());

            toast.success("Google Login Successfull", {
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
          onError: (error) => {
            console.error("Google login failed:", error.response.data.message);
            toast.error("Google login failed. Please try again.", {
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
      console.error("Google login failed:", error.response.data.message);
      toast.error("Google login failed. Please try again.", {
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
  };

  // Google SVG logo component
  const GoogleLogo = () => (
    <svg className="h-5 w-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.3H272v95.2h147.1c-6.4 34.4-25.4 63.5-54.3 83.1v68.9h87.9c51.5-47.4 81.8-117.2 81.8-197z" />
      <path fill="#34A853" d="M272 544.3c73.8 0 135.6-24.5 180.8-66.7l-87.9-68.9c-24.5 16.4-55.7 26.1-92.9 26.1-71.5 0-132-48.1-153.6-112.8H27.4v70.8c45.1 89.3 137.3 150.2 244.6 150.2z" />
      <path fill="#FBBC05" d="M118.4 321.9c-10.6-31.9-10.6-66.1 0-98l-70.8-70.8C-6.1 216.8-16.6 320.6 27.4 391.7l91-69.8z" />
      <path fill="#EA4335" d="M272 107.3c39.9-.6 78.1 14.5 107.3 41.4l80.2-80.2C418.5 24.1 346.4-2.8 272 0 164.7 0 72.5 60.9 27.4 150.2l91 70.8C140 155.5 200.5 107.3 272 107.3z" />
    </svg>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
      {/* Home Button */}
      <button
        onClick={() => { navigate('/home'); dispatch(showNav()); }}
        className="absolute top-6 left-6 z-10 flex items-center gap-1 px-3 py-1.5 bg-white/90 border border-blue-600 text-blue-600 rounded-full shadow hover:bg-blue-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Go to Home"
      >
        <Home className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold">Home</span>
      </button>
      <div className="w-full max-w-lg mx-auto">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-xl p-6 rounded-lg">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-4xl text-center font-extrabold text-blue-400">Login Account</CardTitle>
            <CardDescription className="text-center text-base text-blue-200 mt-2">
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="w-full border-slate-600 bg-slate-900/80 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-md shadow-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full pr-10 border-slate-600 bg-slate-900/80 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-md shadow-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:bg-slate-700 rounded-r-md"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                  <Label htmlFor="remember" className="text-sm font-normal text-slate-300">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="px-0 font-normal text-blue-400 hover:underline">
                  Forgot password?
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md shadow-lg transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Signing in... <Spinner size="small" />
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <Separator className="flex-1 bg-slate-600" />
              <span className="text-sm text-slate-300">Or continue with</span>
              <Separator className="flex-1 bg-slate-600" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Button
                variant="outline"
                onClick={(e) => handleGoogleLogin(e)}
                className="w-full border-slate-600 bg-slate-900/80 hover:bg-blue-950 text-slate-200 flex items-center justify-center gap-2 py-3 rounded-md shadow-md transition-all duration-200"
              >
                <GoogleLogo />
                Continue with Google
              </Button>
            </div>

            <p className="text-center text-sm text-slate-300 mt-4">
              Don't have an account?{' '}
              <Button
                onClick={() => navigate('/register')}
                variant="link"
                className="px-0 h-auto font-normal text-sm text-blue-400 hover:underline">
                Sign up
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}