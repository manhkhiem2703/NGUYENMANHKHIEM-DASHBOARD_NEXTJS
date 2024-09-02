"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthday: "",
    city: "",
    address: "",
    age: "",
    gender: "",
    numberphone: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      setSuccess("Đăng ký thành công!");
      // Xử lý sau khi đăng ký thành công, ví dụ tự động đăng nhập hoặc chuyển hướng đến trang đăng nhập
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-screen-lg w-full p-6 bg-white shadow-lg rounded-lg">
        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Phone Number</label>
            <input
              type="tel"
              name="numberphone"
              value={formData.numberphone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
