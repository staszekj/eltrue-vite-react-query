export interface IMyFun {
  fun1(x: string): void;
}

// function mydecorator(value: string) {
//   return function (
//     target: IMyFun,
//     propertyKey: keyof IMyFun,
//     desc: PropertyDescriptor,
//   ) {
//     target[propertyKey](value);
//   };
// }

// export class MyFun implements IMyFun {
//   constructor(value: string) {
//     console.log('!!! Constructor', { value });
//   }
//   @mydecorator('myValue')
//   public fun1(firstArg: string) {
//     console.log('!!! Argument 1', firstArg);
//   }
//   public fun2() {}
// }

type SimpleFn = () => void;

function logMethod() {
  return function loggedMethod(
    originalMethod: SimpleFn,
    context: ClassMethodDecoratorContext<unknown, SimpleFn>,
  ) {
    console.log('!!!logMethod', context);
    return function replacementMethod(this: undefined) {
      console.log('LOG: Entering method.');
      originalMethod.call(this);
      console.log('LOG: Exiting method.');
    };
  };
}

export class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @logMethod()
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}
const p = new Person('Ron');
p.greet();

export function testFun(): number {
  let x;
  return (x = 11), 2, x;
}

console.log('Module is loaded');

// const formatMetadataKey = Symbol("format");
// function format(formatString: string) {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
//   return Reflect.metadata(formatMetadataKey, formatString);
// }
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function getFormat(target: any, propertyKey: string) {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
//   return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
// }

// class Greeter {
//   @format("Hello, %s")
//   greeting: string;
//   constructor(message: string) {
//     this.greeting = message;
//   }
//   greet() {
//     const formatString = getFormat(this, "greeting");
//     return formatString.replace("%s", this.greeting);
//   }
// }

export const greet = (name: string) => {
  const result = `Hello, ${name}! Welcome to the About Page.`;
  console.log(result);
  return result;
};

export const getInfo = () => {
  return 'This is some information from the About module.';
};
