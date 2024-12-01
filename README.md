# CafeApp

Cafe Application in Dotnet 8 and React

## Technologies Used

- **Backend**:

  - Dotnet 8
  - Dapper
  - Dapper.Contrib
  - SQL Kata

- **Frontend**:

  - React 18
  - Vite
  - Tailwind CSS
  - Material-UI (MUI)
  - Ag-Grid
  - React Hook Form
  - React Router (V7)

- **DB**:

  - SQL Lite

## Design Patterns Used

- **CQRS (Command Query Responsibility Segregation)**
- **Mediator**
- **Dependency Injection**

## DB Script and Initial Seeding

- The DB script for table creation and mock data seeding is located at `src/CafeApp.Api/DB/InitDB.sql`.
- A configuration in `appsettings.json` called `InitDb` under `DataBaseSettings` is used to control whether the DB should be initialized. This process will remove all existing data and recreate it with mock data.
- By default this cofiguration will be set as true in `appsettings.json`, after the initial run can toggle this configuration to false if needed.

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Running the Application

```bash
cd scripts
./run.ps1
```

### Alternate Ways to Run the Application

#### Running the Backend

```bash
cd src/CafeApp.Api
dotnet restore
dotnet run --project CafeApi.csproj --urls=https://localhost:7279
```

#### Running the Frontend

```bash
cd src/CafeApp.UI/cafe-app
npm install
npm run dev
```

### Accessing the Application

Open your browser:

- **API**: [https://localhost:7279](https://localhost:7279)
- **UI**: [http://localhost:5173](http://localhost:5173)
