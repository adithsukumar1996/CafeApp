# Navigate to the project directory
cd ../src/CafeApp.Api

# Restore the necessary packages
dotnet restore CafeApp.Api.csproj

# Build the project
dotnet build CafeApp.Api.csproj

# Run the API project
Start-Process -FilePath "dotnet" -ArgumentList "run --project CafeApp.Api.csproj --urls=https://localhost:7279"

# Navigate to the UI project directory
cd ../CafeApp.UI/cafe-app

# Install npm packages
npm install

# Run the UI project
npm run dev