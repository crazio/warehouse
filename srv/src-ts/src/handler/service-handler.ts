import { ServiceImpl } from '@sap/cds/apis/services';
import { Request } from '../common/types/types';
import { injectable } from 'inversify';
import Service from './service';

@injectable()
export default abstract class ServiceHandler<S extends Service> {
    private _srvImpl: S;
    protected abstract readonly _impl: ServiceImpl;

    public execWithReq(req: Request) {
        this._srvImpl.setReq(req);
        return this.exec();
    }

    public exec() {
        return this._srvImpl;
    }

    public get impl() {
        return this._impl;
    }

    constructor(srvImpl: S) {
        this._srvImpl = srvImpl;
    }

}