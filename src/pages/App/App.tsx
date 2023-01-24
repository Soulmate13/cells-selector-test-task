import { memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/organisms/ErrorFallback';
import Grid from 'components/organisms/Grid';
import classes from './styles.module.css';
const App = () => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.reload()}
  >
    <div className="App">
      <h1 className={classes.heading}>Select game mode and start selecting cells!</h1>
      <Grid/>
    </div>
  </ErrorBoundary>

);

export default memo(App);
