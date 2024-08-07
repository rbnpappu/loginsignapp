import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        password: "",
        phno: "",
        email: "",
    });
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log(user);
        try {
            const response = await axios.post(
                'http://localhost:8080/RegisterUser',
                JSON.stringify(user), // Explicitly stringify if needed
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                navigate('/login'); // Navigate to the login page upon success
            }
        } catch (error) {
            console.error('There was an error registering the user:', error);
            // Handle error based on response
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set error message from the server response
            } else {
                setErrorMessage('An unexpected error occurred.'); // Fallback error message
            }
        }
    };

    return (
        <div
            className="flex 
            justify-center 
            items-center 
            w-[22%] 
            rounded-[11px] 
            ml-[40%] 
            mt-[8%] 
            shadow-md 
            flex-col
        "
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type="text"
                    name="name"
                    placeholder="Please Enter Full Name"
                    className="border-b-2 border-black p-2 outline-none focus:border-blue-500 mb-2 p-[2%] w-[92%] m-[3%]"
                    onChange={handleChange}
                    value={user.name}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Please Enter Password"
                    className="border-b-2 border-black p-2 outline-none focus:border-blue-500 mb-2 p-[2%] w-[92%] m-[3%]"
                    onChange={handleChange}
                    value={user.password}
                />
                <input
                    type="text"
                    name="phno"
                    placeholder="Please Enter Phone No"
                    className="border-b-2 border-black p-2 outline-none focus:border-blue-500 mb-2 p-[2%] w-[92%] m-[3%]"
                    onChange={handleChange}
                    value={user.phno}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Please Enter Email"
                    className="border-b-2 border-black p-2 outline-none focus:border-blue-500 mb-4 p-[2%] w-[92%] m-[3%]"
                    onChange={handleChange}
                    value={user.email}
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 rounded-lg p-[2%] w-[92%] m-[3%]"
                >
                    Submit
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
            </form>
        </div>
    );
};

export default Register;
