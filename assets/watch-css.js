const chokidar = require("chokidar");
const { execSync } = require("child_process");

// Exit the process when standard input closes due to:
//   https://hexdocs.pm/elixir/1.10.2/Port.html#module-zombie-operating-system-processes
//
process.stdin.on("end", function() {
  process.exit();
});

process.stdin.resume();

// Initialize watcher.
const watcher = chokidar.watch("css/*.?(s)css");

// After initial build.
watcher.on("ready", () => {
  compile(", watching for changes...")

  // Set up chokidar to watch all (s)css files and build app.css ignoring process errors
  watcher.on("all", (event, path) => {
    console.log(`[watch:css] build started (${event}: "${path}")`);
    compile();
  });
});

function compile(message = "") {
  const output = "../priv/static/assets/app.css";

  try {
    execSync(`./node_modules/.bin/sass css/app.scss ${output} --embed-source-map`);
    execSync(`./node_modules/.bin/postcss ${output} --replace --use autoprefixer`);
  } catch (error) {
  } finally {
    console.log(`[watch:css] build finished${message}`);
  }
};
