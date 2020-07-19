import React from "react";
import { Col, Row, Container } from "../Grid";
import { ListItem } from "../List";

function TransactionsList({ companyName, rptOwnerName, transactionShares,transactionDate,transactionPricePerShare,transactionCode}) {
    return (
        <ListItem>
            <Row className="flex-wrap-reverse">
                <Col size="md-2">
                    <p>{rptOwnerName}</p>
                </Col>
                <Col size="md-2">
                    <p>{companyName}</p>
                </Col>
                <Col size="md-2">
                    <p>{transactionShares}</p>
                </Col>
                <Col size="md-2">
                    <p>{transactionPricePerShare}</p>
                </Col>
                <Col size="md-2">
                    <p>{transactionCode}</p>
                </Col>
                <Col size="md-2">
                    <p>{transactionDate}</p>
                </Col>
            </Row>
        </ListItem>
    );

}

export default TransactionsList