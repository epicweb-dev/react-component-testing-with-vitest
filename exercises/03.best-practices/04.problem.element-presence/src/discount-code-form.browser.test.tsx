import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { http, HttpResponse } from 'msw'
import { test } from '../test-extend'
import { DiscountCodeForm, type Discount } from './discount-code-form'

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

test('displays a warning for legacy discount codes', async ({ worker }) => {
	worker.use(
		http.post<never, string, Discount>(
			'https://api.example.com/discount/code',
			async ({ request }) => {
				const code = await request.text()

				return HttpResponse.json({
					code,
					amount: 10,
					isLegacy: true,
				})
			},
		),
	)

	render(<DiscountCodeForm />)

	const discountInput = page.getByLabelText('Discount code')
	await discountInput.fill('LEGA2000')

	const applyDiscountButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await applyDiscountButton.click()

	await expect
		.element(page.getByText('Discount: LEGA2000 (-10%)'))
		.toBeVisible()
	await expect
		.element(page.getByRole('alert'))
		.toHaveTextContent('"LEGA2000" is a legacy code. Discount amount halved.')
})

test('displays an error when fetching the discount fails', async ({
	worker,
}) => {
	worker.use(
		http.post<never, string, Discount>(
			'https://api.example.com/discount/code',
			() => {
				return new HttpResponse(null, { status: 500 })
			},
		),
	)

	render(<DiscountCodeForm />)

	const discountInput = page.getByLabelText('Discount code')
	await discountInput.fill('CODE1234')

	const applyDiscountButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await applyDiscountButton.click()

	await expect
		.element(page.getByRole('alert'))
		.toHaveTextContent('Failed to apply the discount code')
})

test('removes the applied discount code', async () => {
	render(<DiscountCodeForm />)

	// 🐨 Locate the `discountInput` element by its text "Discount code".
	// Then, fill in any discount code (e.g. 'EPIC2025').
	//
	// 🐨 Locate the `applyDiscountButton` element by its role and name.
	// Click on it to apply the discount code.
	//
	// 🐨 Next, find the `discountText element for the applied discount
	// and make sure that it is visible on the page.
	//
	// 🐨 Now, create a new variable called `removeDiscountButton` and
	// assign it the result of locating a button with the accessible name
	// "Remove discount". Click on it to remove the applied code.
	//
	// 🐨 Finally, write an assertion that the `discountText` element
	// is no longer present in the document.
	// 💰 await expect.element(locator).not.toBeInTheDocument()
})
