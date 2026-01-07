import { Route, Routes } from 'react-router';
import { Footer } from './common/components/Footer';
import { Navbar } from './common/components/Navbar';
import { NotFoundView } from './common/components/NotFoundView';
import { HomePageView } from './HomePage/components/HomePageView';
import { HutRenovationPage } from './HutRenovationPage/components/HutRenovationPage';

export const App = () => {
  return (
    <div className='main-container' data-testid='main-container'>
      <Navbar />
      <main className='content' data-testid='content'>
        <Routes>
          <Route path='/' element={<HomePageView />} />
          <Route path='/about-us'>
            <Route path='/about-us/hut-renovation' element={<HutRenovationPage />} />
          </Route>
          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
