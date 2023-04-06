export namespace almost {
  export const FLT_EPSILON = 1.1920929e-7;
  export const DBL_EPSILON = 2.2204460492503131e-16;

  export const equal = (
    a: number,
    b: number,
    epsilon: number = FLT_EPSILON
  ) => {
    if (Math.sign(a) === Math.sign(b)) return Math.abs(a - b) < epsilon;
    return Math.abs(a) - Math.abs(b) < epsilon;
  };

  export const less = (a: number, b: number, epsilon: number = FLT_EPSILON) =>
    equal(a, b, epsilon) ? false : a < b;

  export const greater = (
    a: number,
    b: number,
    epsilon: number = FLT_EPSILON
  ) => (equal(a, b, epsilon) ? false : a > b);

  export const compare = (
    a: number,
    b: number,
    epsilon: number = FLT_EPSILON
  ) => (equal(a, b, epsilon) ? 0 : a < b ? -1 : 1);
}
