import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { http, HttpResponse } from 'msw'
// 🐨 Import the `test` function from `test-extend`.
// This custom `test` function exposes the `worker` object
// you will use to access and use MSW in tests.
// 💰 import { test } from '../test-extend'
import { DiscountCodeForm } from './discount-code-form'

test('applies a discount code', async () => {
	render(<DiscountCodeForm />)

	const discountInput = page.getByLabelText('Discount code')
	await discountInput.fill('EPIC2025')

	const applyDiscountButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await applyDiscountButton.click()

	await expect
		.element(page.getByText('Discount: EPIC2025 (-20%)'))
		.toBeVisible()
})

test('displays a warning for legacy discount codes', async ({
	// 🐨 Access the custom `worker` fixture you've prepared earlier.
}) => {
	// 🐨 Call `worker.use()` and provide it a new request handler
	// for the same POST https://api.example.com/discount/code request.
	// In this handler, respond with a different mocked response that
	// returns `isLegacy: true` in its JSON payload.
	//
	// Use the existing happy-path request handler from `src/mocks/handlers.ts`
	// as a reference!
	//
	// 💰 worker.use()
	// 💰 http.post(predicate, resolver)
	// 💰 HttpResponse.json({ code, amount, isLegacy })

	render(<DiscountCodeForm />)

	const discountInput = page.getByLabelText('Discount code')
	await discountInput.fill('LEGA2000')

	const applyDiscountButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await applyDiscountButton.click()

	// 🐨 Write an assertion that expects the text element
	// with the applied discount code to be visible on the page.
	// 💰 "Discount: LEGA2000 (-10%)"
	// 💰 await expect.element(locator).toBeVisible()
	//
	// 🐨 Write another assertion that expected the warning
	// to appear, notifying the user about the legacy discount code.
	// 💰 await expect.element(locator).toHaveTextContent(content)
	// 💰 page.getByRole('alert')
	// 💰 '"LEGA2000" is a legacy code. Discount amount halved.'
})

test('displays an error when fetching the discount fails', async ({
	// 🐨 Access the `worker` fixture here.
}) => {
	// 🐨 Call `worker.use()` and describe another request handler.
	// This time, respond with a mocked 500 response to simulate
	// server error.
	// 💰 worker.use(handler)
	// 💰 http.post(predicate, resolver)
	// 💰 new HttpResponse(null, { status: 500 })

	render(<DiscountCodeForm />)

	const discountInput = page.getByLabelText('Discount code')
	await discountInput.fill('CODE1234')

	const applyDiscountButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await applyDiscountButton.click()

	// 🐨 Write an assertion that a notification is displayed,
	// saying that applying the discount code has failed.
	// 💰 await expect.element(locator).toHaveTextContent(content)
	// 💰 page.getByRole('alert')
	// 💰 'Failed to apply the discount code'
})
