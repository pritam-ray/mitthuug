# 🔧 Install Supabase CLI - Windows Quick Fix

The npm installation doesn't work anymore. Here are the working methods:

---

## ✅ Method 1: Via Scoop (EASIEST - Recommended)

### Step 1: Install Scoop (if you don't have it)

```powershell
# Run in PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

### Step 2: Install Supabase CLI

```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Step 3: Verify Installation

```powershell
supabase --version
```

You should see: `supabase version X.X.X`

---

## ✅ Method 2: Direct Download (Manual)

### Step 1: Download

1. Go to: https://github.com/supabase/cli/releases/latest
2. Download: `supabase_windows_amd64.zip`
3. Extract to: `C:\supabase\`

### Step 2: Add to PATH

```powershell
# Run in PowerShell as Administrator
$path = [Environment]::GetEnvironmentVariable('Path', 'Machine')
$newPath = $path + ';C:\supabase'
[Environment]::SetEnvironmentVariable('Path', $newPath, 'Machine')
```

### Step 3: Restart PowerShell

Close and reopen PowerShell, then verify:

```powershell
supabase --version
```

---

## ✅ Method 3: Via Chocolatey (Alternative)

If you have Chocolatey installed:

```powershell
# Run in PowerShell as Administrator
choco install supabase
```

---

## 🚀 After Installation

Once Supabase CLI is installed, run the setup script:

```powershell
.\setup-supabase.ps1
```

---

## 🐛 Troubleshooting

### "Command not found" after installation

**Solution**: Restart PowerShell completely (close all windows and reopen)

### Permission denied during installation

**Solution**: Run PowerShell as Administrator
- Right-click PowerShell → "Run as Administrator"

### Scoop installation fails

**Solution**: Check your execution policy
```powershell
Get-ExecutionPolicy
# Should be RemoteSigned or Unrestricted

# If not, run:
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## ⚡ Quick Install (Copy-Paste)

**If you trust Scoop (recommended):**

```powershell
# Install Scoop
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Install Supabase CLI
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Verify
supabase --version
```

**Then run:**

```powershell
.\setup-supabase.ps1
```

---

## 📝 What Happens Next

After CLI is installed, `setup-supabase.ps1` will:

1. ✅ Log you into Supabase (opens browser)
2. ✅ Show your projects
3. ✅ Link to your project
4. ✅ Push migrations (creates 14 tables)
5. ✅ Add seed data (6 products, 3 coupons)
6. ✅ Update .env.local
7. ✅ Start dev server

---

## 🎯 Recommended Path

```powershell
# 1. Install Scoop (one-time setup)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# 2. Install Supabase CLI
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# 3. Run setup script
.\setup-supabase.ps1
```

**Total time: ~5 minutes**

---

Need help? Check **SUPABASE_SETUP_GUIDE.md** for alternative methods!
