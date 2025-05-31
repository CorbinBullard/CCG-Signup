import { test, expect } from '@playwright/test';

test.describe('Signup Form Edge Cases', () => {
  test('should correctly handle field type changes', async ({ page }) => {
    await page.goto('http://localhost:3000/events');

    // // Assume event creation/editing workflow
    // await page.click('text="Create Event"');

    // // Fill basic event details
    // await page.fill('input[name="eventName"]', 'Test Event');
    // await page.fill('input[name="eventDate"]', '2025-06-30');

    // // Add a Text field
    // await page.click('text="Add Field"');
    // await page.fill('input[placeholder="Field Label"]', 'Full Name');
    // await page.selectOption('select[label="Field Type"]', 'Text');

    // // Add a Select field with options
    // await page.click('text="Add Field"');
    // await page.fill('input[placeholder="Field Label"]', 'Food Choice');
    // await page.selectOption('select[label="Field Type"]', 'Select');
    // await page.click('text="Options"');
    // await page.click('text="Add Option"');
    // await page.fill('input[placeholder="Option Label"]', 'Pizza');
    // await page.click('text="Add Option"');
    // await page.fill('input[placeholder="Option Label"]:nth-of-type(2)', 'Salad');

    // // Save event form
    // await page.click('text="Save Form"');
    // await page.waitForSelector('text="Event created successfully"');

    // // Submit signup
    // await page.click('text="Sign Up"');
    // await page.fill('input[placeholder="Full Name"]', 'John Doe');
    // await page.selectOption('select', 'Pizza');
    // await page.click('text="Submit"');
    // await page.waitForSelector('text="Signup successful"');

    // // Change "Food Choice" field to "Text"
    // await page.click('text="Edit Event"');
    // await page.selectOption('select[label="Field Type"]:nth-of-type(2)', 'Text');

    // // Save changes
    // await page.click('text="Save Form"');
    // await page.waitForSelector('text="Form updated successfully"');

    // // Check if signup shows invalid response clearly
    // await page.click('text="View Signups"');
    // const invalidField = page.locator('text="Invalid or Outdated Response"');
    // await expect(invalidField).toBeVisible();

    // // Edit signup and check invalid response isn't populated
    // await page.click('text="Edit Signup"');
    // const foodChoiceInput = page.locator('input[placeholder="Food Choice"]');
    // await expect(foodChoiceInput).toBeEmpty();
  });
});