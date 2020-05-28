import { injectable } from 'inversify';
import { Request } from '../common/types/types';

@injectable()
export default class Service {

    private _req: Request | undefined;

    public setReq(req: Request) {
        this._req = req;
    }

    public get req() {
        return this._req;
    }

}