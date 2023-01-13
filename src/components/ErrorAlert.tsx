import Alert from '@mui/material/Alert'

type ErrorAlertProps = {
  error: string
}

const ErrorAlert = ({ error }: ErrorAlertProps): JSX.Element => {
  return <Alert severity="error">{error}</Alert>
}

export default ErrorAlert
