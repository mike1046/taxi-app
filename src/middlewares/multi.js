export default ({ dispatch }) => next => (action) => {
  if (Array.isArray(action)) return action.filter(Boolean).map(dispatch)
  return next(action)
}

