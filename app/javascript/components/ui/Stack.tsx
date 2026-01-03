import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { classNames } from "$app/utils/classNames";

type StackProps = React.PropsWithChildren<{
  className?: string | undefined;
  asChild?: boolean;
  borderless?: boolean;
}> &
  React.HTMLAttributes<HTMLElement>;

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, asChild, borderless = false, children, ...rest }, ref) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={ref}
        className={classNames(
          "stack-component grid divide-y divide-solid divide-border rounded border border-border bg-background",
          borderless && "gap-4 border-none [&>*]:border-none [&>*]:p-0",
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Stack.displayName = "Stack";

type StackItemProps = React.PropsWithChildren<{
  className?: string | undefined;
  asChild?: boolean;
  details?: boolean;
}> &
  React.HTMLAttributes<HTMLElement>;

export const StackItem = React.forwardRef<HTMLDivElement, StackItemProps>(
  ({ className, asChild, details, children, ...rest }, ref) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={ref}
        className={classNames("flex flex-wrap items-center justify-between gap-4 p-4", details && "block", className)}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

StackItem.displayName = "StackItem";
