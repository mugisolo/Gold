import { getAccessToken } from './firebaseAuth';

export interface CalendarEventPayload {
  summary: string;
  description: string;
  location?: string;
  startDateTime: string; // ISO 8601
  endDateTime: string;   // ISO 8601
}

export interface TaskPayload {
  title: string;
  notes?: string;
  due?: string; // RFC 3339 formatted date
}

/**
 * Creates an event in user's primary Google Calendar with explicit confirmation
 */
export async function createCalendarEvent(event: CalendarEventPayload) {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google Workspace');

  const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      summary: event.summary,
      description: event.description,
      location: event.location || 'Lake Victoria Serena Golf Resort & Spa, Entebbe/Kampala, Uganda',
      start: {
        dateTime: event.startDateTime,
        timeZone: 'Africa/Kampala',
      },
      end: {
        dateTime: event.endDateTime,
        timeZone: 'Africa/Kampala',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Calendar API error: ${errorText}`);
  }

  return await res.json();
}

/**
 * Creates a task in Google Tasks default list
 */
export async function createGoogleTask(task: TaskPayload) {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google Workspace');

  const res = await fetch('https://www.googleapis.com/tasks/v1/lists/@default/tasks', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: task.title,
      notes: task.notes || 'Uganda Gold Expedition — Statutory Anti-Fraud Action Item',
      due: task.due,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Tasks API error: ${errorText}`);
  }

  return await res.json();
}

/**
 * Fetches user's current Google Tasks
 */
export async function fetchGoogleTasks() {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const res = await fetch('https://www.googleapis.com/tasks/v1/lists/@default/tasks?maxResults=10', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    return [];
  }
}
