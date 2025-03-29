
```

# Client Application

This is the main client application that provides the user interface for the counter and value services.

## Azure AD Configuration

### 1. User and Service Structure

```
Azure AD Tenant (22222222-2222-2222-2222-222222222222)
├── Users
│   ├── John (john@example.com)
│   │   └── Roles: ["user"]
│   │   └── Scopes:
│   │       ├── api://counter-service/increase
│   │       └── api://value-service/read
│   │
│   └── Jane (jane@example.com)
│       └── Roles: ["admin"]
│       └── Scopes:
│           ├── api://counter-service/increase
│           ├── api://counter-service/decrease
│           ├── api://value-service/read
│           └── api://value-service/write
│
├── Service Providers
│   ├── Counter Service (ServiceProvider_1)
│   │   ├── Client ID: 11111111-1111-1111-1111-111111111111
│   │   ├── Redirect URI: http://localhost:3001/auth/callback
│   │   └── Scopes:
│   │       ├── api://counter-service/increase
│   │       ├── api://counter-service/decrease
│   │       ├── api://value-service/read
│   │       └── api://value-service/write
│   │
│   └── Value Service (ServiceProvider_2)
│       ├── Client ID: 22222222-2222-2222-2222-222222222222
│       ├── Redirect URI: http://localhost:3002/auth/callback
│       └── Scopes:
│           ├── api://value-service/read
│           └── api://value-service/write
│
└── Client Application
    └── Scopes:
        ├── api://counter-service/increase
        └── api://value-service/read
```

### 2. Azure Portal Configuration

```
Azure AD Portal Configuration
├── Azure AD Tenant (22222222-2222-2222-2222-222222222222)
│   ├── App Registrations
│   │   ├── ServiceProvider_1 (Counter Service)
│   │   │   ├── Application (client) ID: 11111111-1111-1111-1111-111111111111
│   │   │   ├── Directory (tenant) ID: 22222222-2222-2222-2222-222222222222
│   │   │   ├── Redirect URIs
│   │   │   │   └── http://localhost:3001/auth/callback
│   │   │   ├── Authentication
│   │   │   │   ├── Access tokens
│   │   │   │   └── ID tokens
│   │   │   ├── API Permissions
│   │   │   │   └── ServiceProvider_2
│   │   │   │       ├── api://value-service/read
│   │   │   │       └── api://value-service/write
│   │   │   ├── Expose an API
│   │   │   │   ├── Application ID URI: api://counter-service
│   │   │   │   └── Scopes
│   │   │   │       ├── api://counter-service/increase
│   │   │   │       └── api://counter-service/decrease
│   │   │   └── Certificates & secrets
│   │   │       └── Client secret (store securely)
│   │   │
│   │   └── ServiceProvider_2 (Value Service)
│   │       ├── Application (client) ID: 22222222-2222-2222-2222-222222222222
│   │       ├── Directory (tenant) ID: 22222222-2222-2222-2222-222222222222
│   │       ├── Redirect URIs
│   │       │   └── http://localhost:3002/auth/callback
│   │       ├── Authentication
│   │       │   ├── Access tokens
│   │       │   └── ID tokens
│   │       ├── API Permissions
│   │       │   └── None (self-contained API)
│   │       ├── Expose an API
│   │       │   ├── Application ID URI: api://value-service
│   │       │   └── Scopes
│   │       │       ├── api://value-service/read
│   │       │       └── api://value-service/write
│   │       └── Certificates & secrets
│   │           └── Client secret (store securely)
│   │
│   └── Enterprise Applications
│       ├── ServiceProvider_1
│       │   └── User assignments
│       │       ├── john@example.com (user role)
│       │       └── jane@example.com (admin role)
│       │
│       └── ServiceProvider_2
│           └── User assignments
│               ├── john@example.com (user role)
│               └── jane@example.com (admin role)
```

## Environment Variables

Create a `.env` file in the client directory with the following variables:

```env
VITE_AZURE_CLIENT_ID=<your-client-id>
VITE_AZURE_TENANT_ID=22222222-2222-2222-2222-222222222222
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm run preview` - Preview the built application
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
