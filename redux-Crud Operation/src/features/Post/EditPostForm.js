import React from 'react';
import { SelectAllUsers } from '../users/UsersSlice';
import { SelectPostById, UpdatePost, DeletePost } from './PostSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const EditPostForm = () => {
    const { postId } = useParams();
    const post = useSelector((state) => SelectPostById(state, Number(postId)));

    const users = useSelector(SelectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.content);
    const [userId, setUserId] = useState(post?.userId);
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onAuthorChange = e => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(UpdatePost({  id: post.id, title, body: content, userId, reactions: post.reactions }));

                setTitle('');
                setUserId('');
                setContent('');
                navigate(`/post/${postId}`);
            }
            catch (err) {
                console.log('Failed to Save the Post', err);
            }
            finally {
                setAddRequestStatus('idle');
            }
        }
    };

    const onDeletePostClicked = async () => {
        try {
            setAddRequestStatus('pending');
            await dispatch(DeletePost({ id: post.id }));

            setTitle('');
            setUserId('');
            setContent('');
            navigate('/');
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setAddRequestStatus('idle');
        }
    };

    if (!post) {
        return (
            <section>
                <h2>Post Not Found !</h2>
            </section>
        );
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor='postTitle'>Post Title</label>
                <input type='text' name='postTitle' id='postTitle' value={title} onChange={onTitleChange} />
                <label htmlFor='postAuthor'> Author :</label>
                <select name='postAuthor' value={userId} onChange={onAuthorChange} >
                    <option value=''></option>
                    {userOptions}
                </select>
                <label htmlFor='postContent'> Content :</label>
                <input type='text' name='postContent' id='postContent' value={content} onChange={onContentChange} />
                <button
                    type='button'
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
                <button
                    type='button'
                    className='deleteButton'
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
            </form>
        </section>
    );
};

export default EditPostForm;
