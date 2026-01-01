import { Route, Routes } from 'react-router';
import { Footer } from './common/components/Footer';
import { Navbar } from './common/components/Navbar';
import { NotFoundView } from './common/components/NotFoundView.tsx';
import { HomePageView } from './HomePage/components/HomePageView';

export const App = () => {
  return (
    <div className='main-container' data-testid='main-container'>
      <Navbar />
      <main className='content' data-testid='content'>
        <Routes>
          <Route path='/' element={<HomePageView />} />
          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
