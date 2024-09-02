  "use client";
  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/navigation';
  import Table from '@/components/table';
  import AddUserPage from './add-user/page';
  import { BiUserPlus } from 'react-icons/bi';
  import UpdateUserForm from '@/components/updateUserForm';
  import LoadingSpinner from '@/components/loading/loading';

  const UsersPage = () => {
    const [showAddUserPage, setShowAddUserPage] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');

        if (token) {
          const res = await fetch('/api/auth/verify-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (res.ok) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            router.push('/login');
          }
        } else {
          setAuthenticated(false);
          router.push('/login');
        }

        setLoading(false);
      };

      checkAuth();
    }, [router]);

    const toggleAddUserPage = () => {
      setShowAddUserPage((prev) => !prev);
    };

    const handleEditUser = (userId) => {
      setEditingUserId(userId);
    };

    const handleCloseEditForm = () => {
      setEditingUserId(null);
    };

    const handleGoToLogin = () => {
      router.push('/login');
    };

    const handleLogout = () => {
      localStorage.removeItem('token'); // Xóa token khỏi localStorage
      router.push('/login'); // Điều hướng về trang đăng nhập
    };

    if (loading) {
      return <p className="text-center text-gray-600"><LoadingSpinner/></p>;
    }

    if (!authenticated) {
      return (
        <div className="text-center text-red-600">
          <p>Bạn cần đăng nhập để truy cập trang này.</p>
          <button
            onClick={handleGoToLogin}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Quay lại trang đăng nhập
          </button>
        </div>
      );
    }

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
                ? 'bg-gray-500 text-white hover:bg-gray-600'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            {showAddUserPage ? (
              <>
                <span className="text-sm md:text-base lg:text-lg">Cancel</span>
              </>
            ) : (
              <>
                <span className="text-sm md:text-base lg:text-lg">Add Employee</span>
                <BiUserPlus size={20} className="ml-2" />
              </>
            )}
          </button>
        </div>
        <div className="flex gap-3 mb-4 md:mb-0">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 border rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            <span className="text-sm md:text-base lg:text-lg">Logout</span>
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
