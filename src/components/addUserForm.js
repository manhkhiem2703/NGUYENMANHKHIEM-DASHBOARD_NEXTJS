"use client";
import { addUser } from "@/redux/useThunks";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddUserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [localFormData, setLocalFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthday: "",
    address: "",
    // age: '',
    gender: "",
    numberphone: "",
    username: "",
    role: "user", // Mặc định là 'user'
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const validateForm = () => {
    // Kiểm tra tất cả các trường có giá trị không
    for (const [key, value] of Object.entries(localFormData)) {
      if (
        key !== "address" &&
        key !== "birthday" &&
        key !== "numberphone" &&
        !value
      ) {
        return `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } không được để trống`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(null);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      await dispatch(addUser(localFormData)); // Dispatch thunks để thêm người dùng
      setSuccess("Người dùng đã được thêm thành công"); // Hiển thị thông báo thành công
      setLocalFormData({
        // Reset form sau khi thành công
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        birthday: "",
        address: "",
        gender: "",
        numberphone: "",
        username: "",
        role: "user",
      });
    } catch (error) {
      setError("Đã xảy ra lỗi khi thêm người dùng"); // Hiển thị thông báo lỗi
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          name="firstname"
          value={localFormData.firstname}
          onChange={handleChange}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          required
        />
      </div>

      <div className="input-type">
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastname"
          value={localFormData.lastname}
          onChange={handleChange}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          required
        />
      </div>

      <div className="input-type">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={localFormData.email}
          onChange={handleChange}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          required
        />
      </div>

      <div className="input-type">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={localFormData.password}
          onChange={handleChange}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          required
        />
      </div>

      <div className="input-type">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={localFormData.username}
          onChange={handleChange}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          required
        />
      </div>

      <div className="input-type">
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={localFormData.address}
          onChange={handleChange}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-gray-700">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={localFormData.birthday}
            onChange={handleChange}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="flex-1">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={localFormData.gender}
            onChange={handleChange}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="input-type">
        <label className="block text-gray-700">Number Phone</label>
        <input
          type="text"
          name="numberphone"
          value={localFormData.numberphone}
          onChange={handleChange}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <label className="block text-gray-700">Role</label>
        <select
          name="role"
          value={localFormData.role}
          onChange={handleChange}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="col-span-2 flex justify-start">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex justify-center text-md w-1/5 h-12 ${
            isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 text-white"
          } px-4 py-2 border rounded-md hover:border-green-500 hover:text-gray-500`}
        >
          {isSubmitting ? "Submitting..." : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
