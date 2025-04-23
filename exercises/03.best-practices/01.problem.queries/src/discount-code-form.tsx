import { useState, type FormEventHandler } from 'react'

export interface Discount {
	code: string
	amount: number
}

export function DiscountCodeForm() {
	const [appliedDiscount, setAppliedDiscount] = useState<Discount>()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()

		const data = new FormData(event.currentTarget)
		const code = data.get('discountCode') as string

		setAppliedDiscount({
			code,
			amount: 20,
		})
	}

	return (
		<section className="w-96 rounded-lg border border-gray-300 bg-white p-10">
			{appliedDiscount ? (
				<p>
					Discount: <strong>{appliedDiscount.code}</strong> (-
					{appliedDiscount.amount}%)
				</p>
			) : (
				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div>
						<label htmlFor="discountCode" className="mb-1 block">
							Discount code
						</label>
						<input
							id="discountCode"
							name="discountCode"
							className="w-full rounded-md border border-gray-300 px-2 py-1 focus:ring-4"
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
		</section>
	)
}
