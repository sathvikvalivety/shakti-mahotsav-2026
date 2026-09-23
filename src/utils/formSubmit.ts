/**
 * Google Apps Script Web App Webhook submission helper for Shakti Mahotsav 2026.
 */

export const GOOGLE_SCRIPT_WEBAPP_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwb0SyhLI8QGFM3y4zllII9MPyU-4f2GSsh5-G29Svi_btzt2b5RIeJwIWI38-jLbyDlw/exec';

export interface FormSubmissionData {
  formType: 'registration' | 'contact' | 'suggestion' | string;
  name?: string;
  email?: string;
  contact?: string;
  phone?: string;
  dept?: string;
  rollNo?: string;
  tier?: string;
  dayChoice?: number | string;
  ticketId?: string;
  topic?: string;
  category?: string;
  message?: string;
  [key: string]: any;
}

/**
 * Sends form data to the Google Apps Script Web App endpoint.
 * Uses no-cors with text/plain JSON payload to ensure reliable delivery without CORS preflight blocks.
 */
export async function submitToGoogleSheets(data: FormSubmissionData): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = JSON.stringify({
      ...data,
      submittedAt: new Date().toISOString(),
    });

    await fetch(GOOGLE_SCRIPT_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: payload,
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, error: String(error) };
  }
}
