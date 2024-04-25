import axios from "axios";
import { CryptoMenu } from "./components/Menu";
import { useEffect, useState } from "react";
import { Menu, Spin } from "antd";
import { CryptoCard } from "./components/Card";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        label,
        type,
        children,
    };
}

function App() {
    const fetchCurrency = (id) => {
        axios.get(`http://127.0.0.1:8000/currencies/${id}`).then((r) => {
            setCurrencyData(r.data);
        });
    };
    const [currencies, setCurrencies] = useState([]);
    const [currencyData, setCurrencyData] = useState(null);
    const [currencyId, setCurrencyId] = useState(1);

    const fetchAllCurrencies = () => {
        axios.get("http://127.0.0.1:8000/currencies").then((r) => {
            const response = r.data;
            const menu = [
                getItem(
                    "Currencies list",
                    "g1",
                    null,
                    response.map((item) => {
                        return {
                            label: item.name,
                            key: item.id,
                        };
                    }),
                    "group"
                ),
            ];
            setCurrencies(menu);
        });
    };

    useEffect(() => {
        fetchAllCurrencies();
    }, []);

    useEffect(() => {
        setCurrencyData(fetchCurrency(currencyId));
    }, [currencyId]);

    function onClick(e) {
        setCurrencyId(e.key);
    }

    return (
        <div className="flex row">
            <Menu
                className="h-screen overflow-scroll"
                style={{
                    width: 256,
                }}
                onClick={onClick}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={currencies}
            />
            {
                currencyData? (
                    <CryptoCard currency={currencyData} />
                ) : (
                    <Spin className="m-auto" size="large"/>
                )
            }
        </div>
    );
}
export default App;
