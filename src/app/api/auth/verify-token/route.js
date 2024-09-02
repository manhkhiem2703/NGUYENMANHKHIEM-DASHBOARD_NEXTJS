// src/app/api/auth/verify-token/route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
// CORS Configuration
const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Cho phép mọi nguồn gốc, bạn có thể thay đổi theo nhu cầu
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

export async function POST(request) {
  try {
    await dbConnect();
    const { token } = await request.json();

    if (!token) {
      return new Response('Token is required', { status: 400, headers : corsHeaders });
    }

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tìm người dùng theo ID trong token
    const user = await User.findById(decoded.id);

    if (!user) {
      return new Response('Invalid token', { status: 401 , headers : corsHeaders  });
    }

    // Trả về thông tin người dùng nếu token hợp lệ
    return new Response(
      JSON.stringify({
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      }),
      { status: 200 , headers : corsHeaders  }
    );
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response('Failed to verify token', { status: 500, headers : corsHeaders  });
  }
}
