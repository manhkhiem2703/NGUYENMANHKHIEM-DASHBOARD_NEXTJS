import Table from "@/components/table";
import AddUserPage from "./add-user/page";
import { BiUserPlus } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";
import UpdateUserForm from "@/components/updateUserForm";
import ''

const UsersPage = () => {
  const [showAddUserPage, setShowAddUserPage] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const toggleAddUserPage = () => {
    setShowAddUserPage(prev => !prev);
  };

  const handleEditUser = (userId) => {
    console.log('Editing User ID:', userId); // Log ID người dùng ra console
    setEditingUserId(userId);
  };

  const handleCloseEditForm = () => {
    setEditingUserId(null);
  };

  return (
    <div className="relative">
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button 
            onClick={toggleAddUserPage}
            className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:text-gray-800"
          >
            Add Employee
            <span className="px-1">
              <BiUserPlus size={23} />
            </span>
          </button>
        </div>
      </div>
      <div>
        {showAddUserPage && <AddUserPage />}
        
        {/* Hiển thị bảng thông tin */}
        <Table onEditUser={handleEditUser} />

        {/* Hiển thị form chỉnh sửa phía trên bảng nếu có userId */}
        {editingUserId && (
          <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
            <UpdateUserForm formId={editingUserId} handleClose={handleCloseEditForm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
