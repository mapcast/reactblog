import React, { useEffect, useState } from 'react';
import Categories from '../Components/Categories';
import UpdateEditor from '../Components/EditPage/UpdateEditor';
import * as EditorActions from  '../store/modules/editor';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const UpdatePage = ({match}) => {
    const dispatch = useDispatch();
    const [Category, setCategory] = useState();
    const [Title, setTitle] = useState();
    const [Content, setContent] = useState();
    const getSelectedPost = async(id) => {
        try{
            await axios.get(`/getSelectedPosts?id=${id}`).then(response => {
                let {data} = response;
                setCategory(data[0].category);
                setTitle(data[0].title);
                setContent(data[0].content);
            });
        }catch(e){
            console.log(e);
        }
    }
    const handleTitle = (title) => {
        setTitle(title);
    }
    const handleContent = () => {
        
    }
    const handleCategory = (category) => {
        setCategory(category);
    }
    const handleSubmit = async(id, category, title, content) => {
        const post = {
            id, category, title, content
        };
        try{
            await dispatch(EditorActions.addPost(post));
        }catch(e){
            console.log(e);
        }
    }

    useEffect(async () => {
        await getSelectedPost(match.params.id)
    }
    ,[]);
    return(
        <div className="appFlex">
            <Categories/>
            <UpdateEditor
            onSubmit={handleSubmit}
            Category={Category}
            Title={Title}
            Content={Content}
            handleTitle={handleTitle}
            handleCategory={handleCategory}
            />
        </div>
    )
}
export default UpdatePage;

