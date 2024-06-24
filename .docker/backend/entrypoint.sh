#!/bin/bash

# Run migrations
echo "Running migrations..."
npm run migrate

# Start application
echo "Starting application..."
exec npm run start
