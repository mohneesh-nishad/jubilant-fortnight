FROM node as builder
WORKDIR /root/
COPY ["package.json", "package-lock.json", "./"]
COPY ["tsconfig.build.json", "tsconfig.json", "./"]
RUN ["npm", "install"]
COPY ["src/", "./src/"]
RUN ["npm","run","build"]

RUN ["/bin/bash", "-c", "find . ! -name dist ! -name node_modules -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;"]


FROM node:alpine
WORKDIR /root/
COPY --from=builder /root/ ./
EXPOSE 6342
CMD ["node", "./dist/main"]