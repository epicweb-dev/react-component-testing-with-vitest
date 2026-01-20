import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { MemoryRouter } from 'react-router'
import { MainMenu } from './main-menu'

test('renders the currently active menu link', async () => {
	render(<MainMenu />, {
		wrapper({ children }) {
			return (
				<MemoryRouter initialEntries={['/dashboard/analytics']}>
					{children}
				</MemoryRouter>
			)
		},
	})

	const allLinks = page.getByRole('link').elements()
	const currentPageLink = allLinks.find(
		(link) => link.getAttribute('aria-current') === 'page',
	)!

	await expect.element(currentPageLink).toHaveAccessibleName('Analytics')
})
