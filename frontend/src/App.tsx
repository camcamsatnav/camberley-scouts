import { Route, Routes } from 'react-router';
import { Footer } from './common/components/Footer';
import { Navbar } from './common/components/Navbar';
import { NotFoundView } from './common/components/NotFoundView';
import { NotImplementedView } from './common/components/NotImplementedView';
import { ContactPageView } from './contactPage/components/ContactPageView';
import { HomePageView } from './HomePage/components/HomePageView';
import { HutRenovationPage } from './HutRenovationPage/components/HutRenovationPage';
import { JoinBeaversPage } from './joinBeaversPage/components/JoinBeaversPage';

export const App = () => {
  return (
    <div className='main-container' data-testid='main-container'>
      <Navbar />
      <main className='content' data-testid='content'>
        <Routes>
          <Route path='/' element={<HomePageView />} />
          <Route path='/about-us'>
            <Route index element={<NotImplementedView />} />
            <Route path='hut-renovation' element={<HutRenovationPage />} />
            <Route path='bookings' element={<NotImplementedView />} />
            <Route path='documentation' element={<NotImplementedView />} />
            <Route path='faq' element={<NotImplementedView />} />
            <Route path='contact' element={<ContactPageView />} />
          </Route>
          <Route path='/fundraising' element={<NotImplementedView />} />
          <Route path='/volunteer' element={<NotImplementedView />} />
          <Route path='/shop' element={<NotImplementedView />} />
          <Route path='/beavers' element={<JoinBeaversPage />} />
          <Route path='/cubs' element={<NotImplementedView />} />
          <Route path='/scouts' element={<NotImplementedView />} />
          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
