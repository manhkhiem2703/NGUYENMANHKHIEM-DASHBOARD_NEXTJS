"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Cập nhật để sử dụng useRouter từ next/navigation
import styles from './page.module.css'; // Import CSS Module

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Khởi tạo router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Hiển thị thông báo lỗi từ phản hồi máy chủ
        throw new Error(data.message || 'An error occurred');
      }

      // Điều hướng đến trang users sau khi đăng nhập thành công
      router.push('/users'); // Chuyển hướng đến trang users
    } catch (error) {
      // Hiển thị thông báo lỗi cụ thể
      setError("Sai tên đăng nhập hoặc mật khẩu !!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Đăng Nhập</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
