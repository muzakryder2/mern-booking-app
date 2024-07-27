import { test, expect } from '@playwright/test'
const UI_URL = 'http://localhost:3000/'

test('should allow the user to sign in', async ({ page }) => {
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
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible()

  // Sign Out
  await page.getByRole('button', { name: 'Sign Out' }).click()

  // Assert that the user has successfully signed out
  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible()
})

test('should allow the user to register', async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 9000) + 10000
  }@test.com`
  await page.goto(UI_URL)

  //  Click the Sign In button
  await page.getByRole('link', { name: 'Sign In' }).click()

  // Click on create an account link
  await page.getByRole('link', { name: 'Create an account here' }).click()

  // Check to see if Create an account appears on the page
  await expect(
    page.getByRole('heading', { name: 'Create an account' })
  ).toBeVisible()

  // Fill out the form with an email and password
  await page.locator('[name=firstName]').fill('e2e-test-firstName')
  await page.locator('[name=lastName]').fill('e2e-test-lastName')
  await page.locator('[name=email]').fill(testEmail)
  await page.locator('[name=password]').fill('password123')
  await page.locator('[name=confirmPassword]').fill('password123')

  // Click Log In button
  await page.getByRole('button', { name: 'Create Account' }).click()

  // Assert that the user has successfully registered
  await expect(page.getByText('Registration successful')).toBeVisible()
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible()

  // Sign Out
  await page.getByRole('button', { name: 'Sign Out' }).click()

  // Assert that the user has successfully signed out
  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible()
})
