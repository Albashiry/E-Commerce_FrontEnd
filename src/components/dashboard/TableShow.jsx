import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../constants/Axios";

function RoleLabel(props) {
  switch (props.role) {
    case '1995': return <span>Admin</span>;
    case '1996': return <span>Writer</span>;
    case '1999': return <span>Product Manager</span>;
    case '2001': return <span>User</span>;
    default: return <span>{props.role}</span>;
  }
}

export default function TableShow({ header, data, handleDelete, currentUser = false }) {
  
  // async function handleDelete(id) {
  //   try {
  //     await Axios.delete(`${delet}/${id}`);
  //     setDelete(prev => !prev);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          {header.map((item, index) => <th key={index}>{item.name}</th>)}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0
          ? <tr><td className="text-center" colSpan="12">Loading...</td></tr>
          : data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              {header.map((element, ndx) => (
                <td key={ndx}>
                  {<RoleLabel role={item[element.key]} />}
                  {item[element.key] === currentUser.name && <span style={{ color: 'red' }}> (You)</span>}
                </td>
              ))}

              <td>
                <div className="d-flex align-items-center gap-3">
                  <Link to={`${item.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                  {currentUser.name !== item.name &&
                    <FontAwesomeIcon
                      onClick={() => handleDelete(item.id)}
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
    </Table>
  );
}