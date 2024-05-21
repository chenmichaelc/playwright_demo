# playwright_demo

This is a public demo of an implementation for a test suite implemented in JavaScript using the [Playwright](http://playwright.dev) test automation framework. To execute this demo and see a visual record of the test run, clone this repository, and run `npx playwright test --ui'` in the Terminal. 

This test suite is implemented against a demo instance of the [CKEditor](https://ckeditor.com) rich-text editor, and demonstrates page navigation, interactions with page elements, validation of the state, and Playwright's simultaneous multi-session test capabilities. The test suite also demonstrates a simple Page Object Model (POM) implementation.  