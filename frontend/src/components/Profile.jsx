


export const Profile = ({ profileUrl }) => {

    console.log("FROM AAA" + profileUrl);

    return (
        <>

            <div >

                <img
                    src={profileUrl}
                    alt="Debug profile"
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                    onLoad={() => console.log('Regular img loaded')}
                    onError={() => console.log('Regular img failed')}
                />
            </div>
        </>
    )
}