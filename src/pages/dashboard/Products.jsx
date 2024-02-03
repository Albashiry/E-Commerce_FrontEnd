import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableShow from "../../components/dashboard/TableShow";
import { PRODUCTS, PRODUCT } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Products(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`/${PRODUCTS}`)
      .then(result => setProducts(result.data))
      .catch((error) => console.log(error));
  }, []);

  const header = [
    {
      key: 'title',
      name: 'Title'
    },
    {
      key: 'description',
      name: 'Description'
    },
    {
      key: 'price',
      name: 'Price'
    },
    {
      key: 'rating',
      name: 'Rating'
    },
  ];

  async function handleDelete(id) {
    try {
      await Axios.delete(`${PRODUCT}/${id}`);
      setProducts(prev => prev.filter(item => item.id!==id))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Products Page</h3>
        <Link to='/dashboard/product/add' className="btn btn-primary">
          Add Product
        </Link>
      </div>
      
      <TableShow header={header} data={products} handleDelete={handleDelete} />
    </>
  );
}