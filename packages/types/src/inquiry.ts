import { z } from "zod";

/**
 * Zod schema for the lead-capture / product inquiry form.
 * Used across both the web (Next.js) and mobile (Expo) apps.
 *
 * Model: Lead Generation — NO payment, NO cart. Just capture intent.
 */
export const inquirySchema = z.object({
  /** Full name of the person making the inquiry */
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  /** Phone number — Indian format (10 digits) */
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),

  /** Email address */
  email: z
    .string()
    .email("Enter a valid email address"),

  /** Optional message / notes about the inquiry */
  message: z
    .string()
    .max(500, "Message must be under 500 characters")
    .optional()
    .default(""),
});

/** TypeScript type inferred from the Zod schema */
export type InquiryFormData = z.infer<typeof inquirySchema>;

/**
 * Schema for the product metadata attached to an inquiry.
 * This is sent alongside the form data to identify WHICH product
 * the user is inquiring about.
 */
export const inquiryPayloadSchema = z.object({
  /** The inquiry form fields */
  form: inquirySchema,

  /** Slug or ID of the product being inquired about */
  productId: z.string().min(1),

  /** Human-readable product name (for the confirmation email) */
  productName: z.string().min(1),

  /** Which brand the inquiry came from */
  brand: z.enum(["skyline", "spicenblish"]),
});

export type InquiryPayload = z.infer<typeof inquiryPayloadSchema>;
