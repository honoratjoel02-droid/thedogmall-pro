import { describe, it, expect, beforeEach } from "vitest";

import {
  hasPassword,
  setPassword,
  verifyPassword,
  isUnlocked,
  markUnlocked,
  lock,
} from "./auth";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe("password lifecycle", () => {
  it("reports no password set initially", () => {
    expect(hasPassword()).toBe(false);
  });

  it("reports a password set after setPassword", async () => {
    await setPassword("Chiot2024");

    expect(hasPassword()).toBe(true);
  });

  it("verifies the correct password and rejects an incorrect one", async () => {
    await setPassword("Chiot2024");

    expect(await verifyPassword("Chiot2024")).toBe(true);
    expect(await verifyPassword("WrongPassword")).toBe(false);
  });

  it("returns false when verifying with no password set", async () => {
    expect(await verifyPassword("anything")).toBe(false);
  });

  it("stores salt and hash as base64, not the plaintext password", async () => {
    await setPassword("Chiot2024");

    const raw = localStorage.getItem("thedogmall.auth");

    expect(raw).not.toBeNull();
    expect(raw).not.toContain("Chiot2024");

    const stored = JSON.parse(raw!);
    expect(stored.salt).toBeTruthy();
    expect(stored.hash).toBeTruthy();
  });
});

describe("unlocked session state", () => {
  it("starts locked", () => {
    expect(isUnlocked()).toBe(false);
  });

  it("becomes unlocked after markUnlocked and re-locks after lock()", () => {
    markUnlocked();
    expect(isUnlocked()).toBe(true);

    lock();
    expect(isUnlocked()).toBe(false);
  });
});
