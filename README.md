
## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000);
# DB
cần thêm môi địa chỉ của mongo vào để có thể lưu trữ data, hoặc có thể sử dụng địa chỉ này : 

MONGODB_URI=mongodb+srv://manhkhiem2703:khiem123@cluster0.9uncq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

su dung tk toi cung cap de dang nhap

tk:admin@gmail.com/admin
<!-- //chua co chuc nang dang nhap bang username  chi dang nhap bang mail-->
get all : http://localhost:3000/api/users;
get user : http://localhost:3000/api/users/[usersId];

# thêm user
POST : http://localhost:3000/api/users;

                                                
{
    "email": "admin@gmail.com",
    "password": "admin",
    "firstname": "Admin",
    "lastname": "Admin",
    "birthday": "1987-10-10",
    "city": "San Jose",
    "address": "707 Poplar St",
    "age": 33,
    "gender": "Male",
    "numberphone": "7788990011",
    "username": "admin", 
    "role": "admin"
  }


############
PUT : http://localhost:3000/api/user/[usersId];
DELETE : http://localhost:3000/api/user/[usersId];
