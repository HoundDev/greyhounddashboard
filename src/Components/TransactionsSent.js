function TransactionsSent(props) {
    const transactions = props.transactions;
    const linkBase = "https://bithomp.com/explorer/";
    const listItems = transactions.slice(0, 7).map((transaction) =>
        <tr key={transaction.hash}>
        <td>
        <div className="media">
            <span className="p-3 ">
            <svg width={27} height={27} viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.9375 6.23199L5.9375 24.875C5.9375 25.6689 6.58107 26.3125 7.375 26.3125C8.16892 26.3125 8.8125 25.6689 8.8125 24.875L8.8125 6.23202L11.2311 8.66232L11.2311 8.66234C11.7911 9.22504 12.7013 9.2272 13.264 8.66717C13.8269 8.10701 13.8288 7.19681 13.2689 6.63421L12.9145 6.9869L13.2689 6.6342L8.3939 1.73558L8.38872 1.73037L8.38704 1.72878C7.82626 1.1728 6.92186 1.17468 6.36301 1.72877L6.36136 1.73033L6.35609 1.73563L1.48109 6.63425L1.48108 6.63426C0.921124 7.19695 0.9232 8.10709 1.48597 8.6672C2.04868 9.22725 2.95884 9.22509 3.51889 8.66238L3.51891 8.66236L5.9375 6.23199Z" fill="#60B2E0" stroke="#60B2E0" />
            </svg>
            </span>
            <div className="media-body align-self-center">
           <a href={linkBase + transaction.hash}><h5 className="font-w600 text-white fs-14">{transaction.date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {transaction.currency} {transaction.amount}
            </h5></a>
            <a href={linkBase + transaction.hash}><p className="mb-0 fs-15 truncate">{transaction.account}
            </p></a>
            </div>
            <span className="p-3 ">
            <p className="font-w600 text-center text-white"></p>
            </span>
        </div>
        </td>
    </tr>
    );
    return (
      <>{listItems}</>
    );
  }

  export default TransactionsSent;