function TransactionsBuy(props) {
    const transactions = props.transactions;
	const linkBase = "https://bithomp.com/explorer/";
    const listItems = transactions.slice(0, 10).map((transaction) =>

    <a href={linkBase + transaction.address} target="blank"><tr key={crypto.randomUUID()} className="buy">
		<td className="text-left">{parseFloat(transaction.amount).toFixed(4)}</td>
		<td>{parseFloat(transaction.amountXrp).toFixed(4)}</td>
		<td><i className="fa-solid fa-chart-line"></i></td>
    </tr></a>
    );
    return (
      <>{listItems}</>
    );
  }
export default TransactionsBuy;
  	
  	  	


  