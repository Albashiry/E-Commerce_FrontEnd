import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
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

export default function TableShow({ header, data, handleDelete, currentUser = { name: '' } }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const start = (page - 1) * limit;
  const end = start + Number(limit);
  let paginateData = data.slice(start, end);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {header.map((headerItem, index) => <th key={index}>{headerItem.name}</th>)}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0
            ? <tr><td className="text-center" colSpan="12">Loading...</td></tr>
            : paginateData.map((row, rowId) => (
              <tr key={rowId}>
                <td>{row.id}</td> {/* id column */}

                {header.map((item, ndx) => (
                  item.key === 'images'
                    ?  // map product images object
                    <td key={ndx} className="d-flex align-items-center justify-content-start gap-1 flex-wrap">
                      {row[item.key].map((img, i) => (<img key={i} src={img.image} alt={img.image} width='50px' />))}
                    </td>
                    : <td key={ndx} className="p-1">
                      {item.key === 'image'
                        ? <img src={row[item.key]} alt={item.key} height="50" width={'70'} /> // show category image
                        : <RoleLabel role={row[item.key]} />
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
              <PaginatedItems itemsPerPage={limit} data={data} setPage={setPage} />
            </div>
          </td>
        </tfoot>
      </Table>
    </>
  );
}