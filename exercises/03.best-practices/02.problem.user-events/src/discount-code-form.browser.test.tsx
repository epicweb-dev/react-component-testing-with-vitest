import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { DiscountCodeForm } from './discount-code-form'

// 🐨 Rename this test name to reflect the changes
// you are about to make.
// 💰 "applies a discount code"
test('renders the discount form', async () => {
	render(<DiscountCodeForm />)

	const discountInput = page.getByLabelText('Discount code')
	// 💣 Remove this visibility assertion.
	// If you are going to interact with an element, you don't have
	// to assert that it's visible/enabled/etc. Its interactive state
	// is implied by the interaction.
	await expect.element(discountInput).toBeVisible()

	// 🐨 Fill the discount code "EPIC2025" into the discount code input.
	// 💰 await element.fill(value)

	const applyDiscountButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	// 💣 Similarly, remove this redundant assertion.
	await expect.element(applyDiscountButton).toBeVisible()

	// 🐨 Submit the discount form by clicking on the button.
	// 💰 await element.click()
	//
	// 🐨 Finally, add an assertion that the element with the text
	// "Discount: EPIC2025 (-20%)" is visibile on the page.
	// 💰 await expect.element(locator).toBeVisible()
})
