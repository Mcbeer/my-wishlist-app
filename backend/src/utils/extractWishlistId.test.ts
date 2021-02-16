import { extractWishlistId } from "./extractWishlistId";

describe("extractWishlistId", () => {
  describe("Where the passed value is a string, without the # sign (aka invalid string)", () => {
    let result: string | null;
    beforeEach(() => {
      const inputString = "FooBar";

      result = extractWishlistId(inputString);
    });

    it("Should return null", () => {
      expect(result).toEqual(null);
    });
  });
  describe("Where the passed value is a string, with the # sign", () => {
    let result: string | null;
    beforeEach(() => {
      const inputString = "WISH#FooBar";

      result = extractWishlistId(inputString);
    });

    it("Should return the string 'Foobar'", () => {
      expect(result).toEqual("FooBar");
      expect(result).not.toBe(null);
    });

    it("Should not contain the # symbol", () => {
      expect(result?.includes("#")).toBe(false);
    });
  });
});
