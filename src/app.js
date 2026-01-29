import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'

export const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));