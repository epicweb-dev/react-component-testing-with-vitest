import { useReducer, type FormEventHandler } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'

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

async function removeDiscount(code: string): Promise<void> {
	const response = await fetch('https://api.example.com/discount/code', {
		method: 'DELETE',
		body: code,
	})

	if (!response.ok) {
		throw new Error(`Failed to remove the discount code (${response.status})`)
	}
}

export function DiscountCodeForm() {
	const [state, dispatch] = useReducer(discountFormReducer, {
		submitting: false,
	})

	const handleApplyDiscount: FormEventHandler<HTMLFormElement> = async (
		event,
	) => {
		event.preventDefault()
		dispatch({ type: 'submitting' })

		const data = new FormData(event.currentTarget)
		const code = data.get('discountCode')

		if (!code) {
			toast.error('Missing discount code')
			return
		}

		if (typeof code !== 'string') {
			toast.error(
				`Expected discount code to be a string but got ${typeof code}`,
			)
			return
		}

		await fetchDiscount(code)
			.then((discount) => {
				dispatch({ type: 'success', discount })

				if (discount.isLegacy) {
					toast.warning(`"${code}" is a legacy code. Discount amount halved.`)
				}
			})
			.catch(() => {
				toast.error('Failed to apply the discount code')
				dispatch({ type: 'idle' })
			})
	}

	const handleRemoveDiscount: FormEventHandler<HTMLFormElement> = async (
		event,
	) => {
		event.preventDefault()

		const data = new FormData(event.currentTarget)
		const code = data.get('discountCode') as string

		await removeDiscount(code)
			.catch((error) => {
				console.error(error)
				toast.error('Failed to remote the discount code')
			})
			.finally(() => {
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
				<form
					onSubmit={handleRemoveDiscount}
					className="flex items-center justify-between gap-5"
				>
					<p>
						Discount: <strong>{state.discount.code}</strong> (-
						{state.discount.amount}%)
					</p>

					<input
						name="discountCode"
						value={state.discount.code}
						readOnly
						hidden
					/>
					<button
						aria-label="Remove discount"
						className="size-8 rounded-md border text-slate-500 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700 focus:ring-4"
					>
						✗
					</button>
				</form>
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

					<p className="text-center">
						<Link
							to="/cart"
							className="text-sm font-medium text-slate-500 hover:underline"
						>
							Back to cart
						</Link>
					</p>
				</form>
			)}
		</section>
	)
}
