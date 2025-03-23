'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@libs/utils';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  /**
   * Control the open state of the dialog
   */
  open?: boolean;
  /**
   * Callback when the open state changes
   */
  onOpenChange?: (open: boolean) => void;
}

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * Size of the dialog
   */
  size?: DialogSize;
  /**
   * Whether to show the overlay backdrop
   */
  hasOverlay?: boolean;
  /**
   * Whether the dialog can be closed by clicking outside
   */
  closeOnOutsideClick?: boolean;
  /**
   * Callback when dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Callback when form is submitted
   */
  onSubmit?: (data: unknown) => void | Promise<void>;
  /**
   * Data to be passed to onSubmit callback
   */
  dialogData?: unknown;
  /**
   * Additional class names for the content
   */
  className?: string;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional class names for the header
   */
  className?: string;
}

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional class names for the body
   */
  className?: string;
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional class names for the footer
   */
  className?: string;
}

// Size classes mapping
const sizeClasses: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw] h-[90vh]',
};

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size = 'md',
      hasOverlay = true,
      closeOnOutsideClick = true,
      onOpenChange,
      onSubmit,
      dialogData,
      ...props
    },
    ref
  ) => {
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    // Expose submit handler to children through context
    const handleSubmit = React.useCallback(() => {
      setIsSubmitted(true);
      if (onSubmit && dialogData) {
        onSubmit(dialogData);
      }
    }, [onSubmit, dialogData]);

    return (
      <DialogPortal>
        {hasOverlay && (
          <DialogOverlay
            onClick={e => {
              if (!closeOnOutsideClick) {
                e.preventDefault();
              }
            }}
          />
        )}
        <DialogPrimitive.Content
          ref={ref}
          onPointerDownOutside={e => {
            if (!closeOnOutsideClick) {
              e.preventDefault();
            }
          }}
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
            'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            'sm:rounded-lg',
            sizeClasses[size],
            size === 'full' && 'grid grid-rows-[auto_1fr_auto]',
            className
          )}
          {...props}
        >
          <DialogSubmitContext.Provider value={handleSubmit}>
            {children}
          </DialogSubmitContext.Provider>
          <DialogPrimitive.Close className='absolute right-4 top-4 p-2 rounded-full opacity-70 transition-all hover:opacity-100 hover:bg-neutral200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'>
            <X className='h-6 w-6' />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Context for submit handler
const DialogSubmitContext = React.createContext<() => void>(() => undefined);

// Custom hook to access submit handler
export const useDialogSubmit = () => {
  const submit = React.useContext(DialogSubmitContext);
  if (!submit) {
    throw new Error('useDialogSubmit must be used within DialogContent');
  }
  return submit;
};

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  )
);
DialogHeader.displayName = 'DialogHeader';

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1 overflow-y-auto',
        '[&::-webkit-scrollbar]{width:4px}',
        '[&::-webkit-scrollbar-track]{background:transparent}',
        '[&::-webkit-scrollbar-thumb]{background-color:rgb(156,163,175);border-radius:2px}',
        '[&::-webkit-scrollbar-thumb:hover]{background-color:rgb(107,114,128)}',
        className
      )}
      {...props}
    />
  )
);
DialogBody.displayName = 'DialogBody';

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  )
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-textSecondary', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
