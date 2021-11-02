import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import session from 'express-session';
import filestore from 'session-file-store';

const app = express();

/* Accept CORS */
app.use(cors({ credentials: true, origin: true }));
app.use(logger('dev'));

/* JSON Parse */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Enable Session */
const FileStore = filestore(session); // save session on file
app.use(session({
        secret: 'foobar',
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
        cookie: { secure: false, maxAge: 86400 }
}));

export default app;