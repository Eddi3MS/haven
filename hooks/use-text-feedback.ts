import { useCallback, useEffect, useState } from 'react'

const useTextFeedback = (initState: string, timer?: number) => {
  const [feedback, setFeedback] = useState(initState)
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(
    null
  )

  const setText = useCallback(
    (data: { success: string } | { error: string }) => {
      if ('error' in data) {
        setFeedback(data.error)
        setFeedbackType('error')

        return
      }
      setFeedback(data.success)
      setFeedbackType('success')
    },
    []
  )

  const clearFeedback = useCallback(() => {
    setFeedback('')
    setFeedbackType(null)
  }, [])

  useEffect(() => {
    if (!feedback || !timer) return

    const timerId = setTimeout(() => {
      clearFeedback()
    }, timer)

    return () => {
      clearTimeout(timerId)
    }
  }, [feedback, timer, setText, clearFeedback])

  return { feedback, feedbackType, setFeedback: setText, clearFeedback }
}

export default useTextFeedback
