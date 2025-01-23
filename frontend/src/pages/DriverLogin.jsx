import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DriverLogin = () => {
    return (
        <div className="min-h-screen w-screen bg-[#f3f2f2] flex items-start justify-start font-sans">
            <div className="flex flex-row m-auto bg-white rounded shadow-md">
                {/* Left Side with Logo */}
                <div className="w-[220px] relative bg-cover bg-center rounded-l-md">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxPV9_fEDhNyiOogPDTFX35aJxi_yngJumxQ&s" alt="Apni texi" className="w-full h-full" />
                </div>

                {/* Login Form */}
                <form className="p-8 pb-5 bg-white flex flex-col items-start w-[500px]">
                    <h4 className="text-2xl font-semibold text-black/85 mb-5">
                        We are <span className="font-bold text-yellow-400">APNI TAXI</span>
                    </h4>

                    <p className="text-sm text-black/65 leading-relaxed max-w-[200px] mb-10">
                        Welcome back! Log in to your account to view today's clients:
                    </p>

                    {/* Email Input */}
                    <div className="relative flex mb-3 w-full group">
                        <div className="h-14 w-11 flex items-center justify-center">
                            <Mail className="h-7 w-7 opacity-15 transition-opacity duration-300 
                           group-focus-within:opacity-100 group-focus-within:text-yellow-400" />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-[calc(100%-44px)] ml-auto h-14 px-0 pt-7 pb-3 border-b border-black/10 
                       focus:border-yellow-400 focus:outline-none focus:shadow-[0_2px_6px_-8px_rgba(182,157,230,0.45)]
                       transition-all duration-300 text-base font-normal placeholder-shown:pt-4"
                        />
                        <label className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-semibold text-black/80 
                          transition-all duration-300 opacity-0
                          group-focus-within:opacity-70 group-focus-within:-translate-y-[30px]">
                            Email:
                        </label>
                    </div>

                    {/* Password Input */}
                    <div className="relative flex mb-3 w-full group">
                        <div className="h-14 w-11 flex items-center justify-center">
                            <Lock className="h-7 w-7 opacity-15 transition-opacity duration-300 
                           group-focus-within:opacity-100 group-focus-within:text-yellow-400" />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-[calc(100%-44px)] ml-auto h-14 px-0 pt-7 pb-3 border-b border-black/10 
                       focus:border-yellow-400 focus:outline-none focus:shadow-[0_2px_6px_-8px_rgba(182,157,230,0.45)]
                       transition-all duration-300 text-base font-normal placeholder-shown:pt-4"
                        />
                        <label className="absolute left-11 top-1/2 -translate-y-1/2 text-sm text-black/80 
                          transition-all font-semibold duration-300 opacity-0
                          group-focus-within:opacity-70 group-focus-within:-translate-y-[30px]">
                            Password:
                        </label>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="ml-auto mt-1 min-w-[100px] px-10 py-4 rounded-full bg-yellow-400 text-white text-sm
                     font-medium shadow-md hover:-translate-y-[3px] hover:shadow-yellow-400/65
                     active:scale-[0.99] transition-all duration-300"
                    >
                        Log in
                    </button>

                    {/* Basic Version Link */}
                    <div className='flex justify-between w-full'>
                        <Link
                            to="/user/auth"
                            className="text-lg text-black/40 border-b border-transparent pb-1 mt-10
                         hover:border-black/20 transition-all duration-300"
                        >
                            User login
                        </Link>
                        <Link
                            to="/driver/signup"
                            className="ml-auto mt-10 text-lg text-black/40 border-b border-transparent pb-1
                     hover:border-black/20 transition-all duration-300"
                        >
                            Register As Driver
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DriverLogin;