import { test, expect } from '@playwright/test'

const UI_URL = 'http://localhost:5173/'

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL)

  // Get the Sign In button
  await page.getByRole('link', { name: 'Sign In' }).click()

  // Check if in Sign In Page
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()

  // Fill out form
  await page.locator('[name=email]').fill('test@test.com')
  await page.locator('[name=password]').fill('123456')

  // Click Sign In button
  await page.getByRole('button', { name: 'Sign In' }).click()

  // Verify Sign In was successful
  await expect(page.getByText('Sign in successful!')).toBeVisible()
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible()
})

test('should allow a new user to register', async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 9000) + 1000
  }@test.com`
  await page.goto(UI_URL)

  // Get the Sign In button
  await page.getByRole('link', { name: 'Sign In' }).click()

  // Click the register link
  await page.getByRole('link', { name: 'Create an account here' }).click()

  // Check if in Register Page
  await expect(
    page.getByRole('heading', { name: 'Create an Account' })
  ).toBeVisible()

  // Fill out form
  await page.locator('[name=firstName]').fill('test-firstName')
  await page.locator('[name=lastName]').fill('test-lastName')
  await page.locator('[name=email]').fill(testEmail)
  await page.locator('[name=password]').fill('123456')
  await page.locator('[name=confirmPassword]').fill('123456')

  // Click Sign In button
  await page.getByRole('button', { name: 'Create Account' }).click()

  // Verify Sign In was successful
  await expect(page.getByText('Registration Success!')).toBeVisible()
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible()
})
