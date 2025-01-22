import React, { useState } from 'react';
import { User, Mail, Key, Phone, CarFront, CarIcon, Paintbrush, CarTaxiFront, Bike, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const DriverSignup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        dob: { day: '', month: '', year: '' },
        gender: '',
        paymentMethod: 'card',
        cardNumber: '',
        cardCVC: '',
        expiryMonth: '01 Jan',
        expiryYear: '2015',
        terms: false
    });

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        icon: <CarTaxiFront size={20} />,
        label: 'Car'
    });

    const options = [
        { icon: <CarTaxiFront size={20} />, label: 'Car' },
        { icon: <Bike size={20} />, label: 'Bike' },
        { icon: <Car size={20} />, label: 'Auto' }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-200 p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-yellow-500 mb-4 text-center">Driver Register</h2>
                <form className="space-y-6">
                    {/* Account Section */}
                    <div>
                        <h4 className="text-xl font-semibold text-yellow-500 mb-4">Account</h4>
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:border-yellow-500"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute left-4 top-3.5 text-gray-400">
                                    <User size={20} />
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:border-yellow-500"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute left-4 top-3.5 text-gray-400">
                                    <Mail size={20} />
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:border-yellow-500"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute left-4 top-3.5 text-gray-400">
                                    <Phone size={20} />
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:border-yellow-500"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute left-4 top-3.5 text-gray-400">
                                    <Key size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Details Section */}
                    <div>
                        <h4 className="text-xl font-semibold text-yellow-500 mb-4">Vehicle Details</h4>
                        <div className="space-y-4">
                            <div className="relative">
                                <div
                                    className="px-4 py-3 border rounded-md focus:outline-none focus:border-orange-500 cursor-pointer bg-white"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <div className="flex items-center gap-2">
                                        {selectedOption.icon}
                                        <span>{selectedOption.label}</span>
                                    </div>
                                </div>

                                {isOpen && (
                                    <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                                        {options.map((option, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-3 flex items-center gap-2 hover:bg-yellow-200 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedOption(option);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {option.icon}
                                                <span>{option.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="vehicleNumber"
                                    placeholder="Vehicle Number"
                                    className="w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:border-yellow-500"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute left-4 top-3.5 text-gray-400">
                                    <CarFront size={20} />
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="vehicleModel"
                                    placeholder="Vehicle Model"
                                    className="w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:border-yellow-500"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute left-4 top-3.5 text-gray-400">
                                    <CarIcon size={20} />
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="vehicleColor"
                                    placeholder="Vehicle Color"
                                    className="w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:border-yellow-500"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute left-4 top-3.5 text-gray-400">
                                    <Paintbrush size={20} />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                            </div>
                        </div>
                    </div>

                    {/* Terms and Conditions Section */}
                    <div>
                        <h4 className="text-xl font-semibold text-yellow-500 mb-4">Terms and Conditions</h4>
                        <label className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                name="terms"
                                className="mt-1"
                                onChange={handleInputChange}
                            />
                            <span className="text-sm text-gray-600">
                                I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.
                            </span>
                        </label>
                    </div>
                    <button className="w-full block my-10 text-xl bg-yellow-500 text-white px-4 py-2 rounded-lg text-center hover:text-black">Sign up</button>
                </form>
                <div className='flex justify-between w-full'>
                    <Link
                        to="/user/auth"
                        className="text-lg text-black/40 border-b border-transparent pb-1 mt-10
                         hover:border-black/20 transition-all duration-300"
                    >
                        User login
                    </Link>
                    <Link
                        to="/driver/login"
                        className="ml-auto mt-10 text-lg text-black/40 border-b border-transparent pb-1
                     hover:border-black/20 transition-all duration-300"
                    >
                        Login As Driver
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DriverSignup;