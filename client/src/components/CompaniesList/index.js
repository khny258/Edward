import React from "react";
import { Col, Row, Container } from "../Grid";
import { ListItem } from "../List";

function CompaniesList({ company, cik, Button}) {
    return (
        <ListItem>
            <Row className="flex-wrap-reverse">
                <Col size="md-6">
                    {/* <p className="font-italic"><a href="#" onClick={handleCIK} name={cik}>{company}</a></p> */}
                    <p className="font-italic">{company}</p>
                </Col>
                <Col size="md-4">
                    <p className="font-italic">{cik}</p>
                </Col>
                <Col size="md-2">
                    <Button />
                </Col>
            </Row>
        </ListItem>
    );

}

export default CompaniesList