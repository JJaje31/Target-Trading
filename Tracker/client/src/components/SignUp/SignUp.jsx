import {useState} from 'react'

const SignUp = () => {
  const [textColor,setTextColor] = useState('')
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    createUsername: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendSignUp = async (e) => {
    e.preventDefault();
  
    // Check password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setTextColor('text-red-600')
      setMessage("Password and confirm password do not match");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setTextColor('text-red-600')
        setMessage(errorData.message)
        Error(errorData.message || "Something went wrong");
      }
  
      const result = await response.json();
      setTextColor('text-green-600')
      setMessage(result.message);
      setFormData({ email: "", createUsername: "", password: "", confirmPassword: "" });
  
      setTimeout(() => {
        window.location.href = "/SignIn";
      }, 2000); 
    } catch (error) {
      console.error(error);
      setFormData({ email: "", createUsername: "", password: "", confirmPassword: "" });
    }
  
    setTimeout(() => {
      setMessage("");
      setTextColor('')
    }, 5000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 mt-20">
      <div className="w-full sm:w-96 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Get Personalized Recommendations
        </h2>
        {message && (
          <p className={`text-center ${textColor} font-medium mb-4`}>{message}</p>
        )}
        <form onSubmit={sendSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="createUsername">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="text"
              name="createUsername"
              value={formData.createUsername}
              onChange={handleChange}
              placeholder="Create a username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp