import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fetchPageData } from './functions/fetchData';
import { MetaTag } from './functions/cheerio';

dotenv.config();

const app: Express = express();
const port = process.env.PORT||3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.static(path.join(__dirname, '../cli/dist')));

app.post('/api/matetags', async (req: Request, res: Response) => {
    let { data } = req.body;
    try {
        let pageinfo: string = await fetchPageData(data);
        let tags = await MetaTag(pageinfo);
        await res.send(tags);
    } catch (error) {
        res.send({ error })
    }

});

app.get("*", function (_: Request, res: Response) {
    res.sendFile(
        path.join(__dirname, '../cli/dist'),
        function (err) {
            res.status(500).send(err);
        }
    );
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});