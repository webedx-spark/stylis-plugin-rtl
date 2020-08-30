// @flow
import { compile, middleware, serialize, stringify } from "stylis";
import stylisRtlPlugin from "./stylis-rtl";

const stylis = (css) =>
  serialize(compile(css), middleware([stylisRtlPlugin, stringify]));

describe("integration test with stylis", () => {
  it("flips simple rules", () => {
    expect(
      stylis(
        `.a {
          padding-left: 5px;
          margin-right: 5px;
          border-left: 1px solid red;
        }
      `
      )
    ).toMatchInlineSnapshot(
      `".a{padding-right:5px;margin-left:5px;border-right:1px solid red;}"`
    );
  });

  it("flips shorthands", () => {
    expect(
      stylis(
        `.a {
          padding: 0 5px 0 0;
          margin: 0 0 0 5px;
        }
        `
      )
    ).toMatchInlineSnapshot(`".a{padding:0 0 0 5px;margin:0 5px 0 0;}"`);
  });

  it("handles noflip directives", () => {
    expect(
      stylis(
        `
          .a {
            /* @noflip */
            padding: 0 5px 0 0;
            margin: 0 0 0 5px;
          }
        `
      )
    ).toMatchInlineSnapshot(`".a{padding:0 5px 0 0;margin:0 5px 0 0;}"`);
  });

  it("flips keyframes", () => {
    expect(
      stylis(
        `@keyframes a {
          padding-left: 5px;
          margin-right: 5px;
          border-left: 1px solid red;
        }
      `
      )
    ).toMatchInlineSnapshot(
      `"@keyframes a{padding-right:5px;margin-left:5px;border-right:1px solid red;}"`
    );
  });

  it("flips media queries", () => {
    expect(
      stylis(
        `@media (min-width: 500px) {
          .a {
            padding-left: 5px;
            margin-right: 5px;
            border-left: 1px solid red;
          }
        }
      `
      )
    ).toMatchInlineSnapshot(
      `"@media (min-width: 500px){.a{padding-right:5px;margin-left:5px;border-right:1px solid red;}}"`
    );
  });
});
