import '../common/bootstrap.css';
import '../common/styles.css';
import Categories from '../Components/Categories';
import React, { useEffect, useState } from 'react';
import Post from '../Components/PostPage/Post';
import PostList from '../Components/PostPage/PostList';
import Comment from '../Components/PostPage/Comment';
import axios from 'axios';
import { current } from 'immer';
import history from '../history';
import Cookies from 'js-cookie';
import 'url-search-params-polyfill';
import * as api from '../lib/api';
import LoginModal from '../Components/LoginModal';
/*
const PostPage = () => {
    const post=useSelector(state => state.posts.get('post'));
    const { category, title, content, date } = post.toJS();
    const dispatch = useDispatch();
    const getLP = async() => {
        try{
            await dispatch(postActions.getLastPost());
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        getLP();
    }, []);
    return(
        <div className="appFlex">
            <Categories/>
            <div className="post-page">
                <Post 
                Category={category}
                Title={title}
                Content={content}
                Date={date}/>
                <Comment/>
                <PostList/>
            </div>
        </div>
    )
}

export default PostPage;
*/

/*class PostPage extends Component{
    getLastPost = async() => {
        const { PostActions } =this.props;
        await PostActions.getLastPost();
    }
    componentDidMount(){
        this.getLastPost();
    }
    render(){
        const { loading, posts } = this.props;
        console.log(loading);
        if(loading) return null;
        const { category, title, content, date } = this.props.posts;

        return(
            <div className="appFlex">
                <Categories/>
                <div className="post-page">
                    <Post 
                    Category={category}
                    Title={title}
                    Content={content}
                    Date={date}/>
                    <Comment/>
                    <PostList/>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        posts: state.posts.get('post'),
        loading: state.pender.success['posts/GET_LAST_POST']
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(PostPage);*/


