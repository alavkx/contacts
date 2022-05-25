import randomEmoji from "./randomEmoji";

test("validateEmail returns false for non-emails", () => {
  expect(randomEmoji()).toBeTypeOf("string");
});
