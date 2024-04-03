const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    accessKeyId: `${process.env.REACT_APP_S3_ACCESS_KEY}`,
    secretAccessKey: `${process.env.REACT_APP_S3_SECRET_ACCESS_KEY}`,
    region: `${process.env.REACT_APP_S3_REGION}`
});

const s3 = new AWS.S3();

async function uploadPhotoToS3(file) {
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!['.jpeg', '.png', '.jpg'].includes(fileExtension)) {
        alert('jpeg, png, jpg 파일만 업로드가 가능합니다.');
        return;
    }

    const randomName = uuidv4();
    const keyName = `${randomName}${fileExtension}`;

    const params = {
        Bucket: "camp-daddy-bucket",
        Key: keyName,
        Body: file, // Blob 객체를 사용하여 파일 스트림 생성
        // ACL: 'public-read' // 파일에 대한 액세스 권한 설정 (public-read는 공개 읽기 권한)
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location; // 업로드된 파일의 URL 반환
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

module.exports = {
    uploadPhotoToS3
};
