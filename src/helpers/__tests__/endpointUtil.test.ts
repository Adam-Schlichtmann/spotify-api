import test from "ava";
import { cleanParams, fillInEndpoint } from "../endpointUtils";

// fillInEndpoint Tests
test("Should replace a single value", (t) => {
  t.is(fillInEndpoint("/v1/tracks/{id}", { id: "123" }), "/v1/tracks/123");
});

test("Should replace multiple values", (t) => {
  t.is(
    fillInEndpoint("/v1/tracks/{id}/{name}", { id: 123, name: "Donatello" }),
    "/v1/tracks/123/Donatello"
  );
});

test("Endpoint should remain untouched", async (t) => {
  t.is(fillInEndpoint("/v1/tracks", { track_id: "123" }), "/v1/tracks");
});

test("Endpoint should throw Error", async (t) => {
  t.throws(() => fillInEndpoint("/v1/tracks/{track_id}"));
});

// fillInEndpoint Tests
test("Should Remove key that is in endpoint", (t) => {
  t.deepEqual(cleanParams("/v1/tracks/{id}", { a: 1, b: "test", id: 123 }), {
    a: 1,
    b: "test",
  });
});

test("Should Remove multiple keys that are in the nedpoint", (t) => {
  t.deepEqual(
    cleanParams("/v1/tracks/{id}/hi/{name}", {
      a: 1,
      b: "test",
      id: 123,
      name: "Donatello",
    }),
    {
      a: 1,
      b: "test",
    }
  );
});

test("Should not remove anything", (t) => {
  t.deepEqual(cleanParams("/v1/tracks", { a: 1, b: "test", id: 123 }), {
    a: 1,
    b: "test",
    id: 123,
  });
});
