# MitthuuG Database Setup - Direct PostgreSQL Connection
# No Supabase CLI needed! Connects directly to your database.

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  MitthuuG Database Setup (Direct)" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will connect directly to your Supabase PostgreSQL database" -ForegroundColor Yellow
Write-Host "and run all migrations without needing the Supabase CLI." -ForegroundColor Yellow
Write-Host ""

# ============================================================================
# Step 1: Get Database Connection Details
# ============================================================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 1: Database Connection" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Go to your Supabase Dashboard:" -ForegroundColor Yellow
Write-Host "  https://supabase.com/dashboard" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then: Project Settings → Database → Connection String" -ForegroundColor Yellow
Write-Host ""
Write-Host "You'll need:" -ForegroundColor Yellow
Write-Host "  - Host (db.xxx.supabase.co)" -ForegroundColor Gray
Write-Host "  - Database name (usually 'postgres')" -ForegroundColor Gray
Write-Host "  - Port (usually 5432)" -ForegroundColor Gray
Write-Host "  - User (usually 'postgres')" -ForegroundColor Gray
Write-Host "  - Password (your database password)" -ForegroundColor Gray
Write-Host ""

$openBrowser = Read-Host "Open Supabase Dashboard now? (y/n)"
if ($openBrowser -eq 'y' -or $openBrowser -eq 'Y') {
    Start-Process "https://supabase.com/dashboard"
}

Write-Host ""
Write-Host "Enter your database connection details:" -ForegroundColor Yellow
Write-Host ""

$dbHost = Read-Host "Database Host (e.g., db.xxxxx.supabase.co)"
if ([string]::IsNullOrWhiteSpace($dbHost)) {
    Write-Host "❌ Host is required!" -ForegroundColor Red
    exit 1
}

$dbPort = Read-Host "Port (press Enter for default: 5432)"
if ([string]::IsNullOrWhiteSpace($dbPort)) {
    $dbPort = "5432"
}

$dbName = Read-Host "Database Name (press Enter for default: postgres)"
if ([string]::IsNullOrWhiteSpace($dbName)) {
    $dbName = "postgres"
}

$dbUser = Read-Host "Username (press Enter for default: postgres)"
if ([string]::IsNullOrWhiteSpace($dbUser)) {
    $dbUser = "postgres"
}

$dbPassword = Read-Host "Password" -AsSecureString
$dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
)

if ([string]::IsNullOrWhiteSpace($dbPasswordPlain)) {
    Write-Host "❌ Password is required!" -ForegroundColor Red
    exit 1
}

# Build connection string
$connectionString = "Host=$dbHost;Port=$dbPort;Database=$dbName;Username=$dbUser;Password=$dbPasswordPlain;SSL Mode=Require"

Write-Host ""
Write-Host "✅ Connection details collected!" -ForegroundColor Green
Write-Host ""

# ============================================================================
# Step 2: Install PostgreSQL .NET Driver (if needed)
# ============================================================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 2: Check PostgreSQL Driver" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if we can use PostgreSQL
try {
    Add-Type -AssemblyName "Npgsql" -ErrorAction SilentlyContinue
    Write-Host "✅ PostgreSQL driver already available!" -ForegroundColor Green
} catch {
    Write-Host "Installing PostgreSQL driver (Npgsql)..." -ForegroundColor Yellow
    
    # Create a temporary directory for the driver
    $tempDir = Join-Path $env:TEMP "supabase-setup"
    if (-not (Test-Path $tempDir)) {
        New-Item -ItemType Directory -Path $tempDir | Out-Null
    }
    
    # Download Npgsql via NuGet
    Write-Host "Downloading Npgsql package..." -ForegroundColor Yellow
    
    # Use .NET's built-in WebClient
    $nugetUrl = "https://www.nuget.org/api/v2/package/Npgsql/7.0.0"
    $zipPath = Join-Path $tempDir "npgsql.zip"
    
    try {
        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($nugetUrl, $zipPath)
        
        # Extract
        Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force
        
        # Load the DLL
        $dllPath = Join-Path $tempDir "lib\net6.0\Npgsql.dll"
        if (Test-Path $dllPath) {
            Add-Type -Path $dllPath
            Write-Host "✅ PostgreSQL driver installed!" -ForegroundColor Green
        } else {
            throw "DLL not found"
        }
    } catch {
        Write-Host "❌ Could not install PostgreSQL driver automatically" -ForegroundColor Red
        Write-Host ""
        Write-Host "Alternative: Use psql command-line tool" -ForegroundColor Yellow
        Write-Host "Or use the Supabase Dashboard SQL Editor to run migrations manually" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Migration files are in: supabase\migrations\" -ForegroundColor Cyan
        exit 1
    }
}

