function Nav() {
  return (
    <nav className="container-fluid p-fixed d-flex flex-row justify-content-around align-items-center">
      <div className="accountBox">
        <a href="#" className="text-light">
          {"SignIn"}
        </a>
        <span> / </span>
        <a href="#" className="text-light">
          {"SignUp"}
        </a>
      </div>
      <div className="absoluteBg" />
      <h1 className="text-light">{"Online Shop"}</h1>
      <div className="absoluteBg" />
      <input placeholder=" Search Product" />
    </nav>
  );
}
function Products({ productCardGenerator }) {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => setData(json));
  }, []);
  return (
    <div className="productsContainer mt-4 d-flex justify-content-around">
      <div className="productsBox d-flex flex-wrap">
        {data.map((item, index) =>
        productCardGenerator(item,index)
        )
      }
      </div>
    </div>
  );
}
const productRender = (item, index) => {
  return (
     <div className="card" key={index + 1}>
       <img src={item.image} />
       <div className="cardBody mt-4">
         <h2 className="card-title">{item.title}</h2>
         <h3>{item.price}</h3>
         <p>{item.description}</p>
       </div>
       <div className="card-footer d-flex justify-content-between">
         <a href="#" className="btn btn-primary">
           {"Go somewhere"}
         </a>
        {/* <button className="btn bg-danger text-light" onClick={item => .map(i=> i.id !== item.id)}>{"Delete"}</button> */}
       </div>
     </div>
   );
 };
function App() {
  return (
    <>
      <Nav />
      <Products productCardGenerator={productRender} />
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
