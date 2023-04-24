import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 3) {
        this.push(null);
      } else {
        const buff = Buffer.from(String(i));
        this.push(buff);
      }
    }, 500);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
  // headers: {
  //   "Content-Type": "application/octet-stream",
  // },
})
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    console.log(text);
  });
