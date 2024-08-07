import axios from "axios";
import { useState } from "react";


const Login = () => {
    const [user, setUser] = useState({
        name: "",
        password: "",
    });

    const [message, setMessage] = useState("");


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
                'http://localhost:8080/login',
                JSON.stringify(user), // Explicitly stringify if needed
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setMessage(`Login successful: ${response.data}`);
            // Navigate to another page upon successful login if needed
        //    if(response.data){
        //     navigate('/');
        //    }
        } catch (error) {
            setMessage('There was an error logging in the user.');
            console.error('There was an error logging in the user:', error);
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
                <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 rounded-lg p-[2%] w-[92%] m-[3%]"
                >
                    Submit
                </button>
            </form>
            {message && <p>{message}</p>}
            <a href="/" className="mt-4 text-blue-500">Register</a> {/* Use correct route */}
        </div>
    );
};

export default Login;
