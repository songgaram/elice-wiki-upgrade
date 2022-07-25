import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3()

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'elicewiki', // 생성한 버킷 이름을 적어주세요.
        key: (req, file, callback) => {
            const uploadDirectory = req.query.directory ?? '' // 업로드할 디렉토리를 설정하기 위해 넣어둔 코드로, 없어도 무관합니다.
            const extension = path.extname(file.originalname)
            if (!allowedExtensions.includes(extension)) { // extension 확인을 위한 코드로, 없어도 무관합니다.
                return callback(new Error('wrong extension'))
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
        },
        acl: 'public-read-write'
    }),
})

export default imageUploader