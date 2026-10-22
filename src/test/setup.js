// DOM matchers and browser APIs used by route and interaction tests.
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup, configure } from "@testing-library/react";
configure({ asyncUtilTimeout: 15000 });
afterEach(() => {
  cleanup();
  localStorage.clear();
});
window.scrollTo = vi.fn();
HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
};
HTMLDialogElement.prototype.close = function () {
  this.open = false;
};
