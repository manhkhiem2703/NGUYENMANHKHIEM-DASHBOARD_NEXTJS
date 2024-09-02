// src/app/api/auth/login/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// CORS Configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Cho phép mọi nguồn gốc, bạn có thể thay đổi theo nhu cầu
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email) {
      return new Response("Email is required", {
        status: 400,
        headers: corsHeaders,
      });
    }
    if (!password) {
      return new Response("Password is required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Tìm người dùng theo email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response("Invalid email or password", {
        status: 401,
        headers: corsHeaders,
      });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response("Invalid email or password", {
        status: 401,
        headers: corsHeaders,
      });
    }

    // Tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(
      JSON.stringify({
        token,
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      }),
      { status: 200 , headers : corsHeaders  }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return new Response("Failed to log in", { status: 500 });
  }
}
