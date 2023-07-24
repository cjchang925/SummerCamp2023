import { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './Welcome.css'
import Table from 'react-bootstrap/Table';
import AddElement from "./AddElement";

const Student = () => {
    const [list, setList] = useState([]);
    const [display, setDisplay] = useState("list");

    const getElement = async () => {
        const response = await fetch('https://prevexam.dece.nycu.edu.tw:6789/api/get_element', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        setList(response);
    }

    useEffect(() => {
        getElement();
    }, [display])

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>
                        <img src='makercamp.png' width={100} style={{ marginRight: '20px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => setDisplay('list')}>購買清單</Nav.Link>
                            <Nav.Link onClick={() => setDisplay('purchase')}>新增購買項目</Nav.Link>
                            <Nav.Link href='/'>回首頁</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {display === 'list' ?
                <Table className="mt-4" striped bordered hover style={{ width: '80vw', margin: 'auto' }}>
                    <thead>
                        <tr>
                            <th>小隊</th>
                            <th>材料名稱</th>
                            <th>材料圖片</th>
                            <th>材料個數</th>
                            <th>預計花費</th>
                            <th>備註</th>
                            <th>負責隊輔</th>
                            <th>採購進度</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((ele, id) => (
                            <tr key={id}>
                                <td>{ele.team}</td>
                                <td>{ele.name}</td>
                                <td><img src={ele.imageLink} alt='invalid image' width={500} /></td>
                                <td>{ele.number}</td>
                                <td>{ele.price}</td>
                                <td>{ele.comment}</td>
                                <td>{ele.supporter}</td>
                                <td>{ele.done === 'true' ? '已採購' : '尚未採購'}</td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ height: '30px' }}></div>
                </Table>
                :
                <AddElement />
            }

        </>
    )
}

export default Student;