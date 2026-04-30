import { CalendarIcon } from "lucide-solid";
import type { Component } from "solid-js";
import { createSignal, splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";
import { Button } from "./button.js";
import { Calendar } from "./calendar.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";

export type DatePickerProps = {
  class?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: (date: Date) => string;
};

const defaultFormat = (date: Date) =>
  date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export const DatePicker: Component<DatePickerProps> = (props) => {
  const [local] = splitProps(props, [
    "class",
    "selected",
    "onSelect",
    "placeholder",
    "disabled",
    "format",
  ]);

  const [open, setOpen] = createSignal(false);
  const fmt = () => local.format ?? defaultFormat;

  return (
    <Popover open={open()} onOpenChange={setOpen}>
      <PopoverTrigger
        as={Button}
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !local.selected && "text-muted-foreground",
          local.class,
        )}
        disabled={local.disabled}
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {local.selected ? fmt()(local.selected) : (local.placeholder ?? "Pick a date")}
      </PopoverTrigger>
      <PopoverContent showClose={false} class="w-auto p-0">
        <Calendar
          {...(local.selected !== undefined ? { selected: local.selected } : {})}
          onSelect={(date) => {
            local.onSelect?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
