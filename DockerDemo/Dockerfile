# Node version 
FROM node:16

# Port
EXPOSE 3000

# WORKDIR (Chỗ upload source code lên) (Docker sẽ tạo thư mục app (app ta tự đặt tên) và đẩy code của ta vào folder app này)
WORKDIR /app

# Luôn cài những phiên bản thư viện mới nhất
RUN npm i npm@latest -g

# Copy file package.json và package-lock.json vào thư mục root (gốc)
COPY package.json package-lock.json ./

RUN npm install

# . . nghĩa là copy toàn bộ tất cả các file
COPY . .

# Run file index.js
CMD ["nodemon","index.js"]

# => Nên sắp xếp thứ tự các bước như trên