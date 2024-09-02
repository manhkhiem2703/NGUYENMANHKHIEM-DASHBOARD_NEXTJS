import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(request) {
  const { email, username, password, firstname, lastname, birthday, city, address, age, gender, numberphone } = await request.json();

  try {
    // Kiểm tra nếu email hoặc username đã tồn tại

    await dbConnect();
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Cho phép tất cả các nguồn
          'Content-Type': 'application/json', // Đảm bảo Content-Type là application/json
        },
      });
    }

    if (existingUsername) {
      return new Response(JSON.stringify({ error: 'Username already taken' }), {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Cho phép tất cả các nguồn
          'Content-Type': 'application/json', // Đảm bảo Content-Type là application/json
        },
      });
    }

    // Tạo người dùng mới và lưu vào cơ sở dữ liệu
    const newUser = new User({ email, username, password, firstname, lastname, birthday, city, address, age, gender, numberphone });
    await newUser.save(); 

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
