import { useReducer, useState, type FormEventHandler } from 'react'

interface Notification {
	type: 'error' | 'warning'
	text: string
}

export interface Discount {
	code: string
	amount: number
	isLegacy?: true
}

type DiscountFormState =
	| { submitting: false; discount?: never }
	| { submitting: false; discount: Discount }
	| { submitting: true }

type DiscountFormAction =
	| { type: 'idle' }
	| { type: 'submitting' }
	| { type: 'success'; discount: Discount }

function discountFormReducer(
	_state: DiscountFormState,
	action: DiscountFormAction,
): DiscountFormState {
	switch (action.type) {
		case 'idle': {
			return {
				submitting: false,
			}
		}
		case 'submitting': {
			return {
				submitting: true,
			}
		}
		case 'success': {
			return {
				submitting: false,
				discount: action.discount,
			}
		}
	}
}

async function fetchDiscount(code: string): Promise<Discount> {
	const response = await fetch('https://api.example.com/discount/code', {
		method: 'POST',
		body: code,
	})
	const data = (await response.json()) as Discount
	return data
}

export function DiscountCodeForm() {
	const [state, dispatch] = useReducer(discountFormReducer, {
		submitting: false,
	})
	const [notification, setNotification] = useState<Notification>()

	const notify = (text: string, type: Notification['type'] = 'warning') => {
		setNotification({ type, text })
		setTimeout(() => setNotification(undefined), 5000)
	}

	const handleApplyDiscount: FormEventHandler<HTMLFormElement> = async (
		event,
	) => {
		event.preventDefault()
		setNotification(undefined)
		dispatch({ type: 'submitting' })

		const data = new FormData(event.currentTarget)
		const code = data.get('discountCode')

		if (!code) {
			notify('Missing discount code', 'error')
			return
		}

		if (typeof code !== 'string') {
			notify(
				`Expected discount code to be a string but got ${typeof code}`,
				'error',
			)
			return
		}

		fetchDiscount(code)
			.then((discount) => {
				dispatch({ type: 'success', discount })

				if (discount.isLegacy) {
					notify(`"${code}" is a legacy code. Discount amount halved.`)
				}
			})
			.catch((error) => {
				console.error(error)
				notify('Failed to apply the discount code', 'error')
				dispatch({ type: 'idle' })
			})
	}

	return (
		<section className="w-96 rounded-lg border bg-white p-10">
			{state.submitting ? (
				<p aria-hidden>
					<span className="inline-block animate-spin font-bold">{'◡'}</span>
				</p>
			) : state.discount ? (
				<p>
					Discount: <strong>{state.discount.code}</strong> (-
					{state.discount.amount}%)
				</p>
			) : (
				<form onSubmit={handleApplyDiscount} className="flex flex-col gap-5">
					<div>
						<label htmlFor="discountCode" className="mb-1 block">
							Discount code
						</label>
						<input
							id="discountCode"
							name="discountCode"
							className="w-full rounded-md border px-2 py-1 focus:ring-4"
							placeholder="ABCD1234"
							pattern="[A-Z]{4}[0-9]{4}"
							autoComplete="off"
							required
						/>
					</div>

					<button
						type="submit"
						className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:ring-4"
					>
						Apply discount
					</button>
				</form>
			)}

			{notification ? (
				<p
					role="alert"
					className={`animation-slide animate-slide-in fixed bottom-5 right-5 rounded-lg border px-5 py-2.5 font-medium ${notification.type === 'error' ? 'border-red-800/20 bg-red-200' : 'border-yellow-800/20 bg-yellow-200'}`}
				>
					{notification.text}
				</p>
			) : null}
		</section>
	)
}
