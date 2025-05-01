# Step by Step Server Start Guide

## Step 1: Install MongoDB Community Edition
1. Download MongoDB:
   - Go to https://www.mongodb.com/try/download/community
   - Select "Windows" as OS
   - Select "msi" as Package
   - Click "Download"

2. Install MongoDB:
   - Run the downloaded .msi file as Administrator
   - Choose "Complete" installation
   - Enable "Install MongoDB Compass" (the GUI tool)
   - Click "Install"
   - Wait for installation to complete

3. Create data directory:
```bash
mkdir C:\data\db
```

## Step 2: Add MongoDB to System PATH
1. Press Windows + X and select "System"
2. Click "Advanced system settings" on the right
3. Click "Environment Variables" button
4. Under "System Variables", find and select "Path"
5. Click "Edit"
6. Click "New"
7. Add this exact path: C:\Program Files\MongoDB\Server\6.0\bin
8. Click "OK" on all windows
9. Close and reopen Command Prompt

## Step 3: Start MongoDB Server
```bash
mongod --dbpath="C:\data\db"
```

# Expected Output
After running mongod, you should see messages like:
- "Waiting for connections"
- "port: 27017"
- "dbpath: C:\data\db"

If you see these messages, MongoDB is running successfully!

## Common Errors and Solutions
1. If you get "mongod not recognized":
   - Make sure you're using the complete path with .exe extension
   - Check if MongoDB is actually installed in the specified location
   
2. If you get access denied:
   - Run Command Prompt as Administrator
   - Check if C:\data\db has proper permissions

3. If the service won't start:
   - Open Services (Win + R, type services.msc)
   - Find MongoDB service
   - Right-click and select Start

## Step 4: Start Backend Server
```bash
# Navigate to backend directory
cd c:\Users\kashi\OneDrive\Desktop\Saarthi\backend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

## Step 5: Start Frontend Server
```bash
# Navigate to frontend directory
cd c:\Users\kashi\OneDrive\Desktop\Saarthi\frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

## Verification Steps
1. MongoDB: Should show "Waiting for connections", "port: 27017", and "dbpath: C:\data\db" in the terminal
2. Backend: Should show "Server running on port 5000" or similar
3. Frontend: Should show "Ready on http://localhost:3000" or similar

## Troubleshooting
- If mongod command not found: Add MongoDB bin directory to PATH
  - Open System Properties > Environment Variables
  - Edit Path variable
  - Add: C:\Program Files\MongoDB\Server\6.0\bin
  - Restart terminal
- If ports are busy: Check for other running instances
- If connection errors: Ensure servers are started in order (MongoDB → Backend → Frontend)
