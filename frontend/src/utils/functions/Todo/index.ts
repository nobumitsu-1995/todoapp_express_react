export const validateTodo = (
  content: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  let skipFetch = false

  if (!content) {
    setError("content is required key!")
    skipFetch = true
  }

  return skipFetch
}
