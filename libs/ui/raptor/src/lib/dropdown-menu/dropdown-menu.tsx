'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '@libs/utils';

/* ---------------------------------- Types ---------------------------------- */

interface DropdownMenuProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  /**
   * Size of the dropdown menu
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Placement of the dropdown menu
   */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

type DropdownMenuContextType = {
  size: 'sm' | 'md' | 'lg';
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
};

/* ---------------------------------- Styles --------------------------------- */

const styles = {
  base: {
    content:
      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral300 bg-white p-1 text-neutral800 shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    item: 'relative flex cursor-default select-none items-center rounded-sm outline-none transition-colors focus:bg-neutral100 focus:text-neutral800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    checkboxItem:
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none transition-colors focus:bg-neutral100 focus:text-neutral800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    radioItem:
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none transition-colors focus:bg-neutral100 focus:text-neutral800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    label: 'px-2 py-1.5 text-sm font-semibold text-neutral600',
    separator: '-mx-1 my-1 h-px bg-neutral200',
    shortcut: 'ml-auto text-xs tracking-widest text-neutral500',
    subTrigger:
      'flex cursor-default select-none items-center rounded-sm outline-none focus:bg-neutral100 data-[state=open]:bg-neutral100',
  },
  size: {
    content: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    item: {
      sm: 'px-1.5 py-1 text-xs',
      md: 'px-2 py-1.5 text-sm',
      lg: 'px-2.5 py-2 text-base',
    },
    checkboxItem: {
      sm: 'py-1 pl-6 pr-1.5 text-xs',
      md: 'py-1.5 pl-8 pr-2 text-sm',
      lg: 'py-2 pl-10 pr-2.5 text-base',
    },
    radioItem: {
      sm: 'py-1 pl-6 pr-1.5 text-xs',
      md: 'py-1.5 pl-8 pr-2 text-sm',
      lg: 'py-2 pl-10 pr-2.5 text-base',
    },
    label: {
      sm: 'px-1.5 py-1 text-xs',
      md: 'px-2 py-1.5 text-sm',
      lg: 'px-2.5 py-2 text-base',
    },
    icon: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
    subTrigger: {
      sm: 'px-1.5 py-1 text-xs',
      md: 'px-2 py-1.5 text-sm',
      lg: 'px-2.5 py-2 text-base',
    },
  },
};

/* --------------------------------- Context --------------------------------- */

const DropdownMenuContext = React.createContext<DropdownMenuContextType>({
  size: 'md',
  placement: 'bottom-start',
});

/* -------------------------------- Components ------------------------------- */

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>((props, ref) => {
  const { children, size = 'md', placement = 'bottom-start', ...rootProps } = props;

  const contextValue = React.useMemo(
    () => ({
      size,
      placement,
    }),
    [size, placement]
  );

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <DropdownMenuPrimitive.Root {...rootProps}>{children}</DropdownMenuPrimitive.Root>
    </DropdownMenuContext.Provider>
  );
});
DropdownMenu.displayName = DropdownMenuPrimitive.Root.displayName;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const size = context.size || 'md';

  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        styles.base.subTrigger,
        styles.size.subTrigger[size],
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className={cn('ml-auto', styles.size.icon[size])} />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const size = context.size || 'md';

  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(styles.base.content, styles.size.content[size], className)}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const size = context.size || 'md';
  const placement = context.placement || 'bottom-start';

  const side = placement.split('-')[0] as 'top' | 'bottom';
  const align = placement.split('-')[1] as 'start' | 'end';

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        side={side}
        align={align}
        className={cn(styles.base.content, styles.size.content[size], className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const size = context.size || 'md';

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(styles.base.item, styles.size.item[size], inset && 'pl-8', className)}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const size = context.size || 'md';

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(styles.base.checkboxItem, styles.size.checkboxItem[size], className)}
      checked={checked}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className={styles.size.icon[size]} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const size = context.size || 'md';

  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(styles.base.radioItem, styles.size.radioItem[size], className)}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className={cn('fill-current', styles.size.icon[size])} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const size = context.size || 'md';

  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(styles.base.label, styles.size.label[size], inset && 'pl-8', className)}
      {...props}
    />
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(styles.base.separator, className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn(styles.base.shortcut, className)} {...props} />;
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
