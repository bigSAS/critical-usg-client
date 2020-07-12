### Build image
`docker build -t cusg-client-web-dev:latest .`

### Deploy container
```
docker run -d --name cusg-client-web-dev \
  -p 8089:80 \
  -e CUSG_DEBUG=NO \
  -e CUSG_BACKEND_URL=http://77.55.215.44:8088/api/ \
  cusg-client-web-dev:latest
```
