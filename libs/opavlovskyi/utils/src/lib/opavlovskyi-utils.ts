/* eslint-disable @typescript-eslint/ban-types */

export function microtask(): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      queueMicrotask(() => originalMethod.apply(this, args))
    };
  };
}

export function timeout(duration?: number): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      setTimeout(() => originalMethod.apply(this, args), duration)
    };
  };
}
