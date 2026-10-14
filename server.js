const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║  🔧 Jade & Andy Vintage Specialist          ║
  ║  Server running on http://localhost:${PORT.toString().padEnd(5)}║
  ║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(22)}║
  ╚══════════════════════════════════════════════╝
  `);
});