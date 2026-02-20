import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  userName: process.env.DB_USER,
  password: '#' + process.env.DB_PASS,
  name: process.env.DB_NAME,
  port: process.env.DB_PORT
}));