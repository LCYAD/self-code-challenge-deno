import sinon from "https://cdn.skypack.dev/sinon@11.1.2?dts";

export const set = sinon.stub();
export const get = sinon.stub();
export const connect = sinon.stub().returns({
  get,
  set,
});
