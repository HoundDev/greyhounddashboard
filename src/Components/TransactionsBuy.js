function TransactionsBuy(props) {
    const transactions = props.transactions;
	const linkBase = "https://bithomp.com/explorer/";
    const listItems = transactions.slice(0, 10).map((transaction, index) =>

    <tr className="buy" key={index}>
		
			<td className="text-left">{parseFloat(transaction.amount).toFixed(4)}</td>
			<td>{parseFloat(transaction.amountXrp).toFixed(4)}</td>
			<td><a href={linkBase + transaction.address} target="blank"><i className="fa-solid fa-chart-line"></i></a></td>
		
	</tr>
    );
    return (
      <>{listItems}</>
    );
  }
export default TransactionsBuy;
  	
  	  	


  