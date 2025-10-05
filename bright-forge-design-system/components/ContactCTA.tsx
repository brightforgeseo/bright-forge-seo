import React from 'react';
import { Button } from './Button';

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface ContactCTAProps {
  title: string;
  highlightedText?: string;
  description: string;
  contactInfo?: ContactInfo;
  showForm?: boolean;
  onSubmit?: (formData: FormData) => void;
}

/**
 * Bright Forge Contact CTA Section
 * Two-column layout with contact info on left, form on right
 * Pink background accent
 *
 * @example
 * <ContactCTA
 *   title="Get in touch"
 *   highlightedText="today"
 *   description="Let's work together"
 *   contactInfo={{
 *     email: 'hello@example.com',
 *     phone: '(123) 456-7890',
 *   }}
 *   onSubmit={(data) => console.log(data)}
 * />
 */
export const ContactCTA: React.FC<ContactCTAProps> = ({
  title,
  highlightedText,
  description,
  contactInfo,
  showForm = true,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      onSubmit(formData);
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-10 bg-pink-50 p-6 md:p-10 rounded-xl">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          {title}{' '}
          {highlightedText && (
            <span className="text-orange-500">{highlightedText}</span>
          )}
        </h2>
        <p className="text-gray-700">{description}</p>

        {contactInfo && (
          <div className="mt-6 space-y-2">
            {contactInfo.email && (
              <p>
                <strong>Email:</strong> {contactInfo.email}
              </p>
            )}
            {contactInfo.phone && (
              <p>
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
            )}
            {contactInfo.address && (
              <p>
                <strong>Address:</strong> {contactInfo.address}
              </p>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              className="w-full p-3 rounded border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              className="w-full p-3 rounded border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write A Message"
              className="w-full p-3 rounded border border-gray-300 h-32 focus:ring-orange-500 focus:border-orange-500"
              required
            ></textarea>
          </div>
          <Button type="submit" className="w-full p-3">
            Send Message
          </Button>
        </form>
      )}
    </section>
  );
};
