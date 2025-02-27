import { matchPath, NavLink, useLocation } from 'react-router'

interface MenuItem {
	title: string
	url: string
	children?: Array<MenuItem>
}

const menuItems: Array<MenuItem> = [
	{
		title: 'Docs',
		url: '/docs',
	},
	{
		title: 'Dashboard',
		url: '/dashboard',
		children: [
			{
				title: 'Profile',
				url: '/dashboard/profile',
			},
			{
				title: 'Analytics',
				url: '/dashboard/analytics',
			},
			{
				title: 'Settings',
				url: '/dashboard/settings',
			},
		],
	},
] as const

function MenuItemsList(props: { items: Array<MenuItem> }) {
	const location = useLocation()

	return (
		<ul className="ml-4">
			{props.items.map((item) => {
				const isActive = matchPath(
					{ path: item.url, end: true },
					location.pathname,
				)

				return (
					<li key={item.url}>
						<NavLink
							to={item.url}
							className={[
								'px-2 py-1 hover:text-blue-600 hover:underline',
								isActive ? 'font-bold text-black' : 'text-gray-600',
							].join(' ')}
							end={true}
						>
							{item.title}
						</NavLink>
						{item.children ? <MenuItemsList items={item.children} /> : null}
					</li>
				)
			})}
		</ul>
	)
}

export function MainMenu() {
	return <MenuItemsList items={menuItems} />
}
