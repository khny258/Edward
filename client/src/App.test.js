import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('React app tests: root component', () => {
	test('renders a Navbar', () => {
		const { getByText } = render(<App />);
		const linkElement = getByText(/Navbar/i);
		expect(linkElement).toBeInTheDocument();
	});
});
