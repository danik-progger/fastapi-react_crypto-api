import { Card } from "antd";

export function CryptoCard(props) {
    const { currency } = props;
    const price = Math.round(currency.quote.USD.price * 10000) / 10000;
    const cap =
        Math.round(currency.quote.USD.fully_diluted_market_cap / 1_000_000_000) / 1000;
    const change = Math.round(currency.quote.USD.percent_change_24h * 100) / 100;
    if (currency.id === 1) {
        console.log(currency)
    }

    return (
        <>
            <Card
                className="h-400 m-auto"
                title={
                    <div className="flex items-center gap-3">
                        <img
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
                            alt="Currency logo"
                            className="h-10 w-10"
                        />
                        <h1>{currency.name}</h1>
                    </div>
                }
                style={{ width: 300 }}
            >
                <p>Price: {price}</p>
                <p>Capitalization: ${cap}B</p>
                <p>Last 24 h price change: <span className={change > 0 ? "text-green-500" : "text-red-500"}>{change} %</span></p>
            </Card>
        </>
    );
}
