import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path  from 'path';
import {fileURLToPath} from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js'
import {register} from './controllers/auth.js';


// Load configuration

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyparser.json({limit: "30mb", extended: true}));
app.use(bodyparser.urlencoded({limit: "30mb", extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//file storage
const fileStorageEngin = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: fileStorageEngin});

// Routes with authentication
app.post("auth/register", upload.single('picture'), register);

// Routes without authentication
app.use('/auth', authRoutes);

app.use




// MongoDB setup
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONDODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch((err) => console.log(`did not connect to ${err}`));