import path from 'path'
import { test, expect } from '@playwright/test'
const UI_URL = 'http://localhost:3000/'

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL)

  //  Click the Sign In button
  await page.getByRole('link', { name: 'Sign In' }).click()

  // Check to see if Sign In appears on the page
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()

  // Fill out the form with an email and password
  await page.locator('[name=email]').fill('1@1.com')
  await page.locator('[name=password]').fill('password123')

  // Click Log In button
  await page.getByRole('button', { name: 'Login' }).click()

  // Assert that the user has successfully signed in
  await expect(page.getByText('Sign in successful')).toBeVisible()
})

test('should allow user to add a hotel', async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`)

  // fill out the add hotel form
  // hotel details
  await page.locator('[name="name"]').fill('Test Hotel')
  await page.locator('[name="city"]').fill('Test City')
  await page.locator('[name="state"]').fill('Test State')
  await page
    .locator('[name="description"]')
    .fill('TThis is a description for the Test Hotel')
  await page.locator('[name="pricePerNight"]').fill('199')
  await page.selectOption('select[name="starRating"]', '3')
  // hotel type
  await page.getByText('Budget').click()
  // hotel facilities
  await page.getByLabel('Free WiFi').check()
  await page.getByLabel('Parking').check()
  await page.getByLabel('Bar').check()
  // hotel guests
  await page.locator('[name="adultCount"]').fill('2')
  await page.locator('[name="childCount"]').fill('1')
  // hotel images
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'files', '1.jpg'),
    path.join(__dirname, 'files', '2.jpg'),
    path.join(__dirname, 'files', '3.jpg'),
  ])

  // press the save button
  await page.getByRole('button', { name: 'Save' }).click()

  // assert hotel add was successful
  await expect(page.getByText('Hotel saved')).toBeVisible()
})
