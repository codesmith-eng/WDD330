const { describe, expect, test } = require("@jest/globals");
const fs = require("node:fs");
const path = require("node:path");

const tents = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../public/json/tents.json"), "utf8"),
);

describe("tent product images", () => {
  test.each(tents)("$Id references an available image", ({ Image }) => {
    const imagePath = path.resolve(__dirname, "../public/json", Image);

    expect(fs.existsSync(imagePath)).toBe(true);
  });
});
