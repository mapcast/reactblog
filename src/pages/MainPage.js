import Categories from '../Components/Categories';
import '../common/bootstrap.css';
import '../common/styles.css';
import About from '../Components/About';
import LoginModal from '../Components/LoginModal';
import { useState } from 'react';

const MainPage = () => {
    //const flag=useSelector(state => state.posts.get('flag'));
    const [modalFlag, setModalFlag] = useState(false);
    const handleSetFlagTrue = () => {
        setModalFlag(true);
    }
    const handleSetFlagFalse = () => {
        setModalFlag(false);
    }
    return(
        <div className="appFlex">
            <Categories
            handleSetFlagTrue={handleSetFlagTrue}
            />
            <About/>
            <LoginModal
            flag={modalFlag}
            handleSetFlagFalse={handleSetFlagFalse}/>
        </div>
    )
}

export default MainPage;