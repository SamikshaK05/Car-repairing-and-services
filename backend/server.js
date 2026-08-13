import dotenv from 'dotenv';
import dns from 'dns';

// 1. Load environment variables first
dotenv.config();

// 2. Configure DNS servers with fallback
const dnsServer = process.env.DNS_SERVER;
if (dnsServer && dnsServer.trim()) {
  try {
    dns.setServers([dnsServer.trim(), '8.8.8.8', '1.1.1.1']);
  } catch (err) {
    try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
  }
} else {
  try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
}

import connectDB from './src/config/database.js';
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 3. Connect to MongoDB
    await connectDB();

    // 4. Start Express server only after MongoDB connects
    app.listen(PORT, () => {
      console.log(`CarFix Backend Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start backend server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
