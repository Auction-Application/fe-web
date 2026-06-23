import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
} from '@angular/forms';

export type FormValue<T> = {
  [K in keyof T]: T[K] extends FormControl<infer U>
    ? U
    : T[K] extends FormGroup<infer U>
      ? FormValue<U>
      : T[K] extends FormArray<infer A>
        ? A extends AbstractControl
          ? FormArrayValue<A>[]
          : never
        : T[K] extends FormRecord<infer U>
          ? Record<string, FormValue<U>>
          : never;
};

export type FormArrayValue<T extends AbstractControl> =
  T extends FormControl<infer U>
    ? U
    : T extends FormGroup<infer U>
      ? FormValue<U>
      : T extends FormArray<infer A>
        ? FormArrayValue<A>[]
        : T extends FormRecord<infer R>
          ? Record<string, FormValue<R>>
          : never;
