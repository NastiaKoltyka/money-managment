import { UserCurrencyPipe } from './user-currency.pipe';

describe('UserCurrencyPipe', () => {

    it('should be created', () => {
        const pipe = new UserCurrencyPipe();
        expect(pipe).toBeTruthy();
    });

    it('should transform UAH ', () => {
        const pipe = new UserCurrencyPipe();
        let result = pipe.transform(100, 'UAH');
        expect(result).toEqual('100 ₴');
    });

    it('should transform EUR ', () => {
        const pipe = new UserCurrencyPipe();
        let result = pipe.transform(200, 'EUR');
        expect(result).toEqual('200 €');
    });

    it('should transform USD ', () => {
        const pipe = new UserCurrencyPipe();
        let result = pipe.transform(300, 'USD');
        expect(result).toEqual('300 $');
    });

    it('shouldn\'t transform Bitcoin ', () => {
        const pipe = new UserCurrencyPipe();
        let result = pipe.transform(400, 'Bitcoin');
        expect(result).toEqual('400 Bitcoin');
    });
});
