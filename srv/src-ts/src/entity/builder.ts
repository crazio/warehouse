import { injectable } from 'inversify';

@injectable()
class Builder<T, E> {

    protected entity: Partial<T> = {};

    constructor(private entityType: new (...arg) => E) { }

    public withCopy(entity: Partial<T>) {
        this.entity = { ...entity };
        return this;
    }

    public build() {
        return new this.entityType(this.entity);
    }

}

export default Builder;