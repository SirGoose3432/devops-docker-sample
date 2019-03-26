# Docker Pets vs Cattle Lab Instructions

## Logging Into EC2 Instance

1. Run `ssh docker0@<instance_address>`  
   Password: `devops`

## Startup the Sample App in Containers

1. cd into the `devops-docker-example` directory
2. Run `docker build -t react-stable -f Dockerfile-stable .`  
   This may take a little while
3. Run `docker build -t react-feature -f Dockerfile-feature .`
   * Now there are two docker images we can use to create containers
4. Run `docker-compose up --build -d`  
   * This runs the containers defined in `docker-compose.yml` as detached processes
5. Run `docker ps` to see the currently running containers  
   It should show 3 containers: nginx, stable, and feature
6. Visit `<instance_address>:8080` to hit the nginx instance.  
   The nginx load balancer redirects users to any of the stable or feature containers

## Updating the Sample App with a Defect

Now you're going to make a file change and deploy it without killing all containers
1. Run `docker kill <container_id>` on the container whose image is `react-feature`  
   Run `docker ps` to find its `container_id`
2. In the `devops-docker-example` directory, run `vi package.json`  
   Edit `"dev": "node server.js"` to `"dev": "flag=true node server.js`  
   Save and exit
3. Run `docker build -t react-feature -f Dockerfile-feature .`  
   This will rebuild the `react-feature` image to include your changes to `package.json`
   This may take a little while
4. Run `docker-compose up -d react-2`
5. Run `docker ps` to view all containers  
   One container should be unhealthy now  
   To see how the healthcheck works, look at `healthcheck.js` and `Dockerfile-feature`
6. Visit `<instance_address>:8080`  
   Click the button a few times. Every request goes to the load balancer, which chooses one of the instances  
   Uptime isn't compromised even though one container isn't healthy!
7. Visit `<instance_address>:3002` to view the unhealthy container  
   Press the "click me, I dare you" button to see the application break
8. Visit `<instance_address>:3001` to view the healthy container  
   Press the "click me, I dare you" button to see the application not break

## Removing the Broken Container and Replacing with Healthy One

1. Run `docker kill <container_id>` with the container id for the broken container  
   Run `docker ps` to view all containers and get the container id
2. Visit `<instance_address>:8080` to see that uptime is not compromised
3. In the `devops-docker-example` directory, run `vi package.json`  
   Edit `"dev": "flag=true node server.js"` back to `"dev": "node server.js`
4. Run `docker build -t react-feature -f Dockerfile-feature .`
5. Run `docker-compose up -d react-2`
6. Run `docker ps` to view all containers  
   Both instances should be healthy again

## Bonus
Try creating more instances of `react-stable` that can be accessed from `<instance_address>:8080`  
Hint: Look at `docker-compose.yml` and `load-balancer/nginx.conf`