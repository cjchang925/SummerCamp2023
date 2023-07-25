import { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './Welcome.css'
import Table from 'react-bootstrap/Table';
import AddElement from "./AddElement";
import { AiOutlineCheck } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import Alert from 'react-bootstrap/Alert';

const colorMap = {
    '1': '#f3caf4',
    '2': 'rgb(204,240,255)',
    '3': 'rgb(205,241,203)',
    '4': '#f6f87e',
    '5': '#fabcaa'
}

const Student = () => {
    const [list, setList] = useState([]);
    const [display, setDisplay] = useState("list");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [moneyLeft, setMoneyLeft] = useState([]);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Add event listener to update windowWidth on resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getElement = async () => {
        const response = await fetch('https://prevexam.dece.nycu.edu.tw/api/get_element', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        setList(response);
    }

    const getMoneyLeft = async () => {
        const response = await fetch('https://prevexam.dece.nycu.edu.tw/api/get_money', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        setMoneyLeft(response);
    }

    useEffect(() => {
        getElement();
        getMoneyLeft();
    }, [display])

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>
                        <img src='makercamp.png' alt='' width={100} style={{ marginRight: '20px' }} />
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
                <>
                    <Alert variant="success" className="mt-4" style={{ width: '80vw', margin: 'auto' }}>
                        <Alert.Heading>注意事項</Alert.Heading>
                        <hr />
                        <p style={{ lineHeight: '30px' }}>
                            購買材料之前，"花費"欄位會顯示各小隊填寫的預計花費，購買之後則會顯示隊輔填寫的實際花費。
                            <br/>
                            Happy hacking!
                        </p>
                    </Alert>
                    <h4 style={{ marginLeft: '10vw', marginTop: '30px' }}>各小隊剩餘金額</h4>
                    {windowWidth > 900 ?
                        <Table className="mt-1" striped bordered hover style={{ width: '80vw', margin: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>10</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {moneyLeft.map((ele, id) => (
                                        <td key={id}>{ele}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                        :
                        <Table className="mt-1" striped bordered hover style={{ width: '80vw', margin: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {moneyLeft.map((ele, id) => {
                                        if (id < 5) return (
                                            <td key={id}>{ele}</td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>10</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {moneyLeft.map((ele, id) => {
                                        if (id >= 5) return (
                                            <td key={id}>{ele}</td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </Table>
                    }
                    <Table className="mt-4" bordered hover style={{ width: '80vw', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th>小隊</th>
                                <th>名稱</th>
                                {windowWidth > 900 ? <th>圖片</th> : <></>}
                                <th>個數</th>
                                <th>花費</th>
                                <th>備註</th>
                                <th>負責隊輔</th>
                                <th>採購進度</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((ele, id) => (
                                <>
                                    <tr key={id}>
                                        <td style={{ backgroundColor: colorMap[ele.importance] }}>{ele.team}</td>
                                        <td style={{ backgroundColor: colorMap[ele.importance] }}>{ele.name}</td>
                                        {windowWidth > 900 ? <td style={{ width: '40%', backgroundColor: colorMap[ele.importance] }}><img src={ele.imageLink} alt='invalid' style={{ width: '100%', minWidth: '70px' }} /></td> : <></>}
                                        <td style={{ backgroundColor: colorMap[ele.importance] }}>{ele.number}</td>
                                        <td style={{ backgroundColor: colorMap[ele.importance] }}>{ele.price}</td>
                                        <td style={{ backgroundColor: colorMap[ele.importance] }}>{ele.comment}</td>
                                        <td style={{ backgroundColor: colorMap[ele.importance] }}>{ele.supporter}</td>
                                        <td style={{ backgroundColor: colorMap[ele.importance] }}>{ele.done === 'true' ? <AiOutlineCheck color='green' /> : <RxCross2 color='red' />}</td>
                                    </tr>
                                    {windowWidth <= 900 ?
                                        <tr key={id}>
                                            <td colSpan={8} style={{ backgroundColor: colorMap[ele.importance] }}>
                                                <img src={ele.imageLink} alt='invalid' style={{ width: '100%' }} />
                                            </td>
                                        </tr>
                                        :
                                        <></>
                                    }
                                </>
                            ))}
                        </tbody>
                        <div style={{ height: '30px' }}></div>
                    </Table>
                </>
                :
                <AddElement />
            }

        </>
    )
}

export default Student;