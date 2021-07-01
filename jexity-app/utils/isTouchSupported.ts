export function isTouchSupported(): boolean {
  const msTouchEnabled = window.navigator.msMaxTouchPoints;
  const generalTouchEnabled = 'ontouchstart' in document.createElement('div');

  if (msTouchEnabled || generalTouchEnabled) {
    return true;
  }
  return false;
}
