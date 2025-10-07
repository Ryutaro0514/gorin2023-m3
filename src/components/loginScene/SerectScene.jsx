export const SerectScene = ({ logout, profile }) => {
    const results = profile.results;
    let time = 0;
    //合計時間の算出
    results.forEach(result => {
        time+=result.time;
    })
    return (
        <>
            <h1>Welcom,{profile.nickname}</h1>
            <div>Your total play time is {time/60}min</div>
            <button>profile Settings</button>
            <button onClick={logout}>Logout</button>
            <button>Easy</button>
            <button>Normal</button>
        </>
    )
}