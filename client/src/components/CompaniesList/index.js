import React from "react";
import { Col, Row, Container } from "../Grid";
import { ListItem } from "../List";

function CompaniesList({ company, cik, handleCIK}) {
    return (
        <ListItem>
            <Row className="flex-wrap-reverse">
                <Col size="md-12">
                    <p className="font-italic"><a href="#" onClick={handleCIK} name={cik}>{company}</a></p>
                </Col>
            </Row>
        </ListItem>
    );

}

export default CompaniesList