import React from "react";
import millify from "millify";
import { Row, Col, Typography, Avatar } from "antd";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.coins;
  // Note: To access this endpoint you need premium plan
  console.log(data);
  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{ marginBottom: "25px" }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Symbol</Col>
        <Col span={6}>No of Market</Col>
      </Row>

      {exchangesList?.map((exchange) => (
        <Row
          key={exchange.uuid}
          style={{ marginBottom: "20px", marginTop: "10px" }}
        >
          <Col span={6}>
            <Text>
              <strong>{exchange.rank}.</strong>
            </Text>
            <Avatar className="exchange-image" src={exchange.iconUrl} />
            <Text>
              <strong>{exchange.name}</strong>
            </Text>
          </Col>
          <Col span={6}>${millify(exchange["24hVolume"])}</Col>
          <Col span={6}>{exchange?.symbol}</Col>
          <Col span={6}>{exchange?.numberOfMarkets}</Col>
          {/* <Col span={6}>{millify(exchange?.marketShare)}%</Col> */}
        </Row>
      ))}
    </>
  );
};

export default Exchanges;
