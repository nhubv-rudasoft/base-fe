import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogBody,
  DialogClose,
  useDialogSubmit,
} from './dialog';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Components/Dialog',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent size='sm'>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='name' className='text-right'>
                Name
              </label>
              <input id='name' className='col-span-3' placeholder='Enter your name' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='username' className='text-right'>
                Username
              </label>
              <input id='username' className='col-span-3' placeholder='Enter username' />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form component with submit handling
const ProfileForm = () => {
  const [dialogData, setDialogData] = useState({ name: '', email: '' });
  const submit = useDialogSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(); // Notify dialog that form is submitted
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium'>
            Name
          </label>
          <input
            id='name'
            className='mt-1 block w-full rounded-md border p-2'
            value={dialogData.name}
            onChange={e => setDialogData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='mt-1 block w-full rounded-md border p-2'
            value={dialogData.email}
            onChange={e => setDialogData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>
      <DialogFooter className='mt-6'>
        <DialogClose asChild>
          <Button variant='outline' type='button'>
            Cancel
          </Button>
        </DialogClose>
        <Button type='submit'>Save Changes</Button>
      </DialogFooter>
    </form>
  );
};

// Wrapper component to handle form submission state
const FormSubmissionDemo = () => {
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null);

  const handleSubmit = async (data: unknown) => {
    console.log('Form submitted with data:', data);
    setSubmittedData(data as { name: string; email: string });
  };

  const handleOpenChange = (open: boolean) => {
    // Handle open state change if needed
  };

  return (
    <div className='space-y-4'>
      <Dialog onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button>Open Form Dialog</Button>
        </DialogTrigger>
        <DialogContent
          onSubmit={handleSubmit}
          dialogData={{ name: 'John Doe', email: 'john@example.com' }}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile. Form data will be processed after dialog closes.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <ProfileForm />
          </DialogBody>
        </DialogContent>
      </Dialog>

      {submittedData && (
        <div className='rounded-lg border p-4'>
          <h3 className='font-medium'>Submitted Data:</h3>
          <pre className='mt-2 text-sm'>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export const WithFormSubmission: Story = {
  render: () => <FormSubmissionDemo />,
};

export const PreventOutsideClick: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Cannot Close by Outside Click</Button>
      </DialogTrigger>
      <DialogContent closeOnOutsideClick={false}>
        <DialogHeader>
          <DialogTitle>Important Action</DialogTitle>
          <DialogDescription>
            This dialog can only be closed using the close button or ESC key. Clicking outside will
            not close it.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className='py-4'>
            <p>This is useful for important actions that require explicit user decision.</p>
            <div className='mt-4 rounded-md bg-yellow-50 p-4'>
              <p className='text-sm text-yellow-800'>
                Try clicking outside - the dialog will stay open. You must use the X button or press
                ESC to close this dialog.
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit'>Confirm Action</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LargeScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Long Content</Button>
      </DialogTrigger>
      <DialogContent size='full'>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            This dialog demonstrates scrollable content with size='full'
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className='space-y-4'>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className='rounded border p-4'>
                <h3 className='font-semibold'>Section {i + 1}</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant='outline' type='button'>
            Cancel
          </Button>
          <Button type='submit'>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className='flex gap-4'>
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map(size => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant='outline'>Size: {size}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Dialog Size: {size}</DialogTitle>
              <DialogDescription>
                This dialog demonstrates the {size} size variant.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className='py-4'>
                <p>Content for {size} dialog</p>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button type='submit'>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

const TermsOfServiceContent = () => {
  const [accepted, setAccepted] = useState(false);
  const submit = useDialogSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accepted) {
      submit(); // This will trigger the onSubmit callback in DialogContent
    }
  };

  const handleCheckedChange = (checked: boolean) => {
    setAccepted(checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-6'>
        <div className='prose prose-sm max-w-none max-h-[60vh] overflow-y-auto pr-6'>
          <h2>Terms of Service</h2>
          <h3>1. Introduction</h3>
          <p>
            Welcome to our platform. These Terms of Service ("Terms") govern your access to and use
            of our website, services, and applications (the "Services"). Please read these Terms
            carefully before using the Services.
          </p>

          <h3>2. Acceptance of Terms</h3>
          <p>
            By accessing or using the Services, you agree to be bound by these Terms. If you
            disagree with any part of the Terms, you may not access the Services.
          </p>

          <h3>3. Privacy Policy</h3>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and
            protect your personal information. By using our Services, you agree to the collection
            and use of information in accordance with our Privacy Policy.
          </p>

          <h3>4. User Accounts</h3>
          <p>
            When you create an account with us, you must provide accurate, complete, and current
            information. You are responsible for safeguarding your account credentials and for any
            activities or actions under your account.
          </p>

          <h3>5. Content</h3>
          <p>
            Our Services allow you to post, link, store, share and otherwise make available certain
            information, text, graphics, videos, or other material. You are responsible for the
            content you post and its legality.
          </p>

          <h3>6. Intellectual Property</h3>
          <p>
            The Services and their original content, features, and functionality are owned by us and
            are protected by international copyright, trademark, patent, trade secret, and other
            intellectual property laws.
          </p>

          <h3>7. Termination</h3>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability,
            for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h3>8. Limitation of Liability</h3>
          <p>
            In no event shall we be liable for any indirect, incidental, special, consequential or
            punitive damages, including without limitation, loss of profits, data, use, goodwill, or
            other intangible losses.
          </p>

          <h3>9. Changes to Terms</h3>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking
            effect.
          </p>

          <h3>10. Contact Us</h3>
          <p>
            If you have any questions about these Terms, please contact us at support@example.com.
          </p>
        </div>

        <Checkbox
          checked={accepted}
          onCheckedChange={handleCheckedChange}
          label='I have read and agree to the Terms of Service'
          size='sm'
        />
      </div>

      <DialogFooter className='mt-6'>
        <DialogClose asChild>
          <Button variant='outline' type='button'>
            Cancel
          </Button>
        </DialogClose>
        <Button type='submit' disabled={!accepted}>
          Accept & Continue
        </Button>
      </DialogFooter>
    </form>
  );
};

// Wrapper component for Terms of Service story
const TermsOfServiceDemo = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data: unknown) => {
    setHasAccepted(true);
    setIsOpen(false); // Close dialog after submission
    console.log('Terms accepted!');
  };

  return (
    <div className='space-y-4'>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>View Terms of Service</Button>
        </DialogTrigger>
        <DialogContent size='lg' onSubmit={handleSubmit} dialogData={{ accepted: true }}>
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
            <DialogDescription>
              Please read our terms of service carefully before proceeding
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <TermsOfServiceContent />
          </DialogBody>
        </DialogContent>
      </Dialog>

      {hasAccepted && (
        <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
          <p className='text-sm text-green-800'>
            ✓ You have successfully accepted the Terms of Service
          </p>
        </div>
      )}
    </div>
  );
};

export const TermsOfService: Story = {
  render: () => <TermsOfServiceDemo />,
};
