"use client";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/redux/useThunks';

const UpdateUserForm = ({ formId, handleClose }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null); // Thêm state để quản lý lỗi form
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${formId}`);
                if (!response.ok) throw new Error('Failed to fetch user data');
                const data = await response.json();
                
                if (!data._id) {
                    throw new Error('User ID is missing in the fetched data');
                }

                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (formId) {
            fetchUser();
        }
    }, [formId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const requiredFields = ['firstname', 'lastname', 'birthday', 'address', 'gender', 'numberphone', 'role'];
        for (const field of requiredFields) {
            if (!user[field]) {
                return `Please fill in the ${field} field.`;
            }
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValidationError = validateForm();
        if (formValidationError) {
            setFormError(formValidationError);
            return;
        }
        
        try {
            if (!user) {
                throw new Error('No user data available');
            }

            if (!user._id) {
                throw new Error('User ID is missing');
            }

            console.log('handleSubmit Updating user with data:', user);

            await dispatch(updateUser(user));
            alert('User updated successfully!');
            handleClose(); // Close the form on successful update
        } catch (error) {
            console.error('Failed to update user:', error.message);
            alert(`Failed to update user. Please try again. Error: ${error.message}`);
        }
    };

    const handleCancel = () => {
        handleClose(); // Close the form without updating
    };

    if (error) return <div className="text-red-500">{`Error: ${error}`}</div>;

    if (loading) return <div className="flex justify-center items-center"><div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" /></div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-auto max-h-screen">
            <h2 className="text-xl font-semibold mb-4">Update User</h2>
            {formError && <div className="text-red-500 mb-4">{formError}</div>} 
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label htmlFor="firstname" className="mb-1">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="First Name"
                            value={user?.firstname || ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastname" className="mb-1">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Last Name"
                            value={user?.lastname || ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="birthday" className="mb-1">Birthday</label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            placeholder="Birthday"
                            value={user?.birthday ? new Date(user.birthday).toISOString().split('T')[0] : ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                   
                    <div className="flex flex-col">
                        <label htmlFor="address" className="mb-1">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={user?.address || ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                    {/* <div className="flex flex-col">
                        <label htmlFor="age" className="mb-1">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Age"
                            value={user?.age || ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    </div> */}
                    <div className="flex flex-col">
                        <label htmlFor="gender" className="mb-1">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={user?.gender || ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="numberphone" className="mb-1">Phone Number</label>
                        <input
                            type="number"
                            id="numberphone"
                            name="numberphone"
                            placeholder="Phone Number"
                            value={user?.numberphone || ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={user?.username || ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={user?.email || ''}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="role" className="mb-1">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={user?.role || 'user'}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Update User
                    </button>
                    <button type="button" className="bg-gray-500 text-white p-2 rounded" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserForm;
