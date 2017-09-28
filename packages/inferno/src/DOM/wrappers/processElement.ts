/**
 * @module Inferno
 */ /** TypeDoc Comment */

import { isNullOrUndef } from "inferno-shared";
import VNodeFlags from "inferno-vnode-flags";
import {IV} from "../../core/implementation";
import { isCheckedType, processInput } from "./InputWrapper";
import { processSelect } from "./SelectWrapper";
import { processTextarea } from "./TextareaWrapper";

/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */

export function processElement(
  flags: number,
  iv: IV,
  dom: Element,
  nextPropsOrEmpty,
  mounting: boolean,
  isControlled: boolean
): void {
  if ((flags & VNodeFlags.InputElement) > 0) {
    processInput(iv, dom, nextPropsOrEmpty, mounting, isControlled);
  } else if ((flags & VNodeFlags.SelectElement) > 0) {
    processSelect(iv, dom, nextPropsOrEmpty, mounting, isControlled);
  } else if ((flags & VNodeFlags.TextareaElement) > 0) {
    processTextarea(iv, dom, nextPropsOrEmpty, mounting, isControlled);
  }
}

export function isControlledFormElement(nextPropsOrEmpty): boolean {
  return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type)
    ? !isNullOrUndef(nextPropsOrEmpty.checked)
    : !isNullOrUndef(nextPropsOrEmpty.value);
}
