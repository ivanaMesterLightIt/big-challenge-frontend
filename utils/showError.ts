import axios from "axios"
import toast from "react-hot-toast"

export function showError(error: unknown, source = 'A backend endpoint') {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message, {
        position: 'top-right',
      })
    } else {
      toast.error(`Whoops! ${source} had an unexpected error`, {
        position: 'top-right',
      })
    }
  }