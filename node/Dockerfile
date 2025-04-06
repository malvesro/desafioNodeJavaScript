# Etapa 1: build base com dependências
FROM node:18 as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copia todo o projeto
COPY . .

# Etapa 2: imagem final de produção
FROM node:18-slim

WORKDIR /usr/src/app

# Instala netcat apenas nesta etapa
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

# Copia somente o necessário do estágio anterior
COPY --from=builder /usr/src/app /usr/src/app

CMD ["sh", "-c", "until nc -z db 3306; do echo 'Aguardando MySQL...'; sleep 2; done && node index.js"]
