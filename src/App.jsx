import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './NavMenu';
import ItemDetail from './ItemDetails';
import AdminPanel from './AdminPanel';
import './styles/App.css';

function Home() {
  return (
    <div>
      <h1>Welcome to the SCP CRUD Application</h1>
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBEXf2BXrEhc0oZpk0z-iIZyqwgtD-06-JvQ&s" className="d-block w-100 " alt="First slide" />
          </div>
          <div className="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbT3asSIih_rvEogCd_atZUUSgsGoD_zFzjQ&s" className="d-block w-100 " alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvhTzO2Ji8XfXDENXV6zpgtKxtng4sj3v1yg&s" className="d-block w-100" alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
