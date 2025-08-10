import { createApp } from "./app";

const PORT = process.env.PORT || 8000;
const server = createApp();

server.listen(PORT, () => {
  console.info(`
🚀 Express API Template Server
📡 Running on: http://localhost:${PORT}
🌍 Environment: ${process.env.NODE_ENV || "development"}
⏰ Started at: ${new Date().toLocaleString()}
  `);
});

export default server;
