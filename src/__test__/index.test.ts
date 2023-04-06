import { almost } from "../index";

describe("almost compare", () => {
  it("almost.less", () => {
    const a = 0.1;
    const b = 0.2;
    const expection = 0.3;

    // a + b => 0.30000000000000004
    expect(almost.equal(a + b, expection)).toBeTruthy();

    expect(expection < a + b).toBeTruthy(); // bug
    expect(almost.less(a + b, expection)).toBeFalsy();
    expect(almost.less(1, 2)).toBeTruthy();
  });

  it("almost.greater", () => {
    const a = 0.1;
    const b = 0.7;
    const expection = 0.8;

    // a + b => 0.7999999999999999
    expect(almost.equal(a + b, expection)).toBeTruthy();

    expect(a + b < expection).toBeTruthy(); // bug
    expect(almost.greater(a + b, expection)).toBeFalsy();
    expect(almost.greater(2, 1)).toBeTruthy();
  });

  type KeyValue = {
    key: number;
    value: number;
  };

  it("js sort test1, stable", () => {
    const array = Array.from({ length: 1000 }).map(
      (_, i): KeyValue => ({ key: 1, value: i })
    );
    const sortedArray = array.sort((a, b) => a.key - b.key);
    expect(isValueStable(sortedArray)).toBeTruthy();
  });

  it("js sort test2, floatKeyArray", () => {
    const floatKeyArray = Array.from({ length: 1000 }).map(
      (_, i): KeyValue => ({ key: 0.2 + 0.1 * i - 0.1 * i, value: i })
    );
    const sortedArray = floatKeyArray.sort((a, b) => a.key - b.key);
    expect(isValueStable(sortedArray)).toBeFalsy();
  });

  it("almost.compare", () => {
    const floatKeyArray = Array.from({ length: 1000 }).map(
      (_, i): KeyValue => ({ key: 0.2 + 0.1 * i - 0.1 * i, value: i })
    );

    const almostSortedArray = floatKeyArray.sort((a, b) => {
      return almost.compare(a.key, b.key);
    });
    expect(isValueStable(almostSortedArray)).toBeTruthy();

    const almostSortedArrayFloat = floatKeyArray.sort((a, b) => {
      return almost.compare(a.key, b.key, almost.DBL_EPSILON);
    });
    expect(isValueStable(almostSortedArrayFloat)).toBeFalsy();
  });

  function isValueStable(array: KeyValue[]) {
    return array.every((value, index, arr) => {
      if (index === 0) return true;
      const prev = arr[index - 1];
      const cur = value;
      return prev.value < cur.value;
    });
  }
});
