import "./App.css";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// pages ---------------------------------------------------------
import Homepage from "./components/Homepage";
import SuperHeroesPage from "./components/SuperHeroesPage";
import RQSuperHeroesPage from "./components/RQSuperHeroesPage";
import RQHero from "./components/RQHero";
import ParallelQueries from "./components/ParallelQueries";
import DynamicParallelQueries from "./components/DynamicParallelQueries";
import DependentQueries from "./components/DependentQueries";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-paginated-query">RQ Paginated Query</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-hero/:heroId" element={<RQHero />} />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelQueries heroIds={[1, 3]} />}
            />
            <Route
              path="/rq-dependent"
              element={<DependentQueries email="dev@mail.com" />}
            />
            <Route path="/rq-paginated-query" element={<PaginatedQueries />} />
            <Route path="/rq-infinite-query" element={<InfiniteQueries />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
