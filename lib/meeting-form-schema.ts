import { z } from 'zod';

const hymnSchema = z.object({
  number: z.coerce.number({ message: 'Hymn number is required.' }).int().positive(),
  title: z.string().trim().min(1, 'Hymn title is required.'),
});

const speakerSchema = z.object({
  name: z.string().trim().min(1, 'Speaker name is required.'),
  topic: z.string().trim().min(1, 'Speaker topic is required.'),
  type: z.enum(['speaker', 'musical-number']),
});

const wardBusinessSchema = z.object({
  description: z.string().trim().min(1, 'Ward business item is required.'),
});

export const MeetingFormSchema = z.object({
  date: z.string().trim().min(1, 'Date is required.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], {
    message: 'Meeting type is required.',
  }),
  presiding: z.string().trim().min(1, 'Presiding leader is required.'),
  conducting: z.string().trim().min(1, 'Conducting leader is required.'),
  announcements: z.array(z.string().trim().min(1)).default([]),
  openingHymn: hymnSchema,
  openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
  wardBusiness: z.array(wardBusinessSchema).default([]),
  stakeBusiness: z.coerce.boolean(),
  sacramentHymn: hymnSchema,
  speakers: z.array(speakerSchema).default([]),
  closingHymn: hymnSchema,
  closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
});
