import TextField from '@mui/material/TextField'
import { useSearchParams } from 'react-router-dom'

type SearchInputProps = {
  searchedId: string
  setSearchedId: React.Dispatch<React.SetStateAction<string>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const SearchInput = ({
  searchedId,
  setSearchedId,
  setPage,
}: SearchInputProps): JSX.Element => {
  const [, setSearchParams] = useSearchParams()

  return (
    <div className="searchInput__wrapper">
      <TextField
        value={searchedId}
        label="Search item by ID"
        type="number"
        onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setSearchedId(e.target.value)
          if (e.target.value) {
            setSearchParams({ id: e.target.value })
          } else {
            setSearchParams()
          }
          setPage(1)
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
          if (['e', 'E', '+', '-', '.', ','].includes(e.key)) e.preventDefault()
        }}
      />
    </div>
  )
}

export default SearchInput
