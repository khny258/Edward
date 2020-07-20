import React from "react";
import { Col, Row, Container } from "../Grid";
import { ListItem } from "../List";

function LatestFilingList({ company, cik, filingDate}) {
    return (
        <ListItem>
            <Row className="flex-wrap-reverse">
                <Col size="md-4">
                    {/* <p className="font-italic"><a href="#" onClick={handleCIK} name={cik}>{company}</a></p> */}
                    <p>{company}</p>
                </Col>
                <Col size="md-4">
                    <p>{cik}</p>
                </Col>
                <Col size="md-4">
                    <p>{filingDate}</p>
                </Col>
                {/* <Col size="md-3" className="text-center">
                    <Button />
                </Col> */}
            </Row>
        </ListItem>
    );

}

export default LatestFilingList