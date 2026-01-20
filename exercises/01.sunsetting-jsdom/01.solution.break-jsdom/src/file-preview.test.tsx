import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { FilePreview } from './file-preview.tsx'

test('displays the preview card', () => {
	render(<FilePreview file={new File(['hello world'], 'file.txt')} />)

	expect(screen.getByText('file.txt')).toBeVisible()
	expect(screen.getByText('hello world')).toBeVisible()
})
