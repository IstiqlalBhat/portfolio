# DatoCMS Video Integration Guide

This guide details how to set up the Video field in DatoCMS to work with your Portfolio's Gallery component.

## Prerequisite: Codebase Status
**Your codebase is already fully configured!**
- ✅ `react-player` installed
- ✅ `src/queries/getGalleryItems.js` updated to fetch video fields
- ✅ `src/pages/Gallery.jsx` updated to render video player
- ✅ `src/pages/Gallery.css` styling added

You just need to configure the backend (DatoCMS) to match.

## Step 1: Access DatoCMS Dashboard
1. Log in to [DatoCMS](https://www.datocms.com/).
2. Select your portfolio project.

## Step 2: Add Video Field to GalleryItem Model
1. Click **Settings** (gear icon) in the left sidebar.
2. Click **Models**.
3. Select the **GalleryItem** model.
4. Click the **+ Add new field** button.

## Step 3: Configure the Video Field
CRITICAL: The API Key must match exactly for the code to work.

1. Scroll to the **Reference** or **Media** section in the field type picker.
2. Select **Single asset** (sometimes called "External Video" is WRONG, pick "Single asset").
   *This field allows uploading files, including videos which Mux will process.*
3. Configure the settings:
   - **Label**: Video
   - **API Key**: `video` (Must be lowercase 'video')
4. Go to the **Validations** tab (optional but recommended):
   - Check "Accept only specific file types".
   - Select **Videos**.
5. Click **Save field**.

## Step 4: Upload Content
1. Go to the **Content** tab.
2. Click on **GalleryItem**.
3. Create a new item or edit an existing one.
4. Upload a video file to the new **Video** field.
   - *Note: You can leave the Image field empty if you only want video, or provide both (Image will be used as fallback/thumbnail).*

## Step 5: Verification
1. Wait a few minutes for Mux to process the video (transcode to HLS).
2. Start your local server: `npm run dev`.
3. Open the Gallery page.
4. You should see the video thumbnail with a play icon. Clicking it will open the video.

## Troubleshooting
| Issue | Solution |
|-------|----------|
| **No "Video" field option** | Select "Single asset" instead. It handles videos automatically. |
| **Video doesn't play** | Check console for "streamingUrl" errors. Wait longer for processing. |
| **API Error** | Ensure API Key is exactly `video`. |
