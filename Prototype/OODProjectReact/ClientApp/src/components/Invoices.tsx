import React, { Component } from "react";
import { Segment, Table, Header } from "semantic-ui-react";

export class Invoices extends Component<{}, {}>{
    constructor(props: any){
        super(props);
    }

    render(){
        return(
            <Segment>
                <Header>
                    فاکتورها
                </Header>
                <Table>
                    
                </Table>
            </Segment>
        );
    }
}