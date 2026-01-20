// 💣 Remove the import from `@testing-library/react`. You won't need it anymore.
import { render, screen } from '@testing-library/react'
// 🐨 Import `page` from '@vitest/browser/context'
// 💰 import { foo } from 'bar'
//
// 🐨 Import `render` from 'vitest-browser-react'.
// 💰 import { foo } from 'bar'
import { FilePreview } from './file-preview'

test('displays the preview card', async () => {
	render(<FilePreview file={new File(['hello world'], 'file.txt')} />)

	// 🐨 Replace `expect()` with `await expect.element()`.
	expect(
		// 🐨 Replace the `screen.getByText` function with
		// `page.getByText`.
		screen.getByText('file.txt'),
	).toBeVisible()

	// 🐨 Using the previous assertion as an example,
	// apply the necessary changes to this `expect` as well.
	expect(screen.getByText('hello world')).toBeVisible()
})