const PostPage = ({match, page}) => {
    if(typeof page === 'undefined'){
        page=1;
    }
    let ppid;
    const [pid, setPid] = useState();
    const [category, setCategory] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [date, setDate] = useState()

    const [postList, setPostList] = useState([]);
    const [pagePosts, setPagePosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(page);
    const [isEndPage, setIsEndPage] = useState(false);

    const [commentList, setCommentList] = useState([]);
    const session = Cookies.get('session');
    const [modalFlag, setModalFlag] = useState(false);
    const handleSetFlagTrue = () => {
        setModalFlag(true);
    }
    const handleSetFlagFalse = () => {
        setModalFlag(false);
    }

    const onPrev = () => {
        let prevPage = currentPage-1;
        setCurrentPage(prevPage);
        setIsEndPage(false);
        let temp=(prevPage-1)*5;
        let tempPagePosts = [];
        for(let i=0; i<5; i++){
            if(postList[temp+i]!=null){
                tempPagePosts.push(postList[temp+i]);
            }
        }
        setPagePosts(tempPagePosts);
    }
    const onNext = () => {
        let nextPage = currentPage+1;
        console.log(postList.length);
        if(nextPage>=parseInt((postList.length-1)/5)){
            setIsEndPage(true);
        }
        setCurrentPage(nextPage);
        let temp=(nextPage-1)*5;
        let tempPagePosts = [];
        for(let i=0; i<5; i++){
            if(postList[temp+i]!=null){
                tempPagePosts.push(postList[temp+i]);
            }
        }
        setPagePosts(tempPagePosts);
    } 
    const getLP = async(category) => {
        try{
            await axios.get(`/getLastPost?category=${category}`)
            .then(response => {
                let {data} = response;
                let date = data[0].writedate+"";
                date = date.replace("T"," ").replace("Z","").substring(0,19);
                setPid(data[0].id);
                ppid=data[0].id;
                setCategory(data[0].category);
                setTitle(data[0].title);
                setContent(data[0].content);
                setDate(date);
            });
        }catch(e){
            console.log(e);
        }
    }
    const getSelectedPost = async(id, category) => {
        try{
            await axios.get(`/getSelectedPosts?id=${id}`).then(response => {
                let {data} = response;
                let date = data[0].writedate+"";
                date = date.replace("T"," ").replace("Z","").substring(0,19);
                setPid(data[0].id);
                setCategory(data[0].category);
                setTitle(data[0].title);
                setContent(data[0].content);
                setDate(date);
            });
        }catch(e){
            console.log(e);
        }
    }
    const getPostList = async(category) => {
        try{
            console.log(category);
            await axios.get(`/getPosts?category=${category}`)
            .then(response => {
                let tempPosts=[];
                let {data} = response;
                data.map(
                    (post, index) => {
                        let tempPost = {
                            id:post.id,
                            title:post.title,
                            writedate:post.writedate
                        };
                        tempPosts.push(tempPost);
                    }
                )
                setPostList(tempPosts);
                let tempPagePosts=[];
                let j = (currentPage-1)*5
                for(let i=j; i<j+5; i++){
                    if(tempPosts[i]!=null){
                        tempPagePosts.push(tempPosts[i]);
                    }
                }
                setPagePosts(tempPagePosts);   
                console.log(tempPosts.length);
                if(parseInt((tempPosts.length-1)/5)===0){
                    setIsEndPage(true);
                }

                /*let allPage;
                if(tempPosts.length%5===0){
                    allPage=tempPosts.length/5;
                }else{
                    allPage=parseInt(tempPosts.length/5)+1
                }
                let tempPageList=[];
                if(currentPage>allPage-10){
                    console.log(allPage%10);
                    for(let i=1; i<=allPage%10; i++){
                        let block=parseInt(currentPage/10);
                        tempPageList.push(block+i);
                    }
                }else{
                    for(let i=1; i<=10; i++){
                        let block=parseInt(currentPage/10);
                        tempPageList.push(block+i);
                    }
                }
                setPageList(tempPageList);*/
            })
        }catch(e){
            console.log(e);
        }
    }
    const getCommentList = async (id) => {
        if(typeof id==='undefined'){
            id=ppid;
            if(typeof id==='undefined'){//아무 글도 없을경우
                id=0;
            }
        }
        try{
            await axios.get(`/getCommentList?pid=${id}`).then(
                response => {
                    let tempComments=[];
                    let {data} = response;
                    console.log(data);
                    let tempComment;
                    data.map(
                        (comment, index) => {
                            tempComment = {
                                pid:id,
                                cid:comment.cid,
                                writer:comment.writer,
                                password:comment.password,
                                content:comment.content,
                                writedate:comment.writedate
                            };
                            tempComments.push(tempComment);
                        }
                    )
                    setCommentList(tempComments);
                }
            )
        }catch(e){
            console.log(e);
        }

    }
    const handleDelete = async() => {
        if(session){
            let result = window.confirm("글을 정말 삭제하시겠습니까?");
            if(result){
                try{
                    api.deletePost(pid);
                    history.push('/posts');
                    window.location.reload();
                }catch(e){
                    alert("에러가 발생했습니다.");
                }
            }
        }
    }
    const handleUpdate = async() => {
        if(session){
            history.push('/update/'+pid);
        }
    }
    const handleDeleteComment = async(cid) => {
        if(session){
            let result = window.confirm("댓글을 정말 삭제하시겠습니까?");
            if(result){
                try{
                    api.deleteComment(cid);
                    window.location.reload();
                }catch(e){
                    alert("에러가 발생했습니다.");
                }
            }
        }
    }
    useEffect(async() => {
        let id=match.params.id;
        let category=match.params.category;
        if(typeof category==='undefined'){
            category="all";
            console.log(category);
        }else{
            console.log(category);
        }
        if(typeof id==='undefined'){
            await getLP(category);
        }else{
            await getSelectedPost(id);
        }
        await getPostList(category);
        await getCommentList(id);
    }, []);
    return(
        <div className="appFlex">
            <Categories
            handleSetFlagTrue={handleSetFlagTrue}/>
            <div className="post-page">
                <Post 
                Category={category}
                Title={title}
                Content={content}
                Date={date}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}/>
                {
                    pid>0?
                    <div>
                        <Comment
                        commentList={commentList}
                        pid={pid}
                        deleteComment={handleDeleteComment}/>
                        <PostList
                        postList={pagePosts}
                        currentPage={currentPage}
                        onPrev={onPrev}
                        onNext={onNext}
                        isEndPage={isEndPage}
                        category={match.params.category}/>
                    </div>
                    :
                    <div></div>
                }
            </div>
            <LoginModal
            flag={modalFlag}
            handleSetFlagFalse={handleSetFlagFalse}/>
        </div>
    )
}

export default PostPage;