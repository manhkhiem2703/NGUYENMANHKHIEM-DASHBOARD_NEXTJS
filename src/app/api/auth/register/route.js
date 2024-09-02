import User from "@/models/User";

// Handle POST request for user registration
export async function POST(request) {
  const { email, password, firstname, lastname, birthday, city, address, age, gender, numberphone, username } = await request.json();

  try {
    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Cho phép tất cả các nguồn
          'Content-Type': 'application/json', // Đảm bảo Content-Type là application/json
        },
      });
    }

    // Tạo người dùng mới và lưu vào cơ sở dữ liệu
    const newUser = new User({ email, password, firstname, lastname, birthday, city, address, age, gender, numberphone, username });
    await newUser.save(); // Giả sử mô hình đã xử lý việc băm mật khẩu

    return new Response(JSON.stringify({ message: 'User created successfully' }), { 
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*', // Cho phép tất cả các nguồn
        'Content-Type': 'application/json', // Đảm bảo Content-Type là application/json
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Cho phép tất cả các nguồn
        'Content-Type': 'application/json', // Đảm bảo Content-Type là application/json
      },
    });
  }
}
