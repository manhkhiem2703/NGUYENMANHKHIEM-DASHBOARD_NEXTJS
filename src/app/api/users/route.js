// /app/api/users/route.js
import dbConnect from '@/lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Failed to fetch users', { status: 500 });
  }
}



export async function POST(request) {
  try {
    await dbConnect();
    const { email, password, firstname, lastname, birthday, city, address, age, gender, numberphone, username, role } = await request.json();

    if (!email || !password || !username) {
      return new Response('Email, password, and username are required', { status: 400 });
    }

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return new Response('Email or username already exists', { status: 400 });
    }

    const newUser = new User({
      email,
      password, // Không mã hóa ở đây
      firstname,
      lastname,
      birthday,
      city,
      address,
      age,
      gender,
      numberphone,
      username,
      role // Thêm trường role
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Failed to create user', { status: 500 });
  }
}
