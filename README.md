# Ecmorece - E-commerce Platform

A modern, responsive e-commerce platform built with React 18, Vite, Tailwind CSS, and Zustand. Designed to be production-ready with a clean architecture that can easily integrate with a PHP backend.

## 🚀 Features

### Core Features

- **Authentication System** - JWT-based authentication with role-based access control
- **Product Management** - Full CRUD operations for products with 3D preview support
- **Shopping Cart** - Persistent cart with real-time updates
- **Wishlist** - Save and manage favorite products
- **Checkout System** - Complete checkout flow with shipping options
- **Admin Dashboard** - Comprehensive admin panel for product and order management
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - Theme switching with system preference detection
- **Internationalization** - Support for Arabic and English languages

### Technical Features

- **State Management** - Zustand with persistence
- **Form Validation** - React Hook Form with Yup schemas
- **API Layer** - Centralized axios client with interceptors
- **Error Handling** - Error boundaries and toast notifications
- **Performance** - Lazy loading, code splitting, and optimized images
- **SEO** - React Helmet for meta tags and page titles
- **Accessibility** - Semantic HTML and ARIA labels
- **Code Quality** - ESLint and Prettier configuration

## 🛠️ Tech Stack

- **Frontend Framework** - React 18
- **Build Tool** - Vite
- **Styling** - Tailwind CSS
- **State Management** - Zustand
- **Routing** - React Router DOM
- **Forms** - React Hook Form + Yup
- **HTTP Client** - Axios
- **Animations** - Framer Motion
- **Icons** - Lucide React
- **Notifications** - React Hot Toast
- **3D Graphics** - Three.js + React Three Fiber
- **Code Quality** - ESLint + Prettier

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ecmorece
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_API_TIMEOUT=10000
   VITE_APP_NAME=Ecmorece
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── api/                 # API layer and HTTP client
│   ├── axiosClient.js   # Axios configuration
│   ├── auth.js         # Authentication API
│   └── products.js     # Products API
├── components/         # Reusable components
│   ├── forms/          # Form components
│   ├── ui/             # UI components
│   └── ...            # Other components
├── context/           # React contexts
├── hooks/             # Custom hooks and Zustand stores
├── i18n/              # Internationalization
├── layouts/           # Layout components
├── pages/             # Page components
├── utils/             # Utility functions
└── main.jsx          # App entry point
```

## 🔐 Authentication

The app includes a mock authentication system that can be easily replaced with a real backend:

### Default Users

- **Admin**: `admin@ecmorece.com` / `admin123`
- **User**: `user@ecmorece.com` / `user123`

### Authentication Flow

1. Login/Register forms with validation
2. JWT token storage in localStorage
3. Protected routes with role-based access
4. Automatic token refresh and logout on expiry

## 🎨 Theming

The app supports multiple themes:

- **Color Themes**: Blue, Purple, Green, Orange, Pink
- **Mode**: Light/Dark with system preference detection
- **Language**: Arabic (RTL) and English (LTR)

## 📱 Responsive Design

The app is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_API_TIMEOUT` - API request timeout
- `VITE_APP_NAME` - Application name
- `VITE_ENABLE_3D_PREVIEW` - Enable 3D product preview
- `VITE_ENABLE_REVIEWS` - Enable product reviews
- `VITE_ENABLE_WISHLIST` - Enable wishlist feature

### Tailwind Configuration

Custom colors and themes are defined in `tailwind.config.js`:

- Primary colors for different themes
- Dark mode support
- Custom spacing and typography

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 🔌 Backend Integration

The frontend is designed to work with a PHP REST API. Key integration points:

### API Endpoints Expected

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/products` - Get products list
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Authentication Headers

```javascript
Authorization: Bearer <jwt-token>
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Authentication flow (login/register/logout)
- [ ] Product browsing and search
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Admin panel access
- [ ] Responsive design on different devices
- [ ] Dark/light mode switching
- [ ] Language switching
- [ ] Form validation
- [ ] Error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use ESLint and Prettier for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the troubleshooting guide

## 🔮 Roadmap

- [ ] Real-time notifications
- [ ] Advanced search and filters
- [ ] Product reviews and ratings
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] PWA support
- [ ] Unit and integration tests
- [ ] Performance monitoring

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Three.js](https://threejs.org/) - 3D graphics
