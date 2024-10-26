
const HistoryCard = ({  duration, date }) => {
    const onlyDate = date.split('T')[0];
    // console.log(user, "This is date");
    // console.log(createdAt, "This is createdAt");
    console.log(duration, "This is duration");
    // const date = new Date(createdAt);
    // console.log("This is the actual date", date)
    return (
        <div className="border border-black m-4 py-2 px-8 rounded-xl flex flex-col items-center hover:scale-105 transition border-b-4 border-r-4">
            <div className="font-bold ">
                {/* {user}
                {date} */}
                {onlyDate}
            </div>
            <div className="font-bold text-gray-600 text-sm">
                {duration} <span>Hours</span>
            </div>
        </div>
    )
}

export default HistoryCard;