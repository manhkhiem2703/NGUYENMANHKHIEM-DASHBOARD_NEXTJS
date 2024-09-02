// Import các mô-đun cần thiết
import { NextResponse } from "next/server";
import User from "@/models/User"; // Mô hình User
import dbConnect from "@/lib/dbConnect"; // Kết nối đến cơ sở dữ liệu
import bcrypt from 'bcrypt';

// CORS Configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Cho phép mọi nguồn gốc, bạn có thể thay đổi theo nhu cầu
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Lấy thông tin một người dùng
export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  
  try {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
      return new Response('User not found', { status: 404, headers: corsHeaders });
    }
    return new Response(JSON.stringify(user), { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Failed to fetch user', { status: 500, headers: corsHeaders });
  }
}

// Cập nhật thông tin người dùng
export async function PUT(request) {
  try {
    // Lấy ID từ URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    // Log ID để kiểm tra
    console.log('User ID:', id);

    // Lấy dữ liệu từ request
    const { email, password, firstname, lastname, birthday, city, address, age, gender, numberphone, username, role } = await request.json();

    // Log dữ liệu nhận được để kiểm tra
    console.log('Received data:', { email, password, firstname, lastname, birthday, city, address, age, gender, numberphone, username, role });

    // Kết nối tới database
    await dbConnect();

    // Tìm người dùng theo ID
    const user = await User.findById(id);
    if (!user) {
      console.error('User not found:', id); // Log thêm thông tin khi không tìm thấy người dùng
      return new Response('User not found', { status: 404, headers: corsHeaders });
    }

    // Cập nhật thông tin người dùng
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.email = email || user.email;
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.birthday = birthday || user.birthday;
    user.city = city || user.city;
    user.address = address || user.address;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.numberphone = numberphone || user.numberphone;
    user.username = username || user.username;
    user.role = role || user.role;

    // Lưu người dùng
    await user.save();
    return new Response(JSON.stringify(user), { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(`Failed to update user: ${error.message}`, { status: 500, headers: corsHeaders });
  }
}

// Xóa người dùng
export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  
  try {
    await dbConnect();
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return new Response('User not found', { status: 404, headers: corsHeaders });
    }
    return new Response('User deleted', { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response('Failed to delete user', { status: 500, headers: corsHeaders });
  }
}
