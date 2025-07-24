# Multi-stage build for Poller Bear application

# Backend build stage  
FROM docker.io/golang:1.23-alpine AS backend-builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server cmd/server.go

# Production stage
FROM docker.io/alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app

# Copy backend binary
COPY --from=backend-builder /app/server .

# Copy existing frontend build artifacts (pre-built)
COPY frontend/public ./frontend/public

CMD ["./server"]
