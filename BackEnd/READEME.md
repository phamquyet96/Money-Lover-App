# Cài đặt:
# npm i body-parser : lấy đc các tham số Client gửi lên phía Server
# npm install dotenv --save  : lấy đc các tham số lấy trong file môi trường
# npm i ejs : muốn chạy đc 1 cái màn hình trên server phải dùng view engine
# npm i express
# npm i @babel/core
# npm i @babel/node
# npm install --save-dev @babel/preset-env 
# npm i nodemon
# npm i typescript
# npm i yarn
# npm i typeorm
# npm install -g typeorm
# npm i rimraf
# npm i tsc-watch
# npm install mysql 
# npm i --save mysql2



# file services: kết nối đến database
# file config: Cấu hình các tham số của dự án
# file views: viết các file html trong thư mục này
# public: lưu trữ hình ảnh, flie css


# https://sequelize.org/docs/v6/other-topics/migrations/
# npm i sequelize
# npm install --save-dev sequelize-cli
# npx sequelize-cli init     : trong thư mục src để tự chạy flie config.json
# npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
# npx sequelize-cli db:migrate : để Running Migrations kết nối tạo bảng trong databse

# (Tạo dữ liệu fake trong file seeders)
# npx sequelize-cli seed:generate --name demo-user

# npx sequelize-cli db:seed:all  : tao du lieu trong table