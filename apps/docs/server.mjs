import { createServer } from "node:http";

const portEqArg = process.argv.find((arg) => arg.startsWith("--port="));
const portPos = process.argv.indexOf("--port");
const port = Number(
  portEqArg?.split("=")[1] ??
    (portPos >= 0 ? process.argv[portPos + 1] : undefined) ??
    process.env.PORT ??
    "3000"
);

function renderPage(title) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FLUID Docs - ${title}</title>
  </head>
  <body>
    <main>
      <h1>${title}</h1>
      <section><h2>Default</h2></section>
      <section><h2>Variants</h2></section>
      <section><h2>Disabled</h2></section>
      <section><h2>Theming</h2></section>
      <section><h2>Accessibility</h2></section>
    </main>
  </body>
</html>`;
}

const routeTitle = {
  "/": "Button",
  "/components/button": "Button",
  "/components/icon-button": "IconButton",
  "/components/input": "Input",
  "/components/textarea": "Textarea",
  "/components/select": "Select",
  "/components/checkbox": "Checkbox",
  "/components/radio-group": "RadioGroup",
  "/components/switch": "Switch",
  "/components/card": "Card",
  "/components/modal": "Modal"
};

const server = createServer((req, res) => {
  if (!req.url) {
    res.statusCode = 400;
    res.end("Bad Request");
    return;
  }

  const title = routeTitle[req.url];
  if (title) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(renderPage(title));
    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(port, () => {
  process.stdout.write(`docs server listening on ${port}\n`);
});
