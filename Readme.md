# Navigate to the backend directory
cd demyst/backend

# Create a Docker network for inter-container communication
sudo docker network create my-network

# Add QEMU for multi-architecture support (required only on Linux systems)
sudo docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

# Remove any existing 'show_money_source_api' container if it exists
sudo docker rm show_money_source_api

# Run the 'show-me-the-money' API container on port 3000, connected to 'my-network'
sudo docker run --platform linux/arm64 --network my-network -d --name show_money_source_api -p 3000:3000 jaypeng2015/show-me-the-money

# Test the 'show-me-the-money' API
http://localhost:3000/api.xro/2.0/Reports/BalanceSheet



# Build the backend Docker container from the Dockerfile in the current directory
sudo docker build -t demyst-backend .

# Remove any existing 'demyst_api' container if it exists
sudo docker rm demyst_api

# Run the backend container on port 5000, connected to 'my-network'
sudo docker run --platform linux/arm64 --network my-network -d --name demyst_api -p 5000:5000 demyst-backend

# Test the backend API
http://localhost:5000/balance_sheet



# Navigate to the frontend directory
cd demyst/frontend

# Build the frontend Docker container from the Dockerfile in the current directory
sudo docker build -t demyst-frontend .

# Remove any existing 'demyst_front' container if it exists
sudo docker rm demyst_front

# Run the frontend container on port 4000, connected to 'my-network'
sudo docker run --network my-network -d --name demyst_front -p 4000:80 demyst-frontend

# Test the solution
http://localhost:4000
