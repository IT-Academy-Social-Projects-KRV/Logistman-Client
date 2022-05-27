import React from "react";
import { Button, Result } from 'antd';
import { useHistory } from "react-router-dom";

function HomePage() {
    let history = useHistory();

    const onClick = () => {
        history.push("/login");
    }

    return (
        <Result
            status="403"
            title="Ooops!"
            subTitle="Page under development!"
            extra={<Button type="primary" onClick={onClick}>Go to login</Button>}
        />
    );
}

export default HomePage;
