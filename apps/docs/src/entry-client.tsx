// @refresh reload
import { StartClient, mount } from "@solidjs/start/client";

// biome-ignore lint/style/noNonNullAssertion: app root always exists
mount(() => <StartClient />, document.getElementById("app")!);
