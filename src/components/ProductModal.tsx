import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

type ProductModalProps = {
  showModal: boolean
  handleClose: () => void
  modalInfo: {
    id: number
    name: string
    year: number
    color: string
    pantone_value: string
  }
}

const ProductModal = ({
  showModal,
  handleClose,
  modalInfo,
}: ProductModalProps): JSX.Element => {
  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>Item details</DialogTitle>
      <DialogContent>
        <DialogContentText>ID: {modalInfo.id}</DialogContentText>
        <DialogContentText>Name: {modalInfo.name}</DialogContentText>
        <DialogContentText>Year: {modalInfo.year}</DialogContentText>
        <DialogContentText>Color: {modalInfo.color}</DialogContentText>
        <DialogContentText>
          Pantone Value: {modalInfo.pantone_value}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductModal
