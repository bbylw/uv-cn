const port = Number(process.env.PORT ?? 8080);
const dist = new URL("./dist/", import.meta.url);

const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);
    const candidate = pathname === "/" ? "/index.html" : pathname;

    if (candidate.includes("..")) {
      return new Response("Not found", { status: 404 });
    }

    const file = Bun.file(new URL(`.${candidate}`, dist));
    if (await file.exists()) {
      return new Response(file);
    }

    if (request.headers.get("accept")?.includes("text/html")) {
      return new Response(Bun.file(new URL("./index.html", dist)), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`uv site running at ${server.url}`);
