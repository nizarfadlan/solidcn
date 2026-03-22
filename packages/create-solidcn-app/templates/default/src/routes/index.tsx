import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <Title>My solidcn App</Title>

      <div class="text-center space-y-3">
        <h1 class="text-4xl font-bold tracking-tight">
          Welcome to{" "}
          <span class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            solidcn
          </span>
        </h1>
        <p class="text-muted-foreground">
          Add your first component:{" "}
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
            npx solidcn@latest add button
          </code>
        </p>
      </div>
    </main>
  );
}
