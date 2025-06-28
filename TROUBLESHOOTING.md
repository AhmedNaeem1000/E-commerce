# Troubleshooting Guide

This guide helps you resolve common issues when working with the Ecmorece e-commerce platform.

## 🚀 Getting Started Issues

### Installation Problems

**Issue**: `npm install` fails with dependency conflicts

```bash
npm ERR! ERESOLVE overriding peer dependency
```

**Solution**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

**Issue**: Vite build fails

```bash
Error: Cannot find module 'vite'
```

**Solution**:

```bash
# Install Vite globally
npm install -g vite

# Or use npx
npx vite build
```

### Development Server Issues

**Issue**: Port 5173 is already in use

```bash
Error: listen EADDRINUSE: address already in use :::5173
```

**Solution**:

```bash
# Kill process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

## 🔐 Authentication Issues

### Login Problems

**Issue**: Cannot login with default credentials

- **Admin**: `admin@ecmorece.com` / `admin123`
- **User**: `user@ecmorece.com` / `user123`

**Solution**:

1. Check if localStorage is enabled in your browser
2. Clear browser cache and cookies
3. Try in incognito/private mode
4. Check browser console for errors

**Issue**: Token expires immediately

```javascript
// Check token in browser console
localStorage.getItem('authToken');
```

**Solution**:

1. Clear localStorage: `localStorage.clear()`
2. Refresh the page
3. Login again

### Protected Route Issues

**Issue**: Cannot access protected pages

```bash
Error: Access denied
```

**Solution**:

1. Ensure you're logged in
2. Check user role (admin vs user)
3. Clear authentication state and re-login

## 🛍️ Product Management Issues

### Product Display Problems

**Issue**: Products not showing up

```javascript
// Check products in localStorage
localStorage.getItem('products');
```

**Solution**:

1. Add products through admin panel
2. Check if products array exists in localStorage
3. Reset products if corrupted:
   ```javascript
   localStorage.setItem('products', JSON.stringify([]));
   ```

**Issue**: 3D preview not working

```bash
Error: Three.js failed to load
```

**Solution**:

1. Check if 3D models are in `public/models/`
2. Ensure WebGL is enabled in browser
3. Try different browser
4. Check console for model loading errors

### Admin Panel Issues

**Issue**: Cannot access admin panel

```bash
Error: Admin access required
```

**Solution**:

1. Login with admin credentials: `admin@ecmorece.com` / `admin123`
2. Check user role in authentication state
3. Clear auth and re-login

## 🛒 Cart and Checkout Issues

### Cart Problems

**Issue**: Cart items disappear on refresh

```javascript
// Check cart in localStorage
localStorage.getItem('cart');
```

**Solution**:

1. Ensure Zustand persistence is working
2. Check localStorage quota
3. Clear and rebuild cart

**Issue**: Cannot add items to cart

```bash
Error: Product not found
```

**Solution**:

1. Ensure product exists in products list
2. Check product ID format
3. Refresh product data

### Checkout Issues

**Issue**: Checkout form validation fails

```bash
Error: Validation failed
```

**Solution**:

1. Fill all required fields
2. Check email format
3. Ensure phone number is valid
4. Verify address format

## 🎨 UI/UX Issues

### Styling Problems

**Issue**: Tailwind CSS not working

```bash
Error: CSS not loading
```

**Solution**:

1. Check if Tailwind is properly configured
2. Restart development server
3. Clear browser cache
4. Check `tailwind.config.js`

**Issue**: Dark mode not working

```javascript
// Check theme in localStorage
localStorage.getItem('darkMode');
```

**Solution**:

1. Toggle theme manually
2. Check system preference
3. Clear theme settings and reset

### Responsive Issues

**Issue**: Layout breaks on mobile

```css
/* Check responsive classes */
@media (max-width: 640px) {
  /* Mobile styles */
}
```

**Solution**:

1. Check responsive breakpoints
2. Verify Tailwind responsive classes
3. Test on different devices
4. Check viewport meta tag

## 🔧 Performance Issues

### Slow Loading

**Issue**: App loads slowly

```bash
# Check bundle size
npm run build
```

**Solution**:

1. Enable code splitting
2. Optimize images
3. Use lazy loading
4. Check network tab for slow requests

**Issue**: Images not loading

```bash
Error: Failed to load image
```

**Solution**:

1. Check image URLs
2. Verify image format (jpg, png, webp)
3. Use fallback images
4. Check CORS settings

## 🌐 Internationalization Issues

### Language Switching

**Issue**: Language not changing

```javascript
// Check language in localStorage
localStorage.getItem('language');
```

**Solution**:

1. Clear language settings
2. Refresh page after language change
3. Check translation files
4. Verify RTL/LTR support

### RTL Layout Issues

**Issue**: Arabic text layout broken

```css
/* Check RTL support */
[dir='rtl'] {
  /* RTL styles */
}
```

**Solution**:

1. Check RTL CSS classes
2. Verify text direction
3. Test with Arabic content
4. Check font support

## 🐛 Debugging Tips

### Browser Console

**Check for errors**:

```javascript
// Open browser console (F12)
// Look for red error messages
// Check Network tab for failed requests
```

**Debug authentication**:

```javascript
// Check auth state
console.log(localStorage.getItem('authToken'));
console.log(localStorage.getItem('user'));
```

**Debug state management**:

```javascript
// Check Zustand stores
console.log(useAuthStore.getState());
console.log(useCartStore.getState());
```

### Common Error Messages

**"Module not found"**:

```bash
# Solution: Check import paths
import Component from './components/Component'
```

**"Cannot read property of undefined"**:

```javascript
// Solution: Add null checks
const value = data?.property || defaultValue;
```

**"Maximum call stack size exceeded"**:

```javascript
// Solution: Check for infinite loops
// Review useEffect dependencies
```

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the logs**: Look at browser console and terminal output
2. **Search issues**: Check if someone else had the same problem
3. **Create an issue**: Provide detailed information about your problem
4. **Check documentation**: Review the README and API documentation

### Issue Template

When creating an issue, include:

```markdown
## Bug Description

Brief description of the problem

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g., Windows, macOS, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 22]
- Node.js: [e.g., 16.0.0]

## Additional Information

Screenshots, console logs, etc.
```

## 🔄 Reset Everything

If all else fails, you can reset the entire application:

```bash
# Clear all data
localStorage.clear()

# Reset to default state
npm run clean
npm install
npm run dev
```

This will give you a fresh start with the application.
