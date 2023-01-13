import { Dispatch, SetStateAction, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import ProductModal from './ProductModal'
import { useSearchParams } from 'react-router-dom'
import DataTableRow from './DataTableRow'

type Product = {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}

type DataTableProps = {
  products: Product | Product[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
  totalProducts: number
}

const DataTable = ({
  products,
  page,
  setPage,
  totalProducts,
}: DataTableProps): JSX.Element => {
  const rowsPerPage = 5
  const [, setSearchParams] = useSearchParams()
  const emptyRows =
    page + 1 > 0 ? Math.max(0, page * rowsPerPage - totalProducts) : 0
  const [modalInfo, setModalInfo] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const handleClose = (): void => setShowModal(false)
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage + 1)
    if (newPage + 1 > 1) {
      setSearchParams({ page: `${newPage + 1}` })
    } else {
      setSearchParams()
    }
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products instanceof Array ? (
              products.map((element) => (
                <DataTableRow
                  product={element}
                  key={element.id}
                  setShowModal={setShowModal}
                  setModalInfo={setModalInfo}
                ></DataTableRow>
              ))
            ) : (
              <DataTableRow
                product={products}
                setShowModal={setShowModal}
                setModalInfo={setModalInfo}
              ></DataTableRow>
            )}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5]}
                count={totalProducts ? totalProducts : 1}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {modalInfo && (
        <ProductModal
          showModal={showModal}
          handleClose={handleClose}
          modalInfo={modalInfo}
        ></ProductModal>
      )}
    </>
  )
}

export default DataTable
