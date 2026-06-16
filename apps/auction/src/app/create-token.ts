import { InjectionToken } from '@angular/core';

export function createTokenFromFactory<T>(
  factory: () => T,
  description = '',
): InjectionToken<T> {
  return new InjectionToken<T>(description, { factory });
}
