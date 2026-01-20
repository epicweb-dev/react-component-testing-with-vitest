import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { TicTacToe } from './tic-tac-toe'

test('places cross marks in a horizontal line', async () => {
	// 🐨 Destructure the object returned from the `render` function
	// and get the `debug` function from there.
	// 💰 const { debug } = render()
	render(<TicTacToe />)

	await page.getByRole('button', { name: 'left middle' }).click()
	await page.getByRole('button', { name: 'middle', exact: true }).click()
	await page.getByRole('button', { name: 'right middle' }).click()

	// 🐨 Call the `debug` function after the test interacts with the game.
	// Can you spot what's wrong with the marked squares?
	// 🐨 Fix the issue in the <TicTacToe /> component to see this test pass.

	const squares = page.getByRole('button').elements().slice(3, 6)
	expect(squares.map((element) => element.textContent)).toEqual(['✗', '✗', '✗'])
})
