# Build Project
FROM node:14-alpine as builder
RUN mkdir /work
WORKDIR /work
#RUN apk add --no-cache alpine-sdk python3
COPY frontend ./frontend
WORKDIR /work/frontend
RUN echo "Build frontend"
RUN mkdir -p "node_modules"
RUN yarn install
RUN VITE_RELAY=http://localhost:8765/gun yarn build

WORKDIR /work
COPY relay ./relay
WORKDIR /work/relay
RUN echo "Build Relay Server"
RUN mkdir -p "node_modules"
RUN yarn install
RUN yarn build
RUN ls

# fresh image without dev packages
FROM node:14-alpine
# build-time metadata as defined at http://label-schema.org
ARG BUILD_DATE
ARG VCS_REF
ARG VCS_URL
ARG VERSION
LABEL org.label-schema.build-date=$BUILD_DATE \
  org.label-schema.name="Poddle - Meetings made simple!" \
  org.label-schema.url="https://poddle.network" \
  org.label-schema.vcs-ref=$VCS_REF \
  org.label-schema.vcs-url=$VCS_URL \
  org.label-schema.vendor="The poddle Team" \
  org.label-schema.version=$VERSION \
  org.label-schema.schema-version="1.0"
ARG SHA
RUN mkdir /work
WORKDIR /work
COPY --from=builder /work/frontend/node_modules ./node_modules
COPY --from=builder /work/relay/node_modules ./relay/node_modules
COPY --from=builder /work/frontend/dist ./dist
COPY --from=builder /work/relay/dist ./relay/dist
COPY --from=builder /work/relay/package.json ./relay/package.json
RUN echo "{ \"sha\": \"$SHA\" }" > version.json
RUN cat version.json
WORKDIR /work/relay
RUN ls
EXPOSE 8765
CMD ["npm","start"]
