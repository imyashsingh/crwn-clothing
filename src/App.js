

const App = () => {

  const catagories = [
    {
      id : 1,
      title : 'Hats',
    },
    {
      id : 2,
      title : 'Jackets',
    },
    {
      id : 1,
      title : 'Sneakers',
    },
    {
      id : 1,
      title : 'Women',
    },
    {
      id : 1,
      title : 'Men',
    }
  ];

  return (
    <div className="categories-container">
    {
      catagories.map(({title}) => (
        <div className="category-container">
          <div className="background-image"/>
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop now</p>
          </div>
        </div>
      ))
    }
    </div>
  );
}

export default App;
