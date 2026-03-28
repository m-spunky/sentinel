# API Setup Guide: Google OAuth2 & HaveIBeenPwned

This guide provides step-by-step instructions to obtain the necessary credentials for the Gmail integration and dark web checks in Sentinel.

---

## 1. Google OAuth2 (Gmail Integration)

To enable real-time Gmail scanning, you need to create a project in the Google Cloud Console.

### Step 1: Create a Google Cloud Project
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Click on the project dropdown at the top and select **New Project**.
3.  Give it a name (e.g., `Sentinel-Gmail-Scanner`) and click **Create**.

### Step 2: Enable the Gmail API
1.  In the sidebar, navigate to **APIs & Services > Library**.
2.  Search for **"Gmail API"**.
3.  Click on it and then click **Enable**.

### Step 3: Configure the OAuth Consent Screen
1.  Go to **APIs & Services > OAuth consent screen**.
2.  Select **External** (unless you have a Google Workspace organization) and click **Create**.
3.  Fill in the required fields:
    -   **App name**: Sentinel
    -   **User support email**: Your email
    -   **Developer contact information**: Your email
4.  Click **Save and Continue** through the remaining steps (Scopes, Test Users).
5.  > [!IMPORTANT]
    > Under **Test Users**, add your own Gmail address that you plan to test with. Since the app is in "Testing" mode, only these users can log in.

### Step 4: Create OAuth 2.0 Credentials
1.  Go to **APIs & Services > Credentials**.
2.  Click **+ Create Credentials** at the top and select **OAuth client ID**.
3.  Select **Web application** as the Application type.
4.  Under **Authorized redirect URIs**, click **+ Add URI** and enter:
    `http://localhost:8001/api/v1/gmail/callback`
5.  Click **Create**.
6.  A dialog will appear with your **Client ID** and **Client Secret**. Copy these into your `.env` file.

---

## 2. HaveIBeenPwned (HIBP) API Key

HIBP is used to check if user credentials have been leaked in known data breaches.

### Step 1: Visit the HIBP API Key Page
1.  Go to the [HaveIBeenPwned API Key page](https://haveibeenpwned.com/API/Key).
2.  HIBP requires a **paid subscription** (approx. $3.5 or $4/month) to access their API.

### Step 2: Purchase and Generate
1.  Follow the prompts to subscribe.
2.  Once subscribed, you will be able to generate an API key.
3.  Copy this key into your `.env` file under `HIBP_API_KEY`.

---

## Summary of `.env` Updates

Once you have the keys, update your `backend/.env` file:

```env
# Gmail OAuth2
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:8001/api/v1/gmail/callback

# HaveIBeenPwned
HIBP_API_KEY=your_hibp_api_key_here
```
