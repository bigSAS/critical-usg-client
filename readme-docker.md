### Build image
`docker build -t cusg-client-web-dev:latest .`

### Deploy container
```
docker run -d --name cusg-client-web-dev \
  -p 8089:80 \
  cusg-client-web-dev:latest
```
