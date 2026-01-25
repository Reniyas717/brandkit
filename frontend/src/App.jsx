import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrandExperience from './pages/BrandExperience';
import ProductExploration from './pages/ProductExploration';
import KitBuilder from './pages/KitBuilder';
import KitReview from './pages/KitReview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandExperience />} />
        <Route path="/brand/:slug" element={<BrandExperience />} />
        <Route path="/products" element={<ProductExploration />} />
        <Route path="/builder" element={<KitBuilder />} />
        <Route path="/review" element={<KitReview />} />
        {/* Default catch-all */}
        <Route path="*" element={<BrandExperience />} />
      </Routes>
    </Router>
  );
}

export default App;
