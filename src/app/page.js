import Link from "next/link";
import styles from "./page.module.css"; // Import CSS Module

export default function HomePage() {
  return (
    <main className="py-5">
      <div className={styles.container}>
        <h1 className={styles.title}>
          Chào Mừng Đến Với Trang Web Của Chúng Tôi
        </h1>
        <div className={styles.buttonContainer}>
          <Link href="/login" className={styles.button}>
            Đăng Nhập
          </Link>
          <Link href="/register" className={styles.button}>
            Đăng Ký
          </Link>
        </div>
      </div>
    </main>
  );
}
