# NEEMA / LUVELLE INTERIORS — Architecture & Deployment Guide

Clean full-stack monorepo for **NEEMA / LUVELLE INTERIORS**, separating the application into two dedicated folders:
- **`frontend/`**: High-performance **React (Vite + React Router)** website with GSAP & Framer Motion animations.
- **`backend/`**: **PHP Laravel 11/12** API and interactive Studio Admin Portal for managing gallery photos, residences, categories, and locations.

---

## 📁 Clean Monorepo Structure

```
neema/
├── frontend/                      # ⚛️ React (Vite + TypeScript) Frontend
│   ├── src/                       # Components, Pages, Layouts, CSS
│   │   ├── app/                   # Page Components (/projects, /services, /contact, etc.)
│   │   ├── components/            # Bento Grid (ProjectsCollage), Pinned Scroll, etc.
│   │   ├── compat/                # Drop-in compat layer (Image, Link, Navigation)
│   │   ├── config/                # API endpoint configuration
│   │   └── data/                  # Static fallback data (projectsData.ts)
│   ├── public/                    # Static Assets (Images, Logos, .htaccess for SPA routing)
│   ├── index.html                 # Vite HTML Entrypoint with Google Fonts
│   ├── vite.config.ts             # Vite configuration with aliases & proxy
│   ├── tsconfig.json              # TypeScript configuration
│   ├── .env.local                 # VITE_API_URL=http://127.0.0.1:8000
│   └── package.json               # Frontend dependencies & Vite scripts
│
├── backend/                       # 🐘 PHP Laravel 11 Backend (API & Admin Dashboard)
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── AdminGalleryController.php # Web Admin Portal (Upload, Alter, Delete)
│   │   │   └── Api/
│   │   │       └── GalleryController.php  # REST API (/api/gallery & /api/projects)
│   │   └── Models/
│   │       └── GalleryItem.php            # Eloquent Model + Image URL Accessors
│   ├── database/
│   │   ├── migrations/                    # Gallery schema migrations
│   │   └── seeders/                       # Gallery initial seeder with 10 residences
│   ├── public/
│   │   ├── storage/                       # Symlink to storage/app/public
│   │   └── index.php                      # Laravel Entrypoint
│   ├── resources/views/admin/
│   │   └── gallery.blade.php              # Luxury Admin Dashboard View
│   ├── routes/
│   │   ├── api.php                        # API Endpoints
│   │   └── web.php                        # Admin & Symlink Routes
│   ├── storage/app/public/gallery/        # Stored uploaded photos
│   ├── .env                               # Local XAMPP MySQL Configuration
│   ├── .env.production.example            # Hostinger Production Settings
│   └── .htaccess                          # Apache / Hostinger Redirects
│
├── package.json                   # Master Workspace Runner (Root npm run dev)
├── README.md                      # Complete Project Documentation & Hostinger Guide
└── .gitignore                     # Clean Multi-project Git Ignore
```

---

## ⚡ Quick Start (Local Development with XAMPP)

### 1. Database Setup (XAMPP MySQL)
- Ensure **Apache & MySQL** are running in your XAMPP Control Panel.
- Database: `neema_db` (Already created and migrated on port `3306`).
- Credentials in `backend/.env`:
  ```env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=neema_db
  DB_USERNAME=root
  DB_PASSWORD=
  FILESYSTEM_DISK=public
  ```

### 2. Start Both Services from Root
You can run everything directly from the project root:

```bash
# Start Frontend (http://localhost:3000)
npm run dev

# In another terminal, start Backend (http://127.0.0.1:8000)
npm run dev:backend
```

- **Website**: [http://localhost:3000](http://localhost:3000)
- **Projects Page**: [http://localhost:3000/projects](http://localhost:3000/projects)
- **Admin Dashboard**: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
- **API Endpoint**: [http://127.0.0.1:8000/api/gallery](http://127.0.0.1:8000/api/gallery)

---

## 📸 Managing Gallery Images

### Using the Web Admin Dashboard
Open **`http://localhost:8000/admin`** in your browser:
1. **Add New Image**: Click the gold **"+ Add New Image"** button. Choose a photo from your computer, set the Title, Category (Living, Kitchen, Bedroom, Joinery, Bath), Location, and Layout Span. Click **Save & Publish**.
2. **Alter / Change Image**: Click **"Edit"** on any photo. You can replace the photo with a new file or simply modify the title, category, description, and featured badge.
3. **Delete Image**: Click the delete icon. The photo is automatically removed from disk and database.

---

## 🌐 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/gallery` | Get all gallery items (supports `?category=LIVING&featured=1`) |
| `GET` | `/api/gallery/{id}` | Get a single gallery item |
| `POST` | `/api/gallery` | Upload new photo (`multipart/form-data`: `image`, `title`, `category`, etc.) |
| `POST` / `PUT` | `/api/gallery/{id}` | Alter / replace existing item (optional new `image` file) |
| `DELETE` | `/api/gallery/{id}` | Delete photo from storage and database |

---

## 🚀 Deploying to Hostinger

### Option A: Subdomain for Backend (Recommended)
1. **Create Subdomain in Hostinger hPanel**:
   - Create a subdomain (e.g. `api.yourdomain.com`).
   - Set its document root to: `public_html/api/public` (or upload `backend/` there).
2. **Create MySQL Database in Hostinger**:
   - Go to **hPanel -> Databases -> MySQL Databases**.
   - Create a database: e.g. `u123456789_neema`.
   - Create a user and password.
3. **Upload Backend Files**:
   - Upload the `backend/` folder to your Hostinger file manager.
   - Copy `backend/.env.production.example` to `backend/.env`.
   - Fill in your Hostinger MySQL database name, user, password, and `APP_URL=https://api.yourdomain.com`.
4. **Connect Public Storage Symlink on Hostinger**:
   - Simply visit `https://api.yourdomain.com/admin/setup-storage` in your browser. This automatically creates the storage link without requiring SSH!

### Option B: Deploying Frontend to Hostinger
1. In `frontend/.env.local` or environment, set:
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```
2. Build the production bundle:
   ```bash
   npm run build
   ```
3. Upload all files from `frontend/dist/` directly into your Hostinger `public_html/` folder!
4. The included `dist/.htaccess` ensures React Router SPA page refreshes (e.g. `/projects`, `/services`) work seamlessly!
