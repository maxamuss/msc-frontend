import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SideBar from './SideBar';
import TopMenu from './TopMenu';
import ModelSchemaList from '../modelschemas/ModelSchemaList';
import ModelSchemaCreate from '../modelschemas/ModelSchemaCreate';
import ModelSchemaDetail from '../modelschemas/ModelSchemaDetail';
import ModelSchemaDelete from '../modelschemas/ModelSchemaDelete';
import FunctionList from '../functions/FunctionList';
import FunctionDetail from '../functions/FunctionDetail';
import FunctionCreate from '../functions/FunctionCreate';
import PackageList from '../packages/PackageList';
import PageEditor from '../pages/PageEditor';
import ReleaseTree from '../releases/ReleaseTree';
import { ROUTES } from '../utils/routing';

function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <div className='md:pl-64 flex flex-col flex-1'>
        <TopMenu />
        <main>
          <Routes>
            <Route path={ROUTES.modelschema.list} element={<ModelSchemaList />} />
            <Route path={ROUTES.modelschema.create} element={<ModelSchemaCreate />} />
            <Route path={ROUTES.modelschema.detail} element={<ModelSchemaDetail />} />
            <Route path={ROUTES.modelschema.delete} element={<ModelSchemaDelete />} />
            <Route path={ROUTES.function.list} element={<FunctionList />} />
            <Route path={ROUTES.function.detail} element={<FunctionDetail />} />
            <Route path={ROUTES.function.create} element={<FunctionCreate />} />
            <Route path={ROUTES.package.list} element={<PackageList />} />
            <Route path={ROUTES.page.editor} element={<PageEditor />} />
            <Route path={ROUTES.release.tree} element={<ReleaseTree />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
