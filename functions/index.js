const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Firebase 초기화
admin.initializeApp();

// JSON 데이터 가져오기
app.get('/getJsonData', async (req, res) => {
  try {
    const bucket = admin.storage().bucket(); // Firebase Storage 버킷 객체 생성
    const file = bucket.file('json/noteboard-data.json'); // JSON 파일 경로

    const [data] = await file.download();
    const jsonData = JSON.parse(data.toString());
    res.json(jsonData);
  } catch (error) {
    console.error('JSON 데이터 가져오기 실패:', error);
    res.status(500).json({ error: 'JSON 데이터 가져오기 실패' });
  }
});

// Cloud Function 익스포트
exports.getJsonData = functions.https.onRequest(app);
