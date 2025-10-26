# MitthuuG Supabase Setup Script
# This script will set up your Supabase database with all necessary migrations

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  MitthuuG Supabase Database Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Supabase CLI is installed
Write-Host "Checking for Supabase CLI..." -ForegroundColor Yellow
$supabaseCLI = Get-Command supabase -ErrorAction SilentlyContinue

if (-not $supabaseCLI) {
    Write-Host "❌ Supabase CLI not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "The Supabase CLI needs to be installed manually." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Choose installation method:" -ForegroundColor Cyan
    Write-Host "  1. Via Scoop (Recommended for Windows)" -ForegroundColor Gray
    Write-Host "  2. Via Direct Download" -ForegroundColor Gray
    Write-Host "  3. Exit and install manually" -ForegroundColor Gray
    Write-Host ""
    $choice = Read-Host "Enter choice (1-3)"
    
    if ($choice -eq "1") {
        Write-Host ""
        Write-Host "Installing via Scoop..." -ForegroundColor Yellow
        
        # Check if Scoop is installed
        $scoopCLI = Get-Command scoop -ErrorAction SilentlyContinue
        
        if (-not $scoopCLI) {
            Write-Host "Scoop is not installed. Installing Scoop first..." -ForegroundColor Yellow
            Write-Host "This will run: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Gray
            Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
            Invoke-RestMethod get.scoop.sh | Invoke-Expression
            
            if ($LASTEXITCODE -ne 0) {
                Write-Host "❌ Failed to install Scoop" -ForegroundColor Red
                Write-Host "Please install manually from: https://scoop.sh" -ForegroundColor Yellow
                exit 1
            }
            
            Write-Host "✅ Scoop installed!" -ForegroundColor Green
        }
        
        Write-Host "Installing Supabase CLI via Scoop..." -ForegroundColor Yellow
        scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
        scoop install supabase
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Failed to install Supabase CLI via Scoop" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ Supabase CLI installed successfully!" -ForegroundColor Green
        
    } elseif ($choice -eq "2") {
        Write-Host ""
        Write-Host "Opening download page..." -ForegroundColor Yellow
        Start-Process "https://github.com/supabase/cli/releases/latest"
        Write-Host ""
        Write-Host "Instructions:" -ForegroundColor Cyan
        Write-Host "  1. Download 'supabase_windows_amd64.zip'" -ForegroundColor Gray
        Write-Host "  2. Extract to a folder (e.g., C:\supabase)" -ForegroundColor Gray
        Write-Host "  3. Add that folder to your PATH" -ForegroundColor Gray
        Write-Host "  4. Restart PowerShell" -ForegroundColor Gray
        Write-Host "  5. Run this script again" -ForegroundColor Gray
        Write-Host ""
        exit 0
        
    } else {
        Write-Host ""
        Write-Host "Please install Supabase CLI manually:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Option 1 - Via Scoop (Recommended):" -ForegroundColor Cyan
        Write-Host "  scoop bucket add supabase https://github.com/supabase/scoop-bucket.git" -ForegroundColor Gray
        Write-Host "  scoop install supabase" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Option 2 - Direct Download:" -ForegroundColor Cyan
        Write-Host "  https://github.com/supabase/cli/releases/latest" -ForegroundColor Gray
        Write-Host ""
        Write-Host "After installation, run this script again." -ForegroundColor Yellow
        exit 0
    }
    
    # Refresh PATH to pick up newly installed CLI
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    # Verify installation
    $supabaseCLI = Get-Command supabase -ErrorAction SilentlyContinue
    if (-not $supabaseCLI) {
        Write-Host "❌ Supabase CLI installation verification failed" -ForegroundColor Red
        Write-Host "Please restart PowerShell and run this script again" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "✅ Supabase CLI found!" -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 1: Login to Supabase" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This will open a browser window for authentication..." -ForegroundColor Yellow
supabase login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to login to Supabase" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Logged in successfully!" -ForegroundColor Green
Write-Host ""

# List available projects
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Available Supabase Projects" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

supabase projects list

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 2: Link to Your Project" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Please enter your Supabase Project Reference ID:" -ForegroundColor Yellow
Write-Host "(You can find this in your Supabase Dashboard → Settings → General)" -ForegroundColor Gray
$projectRef = Read-Host "Project Reference ID"

if ([string]::IsNullOrWhiteSpace($projectRef)) {
    Write-Host "❌ Project Reference ID cannot be empty!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Linking to project: $projectRef..." -ForegroundColor Yellow
supabase link --project-ref $projectRef

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to link project" -ForegroundColor Red
    Write-Host "Please check your Project Reference ID and try again" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Project linked successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 3: Push Database Migrations" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This will create all database tables, policies, and storage buckets..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Migrations to be applied:" -ForegroundColor Cyan
Write-Host "  1. Complete ecommerce schema (products, orders, reviews, etc.)" -ForegroundColor Gray
Write-Host "  2. Initial product seed data (6 products + coupons)" -ForegroundColor Gray
Write-Host "  3. Row Level Security policies" -ForegroundColor Gray
Write-Host "  4. Storage buckets for images" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Do you want to continue? (y/n)"

if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "❌ Setup cancelled" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "Pushing migrations to database..." -ForegroundColor Yellow
supabase db push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push migrations" -ForegroundColor Red
    Write-Host "Please check the error messages above" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Migrations applied successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 4: Get Your Credentials" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Now you need to add your Supabase credentials to .env.local" -ForegroundColor Yellow
Write-Host ""
Write-Host "Go to your Supabase Dashboard → Settings → API" -ForegroundColor Cyan
Write-Host ""
Write-Host "Copy the following:" -ForegroundColor Yellow
Write-Host "  1. Project URL" -ForegroundColor Gray
Write-Host "  2. anon/public key" -ForegroundColor Gray
Write-Host ""

$openBrowser = Read-Host "Do you want to open Supabase Dashboard? (y/n)"

if ($openBrowser -eq 'y' -or $openBrowser -eq 'Y') {
    Start-Process "https://supabase.com/dashboard/project/$projectRef/settings/api"
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 5: Update Environment Variables" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "Found existing .env.local file" -ForegroundColor Green
    $overwrite = Read-Host "Do you want to update it? (y/n)"
    
    if ($overwrite -ne 'y' -and $overwrite -ne 'Y') {
        Write-Host "Skipping .env.local update" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Please manually update your .env.local with:" -ForegroundColor Yellow
        Write-Host "  VITE_SUPABASE_URL=your-project-url" -ForegroundColor Gray
        Write-Host "  VITE_SUPABASE_ANON_KEY=your-anon-key" -ForegroundColor Gray
    } else {
        Write-Host ""
        Write-Host "Please enter your Supabase Project URL:" -ForegroundColor Yellow
        $supabaseUrl = Read-Host "Project URL"
        
        Write-Host "Please enter your Supabase anon/public key:" -ForegroundColor Yellow
        $supabaseKey = Read-Host "Anon Key"
        
        # Update .env.local
        $envContent = Get-Content ".env.local" -Raw
        $envContent = $envContent -replace "VITE_SUPABASE_URL=.*", "VITE_SUPABASE_URL=$supabaseUrl"
        $envContent = $envContent -replace "VITE_SUPABASE_ANON_KEY=.*", "VITE_SUPABASE_ANON_KEY=$supabaseKey"
        $envContent | Set-Content ".env.local"
        
        Write-Host "✅ Environment variables updated!" -ForegroundColor Green
    }
} else {
    Write-Host "Creating .env.local file..." -ForegroundColor Yellow
    
    Write-Host ""
    Write-Host "Please enter your Supabase Project URL:" -ForegroundColor Yellow
    $supabaseUrl = Read-Host "Project URL"
    
    Write-Host "Please enter your Supabase anon/public key:" -ForegroundColor Yellow
    $supabaseKey = Read-Host "Anon Key"
    
    # Create .env.local from template
    $envTemplate = @"
# Supabase Configuration
VITE_SUPABASE_URL=$supabaseUrl
VITE_SUPABASE_ANON_KEY=$supabaseKey

# Optional: Add these later when you set up integrations
# VITE_STRIPE_PUBLIC_KEY=
# VITE_RAZORPAY_KEY_ID=
# VITE_GA_MEASUREMENT_ID=
# VITE_META_PIXEL_ID=
"@
    
    $envTemplate | Set-Content ".env.local"
    Write-Host "✅ .env.local file created!" -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ✅ Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Your database is now ready with:" -ForegroundColor Green
Write-Host "  ✅ All tables created" -ForegroundColor Gray
Write-Host "  ✅ 6 products added" -ForegroundColor Gray
Write-Host "  ✅ 3 coupons added" -ForegroundColor Gray
Write-Host "  ✅ Row Level Security enabled" -ForegroundColor Gray
Write-Host "  ✅ Storage buckets configured" -ForegroundColor Gray
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Start your development server:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""

Write-Host "2. Test the connection:" -ForegroundColor Yellow
Write-Host "   - Open http://localhost:5173" -ForegroundColor Cyan
Write-Host "   - Check that products load from Supabase" -ForegroundColor Cyan
Write-Host "   - Try signing up/logging in" -ForegroundColor Cyan
Write-Host ""

Write-Host "3. Upload product images:" -ForegroundColor Yellow
Write-Host "   - Go to Supabase Dashboard → Storage" -ForegroundColor Cyan
Write-Host "   - Upload images to 'product-images' bucket" -ForegroundColor Cyan
Write-Host "   - Update product image URLs in database" -ForegroundColor Cyan
Write-Host ""

Write-Host "4. Verify everything works:" -ForegroundColor Yellow
Write-Host "   - Browse products" -ForegroundColor Cyan
Write-Host "   - Add to cart" -ForegroundColor Cyan
Write-Host "   - Create an account" -ForegroundColor Cyan
Write-Host "   - Test checkout flow" -ForegroundColor Cyan
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Useful Commands" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "View database status:" -ForegroundColor Yellow
Write-Host "  supabase status" -ForegroundColor Cyan
Write-Host ""

Write-Host "Open Supabase Dashboard:" -ForegroundColor Yellow
Write-Host "  Start-Process 'https://supabase.com/dashboard/project/$projectRef'" -ForegroundColor Cyan
Write-Host ""

Write-Host "Run SQL query:" -ForegroundColor Yellow
Write-Host "  supabase db query 'SELECT * FROM products;'" -ForegroundColor Cyan
Write-Host ""

Write-Host "Reset database (WARNING: Deletes all data!):" -ForegroundColor Yellow
Write-Host "  supabase db reset" -ForegroundColor Cyan
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  🎉 Happy Building!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "If you encounter any issues, check:" -ForegroundColor Yellow
Write-Host "  - QUICK_START.md for troubleshooting" -ForegroundColor Gray
Write-Host "  - API_DOCUMENTATION.md for API reference" -ForegroundColor Gray
Write-Host "  - Supabase Dashboard logs" -ForegroundColor Gray
Write-Host ""

# Offer to start dev server
$startServer = Read-Host "Do you want to start the development server now? (y/n)"

if ($startServer -eq 'y' -or $startServer -eq 'Y') {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Yellow
    npm run dev
}
