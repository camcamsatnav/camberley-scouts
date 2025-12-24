import { Footer } from './common/components/Footer';
import { Navbar } from './common/components/Navbar';
import { HomePageView } from './HomePage/HomePageView';

export const App = () => {
  return (
    <div className='main-container' data-testid='main-container'>
      <Navbar />
      <main className='content' data-testid='content'>
        <HomePageView />
      </main>
      <Footer />
    </div>
  );
};
