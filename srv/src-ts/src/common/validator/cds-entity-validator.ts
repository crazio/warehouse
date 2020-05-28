import { injectable } from 'inversify';
import { validateOrReject } from 'class-validator';

@injectable()
class CdsEntityValidator {

    public async validate(entity: Object) {
        await validateOrReject(entity);
    }

}

export default CdsEntityValidator;