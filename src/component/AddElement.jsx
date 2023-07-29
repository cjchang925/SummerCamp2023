import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

const AddElement = () => {
    const [team, setTeam] = useState("");
    const [name, setName] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [number, setNumber] = useState("");
    const [price, setPrice] = useState("");
    const [comment, setComment] = useState("");
    const [importance, setImportance] = useState("");
    const [moneyLeft, setMoneyLeft] = useState(0);

    const getCurrentTimeFormatted = () => {
        const currentTime = new Date();

        // Extracting the components
        const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(currentTime.getDate()).padStart(2, '0');
        const hour = String(currentTime.getHours()).padStart(2, '0');
        const minute = String(currentTime.getMinutes()).padStart(2, '0');

        // Combining the components in the desired format
        const formattedTime = `${month}/${day} ${hour}:${minute}`;

        return formattedTime;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (team.length === 0) {
            alert('請填寫第幾小隊！');
            return;
        }

        if (importance.length === 0 || importance === '0') {
            alert('請填寫重要性！');
            return;
        }

        const currentTime = getCurrentTimeFormatted();

        await fetch('https://makerealcamp.azurewebsites.net/api/add_element', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ team, name, imageLink, number, price, importance, comment, supporter: "", done: 'false', currentTime })
        }).then(() => {
            alert('新增成功！可至購買清單確認圖片是否正常顯示。');
            window.location.reload();
        })
    }

    const getMoneyLeft = async () => {
        const response = await fetch('https://makerealcamp.azurewebsites.net/api/get_money', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        setMoneyLeft(response);
    }

    useEffect(() => {
        getMoneyLeft();
    }, [team])

    return (
        <>
            <Form className="mt-5" style={{ marginLeft: '20%', marginRight: '20%' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>第幾小隊</Form.Label>
                    <Form.Control type="number" onChange={(e) => setTeam(e.target.value)} placeholder='請填數字 1~10' />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>材料名稱</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>圖片連結</Form.Label>
                    <Form.Control type="text" onChange={(e) => setImageLink(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>個數</Form.Label>
                    <Form.Control type="text" onChange={(e) => setNumber(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>預計花費</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>重要程度 (會優先購買較重要的材料)</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => setImportance(e.target.value)}>
                        <option value="0">請選擇</option>
                        <option value="1">非常不重要</option>
                        <option value="2">不重要</option>
                        <option value="3">普通</option>
                        <option value="4">重要</option>
                        <option value="5">非常重要</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>備註</Form.Label>
                    <Form.Control type="text" onChange={(e) => setComment(e.target.value)} />
                </Form.Group>
                <Button variant="primary" disabled={moneyLeft[parseInt(team) - 1] > 0 ? false : true} className='mb-3' type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AddElement;