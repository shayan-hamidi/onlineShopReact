function Nav(props) {
  const searchHandler = ()=>{
    let title = document.getElementById("search").value;
    title = title.toLowerCase();
    let result = [];
    props.data.map(product => {
      if (product.title.toLowerCase().includes(title)){
      result.push(product);
      }
  });
  props.setData(result)
  }
  const reset =()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => props.setData(json));
  }
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
      <div className="searchContainer d-flex flex-column">
      <input placeholder=" Search Product" id="search" onKeyDown={()=>searchHandler()} />
      <button className="btn bg-dark text-light mt-2" onClick={()=> reset()}>{"Reset"}</button>
      </div>
    </nav>
  );
}
function Products(props) {
  return (
    <div className="productsContainer mt-4 d-flex justify-content-around">
      <div className="productsBox d-flex flex-wrap">
        {props.data.map((item, index) =>
        props.productCardGenerator(item,index,props.data,props.setData)
        )
      }
      </div>
    </div>
  );
}
const productRender = (item, index,data,setData) => {
  function deleteHandler(id) {
    {setData(data.filter(product => product.id !== id))}
  }
  function updateHandler(id) {
     let newTitle = window.prompt("Enter new title");
     let newPrice = window.prompt("Enter new Price");
     let newDescription = window.prompt("Enter new description");
     let newSrc = window.prompt("Enter new src");
     let allItems = [...data];
     allItems.forEach(item => {
       if (item.id == id) {
        item.title=newTitle;
        item.price=newPrice;
        item.description=newDescription;
        item.image=newSrc;
       }
     });
     setData(allItems)
  }
  return (
     <div className="card" key={index + 1}>
       <img src={item.image} />
       <div className="cardBody mt-4">
         <h5 className="card-title">{item.title}</h5>
         <h2 className="badge bg-success">{item.price} {"$"}</h2>
         <p>{item.description}</p>
       </div>
       <div className="card-footer d-flex justify-content-between">
         <button className="btn btn-primary" onClick={() => updateHandler(item.id)}>
           {"Update product"}
         </button>
        <button className="btn bg-danger text-light" onClick={() => deleteHandler(item.id) }>{"Delete"}</button>
       </div>
     </div>
   );
 };
function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => setData(json));
  }, []);
  return (
    <>
      <Nav data={data} setData={setData} />
      <Products productCardGenerator={productRender} data={data} setData={setData} />
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
