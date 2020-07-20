import React from "react";
import { Col, Row, Container } from "../Grid";
import { ListItem } from "../List";

function CompaniesList({ company, cik, Button}) {
    return (
        <ListItem>
            <Row className="flex-wrap-reverse">
                <Col size="md-6">
                  
                    <p>{company}</p>
                </Col>
                <Col size="md-4">
                    <p>{cik}</p>
                </Col>
                <Col size="md-2">
                    <Button />
                </Col>
            </Row>
        </ListItem>
    );

}

export default CompaniesList