Write-Host ""

# ============================================================================
# Step 3: Test Connection
# ============================================================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 3: Test Database Connection" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Testing connection to $dbHost..." -ForegroundColor Yellow

try {
    $conn = New-Object Npgsql.NpgsqlConnection($connectionString)
    $conn.Open()
    
    # Test query
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT version();"
    $version = $cmd.ExecuteScalar()
    
    Write-Host "✅ Connected successfully!" -ForegroundColor Green
    Write-Host "PostgreSQL Version: $($version.ToString().Substring(0, 50))..." -ForegroundColor Gray
    
    $conn.Close()
} catch {
    Write-Host "❌ Connection failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "  - Host is correct" -ForegroundColor Gray
    Write-Host "  - Password is correct" -ForegroundColor Gray
    Write-Host "  - Database allows connections from your IP" -ForegroundColor Gray
    Write-Host "  - SSL is enabled in Supabase" -ForegroundColor Gray
    exit 1
}

Write-Host ""

# ============================================================================
# Step 4: Run Migrations
# ============================================================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 4: Run Database Migrations" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$migrationsPath = Join-Path $PSScriptRoot "supabase\migrations"

if (-not (Test-Path $migrationsPath)) {
    Write-Host "❌ Migrations folder not found!" -ForegroundColor Red
    Write-Host "Expected: $migrationsPath" -ForegroundColor Red
    exit 1
}

# Get all SQL files in order
$migrationFiles = Get-ChildItem -Path $migrationsPath -Filter "*.sql" | Sort-Object Name

if ($migrationFiles.Count -eq 0) {
    Write-Host "❌ No migration files found!" -ForegroundColor Red
    exit 1
}

Write-Host "Found $($migrationFiles.Count) migration files:" -ForegroundColor Yellow
foreach ($file in $migrationFiles) {
    Write-Host "  - $($file.Name)" -ForegroundColor Gray
}
Write-Host ""

$confirm = Read-Host "Run all migrations? (y/n)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "❌ Migration cancelled" -ForegroundColor Red
    exit 0
}

Write-Host ""

# Run each migration
$successCount = 0
$failCount = 0

