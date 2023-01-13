import { useEffect, useState } from 'react'
import './App.css'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import DataTable from './components/DataTable'
import SearchInput from './components/SearchInput'
import Container from '@mui/material/Container'
import ErrorAlert from './components/ErrorAlert'

type Product = {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}

const App = (): JSX.Element => {
  const API_URL = 'https://reqres.in/api/products'
  const [products, setProducts] = useState<null | Product[] | Product>(null)
  const [page, setPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [searchedId, setSearchedId] = useState('')
  const [error, setError] = useState<null | string>(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) {
      setPage(parseInt(pageParam))
    } else {
      setPage(1)
    }

    axios
      .get(API_URL, {
        params: {
          page: searchParams.get('page') ? searchParams.get('page') : 1,
          per_page: 5,
          id: searchParams.get('id'),
        },
      })
      .then((response) => {
        setProducts(response.data.data)
        setTotalProducts(response.data.total)
        setError(null)
      })
      .catch((error) => {
        setError(error.message)
      })
  }, [searchedId, page, searchParams])

  return (
    <div className="App">
      <SearchInput
        setPage={setPage}
        searchedId={searchedId}
        setSearchedId={setSearchedId}
      />
      <Container>
        {!error && products && (
          <DataTable
            products={products}
            page={page}
            setPage={setPage}
            totalProducts={totalProducts}
          />
        )}
        {error && <ErrorAlert error={error}></ErrorAlert>}
      </Container>
    </div>
  )
}

export default App
