import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from './src/config/database.js';
import User from './src/models/User.js';
import app from './src/app.js';

dotenv.config();

let server;
const PORT = 5099;
const BASE_URL = `http://localhost:${PORT}`;

async function runTests() {
  console.log('==================================================');
  console.log('    CARFIX GOOGLE AUTHENTICATION TEST SUITE       ');
  console.log('==================================================\n');

  let passed = 0;
  let total = 0;

  const test = (title, condition) => {
    total++;
    if (condition) {
      console.log(`[PASS] Test ${total}: ${title}`);
      passed++;
    } else {
      console.error(`[FAIL] Test ${total}: ${title}`);
    }
  };

  try {
    await connectDB();
    server = app.listen(PORT);

    // 1. Missing Token Test
    const res1 = await fetch(`${BASE_URL}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data1 = await res1.json();
    test('Reject request without token (HTTP 400)', res1.status === 400 && data1.success === false);

    // 2. Invalid Token Test
    const res2 = await fetch(`${BASE_URL}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: 'invalid_token_string_123' }),
    });
    const data2 = await res2.json();
    test('Reject invalid/forged token (HTTP 401 or 400)', (res2.status === 401 || res2.status === 400) && data2.success === false);

    // 3. New User Google Authentication Test (Simulated ID Token Payload)
    const testGoogleId = 'google_id_test_998877';
    const testEmail = `google.user.${Date.now()}@carfix.test`;
    await User.deleteMany({ email: testEmail });

    const mockTokenPayload = {
      sub: testGoogleId,
      email: testEmail,
      name: 'Google Test User',
      picture: 'https://lh3.googleusercontent.com/a/default_avatar',
    };
    const mockIdToken = jwt.sign(mockTokenPayload, 'dev_mock_secret');

    const res3 = await fetch(`${BASE_URL}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: mockIdToken }),
    });
    const data3 = await res3.json();

    test('New Google user authentication returns HTTP 200', res3.status === 200 && data3.success === true);
    test('JWT token is returned in response', typeof data3.data?.token === 'string');
    test('Default role is CUSTOMER', data3.data?.user?.role === 'CUSTOMER');

    // Verify User persisted in MongoDB
    const createdUser = await User.findOne({ email: testEmail });
    test('User persisted in MongoDB with authProvider "google"', createdUser && createdUser.authProvider === 'google');
    test('User has correct googleId', createdUser && createdUser.googleId === testGoogleId);

    // 4. Authenticate Existing User
    const res4 = await fetch(`${BASE_URL}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: mockIdToken }),
    });
    const data4 = await res4.json();
    test('Existing Google user authentication returns HTTP 200', res4.status === 200 && data4.success === true);

    // 5. Inactive Account Blocking Test
    createdUser.isActive = false;
    await createdUser.save();

    const res5 = await fetch(`${BASE_URL}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: mockIdToken }),
    });
    const data5 = await res5.json();
    test('Deactivated Google account authentication rejected (HTTP 403)', res5.status === 403 && data5.success === false);

    // Cleanup
    await User.deleteMany({ email: testEmail });

    console.log('\n==================================================');
    console.log(`TOTAL TESTS: ${total}`);
    console.log(`PASSED: ${passed}`);
    console.log(`FAILED: ${total - passed}`);
    console.log('==================================================\n');

    process.exit(total === passed ? 0 : 1);
  } catch (err) {
    console.error('Test Suite Exception:', err);
    process.exit(1);
  } finally {
    if (server) server.close();
    await mongoose.disconnect();
  }
}

runTests();
