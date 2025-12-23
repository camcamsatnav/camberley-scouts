# Camberley Scout Group Website

This repository contains the source code for the Camberley Scout Group website.

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/camcamsatnav/camberley-scouts.git
   cd camberley-scouts
    ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
    npm run dev
    ```
4. Open your browser and navigate to `http://localhost:5173` to view the website.

5. Run tests:
   ```bash
   npm run test
   ```

## Docker

To build and run the website using Docker:

1. Build the Docker image:
   ```bash
   docker build -t camberley-scouts .
   ```
2. Run the Docker container:
3. ```bash
   docker run -d -p 8080:80 camberley-scouts

## Docker compose

1. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

Docker images can be found [here](https://github.com/camcamsatnav/camberley-scouts/pkgs/container/camberley-scouts)
