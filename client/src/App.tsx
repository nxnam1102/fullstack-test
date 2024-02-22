import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ListProduct } from './modules/main/list';
import { DetailsProduct } from './modules/main/details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListProduct />} />
        <Route path='/product/:id' element={<DetailsProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
