import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../constants/Axios";
import transformDate from "../../helpers/transformDate";
import PaginatedItems from "./Pagination";

// replace role number by role name
function RoleLabel(props) {
  switch (props.role) {
    case '1995': return <span>Admin</span>;
    case '1996': return <span>Writer</span>;
    case '1999': return <span>Product Manager</span>;
    case '2001': return <span>User</span>;
    default: return <span>{props.role}</span>;
  }
}

export default function TableShow({ limit, setLimit, page, setPage, totalData, loading, searchIn, searchLink, header, data, handleDelete, currentUser = { name: '' } }) {

  // const start = (page - 1) * limit;
  // const end = start + Number(limit);
  // let paginateData = data.slice(start, end);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterDataByDate = date ? data.filter((item) => transformDate(item.created_at) === date) : data;
  const filterSearchByDate = date ? filterData.filter((item) => transformDate(item.created_at) === date) : filterData;

  const showData = search.length > 0 ? filterSearchByDate : filterDataByDate;

  async function getSearchData() {
    try {
      const response = await Axios.post(`${searchLink}/search?title=${search}`);
      setFilterData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }

  // debouncing => make the data fetching delay to control the frequency API requests
  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <>
      <div className="row">
        <div className="col-3">
          <Form.Control
            className="my-2"
            type="search"
            placeholder="Search"
            aria-label="input example"
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading(true);
            }}
          />
        </div>
        <div className="col-5">
          <Form.Control
            className="my-2"
            type="date"
            placeholder="Search"
            aria-label="input example"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {header.map((headerItem, index) => <th key={index}>{headerItem.name}</th>)}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? <tr><td className="text-center" colSpan="12">Loading...</td></tr>
            : searchLoading
              ? <tr><td className="text-center" colSpan="12">Searching...</td></tr>
              : showData.map((row, rowId) => (
                <tr key={rowId}>
                  <td>{row.id}</td> {/* id column */}

                  {header.map((item, ndx) => (
                    item.key === 'images' // map product images object
                      ? <td key={ndx} className="d-flex align-items-center justify-content-start gap-1 flex-wrap">
                        {row[item.key].map((img, i) => (<img key={i} src={img.image} alt={img.image} width='50px' />))}
                      </td>
                      : <td key={ndx} className="p-1">
                        {item.key === 'image' // show category image
                          ? <img src={row[item.key]} alt={item.key} height="50" width={'70'} />
                          : item.key === "created_at" || item.key === "updated_at" // from date in categories table
                            ? transformDate(row[item.key])
                            : <RoleLabel role={row[item.key]} /> // replace role number by role name
                        }
                        {row[item.key] === currentUser.name && <span style={{ color: 'red' }}> (You)</span>} {/*if the user is admin */}
                      </td>
                  ))}

                  {/* actions column */}
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <Link to={`${row.id}`}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>
                      {currentUser.name !== row.name &&
                        <FontAwesomeIcon
                          onClick={() => handleDelete(row.id)}
                          color={"red"}
                          icon={faTrash}
                          cursor={"pointer"}
                        />
                      }
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="12">
              <div className="d-flex align-items-center justify-content-end flex-wrap">
                <div className="col-1">
                  <Form.Select
                    onChange={(e) => setLimit(e.target.value)}
                    area-label="Default select"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </Form.Select>
                </div>
                <PaginatedItems itemsPerPage={limit} TotalData={totalData} setPage={setPage} />
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}