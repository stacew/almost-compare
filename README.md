# almost-compare

`This package provides utility functions for comparing floating-point numbers with a default tolerance value of the floating-point epsilon.`

[![NPM](https://img.shields.io/npm/v/almost-compare.svg)](https://www.npmjs.com/package/almost-compare)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save almost-compare
```

## Usage

```ts
import { almost } from "almost-compare";

const floatKeyArray = Array.from({ length: 1000 }).map(
  (_, i): KeyValue => ({ key: 0.2 + 0.1 * i - 0.1 * i, value: i })
);

const almostSortedArray = floatKeyArray.sort((a, b) => {
  return almost.compare(a.key, b.key);
});
expect(isValueStable(almostSortedArray)).toBeTruthy();
```

```ts
const a = 0.1;
const b = 0.2;
const expection = 0.3;

// a + b => 0.30000000000000004
expect(almost.equal(a + b, expection)).toBeTruthy();
expect(almost.less(a + b, expection)).toBeFalsy();

expect(almost.less(1, 2)).toBeTruthy();
```

```ts
const a = 0.1;
const b = 0.7;
const expection = 0.8;

// a + b => 0.7999999999999999
expect(almost.equal(a + b, expection)).toBeTruthy();
expect(almost.greater(a + b, expection)).toBeFalsy();

expect(almost.greater(2, 1)).toBeTruthy();
```

- compare: compares two floating-point numbers and returns -1, 0, or 1 depending on whether the first number is less than, equal to, or greater than the second number.

- greater: checks if one floating-point number is greater than another with respect to the default tolerance value.

- less: checks if one floating-point number is less than another with respect to the default tolerance value.

- equal: checks if two floating-point numbers are equal with respect to the default tolerance value.

## License

MIT © [stacew](https://github.com/stacew)
