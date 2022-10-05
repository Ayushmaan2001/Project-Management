import './Avatar.css'

function Avater({src}) {
    return (<div className='avatar'>
        <img src={src} alt="user avatar" />
    </div>);
}

export default Avater;