import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSessionStore from '../Store/sessionStore';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  // const [loginError, setLoginError] = useState('');

  // Access the login and loginError from the sessionStore
  const login = useSessionStore((state) => state.login);
  const loginError = useSessionStore((state) => state.loginError);
  const {isAuthenticated, getSessions} = useSessionStore();

  const onSubmit = async (data) => {
    
    console.log("This is data", data);
    await login(data);
    console.log(useSessionStore.getState(), "This is the state");
  };

  useEffect(() => {
    console.log(isAuthenticated, "This is the isAuthenticated from login.jsx")
    if (isAuthenticated) {
      getSessions();
      navigate('/'); // Redirect to home if authenticated
    }
    else{
      navigate('/login')
    }
  }, [isAuthenticated, navigate]); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <div className="w-full max-w-md bg-white p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Sign in to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message: "Invalid Username"
                },

              })}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
              placeholder="Username"
            />
            {errors.username && <p className="text-xs text-red-600">{errors.username.message}</p>}
          </div>
          <div className="space-y-1">
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-20"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-l font-bold mb-6 text-center text-red-600">{loginError}</h3>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isSubmitting ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;