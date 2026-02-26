# 📁 styles/

Thư mục chứa tất cả CSS modules riêng biệt cho từng component và page.

## Cấu trúc

```
styles/
├── variables.css              ← CSS Custom Properties (màu, spacing, shadow...)
│
├── components/
│   ├── Navbar.module.css
│   ├── Hero.module.css
│   ├── About.module.css
│   ├── TechStack.module.css
│   ├── Projects.module.css
│   ├── ProjectCard.module.css
│   ├── Contact.module.css
│   ├── Footer.module.css
│   ├── SectionHeader.module.css
│   ├── CookieConsent.module.css
│   ├── CustomCursor.module.css
│   ├── Sidebar.module.css
│   ├── HomePageSidebar.module.css
│   └── Scene.module.css
│
└── pages/
    ├── Home.module.css
    └── AspNet.module.css
```

## Cách sử dụng

```tsx
import styles from "@/styles/components/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Title</h1>
    </section>
  );
}
```

## Palette màu (CSS Variables)

| Biến                | Giá trị   | Mô tả          |
| ------------------- | --------- | -------------- |
| `--color-primary`   | `#09637E` | Teal đậm       |
| `--color-secondary` | `#088395` | Teal vừa       |
| `--color-accent`    | `#7AB2B2` | Teal nhạt      |
| `--color-light`     | `#EBF4F6` | Nền sáng       |
| `--gradient-brand`  | →→        | Gradient chính |
| `--shadow-brand`    | →→        | Shadow teal    |

> Variables được import tự động qua `globals.css`.
