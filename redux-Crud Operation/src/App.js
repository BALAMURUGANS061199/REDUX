import logo from './logo.svg';
import './App.css';
import PostList from './features/Post/PostList';
import AddPostForm from './features/AddPostForm';
import { Routes, Route, Navigate } from 'react-router-dom';
import SinglePost from './features/Post/SInglePost'; // Corrected import
import Layout from './Components/Layout';
import EditPostForm from './features/Post/EditPostForm';
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePost />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>

        {/* Catch all  -replace with 404 Component if you want*/}
        <Route path ='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
