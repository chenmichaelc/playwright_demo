import { type Page, type Locator, expect } from '@playwright/test';

export class ckEditorRealTimeCollaborativeEditorPage {

    // Properties
    readonly page: Page
    readonly basicUrl: string
    public trackChangesStatus: boolean

    // Locators
    readonly editWindow: Locator;
    readonly trackChangesButton: Locator;
    readonly copyUrlButton: Locator;

    // Constructor
    public constructor(page:Page) {
        this.page = page;
        this.basicUrl = 'https://ckeditor.com/collaboration/demo/#real-time-collaboration';
        this.editWindow = page.getByRole('textbox', { name: 'Rich Text Editor. Editing'});
        this.trackChangesButton = page.getByLabel('Track changes').nth(2);
        this.copyUrlButton = page.getByRole('button', { name: 'Copy URL' });
    }

    // Functions
    async getTrackChangesStatus() {
        let _trackChangesAttributes = await (this.trackChangesButton).getAttribute('class');

        if (_trackChangesAttributes.includes('ck-off')) {
            this.trackChangesStatus = false
        }
        else if (_trackChangesAttributes.includes('ck-on')) {
            this.trackChangesStatus = true
        }
        else {
            this.trackChangesStatus = null
        }
    }

    async setTrackChangesToEnabled() {
        await this.getTrackChangesStatus();
        if (this.trackChangesStatus == true) {
        }
        else {
            await this.trackChangesButton.click();
            await expect(this.trackChangesButton).toHaveClass(/ck-on/);
        }
    }

    async setTrackChangesToDisabled() {
        await this.getTrackChangesStatus();
        if (this.trackChangesStatus == true) {
            await this.trackChangesButton.click();
            await expect(this.trackChangesButton).toHaveClass(/ck-off/);
        }
        else {
        }
    }

    // Validations

}