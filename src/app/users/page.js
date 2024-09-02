"use client";
import Table from "@/components/table";
import AddUserPage from "./add-user/page";
import { BiUserPlus, BiX } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";
import UpdateUserForm from "@/components/updateUserForm";

const UsersPage = () => {
  const [showAddUserPage, setShowAddUserPage] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const toggleAddUserPage = () => {
    setShowAddUserPage((prev) => !prev);
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleCloseEditForm = () => {
    setEditingUserId(null);
  };

  return (
    <main className="py-5">
      <h1 className="text-xl md:text-4xl lg:text-5xl text-center font-bold py-10">
        Employee Management
      </h1>

      <div className="container mx-auto flex flex-col md:flex-row justify-between py-5 border-b">
        <div className="flex gap-3 mb-4 md:mb-0">
          <button
            onClick={toggleAddUserPage}
            className={`flex items-center px-4 py-2 border rounded-md ${
              showAddUserPage
                ? "bg-gray-500 text-white hover:bg-gray-600"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            {showAddUserPage ? (
              <>
                <span className="text-sm md:text-base lg:text-lg">Cancel</span>
              </>
            ) : (
              <>
                <span className="text-sm md:text-base lg:text-lg">
                  Add Employee
                </span>
                <BiUserPlus size={20} className="ml-2" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="container mx-auto py-5">
        {showAddUserPage && <AddUserPage />}
      </div>

      <div className="container mx-auto py-5">
        <Table onEditUser={handleEditUser} />
      </div>

      {editingUserId && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <UpdateUserForm
            formId={editingUserId}
            handleClose={handleCloseEditForm}
          />
        </div>
      )}
    </main>
  );
};

export default UsersPage;
