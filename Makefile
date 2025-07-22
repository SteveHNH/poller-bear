.PHONY: help install build dev server clean frontend-dev frontend-build frontend-start backend-build backend-run deps

# Default target
help: ## Show this help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Dependencies
install: deps ## Install all dependencies (Go modules + npm packages)

deps: ## Install Go modules and npm dependencies
	go mod tidy
	cd frontend && npm install

# Build targets
build: backend-build frontend-build ## Build both backend and frontend

backend-build: ## Build the Go backend binary
	go build -o bin/poller-bear cmd/server.go

frontend-build: ## Build the Svelte frontend for production
	cd frontend && npm run build

# Development targets
dev: ## Start both backend and frontend in development mode (requires tmux or run in separate terminals)
	@echo "Starting development servers..."
	@echo "Backend will run on :8080, frontend dev server will proxy to it"
	@echo "Run 'make backend-run' and 'make frontend-dev' in separate terminals"

backend-run: ## Run the Go backend server
	go run cmd/server.go

frontend-dev: ## Start the Svelte frontend development server with live reload
	cd frontend && npm run dev

# Production targets
server: build ## Build and start the production server
	./bin/poller-bear

frontend-start: frontend-build ## Start the frontend production server
	cd frontend && npm run start

# Utility targets
clean: ## Clean build artifacts
	rm -rf bin/
	rm -rf frontend/public/build/
	rm -rf frontend/node_modules/.cache/

# Database (assumes PostgreSQL is running)
db-migrate: ## Run database migrations (requires running backend once)
	@echo "Database migrations run automatically when starting the backend"
	@echo "The new features include:"
	@echo "  - LimitVotes field in Poll table"
	@echo "  - VoteRecord table with SessionID for tracking votes"
	@echo "Ensure PostgreSQL is running and configured properly"

# Testing targets
test: test-unit test-integration ## Run all tests (unit + integration)

test-all-fast: ## Run all tests without database setup (assumes test DB is running)
	@echo "Running all tests..."
	ginkgo -r internal/test/

test-unit: ## Run unit tests only
	@echo "Running unit tests..."
	ginkgo internal/test/unit/

test-integration: test-db-up ## Run integration tests with test database
	@echo "Running integration tests..."
	@echo "Waiting for test database to be ready..."
	@sleep 5
	DOCKER_HOST=unix:///run/user/$(shell id -u)/podman/podman.sock ginkgo internal/test/integration/ || ($(MAKE) test-db-down && exit 1)
	@$(MAKE) test-db-down

test-watch: ## Run tests in watch mode for development
	@echo "Running tests in watch mode..."
	ginkgo watch -r internal/test/

test-db-up: ## Start test database with podman-compose
	@echo "Starting test database..."
	podman-compose -f podman-compose.test.yml up -d
	@echo "Waiting for database to be ready..."
	@sleep 15

test-db-down: ## Stop and clean test database
	@echo "Stopping test database..."
	podman-compose -f podman-compose.test.yml down -v

test-db-logs: ## Show test database logs
	podman-compose -f podman-compose.test.yml logs -f postgres-test

# Development workflow
setup: deps ## Initial project setup
	@echo "Project setup complete!"
	@echo "1. Ensure PostgreSQL is running with the configured database"
	@echo "2. Run 'make backend-run' in one terminal"
	@echo "3. Run 'make frontend-dev' in another terminal"
	@echo "4. Visit http://localhost:8080 for the app"
	@echo "5. Run 'make test' to run tests"

dev-setup: test-db-up ## Full development setup: start database, backend, and frontend
	@echo "🗄️  Database started on port 5432"
	@echo "⏳ Waiting for database to be ready..."
	@sleep 15
	@echo "🔧 Building backend..."
	@make backend-build
	@echo "🚀 Starting backend server in background..."
	@./bin/poller-bear &
	@echo $$! > .backend.pid
	@echo "⏳ Waiting for backend to initialize..."
	@sleep 3
	@echo "🎨 Starting frontend development server..."
	@echo ""
	@echo "🌟 Development environment ready!"
	@echo "   Frontend (with live reload): http://localhost:5173"
	@echo "   Backend API:                 http://localhost:8080"
	@echo "   Database:                    localhost:5432"
	@echo ""
	@echo "⚠️  Press Ctrl+C to stop frontend, then run 'make dev-cleanup' to stop all services"
	@cd frontend && npm run dev || $(MAKE) dev-cleanup

dev-cleanup: ## Stop all development services (database, backend processes)
	@echo "🧹 Cleaning up development environment..."
	@if [ -f .backend.pid ]; then \
		echo "Stopping backend server..."; \
		kill -TERM $$(cat .backend.pid) 2>/dev/null || true; \
		rm -f .backend.pid; \
	fi
	@echo "Stopping any remaining Go processes on port 8080..."
	@pkill -f "poller-bear" 2>/dev/null || true
	@pkill -f "go run cmd/server.go" 2>/dev/null || true
	@echo "Stopping test database..."
	@$(MAKE) test-db-down
	@echo "✅ Development environment cleaned up"

quick-start: ## Quick start for development (builds and runs backend)
	@make backend-build
	@echo "Starting backend server..."
	./bin/poller-bear