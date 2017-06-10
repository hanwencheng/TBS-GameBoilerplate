import _ from 'lodash';
import moment from 'moment';

// :: a -> F a
class Maybe {
  constructor(x) {
    this._value = x
  }

  static of = (x) => new Maybe(x)

  // :: F a -> Boolean
  isNothing (){
    return  (this._value === null || this._value === undefined);
  }

  // :: F a -> f -> F b
  map (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this._value));
  }

  // :: F a -> String
  toString () {
    return `Maybe(${this._value})`;
  }
}

class Left {
  constructor (x) {
    this._value = x
  }

  static of (x) {
    return new Left(x)
  }

  map (f) {
    return this;
  }
}

class Right {
  constructor (x) {
    this._value = x
  }

  static of (x) {
    return new Right(x)
  }

  map (f) {
    return Right.of(f(this._value));
  }
}

class IO {
  constructor (f) {
    this._value = f;
  }

  static of (f) {
    return new IO(() => f)
  }

  map (f) {
    return new IO(compose(f, this._value));
  };

  run () {
    return this._value();
  }
}

const either = f => g => e => {
  switch (e.constructor){
    case Left  : return f(e._value);
    case Right : return g(e._value);
    default :    return f(e._value);
  }
}

const getFromStorage = key => {
  return () => localStorage[key];
}

const compose = (...args) => initial => args.reduceRight(
  (result, fn) => fn(result),
  initial
);

var add5 = x => x + 5

var c5  = Maybe.of(3)

var url = new IO(function() {
  return window.location.href;
});

var toPairs = compose(_.map(_.split('=')), _.split('&'));


console.log(c5.map(add5));

export {
  Maybe as default,
  Left,
  Right,
  either
};
