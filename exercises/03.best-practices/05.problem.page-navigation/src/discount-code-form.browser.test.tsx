import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { http, HttpResponse } from 'msw'
import { test } from '../test-extend'
import { DiscountCodeForm, type Discount } from './discount-code-form'

// 🐨 Declare a new variable called `wrapper`.
// Make it a React component that renders <MemoryRouter>
// from the "react-router" package around any `children`
// provided to the `wrapper` component.
// 💰 const wrapper: React.JSXElementConstructor<{ children: React.ReactNode }> = () => {}
// 💰 <MemoryRouter>{children}</MemoryRouter>

test('applies a discount code', async () => {
	// 🐨 Provide the `wrapper` in the render options.
	// 💰 await render(<Component />, { wrapper })
	await render(<DiscountCodeForm />)

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

	// 🐨 Provide the `wrapper` for this render.
	await render(<DiscountCodeForm />)

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

	// 🐨 Provide the `wrapper` for this render.
	await render(<DiscountCodeForm />)

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
	// 🐨 Provide the `wrapper` for this render.
	await render(<DiscountCodeForm />)

	const discountInput = page.getByLabelText('Discount code')
	await discountInput.fill('EPIC2025')

	const applyDiscountButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await applyDiscountButton.click()

	const discountText = page.getByText('Discount: EPIC2025 (-20%)')
	await expect.element(discountText).toBeVisible()

	const removeDiscountButton = page.getByRole('button', {
		name: 'Remove discount',
	})
	await removeDiscountButton.click()

	await expect.element(discountText).not.toBeInTheDocument()
})

test('displays the "Back to cart" link', async () => {
	// 🐨 Provide the `wrapper` for this render.
	await render(<DiscountCodeForm />)

	// 🐨 Declare a new variable called `backToCartLink` and
	// assign it a locator of the element with the role "link"
	// and accessible text "Back to cart".
	// 💰 page.getByRole(role, { name })

	// 🐨 Add an assertion that the `backToCartLink` element is visible.

	// 🐨 Add another assertion that the `backToCartLink` has the
	// correct value of the "href" attribute ("/cart").
	// 💰 .toHaveAttribute(attributeName, attributeValue)
})
