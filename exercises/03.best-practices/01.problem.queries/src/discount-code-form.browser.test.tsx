import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { DiscountCodeForm } from './discount-code-form'

test('renders the discount form', async () => {
	await render(<DiscountCodeForm />)

	// 🐨 Create a variable called `discountInput` and assign it
	// the result of locating the element by label text "Discount code".
	// 💰 const discountInput = page.getByLabelText(labelText)
	//
	// 🐨 Write an assertion that the `discountInput` element is visible.
	// 💰 await expect.element(locator).toBeVisible()
	//
	// 🐨 Create a new variable called `applyDiscountButton` and assign it
	// the result of locating the element by role 'button' and accessible name
	// "Apply discount".
	// 💰 const applyDiscountButton = page.getByRole(role, { name: accessibleName })
	//
	// 🐨 Finally, write another assertion that the apply discount button is visible.
})
