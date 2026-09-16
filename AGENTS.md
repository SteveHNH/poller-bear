# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Poller Bear is a polling application with a Go backend API and Svelte frontend. Users can create polls with multiple response options and vote on them.

## Architecture

### Backend (Go)
- **Entry point**: `cmd/server.go` - Echo web server on port 8080
- **API endpoints**: `internal/endpoints/endpoints.go` - REST API for polls
- **Database**: PostgreSQL with GORM ORM
- **Models**: `internal/models/poll.go` - Poll and PollResponse structs
- **Config**: `internal/config/config.go` - Viper-based configuration with environment variables
- **Database**: `internal/db/connection.go` - Database connection and migration

### Frontend (Svelte)  
- **Build system**: Rollup with standard Svelte template configuration
- **Components**: `frontend/src/` - App.svelte, CreatePoll.svelte, ViewPoll.svelte, PollResults.svelte
- **Routing**: Uses svelte-routing for client-side navigation
- **UI**: SvelteUI components (@svelteuidev/core, @svelteuidev/composables)

## Development Commands

### Make Commands (Recommended)
```bash
make help            # Show all available commands
make setup           # Initial project setup with instructions
make install         # Install all dependencies (Go + npm)
make dev             # Instructions for development workflow
make backend-run     # Run Go backend server
make frontend-dev    # Run Svelte frontend with live reload
make build           # Build both backend and frontend
make server          # Build and start production server
make clean           # Clean build artifacts
```

### Testing Commands
```bash
make test            # Run all tests (unit + integration)
make test-unit       # Run unit tests only
make test-integration # Run integration tests with test database
make test-watch      # Run tests in watch mode for development
make test-db-up      # Start test database with podman-compose
make test-db-down    # Stop and clean test database
make test-db-logs    # Show test database logs
```

### Direct Commands
#### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Development server with live reload
npm run build        # Production build
npm run start        # Serve production build
```

#### Backend
```bash
go mod tidy          # Install Go dependencies
go run cmd/server.go # Run development server
```

## Database Configuration

The application uses PostgreSQL. Configure via environment variables:
- `DATABASE_HOST` (default: localhost)
- `DATABASE_PORT` (default: 5432) 
- `DATABASE_USER` (default: poller)
- `DATABASE_PASS` (default: poller)
- `DATABASE_NAME` (default: poller_bear)

## API Endpoints

- `POST /api/create` - Create a new poll
- `GET /api/:id` - Get poll by ID with responses
- `POST /api/:id/vote` - Vote on a poll response
- `GET /polls/*` - SPA routing fallback to index.html

## Testing Infrastructure

### Framework: Ginkgo v2 + Gomega
- **Unit Tests**: `internal/test/unit/` - Fast tests for models, services, and utilities
- **Integration Tests**: `internal/test/integration/` - Full API tests with real database
- **Test Helpers**: `internal/test/helpers/` - Database fixtures, HTTP utilities, test builders
- **Test Database**: PostgreSQL container via podman-compose (port 5433)

### Test Categories
- **Model Tests**: Validate data structures and test builders
- **Session Tests**: HTTP session management and cookie handling  
- **Validation Tests**: Input validation for polls and responses
- **API Tests**: Complete request/response cycles with database
- **Vote Limiting Tests**: Session-based voting restrictions

### Running Tests
- Use `make test-unit` for fast feedback during development
- Use `make test-integration` for full API testing (starts test DB automatically)
- Integration tests require Podman or Docker for database container

## Key Files

- `cmd/server.go:21` - Static file serving from frontend/public/
- `internal/endpoints/endpoints.go:26` - Database operations for polls
- `internal/models/poll.go:7-22` - Core data models with vote limiting
- `internal/session/session.go` - Session cookie management for vote tracking
- `frontend/src/App.svelte` - Main application component with routing
- `internal/test/` - Complete BDD test suite with Ginkgo/Gomega