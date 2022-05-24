function TransactionsReceived(props) {
    const linkBase = "https://bithomp.com/explorer/";
    const transactions = props.transactions;
    const listItems = transactions.map((transaction) =>

    <tr>
    <td>
      <div className="media">
        <span className="p-3 ">
          <svg width={27} height={27} viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.9375 20.768L5.9375 2.12498C5.9375 1.33106 6.58107 0.687485 7.375 0.687485C8.16892 0.687485 8.8125 1.33106 8.8125 2.12499L8.8125 20.768L11.2311 18.3377L11.2311 18.3377C11.7911 17.775 12.7013 17.7728 13.264 18.3328C13.8269 18.893 13.8288 19.8032 13.2689 20.3658L12.9145 20.0131L13.2689 20.3658L8.3939 25.2644L8.38872 25.2696L8.38704 25.2712C7.82626 25.8272 6.92186 25.8253 6.36301 25.2712L6.36136 25.2697L6.35609 25.2644L1.48109 20.3657L1.48108 20.3657C0.921124 19.803 0.9232 18.8929 1.48597 18.3328C2.04868 17.7727 2.95884 17.7749 3.51889 18.3376L3.51891 18.3376L5.9375 20.768Z" fill="#60D180" stroke="#60D180" />
          </svg>
        </span>
        <div className="media-body align-self-center">
        <a href={linkBase + transaction.hash} target={window}><h5 className="font-w600 text-white">{transaction.date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {transaction.currency} {transaction.amount}</h5></a>
        <a href={linkBase + transaction.hash} target={window}><p className="mb-0 fs-15">{transaction.account}
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

  export default TransactionsReceived;