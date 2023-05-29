import SyncLoader from 'react-spinners/SyncLoader';

function Loader() {
    return (
        <div
            className="sweet_loading"
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '40px 0',
            }}
        >
            <SyncLoader color="#425cee"/>
        </div>
    );
}

export default Loader;