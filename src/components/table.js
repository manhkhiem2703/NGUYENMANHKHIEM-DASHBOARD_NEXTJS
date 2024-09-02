import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { deleteUser, fetchUsers } from '@/redux/useThunks';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
};

const Table = ({ onEditUser }) => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (userId) => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    onEditUser(userId);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser(userId));
      alert('User has been deleted successfully.');
    } catch (error) {
      console.error('Failed to delete user:', error.message);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Birthday</th>
          {/* <th className="px-4 py-2">Age</th> */}
          <th className="px-4 py-2">Gender</th>
          <th className="px-4 py-2">Phone Number</th>
          <th className="px-4 py-2">Address</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200 divide-y divide-gray-300">
        {currentUsers.map((user) => (
          <tr key={user._id} className="bg-gray-50 text-center hover:bg-gray-100">
            <td className="px-4 py-2 flex items-center">
              <span className="ml-2 font-semibold">
                {user.firstname} {user.lastname}
              </span>
            </td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{formatDate(user.birthday)}</td>
            {/* <td className="px-4 py-2">{user.age || 'N/A'}</td> */}
            <td className="px-4 py-2">{user.gender || 'N/A'}</td>
            <td className="px-4 py-2">{user.numberphone || 'N/A'}</td>
            <td className="px-4 py-2">{user.address || 'N/A'}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2 flex justify-center space-x-2">
              <button
                onClick={() => handleEdit(user._id)}
                className="text-green-500 hover:text-green-700"
              >
                <BiEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-500 hover:text-red-700"
              >
                <BiTrashAlt size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-between items-center mt-4">
      {currentPage > 1 && (
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-600 rounded"
        >
          Previous
        </button>
      )}
      <p>
        Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
      </p>
      <button
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
        className={`px-4 py-2 ${currentPage === Math.ceil(users.length / itemsPerPage) ? 'bg-gray-300' : 'bg-gray-800 text-white hover:bg-gray-600'} rounded`}
      >
        Next
      </button>
    </div>
  </div>
  
  );
};

export default Table;
