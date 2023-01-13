import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

type Product = {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}

type DataTableRowProps = {
  product: Product
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setModalInfo: React.Dispatch<React.SetStateAction<Product | null>>
}

const DataTableRow = ({
  product,
  setShowModal,
  setModalInfo,
}: DataTableRowProps): JSX.Element => {
  return (
    <TableRow
      style={{ background: product.color }}
      onClick={(): void => {
        setShowModal(true)
        setModalInfo(product)
      }}
    >
      <TableCell align="right" width={100}>
        {product.id}
      </TableCell>
      <TableCell align="center" width={500}>
        {product.name}
      </TableCell>
      <TableCell width={100}>{product.year}</TableCell>
    </TableRow>
  )
}

export default DataTableRow
