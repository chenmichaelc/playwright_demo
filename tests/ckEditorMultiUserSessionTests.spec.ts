import { test, expect } from '@playwright/test';
import {ckEditorRealTimeCollaborativeEditorPage} from "../pages/ckEditorRealTimeCollaborativeEditorPage";

const { chromium } = require('playwright');

test('Two users can simultaneously edit a document in Real-Time Collaboration and see each others\' changes', async ({ page }) => {

    // Initializing the second user's browser session
    const browser2 = await chromium.launch();
    const page2 = await browser2.newPage();

    // Pages
    const ckEditorRealTimeCollaborativeEditor1 = new ckEditorRealTimeCollaborativeEditorPage(page);
    const ckEditorRealTimeCollaborativeEditor2 = new ckEditorRealTimeCollaborativeEditorPage(page2);

    // Test Artifacts
    const step1 = 'Step 1 - Clear box and start new text in Browser 1'
    const step2 = 'Step 2 - Add new line in Browser 2'

    // Navigate to base real-time-collaboration CKEditor demo page
    await page.goto(ckEditorRealTimeCollaborativeEditor1.basicUrl);
    await expect(ckEditorRealTimeCollaborativeEditor1.editWindow).toBeVisible({timeout: 10000});
    await expect(ckEditorRealTimeCollaborativeEditor1.copyUrlButton).toBeVisible();

    // Acquire the URL specific to the collaboration session, and navigate to it in the second browser
    let collaborationSessionUrl = page.url()
    await page2.goto(collaborationSessionUrl);
    await expect(ckEditorRealTimeCollaborativeEditor2.editWindow).toBeVisible({timeout: 10000});

    // Disable Track Changes on both browsers
    await ckEditorRealTimeCollaborativeEditor1.setTrackChangesToDisabled();
    await ckEditorRealTimeCollaborativeEditor2.setTrackChangesToDisabled();

    // Enter Step 1 text in Browser 1. Validate it appears in both browsers.
    await ckEditorRealTimeCollaborativeEditor1.editWindow.fill(step1);
    await expect(ckEditorRealTimeCollaborativeEditor1.editWindow).toContainText(step1);
    await expect(ckEditorRealTimeCollaborativeEditor2.editWindow).toContainText(step1);

    // Add Step 1 text in Browser 2. Validate it appears in both browsers.
    await ckEditorRealTimeCollaborativeEditor2.editWindow.press('End');
    await ckEditorRealTimeCollaborativeEditor2.editWindow.press('Enter');
    await ckEditorRealTimeCollaborativeEditor2.editWindow.pressSequentially(step2);
    await expect(ckEditorRealTimeCollaborativeEditor2.editWindow.getByRole('paragraph')).toContainText([step1, step2]);
    await expect(ckEditorRealTimeCollaborativeEditor1.editWindow.getByRole('paragraph')).toContainText([step1, step2]);
});