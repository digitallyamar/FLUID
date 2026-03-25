import { createServer } from "node:http";

const portEqArg = process.argv.find((arg) => arg.startsWith("--port="));
const portPos = process.argv.indexOf("--port");
const port = Number(
  portEqArg?.split("=")[1] ??
    (portPos >= 0 ? process.argv[portPos + 1] : undefined) ??
    process.env.PORT ??
    "3000"
);

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FLUID Docs</title>
  </head>
  <body>
    <main>
      <h1>Button</h1>
      <section><h2>Default</h2></section>
      <section><h2>Variants</h2></section>
      <section><h2>Disabled</h2></section>
      <section><h2>Theming</h2></section>
      <section><h2>Accessibility</h2></section>
    </main>
  </body>
</html>`;

const server = createServer((req, res) => {
  if (!req.url) {
    res.statusCode = 400;
    res.end("Bad Request");
    return;
  }

  if (req.url === "/" || req.url === "/components/button") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(page);
    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(port, () => {
  process.stdout.write(`docs server listening on ${port}\n`);
});
