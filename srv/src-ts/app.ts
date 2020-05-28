import express from 'express';
import { Application } from 'express';
import cds from '@sap/cds';
import * as path from 'path';
import { ServeOption } from './src/common/types/types';
import { Folder } from './src/common/constants';

class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.connectToDb();
        this.setStatic();
    }

    public listen(port: number | string) {
        return this.app.listen(port);
    }

    private async connectToDb() {
        await cds.connect.to('db');
    }

    public async serveImpl(srvOptions: ServeOption[]) {
        await cds.serve('all').in(this.app);
        srvOptions.forEach((option: ServeOption) => {
            cds.services[option.name]?.impl(option.impl);
        });
    }

    private setStatic() {
        this.app.use(express.static(
            path.join(path.resolve(__dirname, '..'), Folder.app)
        ));
    }
}

export default App;
