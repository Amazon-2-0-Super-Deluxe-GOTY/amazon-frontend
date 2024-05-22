import { useMemo, useState } from "react";

export interface CheckboxArrayElement<TValue> {
  value: TValue;
  checked: boolean;
}

export function createCheckboxArray<TValue>(
  data: TValue[]
): CheckboxArrayElement<TValue>[] {
  return data.map((value) => ({ value, checked: false }));
}

export function useCheckboxArray<TValue>(
  initialArray: CheckboxArrayElement<TValue>[],
  compare: (first: TValue, second: TValue) => boolean = Object.is
) {
  const [array, setArray] = useState(initialArray);

  const isAllChecked = useMemo<boolean | "indeterminate">(() => {
    const hasTrue = array.some((v) => v.checked === true);
    const hasFalse = array.some((v) => v.checked === false);
    return hasTrue && hasFalse
      ? "indeterminate"
      : array.length === 0
      ? false
      : array.every((elem) => elem.checked);
  }, [array]);

  return {
    array,
    setArray,
    changeChecked(
      elemToChange: CheckboxArrayElement<TValue>,
      checked: boolean
    ) {
      setArray((current) =>
        current.map((elem) =>
          compare(elem.value, elemToChange.value)
            ? { ...elemToChange, checked }
            : { ...elem }
        )
      );
    },
    append(value: TValue) {
      setArray((current) => [...current, { value, checked: false }]);
    },
    appendMany(values: TValue[]) {
      setArray((current) => [
        ...current,
        ...values.map((value) => ({ value, checked: false })),
      ]);
    },
    remove(value: TValue) {
      setArray((current) =>
        current.filter((elem) => !compare(elem.value, value))
      );
    },
    removeMany(values: TValue[]) {
      setArray((current) =>
        current.filter(
          (elem) => !values.some((values) => compare(elem.value, values))
        )
      );
    },
    getCheckedElements() {
      return array.filter((v) => v.checked).map((v) => v.value);
    },
    isAllChecked,
    changeAllChecked(checked: boolean) {
      setArray((current) => current.map((elem) => ({ ...elem, checked })));
    },
    toggleChecked(elemToChange: CheckboxArrayElement<TValue>) {
      setArray((current) =>
        current.map((elem) =>
          compare(elem.value, elemToChange.value)
            ? { ...elemToChange, checked: !elem.checked }
            : { ...elem }
        )
      );
    },
    toggleAllChecked() {
      const newChecked =
        isAllChecked === "indeterminate" ? true : !isAllChecked;
      setArray((current) =>
        current.map((elem) => ({ ...elem, checked: newChecked }))
      );
    },
  };
}
