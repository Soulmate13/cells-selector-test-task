import { render } from '@testing-library/react';
import App from 'pages/App';

describe('App', () => {
  describe('when initially rendered', () => {
    it('matches snapshot', () => {
      const { container } = render(<App/>);

      expect(container).toMatchSnapshot();
    });
  });
});
