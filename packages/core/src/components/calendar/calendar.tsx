import { ChevronLeft, ChevronRight } from "lucide-solid";
import type { Component } from "solid-js";
import { For, createMemo, createSignal, splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";
import { buttonVariants } from "../button/button.js";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type CalendarProps = {
  class?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  defaultMonth?: Date;
  disabled?: (date: Date) => boolean;
  mode?: "single" | "range";
};

export const Calendar: Component<CalendarProps> = (props) => {
  const [local] = splitProps(props, ["class", "selected", "onSelect", "defaultMonth", "disabled"]);

  const today = new Date();
  const [viewDate, setViewDate] = createSignal(local.defaultMonth ?? local.selected ?? today);

  const year = () => viewDate().getFullYear();
  const month = () => viewDate().getMonth();

  const days = createMemo(() => {
    const firstDay = new Date(year(), month(), 1).getDay();
    const daysInMonth = new Date(year(), month() + 1, 0).getDate();
    const daysInPrevMonth = new Date(year(), month(), 0).getDate();

    const cells: Array<{ date: Date; outside: boolean }> = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ date: new Date(year(), month() - 1, daysInPrevMonth - i), outside: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year(), month(), d), outside: false });
    }
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push({ date: new Date(year(), month() + 1, d), outside: true });
    }

    return cells;
  });

  const isSelected = (date: Date) =>
    local.selected ? date.toDateString() === local.selected.toDateString() : false;

  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  const prevMonth = () => setViewDate(new Date(year(), month() - 1, 1));
  const nextMonth = () => setViewDate(new Date(year(), month() + 1, 1));

  return (
    <div class={cn("p-3", local.class)}>
      <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div class="space-y-4">
          <div class="flex items-center justify-between pt-1 relative">
            <button
              type="button"
              onClick={prevMonth}
              class={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1",
              )}
              aria-label="Previous month"
            >
              <ChevronLeft class="h-4 w-4" />
            </button>
            <span class="text-sm font-medium mx-auto">
              {MONTHS[month()]} {year()}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              class={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1",
              )}
              aria-label="Next month"
            >
              <ChevronRight class="h-4 w-4" />
            </button>
          </div>

          <table class="w-full border-collapse space-y-1">
            <thead>
              <tr class="flex">
                <For each={DAYS}>
                  {(day) => (
                    <th class="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]">
                      {day}
                    </th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={Array.from({ length: 6 }, (_, i) => days().slice(i * 7, i * 7 + 7))}>
                {(week) => (
                  <tr class="flex w-full mt-2">
                    <For each={week}>
                      {({ date, outside }) => {
                        const isDisabled = () => local.disabled?.(date) ?? false;
                        return (
                          <td class="h-9 w-9 text-center text-sm p-0 relative">
                            <button
                              type="button"
                              onClick={() => !isDisabled() && local.onSelect?.(date)}
                              disabled={isDisabled()}
                              class={cn(
                                buttonVariants({ variant: "ghost" }),
                                "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                                outside && "text-muted-foreground opacity-50",
                                isSelected(date) &&
                                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                isToday(date) &&
                                  !isSelected(date) &&
                                  "bg-accent text-accent-foreground",
                                isDisabled() && "text-muted-foreground opacity-50",
                              )}
                              aria-selected={isSelected(date)}
                            >
                              {date.getDate()}
                            </button>
                          </td>
                        );
                      }}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
