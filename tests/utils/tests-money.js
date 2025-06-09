import { currencyFormatter } from "../../Scripts/utils/money.js";

describe("Currency Test_suite", () => {
    it("converts cents to dollars", () => {
        expect(currencyFormatter(2025)).toEqual("20.25");
    });

    it('works with 0: ', () => {
        expect(currencyFormatter(0)).toEqual('0.00');
    });

    it('works with negative numbers: ', () => {
        expect(currencyFormatter(-2025)).toEqual('-20.25');
    });
    // it('edge cases', () => {
    //     expect(currencyFormatter(1234567890).toEqual('1,234,567.89'))
    // })
    it('works with rounding centsL ', () => {
        expect(currencyFormatter(2000.4)).toEqual('20.00')
    })
});


