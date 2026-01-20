import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
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
