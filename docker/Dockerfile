# syntax=docker/dockerfile:1
# check=error=true

ARG NODE_VERSION=22

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-bookworm AS base

# Set working directory for all build stages.
WORKDIR /app
RUN chown -R node:node /app

# Run the application as a non-root user.
USER node

################################################################################
# Create a stage for installing development dependencies.
FROM base AS development

# Download npm with Corepack
RUN --mount=source=package.json,dst=package.json \
    --mount=source=package-lock.json,dst=package-lock.json \
    --mount=type=cache,dst=~/.npm \
    --mount=type=cache,dst=~.cache/node/corepack \
    corepack install && corepack npm --version

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build.
RUN --mount=source=package.json,dst=package.json \
    --mount=source=package-lock.json,dst=package-lock.json \
    --mount=type=cache,dst=~/.npm \
    --mount=type=cache,dst=~/.cache/node/corepack \
    corepack npm ci --ignore-scripts

# Sleep indefinitely to keep the container running for development.
CMD ["sleep", "infinity"]

################################################################################
# Create a stage for building the application.
FROM development AS build
COPY . .

# Run the build script.
RUN --mount=type=cache,dst=~/.npm \
    --mount=type=cache,dst=~/.cache/node/corepack \
    --mount=type=secret,id=domain,env=MICROCMS_SERVICE_DOMAIN,required=true \
    --mount=type=secret,id=key,env=MICROCMS_API_KEY,required=true \
    --mount=type=secret,id=secret,env=MICROCMS_SECRET,required=true \
    corepack npx next telemetry --disable && corepack npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base AS runner

# Use production node environment by default.
ENV NODE_ENV=production

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# Expose the port that the application runs on.
EXPOSE 3000

# Run the application.
ENV HOSTNAME='0.0.0.0'\
    PORT=3000

CMD ["node", "server.js"]
