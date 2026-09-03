import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

function Layout({ children, hideFooter = false }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;