try {
    $conn = New-Object Npgsql.NpgsqlConnection($connectionString)
    $conn.Open()
    
    foreach ($file in $migrationFiles) {
        Write-Host "Running: $($file.Name)..." -ForegroundColor Yellow
        
        try {
            # Read SQL file
            $sql = Get-Content -Path $file.FullName -Raw
            
            # Execute
            $cmd = $conn.CreateCommand()
            $cmd.CommandText = $sql
            $cmd.CommandTimeout = 120  # 2 minutes timeout
            $cmd.ExecuteNonQuery() | Out-Null
            
            Write-Host "  ✅ Success!" -ForegroundColor Green
            $successCount++
            
        } catch {
            Write-Host "  ❌ Failed!" -ForegroundColor Red
            Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
            $failCount++
            
            # Ask if should continue
            $continueAnyway = Read-Host "Continue with remaining migrations? (y/n)"
            if ($continueAnyway -ne 'y' -and $continueAnyway -ne 'Y') {
                break
            }
        }
    }
    
    $conn.Close()
    
} catch {
    Write-Host "❌ Database connection error!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Migration Summary" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Successful: $successCount" -ForegroundColor Green
Write-Host "❌ Failed: $failCount" -ForegroundColor Red
Write-Host ""

if ($failCount -gt 0) {
    Write-Host "⚠️  Some migrations failed. Check the errors above." -ForegroundColor Yellow
    Write-Host ""
}

# ============================================================================
# Step 5: Verify Database
# ============================================================================

if ($successCount -gt 0) {
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "  Step 5: Verify Database" -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
    
    try {
        $conn = New-Object Npgsql.NpgsqlConnection($connectionString)
        $conn.Open()
        
        # Count tables
        $cmd = $conn.CreateCommand()
        $cmd.CommandText = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"
        $tableCount = $cmd.ExecuteScalar()
        
        Write-Host "Tables created: $tableCount" -ForegroundColor Green
        
        # Count products
        try {
            $cmd.CommandText = "SELECT COUNT(*) FROM products;"
            $productCount = $cmd.ExecuteScalar()
            Write-Host "Products added: $productCount" -ForegroundColor Green
        } catch {
            Write-Host "Products table: Not yet created" -ForegroundColor Yellow
        }
        
        # Count coupons
        try {
            $cmd.CommandText = "SELECT COUNT(*) FROM coupons;"
            $couponCount = $cmd.ExecuteScalar()
            Write-Host "Coupons added: $couponCount" -ForegroundColor Green
        } catch {
            Write-Host "Coupons table: Not yet created" -ForegroundColor Yellow
        }
        
        $conn.Close()
        
    } catch {
        Write-Host "⚠️  Could not verify database" -ForegroundColor Yellow
    }
    
    Write-Host ""
}

# ============================================================================
# Step 6: Update Environment Variables
# ============================================================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 6: Update .env.local" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Now you need your Supabase API credentials:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Go to: Project Settings → API" -ForegroundColor Cyan
Write-Host ""
Write-Host "Copy:" -ForegroundColor Yellow
Write-Host "  1. Project URL" -ForegroundColor Gray
Write-Host "  2. anon/public key" -ForegroundColor Gray
Write-Host ""

$updateEnv = Read-Host "Update .env.local file now? (y/n)"

if ($updateEnv -eq 'y' -or $updateEnv -eq 'Y') {
    Write-Host ""
    $supabaseUrl = Read-Host "Project URL"
    $supabaseKey = Read-Host "anon/public key"
    
    if (Test-Path ".env.local") {
        # Update existing
        $envContent = Get-Content ".env.local" -Raw
        $envContent = $envContent -replace "VITE_SUPABASE_URL=.*", "VITE_SUPABASE_URL=$supabaseUrl"
        $envContent = $envContent -replace "VITE_SUPABASE_ANON_KEY=.*", "VITE_SUPABASE_ANON_KEY=$supabaseKey"
        $envContent | Set-Content ".env.local"
        Write-Host "✅ .env.local updated!" -ForegroundColor Green
    } else {
        # Create new
        $envTemplate = @"
# Supabase Configuration
VITE_SUPABASE_URL=$supabaseUrl
VITE_SUPABASE_ANON_KEY=$supabaseKey

# Optional: Add these later
# VITE_STRIPE_PUBLIC_KEY=
# VITE_RAZORPAY_KEY_ID=
# VITE_GA_MEASUREMENT_ID=
# VITE_META_PIXEL_ID=
"@
        $envTemplate | Set-Content ".env.local"
        Write-Host "✅ .env.local created!" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Don't forget to update .env.local manually!" -ForegroundColor Yellow
}

Write-Host ""

# ============================================================================
# Done!
# ============================================================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ✅ Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

if ($successCount -eq $migrationFiles.Count) {
    Write-Host "All migrations completed successfully! 🎉" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your database is ready with:" -ForegroundColor Green
    Write-Host "  ✅ All tables created" -ForegroundColor Gray
    Write-Host "  ✅ Products added" -ForegroundColor Gray
    Write-Host "  ✅ Coupons added" -ForegroundColor Gray
    Write-Host "  ✅ Security policies enabled" -ForegroundColor Gray
    Write-Host "  ✅ Storage buckets configured" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "Setup completed with some errors." -ForegroundColor Yellow
    Write-Host "Check the messages above for details." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Make sure .env.local has your Supabase credentials" -ForegroundColor Cyan
Write-Host "  2. Start dev server: npm run dev" -ForegroundColor Cyan
Write-Host "  3. Test at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""

$startServer = Read-Host "Start development server now? (y/n)"
if ($startServer -eq 'y' -or $startServer -eq 'Y') {
    Write-Host ""
    Write-Host "Starting dev server..." -ForegroundColor Yellow
    npm run dev
}
