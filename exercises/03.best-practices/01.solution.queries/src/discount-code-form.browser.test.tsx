import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { DiscountCodeForm } from './discount-code-form'

test('renders the discount form', async () => {
	render(<DiscountCodeForm />)

	const discountInput = page.getByLabelText('Discount code')
	await expect.element(discountInput).toBeVisible()

	const applyDiscountButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await expect.element(applyDiscountButton).toBeVisible()
})
