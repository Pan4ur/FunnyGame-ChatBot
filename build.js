const { compile } = require("nexe");
const pack = require("./package.json");
const fs = require("fs");

["linux", "windows"].forEach((os) => {
	build(`${os}-x64`);
});

function build(platform) {
	compile({
		input: "cli.js",
		resources: ["node_modules/discord.js/src"],
		name: `build/funnybot-${platform}-${pack.version}`,
		target: `${platform}-14.15.3`
	});
}
