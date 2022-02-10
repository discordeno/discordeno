FROM mcr.microsoft.com/vscode/devcontainers/base:0-buster
ENV DENO_INSTALL=/deno
RUN mkdir -p /deno \
    && curl -fsSL https://deno.land/x/install/install.sh | sh \
    && chown -R vscode /deno
ENV PATH=${DENO_INSTALL}/bin:${PATH} \
    DENO_DIR=${DENO_INSTALL}/.cache/deno
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
   && apt-get -y install --no-install-recommends make
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get -y install --no-install-recommends nodejs
USER vscode