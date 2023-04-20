import express from "express";
import cors from "cors";
// import { logger } from "./foxsaying.mjs";

const app = express();
app.use(cors());
export function logger(msg) {
  return function (target, key, descriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args) {
      console.log("[Log]", msg);
      return method.apply(this, args);
    };

    return descriptor;
  };
}

class SayFox {
  constructor(hello) {
    this.hello = hello;
  }

  // @logger("what does the fox saying")
  tellMe() {
    return "haki haki haki ho";
  }
}

app.get("/:text", (req, res) => {
  const { text } = req.params;
  const result = new SayFox(text);
  res.send(result);
});

app.listen(8000, () => console.log("# server On #"));
