#!/usr/bin/env node
import { Command } from "commander";
import { addCommand } from "./commands/add.js";
import { initCommand } from "./commands/init.js";
import { listCommand } from "./commands/list.js";
import { mcpCommand } from "./commands/mcp.js";
import { registryAddCommand } from "./commands/registry/add.js";
import { registryBuildCommand } from "./commands/registry/build.js";
import { registryCreateCommand } from "./commands/registry/create.js";
import { searchCommand } from "./commands/search.js";
import { viewCommand } from "./commands/view.js";

const program = new Command();

program.name("solidcn").description("Add SolidJS components to your project").version("0.0.1");

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(viewCommand);
program.addCommand(searchCommand);
program.addCommand(listCommand);
program.addCommand(mcpCommand);

const registry = new Command("registry").description("Manage component registries");
registry.addCommand(registryAddCommand);
registry.addCommand(registryBuildCommand);
registry.addCommand(registryCreateCommand);
program.addCommand(registry);

program.parse();
