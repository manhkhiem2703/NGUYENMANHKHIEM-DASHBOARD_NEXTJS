import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email) {
      return new Response('Email is required', { status: 400 });
    }
    if (!password) {
      return new Response('Password is required', { status: 400 });
    }

    // Tìm người dùng theo email
    const user = await User.findOne({ email });

    if (!user) {
      // Nếu không tìm thấy người dùng, thông báo lỗi liên quan đến email
      return new Response('Invalid email or password', { status: 401 });
    }

    // So sánh mật khẩu người dùng nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Nếu mật khẩu không khớp, thông báo lỗi liên quan đến mật khẩu
      return new Response('Invalid email or password', { status: 400 });
    }

    // Trả về thông tin người dùng nếu đăng nhập thành công
    return new Response(
      JSON.stringify({
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging in:', error);
    return new Response('Failed to log in', { status: 500 });
  }
}
