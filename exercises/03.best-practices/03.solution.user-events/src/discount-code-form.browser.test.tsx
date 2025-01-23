import { page, userEvent } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { http, HttpResponse } from 'msw'
import { test } from '../test-extend.js'
import {
	DiscountCodeForm,
	type DiscountCodeRequest,
	type DiscountCodeResponse,
} from './discount-code-form.js'

test('applies a discount code', async () => {
	render(<DiscountCodeForm />)

	const codeInput = page.getByLabelText('Discount code')
	await userEvent.fill(codeInput, 'EPIC2025')

	const submitButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await userEvent.click(submitButton)

	await expect
		.element(page.getByText('Discount: EPIC2025 (-20%)'))
		.toBeVisible()
})

test('displays a warning for legacy discount codes', async ({ worker }) => {
	worker.use(
		http.post<never, DiscountCodeRequest, DiscountCodeResponse>(
			'https://api.example.com/discount/code',
			async function override({ request }) {
				const { code } = await request.json()

				return HttpResponse.json({
					code,
					amount: 10,
					isLegacy: true,
				})
			},
		),
	)

	render(<DiscountCodeForm />)

	const codeInput = page.getByLabelText('Discount code')
	await userEvent.fill(codeInput, 'LEGA2000')

	const submitButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await userEvent.click(submitButton)

	await expect
		.element(page.getByText('Discount: LEGA2000 (-10%)'))
		.toBeVisible()
	await expect
		.element(page.getByRole('alert'))
		.toHaveTextContent('"LEGA2000" is a legacy code. Discount amount halfed.')
})

test('displays an error when fetching the discount code', async ({
	worker,
}) => {
	worker.use(
		http.post('https://api.example.com/discount/code', () => {
			return new HttpResponse(null, { status: 500 })
		}),
	)

	render(<DiscountCodeForm />)

	const codeInput = page.getByLabelText('Discount code')
	await userEvent.fill(codeInput, 'CODE1234')

	const submitButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await userEvent.click(submitButton)

	await expect
		.element(page.getByRole('alert'))
		.toHaveTextContent('Failed to apply the discount code')
})

test('displays an error notification for the unsupported country', async ({
	worker,
}) => {
	worker.use(
		http.post<never, DiscountCodeRequest, DiscountCodeResponse>(
			'https://api.example.com/discount/code',
			async ({ request }) => {
				const { code, country } = await request.json()

				return HttpResponse.json(
					{
						errorCode: 'UNSUPPORTED_COUNTRY',
						code,
						country,
					},
					{ status: 500 },
				)
			},
		),
	)

	render(<DiscountCodeForm />)

	const codeInput = page.getByLabelText('Discount code')
	await userEvent.fill(codeInput, 'CNTR0000')

	const submitButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await userEvent.click(submitButton)

	await expect
		.element(page.getByRole('alert'))
		.toHaveTextContent('"CNTR0000" is not available in your country (USA)')

	/**
	 * @todo @fixme Select another element and submit the form again.
	 */
})
