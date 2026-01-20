import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { TicTacToe } from './tic-tac-toe'

test('places cross marks in a horizontal line', async () => {
	const { debug } = render(<TicTacToe />)

	await page.getByRole('button', { name: 'left middle' }).click()
	await page.getByRole('button', { name: 'middle', exact: true }).click()
	await page.getByRole('button', { name: 'right middle' }).click()

	debug()

	const squares = page.getByRole('button').elements().slice(3, 6)
	expect(squares.map((element) => element.textContent)).toEqual(['✗', '✗', '✗'])
})
