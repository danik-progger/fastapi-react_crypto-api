import React from "react";
import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        label,
        type,
    };
}

export function CryptoMenu() {
    const items = [
        getItem("Item 1", "g1", null, "group"),
        getItem("Item 2", "g2", null, "group"),
    ];
    const onClick = (e) => {
        console.log("click ", e);
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
        />
    );
}
