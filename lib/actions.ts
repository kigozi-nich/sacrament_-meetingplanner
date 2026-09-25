'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { MeetingFormSchema } from './meeting-form-schema';
import { addMeeting, deleteMeeting as deleteMeetingDb, getMeetingById, updateMeeting as updateMeetingDb } from './meetings-db';

export type MeetingState = {
  message?: string;
  errors?: Partial<Record<string, string[]>>;
};

function normalizeFormData(formData: FormData) {
  const announcements = formData.getAll('announcements').map((value) => String(value).trim()).filter(Boolean);
  const wardBusiness = formData.getAll('wardBusiness').map((value) => String(value).trim()).filter(Boolean).map((description) => ({ description }));

  const speakerName = String(formData.get('speakerName') ?? '').trim();
  const speakerTopic = String(formData.get('speakerTopic') ?? '').trim();
  const speakerType = String(formData.get('speakerType') ?? 'speaker').trim();
  const speakers = speakerName || speakerTopic ? [{ name: speakerName, topic: speakerTopic, type: speakerType === 'musical-number' ? 'musical-number' : 'speaker' }] : [];

  const payload = {
    date: String(formData.get('date') ?? '').trim(),
    meetingType: String(formData.get('meetingType') ?? '').trim(),
    presiding: String(formData.get('presiding') ?? '').trim(),
    conducting: String(formData.get('conducting') ?? '').trim(),
    announcements,
    openingHymn: {
      number: Number(formData.get('openingHymn.number') ?? ''),
      title: String(formData.get('openingHymn.title') ?? '').trim(),
    },
    openingPrayer: String(formData.get('openingPrayer') ?? '').trim(),
    wardBusiness,
    stakeBusiness: formData.get('stakeBusiness') === 'true',
    sacramentHymn: {
      number: Number(formData.get('sacramentHymn.number') ?? ''),
      title: String(formData.get('sacramentHymn.title') ?? '').trim(),
    },
    speakers,
    closingHymn: {
      number: Number(formData.get('closingHymn.number') ?? ''),
      title: String(formData.get('closingHymn.title') ?? '').trim(),
    },
    closingPrayer: String(formData.get('closingPrayer') ?? '').trim(),
  };

  return payload;
}

export async function createMeeting(prevState: MeetingState | undefined, formData: FormData): Promise<MeetingState> {
  const parsed = MeetingFormSchema.safeParse(normalizeFormData(formData));

  if (!parsed.success) {
    return {
      message: 'Please fix the highlighted fields and try again.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await addMeeting(parsed.data);
    revalidatePath('/meetings');
    redirect('/meetings');
  } catch (error) {
    console.error('Failed to create meeting:', error);
    return {
      message: 'The meeting could not be created. Please try again.',
    };
  }

  return { message: 'Meeting created successfully.' };
}

export async function updateMeeting(id: number, prevState: MeetingState | undefined, formData: FormData): Promise<MeetingState> {
  const parsed = MeetingFormSchema.safeParse(normalizeFormData(formData));

  if (!parsed.success) {
    return {
      message: 'Please fix the highlighted fields and try again.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updated = await updateMeetingDb(id, parsed.data);
    if (!updated) {
      return { message: 'The meeting could not be found.' };
    }

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
    redirect(`/meetings/${id}`);
  } catch (error) {
    console.error('Failed to update meeting:', error);
    return {
      message: 'The meeting could not be updated. Please try again.',
    };
  }

  return { message: 'Meeting updated successfully.' };
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const meetingIdRaw = formData.get('id');
  const meetingId = Number(meetingIdRaw);

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    throw new Error('A valid meeting ID is required.');
  }

  try {
    const exists = await getMeetingById(meetingId);
    if (!exists) {
      throw new Error('That meeting could not be found.');
    }

    await deleteMeetingDb(meetingId);
    revalidatePath('/meetings');
    redirect('/meetings');
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('The meeting could not be deleted. Please try again.');
  }
}
