import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app.jsx'

async function enableMocking() {
	if (process.env.NODE_ENV === 'development') {
		const { startWorker } = await import('./mocks/browser.js')
		await startWorker()
	}
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
})
