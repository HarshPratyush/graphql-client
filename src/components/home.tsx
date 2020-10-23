import React, { Component } from "react";
import Header from './common/header'
import { LOGIN } from "./../reducers/types";
import { connect } from "react-redux";
import store from "./../store";
import {
    Spinner,
    InputGroup,
    Navbar,
    Form,
    FormControl,
    Button,
    NavDropdown,
    Nav,
    Card,
    Container,
    Row,
    Col,
    ListGroup,
    Table,
} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { getAllbank } from './common/Query';


const mapStateToProps = (store: any) => ({
    loggedIn: store.posts.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => ({

})

class Home extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            accountList:
                [],
                noDataText:'Loading Data'
        };
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push("/");
        }
        else
        {
        getAllbank().then(result => {
            this.setState({ accountList: result.data.allBank ,noDataText:'No Data Found'});
        }).catch(error =>  {
            this.setState({ noDataText:'Error in fetching data'});
            console.log(error);
    })
}
    }


    render() {
        return (
            <div className="main-container">
                <Header history={this.props.history} />
                <Container fluid>
                    <Row>
                        <Col md={12} lg={12}>
                            
                            <Button
                                variant="success"
                                className="margin-bottom-20 float-right" onClick={() =>{ this.props.history.push('newAccount')}}
                            ><Icon.PlusCircle></Icon.PlusCircle>
                               &nbsp; Create New Account
                                </Button>
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Holder Name</th>
                                        <th> Account Number</th>
                                        <th>Branch Code</th>
                                        <th>Balance</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.accountList && this.state.accountList.length > 0
                                        ? this.state.accountList.map((account: any) => {
                                            return (
                                                <tr key={account.accountNumber}>
                                                    <td>{account.user.firstName} {account.user.lastName}</td>
                                                    <td>{account.accountNumber}</td>
                                                    <td>{account.branchCode}</td>
                                            <td>{'\u20B9'}{account.balance?account.balance:'0.00'}</td>
                                                    <td>{account.accountStatus}</td>
                                                </tr>
                                            )
                                        })
                                    : <tr><td colSpan={5} className="text-center big bold">{this.state.noDataText}</td></tr>
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
