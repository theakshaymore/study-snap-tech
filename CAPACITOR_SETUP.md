# Capacitor Native App Setup Guide

This guide will help you set up and build StudySnap as a native mobile app for Android and iOS.

## Prerequisites

### For All Platforms
- Node.js and npm installed
- Git installed

### For iOS Development
- macOS with Xcode installed
- CocoaPods installed (`sudo gem install cocoapods`)

### For Android Development  
- Android Studio installed
- Android SDK and build tools configured

## Initial Setup

### 1. Export to GitHub and Clone

1. In Lovable, click the **"Export to Github"** button to transfer your project to your own repository
2. Clone your repository locally:
   ```bash
   git clone YOUR_GITHUB_REPO_URL
   cd study-snap-tech
   ```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Google OAuth

**Important:** You need to configure Google OAuth for native platforms:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - **For iOS:** Create an iOS client ID (you'll need your bundle ID)
   - **For Android:** Create an Android client ID (you'll need your package name and SHA-1 fingerprint)
   - **For Web:** Create a Web client ID

5. Update `capacitor.config.ts` with your **Web Client ID**:
   ```typescript
   GoogleAuth: {
     scopes: ['profile', 'email'],
     serverClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
     forceCodeForRefreshToken: true,
   }
   ```

### 4. Initialize Capacitor

Initialize Capacitor (if not already done):
```bash
npx cap init
```

When prompted:
- App name: `study-snap-tech`
- App ID: `app.lovable.deabd80c5f17476f9b9ffbfd64598b4d`
- Accept other defaults

### 5. Add Native Platforms

Add iOS and/or Android:
```bash
# For iOS (macOS only)
npx cap add ios

# For Android
npx cap add android
```

### 6. Build Your Web App

```bash
npm run build
```

### 7. Sync Native Projects

```bash
# Update iOS
npx cap sync ios

# Update Android  
npx cap sync android
```

## Running on Devices/Emulators

### iOS

```bash
# Open in Xcode
npx cap open ios
```

In Xcode:
1. Select your development team in Signing & Capabilities
2. Choose a simulator or connected device
3. Click the Play button to build and run

### Android

```bash
# Open in Android Studio
npx cap open android
```

In Android Studio:
1. Wait for Gradle sync to complete
2. Choose an emulator or connected device
3. Click the Run button

## Development Workflow

After making code changes in Lovable:

1. **Pull latest changes:**
   ```bash
   git pull
   ```

2. **Sync to native projects:**
   ```bash
   npx cap sync
   ```

3. **For live development:**
   - The app is configured to load from the Lovable preview URL
   - Changes in Lovable will reflect in the app automatically
   - No rebuild needed during development!

## Building for Production

### Remove Development Server URL

Before building for production, edit `capacitor.config.ts` and remove the `server` section:

```typescript
const config: CapacitorConfig = {
  appId: 'app.lovable.deabd80c5f17476f9b9ffbfd64598b4d',
  appName: 'study-snap-tech',
  webDir: 'dist',
  // Remove this section for production:
  // server: {
  //   url: '...',
  //   cleartext: true
  // }
};
```

### iOS Production Build

1. In Xcode, select **Product > Archive**
2. Once archived, click **Distribute App**
3. Follow the wizard to upload to App Store Connect

### Android Production Build

1. In Android Studio, select **Build > Generate Signed Bundle / APK**
2. Choose **Android App Bundle**
3. Follow the wizard to sign and build
4. Upload the generated AAB file to Google Play Console

## Troubleshooting

### Google Sign-In Not Working

- Verify you've configured all three OAuth clients (iOS, Android, Web)
- Check that `serverClientId` in `capacitor.config.ts` uses your **Web Client ID**
- For Android: Verify SHA-1 fingerprint matches in Google Console
- For iOS: Verify bundle ID matches in Google Console

### App Not Loading

- Check that you've run `npm run build` and `npx cap sync`
- For development, verify the preview URL is accessible
- Check console logs in Xcode or Android Studio

### Dark Mode Issues

- Theme preference is stored locally using Capacitor Preferences
- First launch defaults to dark mode
- Users can change in Settings

## Learn More

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Google Auth Plugin](https://github.com/CodetrixStudio/CapacitorGoogleAuth)
- [Lovable Documentation](https://docs.lovable.dev)
