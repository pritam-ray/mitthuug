# Git Setup & Push Guide for MitthuuG

## Prerequisites
You need Git installed on your system. If not installed:
- **Download**: https://git-scm.com/download/win
- **Install** with default options
- **Restart** VS Code/Terminal after installation

## Quick Push to GitHub

Once Git is installed, run these commands in PowerShell:

```powershell
# Navigate to project directory
cd 'd:\websites and web apps\mitthuug'

# Initialize Git repository (if not already done)
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Complete e-commerce site with Supabase backend

Features:
- React + TypeScript + Vite + Tailwind CSS
- 8 pages with routing (Home, Shop, Product Detail, Cart, Checkout, Account, FAQ, Blog)
- 22+ reusable components
- Supabase integration (Products, Orders, Reviews, Wishlist, Auth)
- User authentication with protected routes
- Shopping cart with localStorage
- Product filtering, sorting, search
- Order history and wishlist management
- Responsive mobile-first design
- Modern animations with Framer Motion

Backend:
- PostgreSQL database with 14 tables
- Row-level security policies
- Storage buckets for images
- Authentication system
- API service layer with custom hooks

Ready for:
- Payment integration (Razorpay/Stripe)
- Email notifications
- Analytics (GA4, Meta Pixel)
- SEO optimization
- Deployment"

# Set main branch
git branch -M main

# Add remote repository
git remote add origin https://github.com/pritam-ray/mitthuug.git

# Push to GitHub
git push -u origin main
```

## If you get "remote already exists" error:

```powershell
git remote remove origin
git remote add origin https://github.com/pritam-ray/mitthuug.git
git push -u origin main
```

## If you need to authenticate:

Git will prompt for your GitHub credentials:
- **Username**: pritam-ray
- **Password**: Use a Personal Access Token (not your GitHub password)

### Creating a Personal Access Token:
1. Go to GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Select scopes: `repo` (full control)
5. Copy the token and use it as password

## Alternative: GitHub Desktop (Easiest Method)

If you prefer a GUI:

1. **Download**: https://desktop.github.com/
2. **Install** and sign in with GitHub account
3. **Add Repository**:
   - File → Add Local Repository
   - Browse to: `d:\websites and web apps\mitthuug`
4. **Publish**:
   - Click "Publish repository"
   - Set name: mitthuug
   - Organization: pritam-ray
   - Uncheck "Keep this code private" (if public repo)
   - Click "Publish Repository"

## Alternative: VS Code Source Control

1. Open Source Control panel (`Ctrl+Shift+G`)
2. Click "Initialize Repository"
3. Stage all changes (click + icon on "Changes")
4. Enter commit message
5. Click ✓ to commit
6. Click "..." menu → Remote → Add Remote
7. Enter: `https://github.com/pritam-ray/mitthuug.git`
8. Name: `origin`
9. Click "Publish Branch"

## Files that will be committed:

✅ **Included:**
- Source code (src/)
- Public assets
- Configuration files
- Package.json
- README and documentation
- Supabase migrations

❌ **Excluded (in .gitignore):**
- node_modules/
- .env and .env.local (sensitive data)
- dist/ (build output)
- *.log files
- .vscode/ settings

## After pushing:

Your repository will be available at:
**https://github.com/pritam-ray/mitthuug**

## Important: Environment Variables

⚠️ **Don't forget to set up environment variables on deployment:**

Create `.env.local` on your deployment platform with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are in your local `.env.local` but not committed to Git for security.

## Next Steps After Push:

1. ✅ Add repository description on GitHub
2. ✅ Add topics: `react`, `typescript`, `ecommerce`, `supabase`, `tailwindcss`
3. ✅ Enable GitHub Pages (if needed)
4. ✅ Set up GitHub Actions for CI/CD (optional)
5. ✅ Add collaborators (if needed)

## Troubleshooting:

### "fatal: not a git repository"
```powershell
git init
```

### "Updates were rejected"
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### "Permission denied"
- Check your GitHub credentials
- Use Personal Access Token instead of password
- Or set up SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

**Need help?** Check GitHub's official documentation: https://docs.github.com/en/get-started
