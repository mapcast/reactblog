import axios from 'axios';
import queryString from 'query-string';

export const addPost = ({category, title, content}) => {
    axios.post('/writePost', {category,title,content})
};

export const getLastPost = (category) => {
    axios.get('/getLastPost', {category:category}).then(response => console.log(response.data));
};

export const addComment = ({pid, writer, password, content}) => {
    console.log(pid);

    axios.post('/writeComment', {pid, writer, password, content})
};

export const deletePost = (id) => {
    id=id*1;
    axios.post('/deletePost', {id:id});
};

export const deleteComment = (cid) => {
    axios.post('/deleteComment', {cid:cid});
}