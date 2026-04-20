import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[FRAME] Component error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px 24px',
          background: 'rgba(255,82,82,0.08)',
          border: '1px solid rgba(255,82,82,0.3)',
          borderRadius: 10,
          color: '#FF8A80',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 12,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>⚠ Component error</div>
          <div style={{ opacity: 0.75 }}>{this.state.error?.message || 'An unexpected error occurred.'}</div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: 10, padding: '4px 12px', background: 'transparent',
              border: '1px solid rgba(255,82,82,0.4)', borderRadius: 6,
              color: '#FF8A80', cursor: 'pointer', fontSize: 11,
            }}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
