import { memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/organisms/ErrorFallback';
import Grid from 'components/organisms/Grid';
import CellsProvider from 'providers/App/CellsProvider';

const App = () => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={/* istanbul ignore next */() => window.location.reload()}
  >
    <CellsProvider>
      <div className="App">
        <h1 id="grid-heading">Cells Selector</h1>
        <Grid/>
      </div>
    </CellsProvider>
  </ErrorBoundary>

);

export default memo(App);
