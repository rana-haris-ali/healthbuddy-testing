import { Container } from 'react-bootstrap';
import Header from './components/pharmacy/Header';
import Footer from './components/pharmacy/Footer';
import HomeScreen from './screens/pharmacy/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
