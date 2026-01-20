import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { FilePreview } from './file-preview'

test('displays the preview card', async () => {
	render(<FilePreview file={new File(['hello world'], 'file.txt')} />)

	await expect.element(page.getByText('file.txt')).toBeVisible()
	await expect.element(page.getByText('hello world')).toBeVisible()
})
